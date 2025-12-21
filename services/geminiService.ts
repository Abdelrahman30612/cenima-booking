
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getGeminiRecommendation = async (mood: string, movies: any[]) => {
  if (!API_KEY) return "Please set the API key first.";
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const movieTitles = movies.map(m => m.title).join(", ");
  
  const prompt = `Based on the user's mood: "${mood}", which of these movies do you recommend: ${movieTitles}? 
  Please provide a short, engaging response in English explaining why.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I encountered an issue connecting to the AI assistant.";
  }
};

export const getMovieAnalysis = async (movieTitle: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Tell me why I should watch the movie "${movieTitle}"? Focus on artistic value and thrill. Respond in English.`,
  });
  return response.text;
};
