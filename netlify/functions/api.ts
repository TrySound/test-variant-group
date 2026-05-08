import { handle } from "hono/netlify";
import { app } from "../../api/generate-cover-letter";

export default handle(app);
