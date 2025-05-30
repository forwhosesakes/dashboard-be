import { Hono } from 'hono'
import { auth } from './lib/auth';
import { cors } from 'hono/cors';
import { dashboard } from './routes/dashbaord';
import { AuthVariables } from './types/types';
import { users } from "./routes/users/index"
import { org } from './routes/org';


const app = new Hono<{ Variables:AuthVariables,Bindings:  Env  } >()

app.get('/', (c) => {
  return c.text('Hello Hono from main !')
})

app.use(
	"*", // or replace with "*" to enable cors for all routes
	cors({
		origin: ["http://localhost:5173","https://dev.dashboard-fe-aa2.pages.dev","https://debug.dashboard-fe-aa2.pages.dev/", "https://kedan-dashboard.org", "https://dev.kedan-dashboard.org/login"], // replace with your origin
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"], // Added more methods
		exposeHeaders: ["Content-Length", "X-Total-Count", "X-Page", "X-Pages", "X-Has-More"], 
		maxAge: 600,
		credentials: true,
	}),
);

app.use("/users/*",
	cors({
		origin: ["http://localhost:5173","https://dev.dashboard-fe-aa2.pages.dev","https://debug.dashboard-fe-aa2.pages.dev/", "https://kedan-dashboard.org", "https://dev.kedan-dashboard.org"], // replace with your origin
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"], // Added more methods
		exposeHeaders: ["Content-Length", "X-Total-Count", "X-Page", "X-Pages", "X-Has-More"], 
		maxAge: 600,
		credentials: true,
	})
)

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
	console.log("api auth request");
	console.log(c);
	
	
	return auth(c.env).handler(c.req.raw);
});

app.route('/dashboard', dashboard)
app.route('/users',users)
app.route('/org', org)

app.get('/', (c) => {
  return c.text('Hello Hono from main !')
})


export default app