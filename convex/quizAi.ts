"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateQuestions = action({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in backend environment variables.");
    }

    const fileUrl = await ctx.storage.getUrl(args.storageId);
    if (!fileUrl) {
      throw new Error("File not found in storage.");
    }

    // Fetch the file content
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");
    
    // Determine MIME type
    const contentType = response.headers.get("content-type") || "application/pdf";

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Bạn là một giáo sư Triết học xuất sắc. Hãy đọc kỹ tài liệu đính kèm và tạo ra đúng 50 câu hỏi trắc nghiệm khách quan để kiểm tra kiến thức của sinh viên dựa trên tài liệu đó. Đảm bảo các câu hỏi phủ đều các nội dung quan trọng.
Mỗi câu hỏi phải có:
- "question": nội dung câu hỏi
- "options": mảng gồm 4 đáp án (A, B, C, D)
- "answer": đáp án đúng (vd: "A", "B", "C", "D")
- "explanation": giải thích ngắn gọn tại sao đáp án đó đúng

YÊU CẦU BẮT BUỘC: Hãy trả về DUY NHẤT một mảng JSON hợp lệ chứa đúng 50 object câu hỏi, không bao gồm bất kỳ text nào khác (không có markdown code blocks, không có lời dặn dò, CHỈ CÓ mảng JSON).
Ví dụ định dạng:
[
  {
    "question": "Câu hỏi 1?",
    "options": ["A. Đáp án 1", "B. Đáp án 2", "C. Đáp án 3", "D. Đáp án 4"],
    "answer": "A",
    "explanation": "Giải thích 1"
  }
]
`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Data,
          mimeType: contentType,
        },
      },
      prompt,
    ]);

    const responseText = result.response.text().trim();
    
    // Clean up potential markdown blocks if AI ignored instructions
    let jsonStr = responseText;
    if (jsonStr.startsWith("```json")) {
      jsonStr = jsonStr.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    try {
      const questions = JSON.parse(jsonStr);
      if (!Array.isArray(questions)) {
        throw new Error("AI returned JSON but it is not an array.");
      }
      return questions;
    } catch (err) {
      console.error("Failed to parse JSON from AI:", jsonStr);
      throw new Error("AI did not return a valid JSON format. Please try again.");
    }
  },
});
