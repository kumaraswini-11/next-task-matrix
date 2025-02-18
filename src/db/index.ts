import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { config } from "dotenv";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);
// @typescript-eslint/no-explicit-any
const db = drizzle(sql as any, {
  casing: "snake_case",
  // logger: true
});

export { db };
