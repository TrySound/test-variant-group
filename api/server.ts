import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { generateCoverLetter } from "./generate-cover-letter.ts";

export const app = new Hono();

// CORS
app.use("/*", cors());

// Health check
app.get("/api/health", (c) => c.json({ status: "ok" }));

app.mount("/api/generate-cover-letter", generateCoverLetter);

const port = process.env.PORT ? Number(process.env.PORT) : 3001;

serve({
  fetch: app.fetch,
  port,
});

console.log(`🚀 Hono server running on port ${port}`);
