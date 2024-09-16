import gemini from "./gemini";
import openAI from "./openai";
import cloudflareAI from "./cloudflare-ai";

const aiSelector = (aiName: string) => {
  if (aiName === "OPENAI") return openAI;
  if (aiName === "GEMINI") return gemini;
  if (aiName === "CLOUDFLAREAI") return cloudflareAI;
  return cloudflareAI;
};

export default aiSelector;
