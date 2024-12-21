import { Hono } from 'hono'
import { auth } from './lib/auth';
import { cors } from 'hono/cors';

interface Env {
  DATABASE_URL: string;
  BETTER_AUTH_URL:string;
  BETTER_AUTH_SECRET:string
}



interface AuthVariables  {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null
}

const app = new Hono<{ Variables:AuthVariables,Bindings: CloudflareBindings& Env  } >()

app.get('/', (c) => {



  return c.text('Hello Hono from main !')
})

app.use(
	"/api/auth/**", // or replace with "*" to enable cors for all routes
	cors({
		origin: ["http://localhost:5173","https://dev.dashboard-fe-aa2.pages.dev"], // replace with your origin
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

app.use("*", async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
 
  	if (!session) {
    	c.set("user", null);
    	c.set("session", null);
    	return next();
  	}
 
  	c.set("user", session.user);
  	c.set("session", session.session);
  	return next();
});

app.on(["POST", "GET"], "/api/auth/**", (c) => {
	return auth.handler(c.req.raw);
});

export default app