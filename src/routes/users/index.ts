import { Hono } from "hono";
import { AuthVariables } from "../../types/types";
import { auth } from "../../lib/auth";
import { dbCLient } from "../../db/db-client";
import { eq } from "drizzle-orm"
import { user } from "../../db/schema"
import { sendEmail } from "../../lib/send-email";
import { getMembersCount } from "../../db/org/org";


export const users = new Hono<{
    Variables: AuthVariables;
    Bindings:   Env;
}>();

users.post("/updateSubRole",async (c)=>{
    try{
       const body = await c.req.json();
       console.log("body",body);
       const { subRole,id }=body
       


        const session = await auth(c.env).api.getSession({headers:c.req.raw.headers})
        if(!session || session.user.subRole !== "admin"){
            return c.json({error:"Unauthorized"},401)
        }

        const db = dbCLient(c.env.DB_URL);
        const updatedUser = await db.update(user)
            .set({
                subRole,
                updatedAt: new Date()
            })
            .where(eq(user.id,id))
            .returning()
            console.log("updated",updatedUser.length);
            
            if(!updatedUser.length){
                return c.json({error:"User not found"},404)
            }

            return c.json({
                status:"success",
                data:updatedUser[0]
            })
    } catch (error){
        console.error("Failed to update user:", error);
        return c.json({status:"error",error:"Failed to update user"},500)
    }
})

users.get(
  "count",
  async (c) => {
    try {
      const dbUrl = c.env.DB_URL;

      if (!dbUrl) {
        return c.json(
          {
            status: "error",
            message: "Database configuration missing",
          },
          500
        );
      }
      const result = await getMembersCount( dbUrl);

      const statusCode =
        result.status === "success"
          ? 200
          : result.status === "warning"
          ? 400
          : 500;

      return c.json(result, statusCode);
    } catch (error) {
      console.error("Error fetching members count ", error);

      return c.json(
        {
          status: "error",
          message: "Error fetching members count",
        },
        500
      );
    }
  }
);



users.post("/send-welcome-email", async (c) => {
    try {
      const { email, name, password, isAdmin } = await c.req.json();
  
      const session = await auth(c.env).api.getSession({ headers: c.req.raw.headers });
      console.log("sub role is ::",session);
      
      if (!isAdmin ) {
        return c.json({ error: "Unauthorized" }, 401);
      }
  

   
      await sendEmail({
        to: email,
        subject: "مرحباً بك في الفريق",
        template: "member-invite",
        props: { name, email, password },
      }, c.env.RESEND_API, c.env.MAIN_EMAIL);
  
      return c.json({ status: "success" });
    } catch (error) {
      console.error("Failed to send welcome email:", error);
      return c.json({ error: "Failed to send welcome email" }, 500);
    }
  });