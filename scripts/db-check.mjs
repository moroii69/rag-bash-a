// neon DB connectivity check
import { neon } from "@neondatabase/serverless";

const url = process.env.NEON_DATABASE_URL;

if (!url) {
  console.error("NEON_DATABASE_URL is not set.");
  process.exit(2);
}

async function main() {
  try {
    const sql = neon(url);
    const result = await sql`select 1 as ok`;
    const ok = Array.isArray(result) && result[0]?.ok === 1;
    if (!ok) {
      console.error("Unexpected DB response:", result);
      process.exit(3);
    }
    console.log("Database connection OK");
  } catch (err) {
    console.error("Database connection failed:", err?.message || err);
    process.exit(1);
  }
}

await main();
