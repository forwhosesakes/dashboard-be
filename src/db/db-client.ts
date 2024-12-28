
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import type { Logger as drizzleLogger } from 'drizzle-orm/logger';
import { logger } from "../lib/loggers";

config({ path: ".dev.vars" }); // or .env.local

class DBLogger implements drizzleLogger {
    logQuery(query: string, params: unknown[]): void {
      logger.debug({ query, params });
    }
  }

const sql = neon("postgresql://neondb_owner:HVeO1nUqpJ9K@ep-white-forest-a2x5b7yh.eu-central-1.aws.neon.tech/neondb?sslmode=require");
export const db = drizzle({ client: sql ,logger: new DBLogger()});


const DB_ERRORS = {
    DUPLICATE_KEY: 'ER_DUP_ENTRY',
  };
  
  export interface DatabaseError {
    type: string;
    message: string;
    stack?: string;
    code: string;
    errno: number;
    sql: string;
    sqlState: string;
    sqlMessage: string;
  }

  