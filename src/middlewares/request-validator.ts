import { createMiddleware } from "hono/factory";

const requestValidator = createMiddleware(async (c, next) => {
  try {
    const body = await c.req.json();
    if (!body.message) {
      return c.text("Please provide a message", 400);
    }
    const aiName = body.ai?.toUpperCase() ?? "CLOUDFLAREAI";
    c.set("aiName", aiName);
    c.set("message", body.message);

    await next();
  } catch (err: any) {
    return c.text(err.message, err.status ?? 400);
  }
});

export default requestValidator;
