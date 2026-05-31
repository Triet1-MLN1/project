import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { rawQuestions } from "./questionsData";
import { catchphraseData } from "./catchphraseData";
import { GoogleGenerativeAI } from "@google/generative-ai";

/* ─── Seed ─────────────────────────────────────────────────────── */
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already exists
    const existing = await ctx.db.query("quizQuestions").take(1);
    if (existing.length > 0) return { seeded: false, message: "Data already exists" };

    for (const q of rawQuestions) {
      await ctx.db.insert("quizQuestions", {
        questionId: q.id,
        question: q.question,
        options: q.options,
        answer: q.answer,
      });
    }
    return { seeded: true, count: rawQuestions.length };
  },
});

export const forceSeed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("quizQuestions").collect();
    for (const doc of existing) {
      await ctx.db.delete(doc._id);
    }

    for (const q of rawQuestions) {
      await ctx.db.insert("quizQuestions", {
        questionId: q.id,
        question: q.question,
        options: q.options,
        answer: q.answer,
      });
    }
    return { seeded: true, count: rawQuestions.length };
  },
});

export const seedCatchphrases = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("catchphraseQuestions").take(1);
    if (existing.length > 0) return { seeded: false, message: "Data already exists" };

    for (const q of catchphraseData) {
      await ctx.db.insert("catchphraseQuestions", {
        image: q.image,
        answer: q.answer,
        suggestion: q.suggestion,
      });
    }
    return { seeded: true, count: catchphraseData.length };
  },
});

/* ─── List ──────────────────────────────────────────────────────── */
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("quizQuestions").take(131);
  },
});

/* ─── Explain ───────────────────────────────────────────────────── */
export const explain = action({
  args: {
    question: v.string(),
    options: v.array(v.string()),
    correctAnswer: v.string(),
    selectedAnswer: v.string(),
  },
  handler: async (_ctx, args) => {
    if (!process.env.GEMINI_API_KEY) {
      return "⚠️ Chưa cấu hình GEMINI_API_KEY. Hãy đặt biến môi trường trong Convex Dashboard.";
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const optionsText = args.options.join("\n");
    const isCorrect = args.selectedAnswer === args.correctAnswer;

    const prompt = `Bạn là trợ lý AI về Triết học Mác-Lênin (đặc biệt: Tồn tại xã hội và Ý thức xã hội). Hãy giải thích ngắn gọn (3-5 câu) câu hỏi trắc nghiệm sau:

CÂU HỎI:
${args.question}

CÁC ĐÁP ÁN:
${optionsText}

ĐÁP ÁN ĐÚNG: ${args.correctAnswer}
${!isCorrect ? `ĐÁP ÁN ĐÃ CHỌN: ${args.selectedAnswer} (SAI)` : `ĐÁP ÁN ĐÃ CHỌN: ${args.selectedAnswer} (ĐÚNG)`}

Yêu cầu:
1. Giải thích tại sao đáp án ${args.correctAnswer} là đúng (dựa trên kiến thức Triết học Mác-Lênin)
${!isCorrect ? `2. Giải thích tại sao đáp án ${args.selectedAnswer} là sai` : ""}
3. Ngắn gọn, dễ hiểu, dùng tiếng Việt
4. Có thể dùng markdown để format`;

    try {
      const response = await model.generateContent(prompt);
      const text = response.response.text().trim();
      return text || "Không tạo được giải thích. Vui lòng thử lại.";
    } catch (err) {
      console.error("questions.explain failed:", err);
      const anyErr = err as any;
      if (anyErr?.status === 429 || anyErr?.error?.status === "RESOURCE_EXHAUSTED") {
        return "⚠️ Đã đạt giới hạn quota Gemini API. Vui lòng thử lại sau.";
      }
      return "❌ Lỗi kết nối AI. Vui lòng thử lại sau.";
    }
  },
});
