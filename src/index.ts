import { Hono } from 'hono'
import { auth } from './lib/auth';
import { cors } from 'hono/cors';
import { dashboard } from './routes/dashbaord';
import { AuthVariables, Env } from './types/types';


const app = new Hono<{ Variables:AuthVariables,Bindings: CloudflareBindings& Env  } >()
app.route('/dashboard', dashboard)

app.get('/', (c) => {
  return c.text('Hello Hono from main !')
})

app.use(
	"/api/auth/**", // or replace with "*" to enable cors for all routes
	cors({
		origin: ["http://localhost:5173","https://dev.dashboard-fe-aa2.pages.dev","https://debug.dashboard-fe-aa2.pages.dev/", "https://chokichoki.org", "https://dev.chokichoki.org"], // replace with your origin
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

app.use("*", async (c, next) => {
	const session = await auth(c.env).api.getSession({ headers: c.req.raw.headers });
 
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
	console.log("api auth request", c);
	
	return auth(c.env).handler(c.req.raw);
});

export default app