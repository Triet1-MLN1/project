import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyBVW7-vVotuW_3Vrm9I-UH8XgcYcrevo4y-1Og"; // Using the API key that was set in Convex
const genAI = new GoogleGenerativeAI(apiKey);

async function check() {
  console.log("Listing models...");
  try {
    const list = await genAI.getGenerativeModel({ model: "something" }) // SDK 0.24 might just be a model instance. Let me just use the actual fetch API to avoid version mismatch.
  } catch (e) { }
}
check();
