import { GoogleGenAI } from '@google/genai';
import { PortfolioChunk } from '../model/portfolioChunk.js';

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const handlePortfolioChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // 1. Generate an embedding using the updated Gemini embedding model
    const embeddingResponse = await ai.models.embedContent({
      model: 'gemini-embedding-001', // Updated to match seed.js
      contents: message,
      config: {
        outputDimensionality: 768 // Forces the 768-dimension limit for MongoDB
      }
    });
    const queryVector = embeddingResponse.embeddings[0].values;

    // 2. Query MongoDB (Ensure your Atlas index is set to 768 dimensions!)
    const retrievedChunks = await PortfolioChunk.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embedding",
          queryVector: queryVector,
          numCandidates: 100,
          limit: 3
        }
      },
      {
        $project: {
          _id: 0,
          content: 1
        }
      }
    ]);

    const contextText = retrievedChunks.map(chunk => chunk.content).join("\n\n");

    // 3. Construct prompt and send to Gemini 1.5 Flash
    const chatResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: `You are an AI conversational proxy representing a developer. Answer questions confidently, accurately, and concisely using ONLY this verified portfolio background context:\n\n${contextText}`
      }
    });

    // 4. Send response back to the portfolio frontend
    return res.status(200).json({ reply: chatResponse.text });

  } catch (error) {
    console.error("Gemini RAG Pipeline Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};