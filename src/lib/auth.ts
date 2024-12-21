import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins"
import { db } from "../db/db-client"; 
import { schema } from "../db/schema";
 
export const auth = betterAuth({
    trustedOrigins:["http://localhost:5173", "http://localhost:3000","dev.dashboard-fe-aa2.pages.dev","dashboard-fe-aa2.pages.dev"],
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
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema
    }),
    plugins: [
        admin() 
    ]
});


