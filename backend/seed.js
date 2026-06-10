// backend/seed.js
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { PortfolioChunk } from '../backend/model/portfolioChunk.js'; // Adjust path if needed

// Load environment variables
dotenv.config();

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 1. Your raw knowledge base. 
const resumeData = [
  {
    category: "bio",
    text: "My name is Daniel. I am a full-stack software engineer specializing in the MERN stack (MongoDB, Express, React, Node.js) and Next.js. I focus on building persistent state architectures and clean, professional UIs."
  },
  {
    category: "education",
    text: "I am associated with Adama Science and Technology University (ASTU) and am part of the graduating class of 2026."
  },
  {
    category: "projects",
    text: "I developed the 'ConWise' Premium Admin dashboard. It features deep implementation of user, project, and issue management modules, utilizing Tailwind CSS and Lucide icons for a professional interface."
  },
  {
    category: "projects",
    text: "I collaborate on a development team project named 'ConWise', managing collaborative version control using Git and GitHub organizations."
  },
  {
    category: "skills",
    text: "I have experience with Next js, Express js, Node js, Mongoo Database, state management using Zustand and TanStack Query, and international freelance billing via platforms like Upwork."
  },
  {
    category: "languages",
    text: "I am fluent in Afaan Oromoo (Oromic) and can provide technical translations and explanations of complex engineering and economic concepts."
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("Connected to MongoDB. Starting Gemini ingestion...");

    // Clear the existing knowledge base to prevent dimension conflicts
    await PortfolioChunk.deleteMany({});
    console.log("Cleared old portfolio chunks.");

    // 2. Loop through your resume data, generate Gemini embeddings, and save
    for (const item of resumeData) {
      console.log(`Generating 768-dimension vector for: ${item.category}...`);
      
      // Call Gemini's embedding model
      const embeddingResponse = await ai.models.embedContent({
        model: 'gemini-embedding-001', 
        contents: item.text,
        config: {
          outputDimensionality: 768 
        }
      });

      // Extract the 768-length math array
      const vector = embeddingResponse.embeddings[0].values;

      // Save to MongoDB
      await PortfolioChunk.create({
        content: item.text,
        category: item.category,
        embedding: vector
      });
    }

    console.log("✅ Knowledge base successfully populated with Gemini embeddings!");
    process.exit(0);

  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

// Execute the function
seedDatabase();