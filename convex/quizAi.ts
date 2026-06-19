"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-flash-latest"
];

async function generateWithFallback(
  fn: (modelName: string) => Promise<any[]>
): Promise<any[]> {
  let lastError: any = null;
  for (const modelName of MODELS) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`Đang thử gọi model AI: ${modelName} (Lần thử ${attempt})`);
        const res = await fn(modelName);
        console.log(`Gọi thành công model: ${modelName} ở lần thử ${attempt}`);
        return res;
      } catch (err: any) {
        console.warn(`Model ${modelName} (Lần thử ${attempt}) thất bại:`, err.message || err);
        lastError = err;
        if (attempt < 2) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
  }
  throw new Error(
    `Tất cả các model AI đều thất bại sau nhiều lần thử. Lỗi chi tiết: ${lastError?.message || lastError}`
  );
}

async function generateBatch(
  genAI: GoogleGenerativeAI,
  modelName: string,
  textContent: string,
  batchNum: number
): Promise<any[]> {
  const model = genAI.getGenerativeModel({ model: modelName });
  
  const halfLength = Math.floor(textContent.length / 2);
  const textSegment = batchNum === 1
    ? textContent.substring(0, halfLength + 2000)
    : textContent.substring(Math.max(0, halfLength - 2000));

  const prompt = `Bạn là một giáo sư Triết học xuất sắc. Hãy đọc kỹ tài liệu văn bản dưới đây và tạo ra đúng 25 câu hỏi trắc nghiệm khách quan để kiểm tra kiến thức của sinh viên.

YÊU CẦU ĐỀ THI:
- Đảm bảo câu hỏi có tính học thuật cao, chính xác và bao quát đều các nội dung quan trọng trong tài liệu.
- Mỗi câu hỏi PHẢI có đúng 4 phương án lựa chọn.
- Các phương án phải bắt đầu bằng chữ cái và dấu chấm (ví dụ: "A. Quan hệ sản xuất", "B. Lực lượng sản xuất", ...).
- Câu hỏi và phương án phải ngắn gọn, súc tích.

YÊU CẦU ĐỊNH DẠNG JSON (QUAN TRỌNG):
- Trường "answer" PHẢI là đúng 1 chữ cái in hoa đại diện cho phương án đúng: "A", "B", "C", hoặc "D" (TUYỆT ĐỐI KHÔNG được ghi nội dung câu trả lời hoặc chữ thường vào trường này).
- TUYỆT ĐỐI KHÔNG được sử dụng dấu ngoặc kép kép (") ở bên trong nội dung của câu hỏi hoặc nội dung các phương án. Nếu cần trích dẫn cụm từ hoặc câu nói, hãy dùng dấu ngoặc đơn (') thay thế để không làm hỏng cấu trúc JSON.

TÀI LIỆU VĂN BẢN:
${textSegment.substring(0, 30000)}
`;

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            question: { type: SchemaType.STRING },
            options: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING }
            },
            answer: { type: SchemaType.STRING }
          },
          required: ["question", "options", "answer"]
        }
      },
      maxOutputTokens: 8192
    }
  });

  const responseText = result.response.text().trim();
  
  let jsonStr = responseText;
  if (jsonStr.startsWith("```json")) {
    jsonStr = jsonStr.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  const parsed = JSON.parse(jsonStr);
  if (!Array.isArray(parsed)) {
    throw new Error(`AI batch ${batchNum} did không trả về một array hợp lệ.`);
  }
  return parsed;
}

async function generateBatchFromStorage(
  genAI: GoogleGenerativeAI,
  modelName: string,
  base64Data: string,
  contentType: string,
  batchNum: number
): Promise<any[]> {
  const model = genAI.getGenerativeModel({ model: modelName });
  
  const prompt = `Bạn là một giáo sư Triết học xuất sắc. Hãy đọc kỹ tài liệu đính kèm và tạo ra đúng 25 câu hỏi trắc nghiệm khách quan để kiểm tra kiến thức của sinh viên dựa trên tài liệu đó.
Đảm bảo câu hỏi có tính học thuật cao, chính xác và bao quát nội dung phần ${batchNum === 1 ? "đầu" : "sau"} của tài liệu.

YÊU CẦU ĐỀ THI:
- Mỗi câu hỏi PHẢI có đúng 4 phương án lựa chọn.
- Các phương án phải bắt đầu bằng chữ cái và dấu chấm (ví dụ: "A. Quan hệ sản xuất", "B. Lực lượng sản xuất", ...).
- Câu hỏi và phương án phải ngắn gọn, súc tích.

YÊU CẦU ĐỊNH DẠNG JSON (QUAN TRỌNG):
- Trường "answer" PHẢI là đúng 1 chữ cái in hoa đại diện cho phương án đúng: "A", "B", "C", hoặc "D" (TUYỆT ĐỐI KHÔNG được ghi nội dung câu trả lời hoặc chữ thường vào trường này).
- TUYỆT ĐỐI KHÔNG được sử dụng dấu ngoặc kép kép (") ở bên trong nội dung của câu hỏi hoặc nội dung các phương án. Nếu cần trích dẫn cụm từ hoặc câu nói, hãy dùng dấu ngoặc đơn (') thay thế để không làm hỏng cấu trúc JSON.
`;

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: contentType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            question: { type: SchemaType.STRING },
            options: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING }
            },
            answer: { type: SchemaType.STRING }
          },
          required: ["question", "options", "answer"]
        }
      },
      maxOutputTokens: 8192
    }
  });

  const responseText = result.response.text().trim();
  
  let jsonStr = responseText;
  if (jsonStr.startsWith("```json")) {
    jsonStr = jsonStr.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  const parsed = JSON.parse(jsonStr);
  if (!Array.isArray(parsed)) {
    throw new Error(`AI batch ${batchNum} did không trả về một array hợp lệ.`);
  }
  return parsed;
}

export const generateQuestions = action({
  args: {
    textContent: v.optional(v.string()),
    storageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in backend environment variables.");
    }

    if (!args.textContent && !args.storageId) {
      throw new Error("Cần cung cấp textContent hoặc storageId để sinh câu hỏi.");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    if (args.textContent) {
      if (args.textContent.trim().length < 50) {
        throw new Error("Tài liệu trống hoặc không đủ nội dung để sinh câu hỏi.");
      }

      // Call two batches independently with fallback to get 25 + 25 = 50 questions
      const [batch1, batch2] = await Promise.all([
        generateWithFallback((modelName) => generateBatch(genAI, modelName, args.textContent!, 1)),
        generateWithFallback((modelName) => generateBatch(genAI, modelName, args.textContent!, 2))
      ]);
      return [...batch1, ...batch2];
    } else {
      // Handle legacy client by downloading storageId
      const fileUrl = await ctx.storage.getUrl(args.storageId!);
      if (!fileUrl) {
        throw new Error("Không tìm thấy file trong storage.");
      }

      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`Tải file thất bại: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const base64Data = Buffer.from(arrayBuffer).toString("base64");
      const contentType = response.headers.get("content-type") || "application/pdf";

      const [batch1, batch2] = await Promise.all([
        generateWithFallback((modelName) => generateBatchFromStorage(genAI, modelName, base64Data, contentType, 1)),
        generateWithFallback((modelName) => generateBatchFromStorage(genAI, modelName, base64Data, contentType, 2))
      ]);
      return [...batch1, ...batch2];
    }
  },
});
