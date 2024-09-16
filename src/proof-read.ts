import { Context } from "hono";
import aiSelector from "./core";

const proofRead = async (c: Context) => {
  try {
    const message = c.get("message");
    const aiName = c.get("aiName");

    const aiFn = aiSelector(aiName);

    const prompt = {
      system:
        "You are a helpful assistant, who proofreads my messages and responds with a fixed version without making any major changes in tone, style, or structure.",
      history: [
        {
          role: "user",
          content: `Proofread the following and only reply back with the corrected version without any other text:\n ${message}`,
        },
        {
          role: "user",
          content: "Here is the revised version: \n",
        },
      ],
    };

    const response = await aiFn(prompt, c.env);

    return c.text(response.trim());
  } catch (err: any) {
    return c.text(err.message, err.status ?? 400);
  }
};

export default proofRead;
