import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const MODEL_NAME = "gpt-3.5-turbo";

async function openAI(
  prompt: {
    system: string;
    history: { role: string; content: string }[];
  },
  env: any
) {
  const openai = new OpenAI({
    apiKey: env.OPENAI_KEY,
  });

  const generationConfig = {
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  let response;
  try {
    const result = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: "system", content: prompt.system },
        ...(prompt.history as ChatCompletionMessageParam[]),
      ],
      ...generationConfig,
    });

    response = result.choices[0].message.content ?? "";
  } catch (err: any) {
    throw { message: err, status: err.status };
  }
  return response;
}
export default openAI;
