import { v } from "convex/values";
import { action, query } from "./_generated/server";
import { api } from "./_generated/api";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Id } from "./_generated/dataModel";

function normalizeEmbedding(values: number[]): number[] {
  let sumSq = 0;
  for (const x of values) sumSq += x * x;
  const norm = Math.sqrt(sumSq);
  if (!Number.isFinite(norm) || norm === 0) return values;
  return values.map((x) => x / norm);
}

// Query hỗ trợ: lấy document theo ID sau bước vector search
export const getDoc = query({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const answer = action({
  args: { message: v.string() },
  handler: async (ctx, args) => {
    if (!process.env.GEMINI_API_KEY) {
      return "⚠️ Chưa cấu hình GEMINI_API_KEY cho backend Convex. Hãy đặt biến môi trường GEMINI_API_KEY trong Convex Dashboard (hoặc dùng `npx convex env set GEMINI_API_KEY ...`) rồi thử lại.";
    }

    // Khởi tạo SDK ổn định
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    try {
      // 1) Tạo embedding cho câu hỏi với model ổn định nhất
      const embedModel = genAI.getGenerativeModel({ model: "embedding-001" });
      const embeddingResult = await embedModel.embedContent(args.message);

      const values = embeddingResult.embedding?.values;
      if (!values) {
        throw new Error("Embedding API did not return embedding values");
      }
      const queryEmbedding = normalizeEmbedding(values);

      // 2) Tìm kiếm nội dung liên quan trong Database Convex
      const results = await ctx.vectorSearch("documents", "by_embedding", {
        vector: queryEmbedding,
        limit: 3,
      });

      // 3) Rút trích text từ kết quả
      const contextDocs = await Promise.all(
        results.map(async (r) => {
          const doc = await ctx.runQuery(api.chat.getDoc, { id: r._id as Id<"documents"> });
          return doc?.text || "";
        }),
      );
      const contextText = contextDocs.filter(Boolean).join("\n\n");

      // 4) Prompt có ngữ cảnh RAG
      const prompt = `Đồng chí là Lenin 2.0, một chuyên gia lý luận sắc sảo về "Kinh tế chính trị học Mác–Lênin". Nhiệm vụ của đồng chí là hỗ trợ giải đáp và cung cấp tư liệu cho bài thuyết trình về chủ đề: "Công nghiệp hóa, hiện đại hóa và hội nhập kinh tế quốc tế của Việt Nam".

      PHẠM VI KIẾN THỨC:
      - Trọng tâm: Công nghiệp hóa (CNH), Hiện đại hóa (HĐH), Cách mạng công nghiệp (đặc biệt là 4.0), và Hội nhập kinh tế quốc tế.
      - Kiến thức nền: Các quy luật kinh tế, hàng hóa, giá trị thặng dư, và các vấn đề kinh tế chính trị Việt Nam thời kỳ quá độ.

QUY TẮC TRẢ LỜI:

1. Nếu câu hỏi liên quan đến CHỦ ĐỀ THUYẾT TRÌNH (CNH, HĐH, Hội nhập):
         - BẮT BUỘC ưu tiên sử dụng NGỮ CẢNH (CONTEXT) được cung cấp từ tài liệu của đồng chí.
         - Nếu CONTEXT không đủ → Được phép sử dụng kiến thức chuẩn từ giáo trình Kinh tế chính trị Mác–Lênin để bổ sung.
         - Câu trả lời phải mang tính thời đại, gắn liền với thực tiễn Việt Nam.
2. Nếu câu hỏi thuộc các chương khác của Kinh tế chính trị:
         - Trả lời chính xác theo quan điểm Mác–Lênin.
         - Không cần phụ thuộc quá nhiều vào CONTEXT nếu đó là kiến thức cơ bản.
3. Nếu câu hỏi KHÔNG thuộc Kinh tế chính trị:
         - Từ từ chối khéo léo: "Rất tiếc đồng chí, vấn đề này nằm ngoài phạm vi nghiên cứu kinh tế chính trị của chúng ta. Hãy tập trung vào lý luận phát triển kinh tế nhé!"
CÁCH NHẬN DIỆN CHỦ ĐỀ TRỌNG TÂM:
Tìm các từ khóa: CNH, HĐH, 4.0, hội nhập, WTO, FTA, EVFTA, lực lượng sản xuất, kinh tế tri thức, ngoại thương, kinh tế đối ngoại.

PHONG CÁCH VÀ ĐỊNH DẠNG (FORMAT):
      - Luôn bắt đầu bằng một **TIÊU ĐỀ CHÍNH** in đậm, viết hoa.
      - Sử dụng các tiêu đề phụ (##) để phân tách các luận điểm (Khái niệm, Tính tất yếu, Nội dung, Tác động).
      - Sử dụng Bullet points rõ ràng. Tuyệt đối không viết các đoạn văn dài gây mỏi mắt.
      - Giữa các ý lớn phải có 1 dòng trống để thuận tiện cho việc copy vào Slide thuyết trình.
      - **YÊU CẦU ĐẶC BIỆT**: Phải có phần "VÍ DỤ THỰC TIỄN TẠI VIỆT NAM" cho mỗi mục để bài thuyết trình sinh động hơn.
      - Kết thúc bằng một dòng tóm tắt giá trị cốt lõi.

NGỮ CẢNH TỪ TÀI LIỆU:
${contextText || "(Chưa có ngữ cảnh phù hợp được tìm thấy)"}

CÂU HỎI CỦA NGƯỜI DÙNG:
${args.message}

TRẢ LỜI:`;

      // 5) Gọi Gemini để tạo câu trả lời
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const response = await model.generateContent(prompt);
      const text = response.response.text().trim();

      if (!text) {
        return "Rất tiếc đồng chí, hiện tôi chưa tạo được câu trả lời phù hợp. Đồng chí thử hỏi lại ngắn gọn hơn nhé.";
      }
      return text;
    } catch (err) {
      console.error("chat.answer failed", err);

      const anyErr = err as any;
      const status: number | undefined =
        typeof anyErr?.status === "number" ? anyErr.status :
          typeof anyErr?.error?.code === "number" ? anyErr.error.code :
            undefined;

      // Quota / rate limit
      if (status === 429 || anyErr?.error?.status === "RESOURCE_EXHAUSTED") {
        return (
          "⚠️ Đồng chí đang bị giới hạn quota (Google Gemini API). " +
          "Hãy kiểm tra mục Quotas/Rate limit trong Google AI Studio, hoặc đổi API key rồi thử lại."
        );
      }

      // Model not available
      if (status === 404 || anyErr?.error?.status === "NOT_FOUND") {
        return (
          "⚠️ Model Gemini đang cấu hình (gemini-2.5-flash/embedding-001) không khả dụng với API key này. " +
          "Đồng chí hãy kiểm tra xem tài khoản đã bật quyền truy cập model trong AI Studio chưa."
        );
      }

      return "❌ Rất tiếc đồng chí, hiện tôi gặp lỗi khi kết nối tới dịch vụ AI. Đồng chí thử lại sau ít phút.";
    }
  },
});
