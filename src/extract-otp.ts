import { Context } from "hono";
import aiSelector from "./core";

const extractOTP = async (c: Context) => {
  try {
    const message = c.get("message");
    const aiName = c.get("aiName");

    const aiFn = aiSelector(aiName);

    const prompt = {
      system: "You are a helpful assistant",
      history: [
        {
          role: "user",
          content: `Please extract the OTP from the following message:\n ${message}`,
        },
        {
          role: "user",
          content: "Your OTP is ",
        },
      ],
    };

    const response = await aiFn(prompt, c.env);

    const regex = /[0-9]{4,8}/g;
    const numbers = response.match(regex);
    const extractedOTP = numbers ? numbers.join("") : "";

    return c.text(extractedOTP);
  } catch (err: any) {
    return c.text(err.message, err.status ?? 400);
  }
};

export default extractOTP;
