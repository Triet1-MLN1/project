import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rooms: defineTable({
    code: v.string(),
    status: v.union(
      v.literal("lobby"),
      v.literal("playing"),
      v.literal("finished")
    ),
    currentRound: v.number(), // Sẽ chạy từ 1 đến 5
    phase: v.union(v.literal("choosing"), v.literal("results")),
    randomEvent: v.union(v.string(), v.null()),
  }).index("by_code", ["code"]),

  players: defineTable({
    name: v.string(),
    roomId: v.id("rooms"),
    isHost: v.boolean(),
    // --- PHẦN QUAN TRỌNG CHO GAME MỚI ---
    score: v.optional(v.number()), // Tổng điểm tích lũy
    lastScoreIncrement: v.optional(v.number()), // Điểm vừa đạt được ở vòng hiện tại
    currentChoice: v.union(v.string(), v.null()), // Đáp án chữ người chơi gõ
    // ------------------------------------
    isAlive: v.boolean(),
    hasSubmitted: v.boolean(),
    // Các chỉ số cũ có thể giữ lại làm optional nếu muốn dùng logic cũ
    money: v.optional(v.number()),
    alienation: v.optional(v.number()),
    freedom: v.optional(v.number()),
    inSurvivalCrisis: v.optional(v.boolean()),
  }).index("by_roomId", ["roomId"]),

  // Giữ lại để phục vụ AI hoặc tài liệu thuyết trình nếu cần
  documents: defineTable({
    text: v.string(),
    embedding: v.array(v.float64()),
  }).vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 768,
  }),

  quizQuestions: defineTable({
    questionId: v.number(),
    question: v.string(),
    options: v.array(v.string()),
    answer: v.string(),
  }).index("by_questionId", ["questionId"]),

  catchphraseQuestions: defineTable({
    image: v.string(), // Link ảnh câu đố
    answer: v.string(), // Đáp án đúng
    suggestion: v.string(), // Gợi ý
  }),
});