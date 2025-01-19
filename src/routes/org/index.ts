import { Hono } from "hono";
import { AuthVariables, Env } from "../../types/types";
import { TOrganization } from "../../db/types";
import { createUpdateOrg, getLatestNOrgs, getPaginatedOrgs, retrieveOrg } from "../../db/org/org";
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

export const org = new Hono<{
  Variables: AuthVariables;
  Bindings: CloudflareBindings & Env;
}>();

org.get("/test", (c) => c.json({ data: "Hello org router!!" }));


// ?Endpoint for create update orginization 
// todo: add validation schema for the body you idiot

org.post( "/",async (c) => {
    try {
        const org = await c.req.json<TOrganization>();
        const dbUrl = c.env.DB_URL; 
    
        if (!dbUrl) {
          return c.json(
            {
              status: "error",
              message: "Database configuration missing"
            },
            500
          );
        }
    
        const result = await createUpdateOrg(org, dbUrl);
    
        const statusCode = 
          result.status === "success" ? (org.id ? 200 : 201) : // 201 for create, 200 for update
          result.status === "warning" ? 400 :
          500;
    
        return c.json(result, statusCode);
    
      } catch (error) {
        console.error('Organization creation/update error:', error);
        
        return c.json(
          {
            status: "error",
            message: "Failed to process organization data"
          },
          500
        );
      }

})

//?Endpoint for retreieving all the organizations (paginated)
// Validation schema for query parameters
const querySchemaPaginatedOrgs = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1))
    .refine((val) => val > 0, { message: "Page must be a positive number" }),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 10))
    .refine((val) => val > 0 && val <= 100, { 
      message: "Limit must be between 1 and 100" 
    })
});
org.get("/",zValidator('query', querySchemaPaginatedOrgs), async (c)=>{
  try {
    const { page, limit } = c.req.valid('query');
    const dbUrl = c.env.DB_URL;

    if (!dbUrl) {
      return c.json(
        {
          status: "error",
          message: "Database configuration missing"
        },
        500
      );
    }

    const result = await getPaginatedOrgs(dbUrl, { page, limit });

    // Map to HTTP status code
    const statusCode = 
      result.status === "success" ? 200 :
      result.status === "warning" ? 400 :
      500;

    // Set pagination headers
    // if (result.status === "success" && result.pagination) {
    //   c.header('X-Total-Count', result.pagination.total.toString());
    //   c.header('X-Page', result.pagination.currentPage.toString());
    //   c.header('X-Pages', result.pagination.totalPages.toString());
    //   c.header('X-Has-More', result.pagination.hasMore.toString());
    // }

    return c.json(result, statusCode);

  } catch (error) {
    console.error('Error fetching organizations:', error);
    
    return c.json(
      {
        status: "error",
        message: "Failed to fetch organizations"
      },
      500
    );
  }
});



//?Endpoint for getting latest added orgs 
// Validation schema for query parameters
const querySchemaLatestOrgs = z.object({
  n: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 5))
    .refine((val) => val > 0, { message: "Num must be a positive number" }),

});
org.get("/latest",zValidator('query', querySchemaLatestOrgs), async (c)=>{
  try {
    // Get and validate query parameters
    const {n} = c.req.valid("query");
    const dbUrl = c.env.DB_URL;

    if (!dbUrl) {
      return c.json(
        {
          status: "error",
          message: "Database configuration missing"
        },
        500
      );
    }


    const result = await getLatestNOrgs(n, dbUrl);
      // Map to HTTP status code
      const statusCode = 
      result.status === "success" ? 200 :
      result.status === "warning" ? 400 :
      500;


      return c.json(result, statusCode);


}

catch (error) {
  console.error('Error fetching latest organizations:', error);
  
  return c.json(
    {
      status: "error",
      message: "Failed to fetch latest organizations"
    },
    500
  );
}
})



//?Endpoint for retrieving one  org
// const querySchemaLRetriveOrg = z.object({
//   id: z
//     .string()
//     .optional()
//     .transform((val) => (val ? parseInt(val) : 1))
//     .refine((val) => val > 0, { message: "id must be a positive number" }),

// });
// org.get("/:id",zValidator('param', querySchemaLRetriveOrg), async (c)=>{
//   try {
//     // Get and validate query parameters
//     const {id} = c.req.valid("param");
//     const dbUrl = c.env.DB_URL;

//     if (!dbUrl) {
//       return c.json(
//         {
//           status: "error",
//           message: "Database configuration missing"
//         },
//         500
//       );
//     }


//     const result = await retrieveOrg(id, dbUrl);
//       // Map to HTTP status code
//       const statusCode = 
//       result.status === "success" ? 200 :
//       result.status === "warning" ? 400 :
//       500;


//       return c.json(result, statusCode);


// }

// catch (error) {
//   console.error('Error fetching single organization:', error);
  
//   return c.json(
//     {
//       status: "error",
//       message: "Failed to fetch single organization"
//     },
//     500
//   );
// }
// })
