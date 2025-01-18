import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, emailOTP } from "better-auth/plugins"
import { dbCLient } from "../db/db-client"; 
import { schema } from "../db/schema";
import { Env } from "../types/types";
import { sendEmail } from "./send-email";
 
export const auth =(env:Env)=> betterAuth({
    trustedOrigins:["http://localhost:5173", "http://localhost:3000","https://dev.dashboard-fe-aa2.pages.dev","https://dashboard-fe-aa2.pages.dev","https://chokichoki.org", "https://dev.chokichoki.org"],
    // advanced: {
     
    //     //TODO: disables after setting up domains
    //     defaultCookieAttributes: {
    //         sameSite: "none",
    //         secure: true
    //       }
    //   },
    advanced: {
      crossSubDomainCookies: {
        enabled: true
      }
    },
      
    emailAndPassword: {  
        enabled: true,
        sendResetPassword: async ({user, url, token}:any, request:any) => {
            await sendEmail(
                {
                  to: user.email,
                  subject: "إعادة تعيين كلمة المرور",
                  template: "password-reset",
                  props: {
                    resetUrl: url,
                  },
                  text: `قم بتعيين كلمة مرورك بالضغط على هذا الرابط: ${url}`,
                },
                env.RESEND_API,
                env.MAIN_EMAIL
              );
          },
    
    },

    
   
    database: drizzleAdapter(dbCLient(env.DB_URL), {
        provider: "pg", // or "mysql", "sqlite"
        schema
    }),
    plugins: [
        admin() ,
        emailOTP({ 
            async sendVerificationOTP({ email, otp, type}) { 
                console.log("sendVerificationOTP::", otp, email);
                
                // Implement the sendVerificationOTP method to send the OTP to the user's email address
                await sendEmail(
                    {
                      to: email,
                      subject: "رمز التحقق لإعادة تعيين كلمة المرور",
                      template: "password-reset-otp",
                      props: {
                        otp,
                      },
                      text: `أدخل رمز التحقق التالي لإعادة تعيين كلمة مرورك: ${ otp}`,
                    },
                    env.RESEND_API,
                    env.MAIN_EMAIL
                  );
            }, 
    }) 
    ]
});


