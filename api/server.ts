import { serve } from "@hono/node-server";
import { app } from "./generate-cover-letter.ts";

const port = process.env.PORT ? Number(process.env.PORT) : 3001;

serve({
  fetch: app.fetch,
  port,
});

console.log(`🚀 Hono server running on port ${port}`);
