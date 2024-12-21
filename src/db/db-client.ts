
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".dev.vars" }); // or .env.local

const sql = neon("postgresql://neondb_owner:HVeO1nUqpJ9K@ep-white-forest-a2x5b7yh.eu-central-1.aws.neon.tech/neondb?sslmode=require");
export const db = drizzle({ client: sql });
