import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins"
import { dbCLient } from "../db/db-client"; 
import { schema } from "../db/schema";
import { Env } from "../types/types";
 
export const auth =(env:Env)=> betterAuth({
    trustedOrigins:["http://localhost:5173", "http://localhost:3000","https://dev.dashboard-fe-aa2.pages.dev","https://dashboard-fe-aa2.pages.dev"],
    advanced: {
     
        //TODO: disables after setting up domains
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true
          }
      },
      
    emailAndPassword: {  
        enabled: true
    },
    database: drizzleAdapter(dbCLient(env.DB_URL), {
        provider: "pg", // or "mysql", "sqlite"
        schema
    }),
    plugins: [
        admin() 
    ]
});


