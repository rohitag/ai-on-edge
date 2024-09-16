//"@hf/mistral/mistral-7b-instruct-v0.2";
//"@cf/deepseek-ai/deepseek-math-7b-instruct";
//"@cf/meta/llama-3-8b-chat-int8";
//"@cf/mistral/mistral-7b-instruct-v0.1";
//"@cf/meta/llama-2-7b-chat-int8";
//"@cf/openchat/openchat-3.5-0106";
//"@cf/meta/llama-2-7b-chat-fp16";
const MODEL_NAME = "@cf/openchat/openchat-3.5-0106";

async function cloudflareAI(
  prompt: {
    system: string;
    history: { role: string; content: string }[];
  },
  env: any
) {
  const cloudflareAI = env.CLOUDFLAREAI;

  let response;
  try {
    const result = await cloudflareAI.run(MODEL_NAME, {
      messages: [{ role: "system", content: prompt.system }, ...prompt.history],
      stream: false,
    });

    response = result.response.trim();
  } catch (err: any) {
    throw { message: err, status: err.status };
  }
  return response;
}

export default cloudflareAI;
