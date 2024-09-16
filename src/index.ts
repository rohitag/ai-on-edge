import { Hono } from "hono";
import requestValidator from "./middlewares/request-validator";
import extractOTP from "./extract-otp";
import proofRead from "./proof-read";

type Variables = {
  message: string;
  aiName: string;
};

const app = new Hono<{ Variables: Variables }>();

app.use(requestValidator);

app.get("/", (c) => {
  return c.text(c.req.raw.cf?.colo as string, 200);
});

app.post("/extract-otp", extractOTP);
app.post("/proof-read", proofRead);

export default app;
