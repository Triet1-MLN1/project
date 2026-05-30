import { mutation } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";

export const startGame = mutation({
  args: { roomId: v.id("rooms"), playerId: v.id("players") },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.roomId);
    if (!room) throw new Error("Phòng không tồn tại!");

    const player = await ctx.db.get(args.playerId);
    if (!player || !player.isHost)
      throw new Error("Chỉ chủ phòng mới có thể bắt đầu!");

    if (room.status !== "lobby")
      throw new Error("Trò chơi đã bắt đầu rồi!");

    const players = await ctx.db
      .query("players")
      .withIndex("by_roomId", (q) => q.eq("roomId", args.roomId))
      .collect();

    const hasAnyPlayer = players.some((p) => !p.isHost);
    if (!hasAnyPlayer) {
      throw new Error("Cần ít nhất 1 người chơi để bắt đầu!");
    }

    // Reset điểm và trạng thái cho tất cả người chơi khi bắt đầu
    for (const p of players) {
      await ctx.db.patch(p._id, {
        score: 0,
        lastScoreIncrement: 0,
        hasSubmitted: false,
        currentChoice: null,
      });
    }

    await ctx.db.patch(room._id, {
      status: "playing",
      currentRound: 1,
      phase: "choosing",
    });
  },
});

export const submitChoice = mutation({
  args: {
    playerId: v.id("players"),
    answer: v.string(), // Nhận đáp án văn bản
    scoreIncrement: v.number(), // Nhận số điểm tính từ thời gian còn lại
  },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.playerId);
    if (!player) throw new Error("Người chơi không tồn tại!");
    if (player.hasSubmitted) throw new Error("Bạn đã trả lời câu này rồi!");

    const room = await ctx.db.get(player.roomId);
    if (!room || room.status !== "playing" || room.phase !== "choosing") {
      throw new Error("Không thể trả lời lúc này!");
    }

    // Cập nhật điểm số cộng dồn và trạng thái đã nộp
    const currentScore = player.score ?? 0;
    await ctx.db.patch(args.playerId, {
      currentChoice: args.answer,
      score: currentScore + args.scoreIncrement,
      lastScoreIncrement: args.scoreIncrement,
      hasSubmitted: true,
    });

    // Kiểm tra xem tất cả người chơi (không tính host) đã nộp chưa
    const allPlayers = await ctx.db
      .query("players")
      .withIndex("by_roomId", (q) => q.eq("roomId", player.roomId))
      .collect();

    const nonHostPlayers = allPlayers.filter((p) => !p.isHost);
    const allSubmitted = nonHostPlayers.every((p) => p.hasSubmitted);

    if (allSubmitted) {
      // Chuyển sang phase kết quả để hiện đáp án đúng (ở frontend)
      await ctx.db.patch(player.roomId, {
        phase: "results",
      });
    }
  },
});

// Hàm này dùng khi hết giờ 1p mà có người chưa nộp hoặc Host muốn qua màn nhanh
export const forceProcessRound = mutation({
  args: { roomId: v.id("rooms"), playerId: v.id("players") },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.roomId);
    if (!room) throw new Error("Phòng không tồn tại!");

    const player = await ctx.db.get(args.playerId);
    if (!player || !player.isHost)
      throw new Error("Chỉ chủ phòng mới có thể dùng chức năng này!");

    const players = await ctx.db
      .query("players")
      .withIndex("by_roomId", (q) => q.eq("roomId", args.roomId))
      .collect();

    for (const p of players) {
      if (p.isHost || p.hasSubmitted) continue;

      // Những người chưa nộp khi bị force sẽ coi như sai (0 điểm)
      await ctx.db.patch(p._id, {
        currentChoice: "KHÔNG TRẢ LỜI",
        lastScoreIncrement: 0,
        hasSubmitted: true,
      });
    }

    await ctx.db.patch(args.roomId, {
      phase: "results",
    });
  },
});

export const nextRound = mutation({
  args: { roomId: v.id("rooms"), playerId: v.id("players") },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.roomId);
    if (!room) throw new Error("Phòng không tồn tại!");

    const player = await ctx.db.get(args.playerId);
    if (!player || !player.isHost)
      throw new Error("Chỉ chủ phòng mới có thể tiếp tục!");

    // Reset trạng thái nộp bài cho vòng tiếp theo
    const players = await ctx.db
      .query("players")
      .withIndex("by_roomId", (q) => q.eq("roomId", args.roomId))
      .collect();

    for (const p of players) {
      await ctx.db.patch(p._id, {
        hasSubmitted: false,
        currentChoice: null,
        lastScoreIncrement: 0,
      });
    }

    // Kết thúc sau 5 câu hỏi
    if (room.currentRound >= 5) {
      await ctx.db.patch(args.roomId, {
        status: "finished",
        phase: "results",
      });
    } else {
      await ctx.db.patch(args.roomId, {
        currentRound: room.currentRound + 1,
        phase: "choosing",
      });
    }
  },
});

export const endGame = mutation({
  args: { roomId: v.id("rooms"), playerId: v.id("players") },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.roomId);
    if (!room) throw new Error("Phòng không tồn tại!");

    const player = await ctx.db.get(args.playerId);
    if (!player || !player.isHost)
      throw new Error("Chỉ chủ phòng mới có thể kết thúc trò chơi!");

    await ctx.db.patch(args.roomId, {
      status: "finished",
      phase: "results",
    });
  },
});