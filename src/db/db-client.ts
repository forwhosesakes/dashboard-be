
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import type { Logger as drizzleLogger } from 'drizzle-orm/logger';
import { logger } from "../lib/loggers";
import { schema } from "./schema";
import { defineConfig } from "drizzle-kit";

config({ path: ".dev.vars" }); 



export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: './schema.ts'
})

class DBLogger implements drizzleLogger {
    logQuery(query: string, params: unknown[]): void {
      logger.debug({ query, params });
    }
  }



export const dbCLient = (dbUrl:string)=>{

const sql = neon(dbUrl);
return drizzle({ client: sql ,logger: new DBLogger(),schema})

}


