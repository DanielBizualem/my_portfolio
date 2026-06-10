import mongoose from 'mongoose';

const PortfolioChunkSchema = new mongoose.Schema({
  content: { type: String, required: true },       // The raw text (e.g., job role details)
  category: { type: String, required: true },      // e.g., 'experience', 'projects', 'skills'
  embedding: { type: [Number], required: true },   // Array of floats (1536 dimensions for OpenAI)
  createdAt: { type: Date, default: Date.now }
});

// Avoid re-compiling the model if it already exists in serverless environments
export const PortfolioChunk = mongoose.models.PortfolioChunk || mongoose.model('PortfolioChunk', PortfolioChunkSchema);