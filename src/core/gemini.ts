import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";
async function gemini(
  prompt: {
    system: string;
    history: { role: string; content: string }[];
  },
  env: any
) {
  const genAI = new GoogleGenerativeAI(env.GEMINI_KEY);
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: prompt?.system ?? "",
  });

  const generationConfig = {
    temperature: 1,
    topK: 64,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  // const parts = [{ text: `input: ${prompt}` }, { text: "output: " }];
  let response;
  try {
    const result = await model.generateContent({
      contents: [
        ...prompt.history.map(({ role, content }) => ({
          role,
          parts: [{ text: content }],
        })),
      ],
      generationConfig,
      safetySettings,
    });

    response = result.response.text();
  } catch (err: any) {
    throw { message: err, status: err.status };
  }
  return response;
}

export default gemini;
