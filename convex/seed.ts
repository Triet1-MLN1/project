import { action, mutation } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";
import { GoogleGenAI } from "@google/genai";
import { knowledgeChunks } from "./knowledgeBase";



function normalizeEmbedding(values: number[]): number[] {
    let sumSq = 0;
    for (const x of values) sumSq += x * x;
    const norm = Math.sqrt(sumSq);
    if (!Number.isFinite(norm) || norm === 0) return values;
    return values.map((x) => x / norm);
}

// Mutation hỗ trợ: lưu một document vào database
export const insertDoc = mutation({
    args: { text: v.string(), embedding: v.array(v.float64()) },
    handler: async (ctx, args) => {
        return await ctx.db.insert("documents", {
            text: args.text,
            embedding: args.embedding,
        });
    },
});

// Action chính: đọc từng chunk, tạo embedding, lưu vào DB
export const populateData = action({
    args: {},
    handler: async (ctx) => {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
        for (const text of knowledgeChunks) {
            const embeddingResult = await ai.models.embedContent({
                model: "gemini-embedding-001",
                contents: text,
                config: {
                    // Must match convex/schema.ts vector index dimensions.
                    outputDimensionality: 768,
                    taskType: "RETRIEVAL_DOCUMENT",
                },
            });

            const values = embeddingResult.embeddings?.[0]?.values;
            if (!values) {
                throw new Error("Embedding API did not return embedding values");
            }
            if (values.length !== 768) {
                throw new Error(
                    `Expected embedding length 768, got ${values.length}. Update schema vector dimensions or outputDimensionality to match.`
                );
            }

            const embedding = normalizeEmbedding(values);
            await ctx.runMutation(api.seed.insertDoc, { text, embedding });
        }

        return `Đã nạp thành công ${knowledgeChunks.length} chunks dữ liệu!`;
    },
});
