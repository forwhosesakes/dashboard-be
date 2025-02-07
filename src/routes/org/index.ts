import { Hono } from "hono";
import { AuthVariables } from "../../types/types";
import { TOrganization } from "../../db/types";
import {
  createUpdateOrg,
  getLatestNOrgs,
  getPaginatedOrgs,
  getPaginatedOrgsOverview,
  removeOrganization,
  retrieveOrg,
} from "../../db/org/org";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { auth } from "../../lib/auth";
import { DASHBOARD_RELATED_COLUMN } from "../../db/constants";
import { createDashboard } from "../../db/dashbaord/dashboard";
import { getDashboardBodyGivenSettingType } from "../dashbaord/utils";

export const org = new Hono<{
  Variables: AuthVariables;
  Bindings: Env;
}>();

org.get("/test", (c) => c.json({ data: "Hello org router!!" }));

//?Endpoint for getting latest added orgs
// Validation schema for query parameters
const querySchemaLatestOrgs = z.object({
  n: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 5))
    .refine((val) => val > 0, { message: "Num must be a positive number" }),
});
org.get("/latest", zValidator("query", querySchemaLatestOrgs), async (c) => {
  try {
    // Get and validate query parameters
    const { n } = c.req.valid("query");
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

    const result = await getLatestNOrgs(n, dbUrl);
    // Map to HTTP status code
    const statusCode =
      result.status === "success"
        ? 200
        : result.status === "warning"
        ? 400
        : 500;

    return c.json(result, statusCode);
  } catch (error) {
    console.error("Error fetching latest organizations:", error);

    return c.json(
      {
        status: "error",
        message: "Failed to fetch latest organizations",
      },
      500
    );
  }
});

//?Endpoint for retreieving overview of the organizations (paginated)
// Validation schema for query parameters
const querySchemaPaginatedOrgsOverview = z.object({
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
      message: "Limit must be between 1 and 100",
    }),
});
org.get(
  "/overview",
  zValidator("query", querySchemaPaginatedOrgsOverview),
  async (c) => {
    try {
      const { page, limit } = c.req.valid("query");
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

      const result = await getPaginatedOrgsOverview(dbUrl, { page, limit });

      // Map to HTTP status code
      const statusCode =
        result.status === "success"
          ? 200
          : result.status === "warning"
          ? 400
          : 500;

      // Set pagination headers
      if (result.status === "success" && result.pagination) {
        c.header("X-Total-Count", result.pagination.total.toString());
        c.header("X-Page", result.pagination.currentPage.toString());
        c.header("X-Pages", result.pagination.totalPages.toString());
        c.header("X-Has-More", result.pagination.hasMore.toString());
      }

      return c.json(result, statusCode);
    } catch (error) {
      console.error("Error fetching organizations:", error);

      return c.json(
        {
          status: "error",
          message: "Failed to fetch organizations",
        },
        500
      );
    }
  }
);

// ?Endpoint for retrieving one  org
const querySchemaLRetriveOrg = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: "ID must be numeric" }) // Only match numeric strings
    .transform((val) => parseInt(val))
    .refine((val) => val > 0, { message: "ID must be a positive number" }),
});
org.get("/pre/:id", zValidator("param", querySchemaLRetriveOrg), async (c) => {
  try {
    // Get and validate query parameters
    const { id } = c.req.valid("param");
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

    const result = await retrieveOrg(id, dbUrl);
    
    const statusCode =
      result.status === "success"
        ? 200
        : result.status === "warning"
        ? 400
        : 500;

    return c.json(result, statusCode);
  } catch (error) {
    console.error("Error fetching single organization:", error);

    return c.json(
      {
        status: "error",
        message: "Failed to fetch single organization",
      },
      500
    );
  }
});


org.delete("/pre/:id",zValidator("param",querySchemaLRetriveOrg),async (c)=>{
  try {
    // Get and validate query parameters
    const { id } = c.req.valid("param");
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

    const result = await removeOrganization(id, dbUrl);
    
    const statusCode =
      result.status === "success"
        ? 200
        : result.status === "warning"
        ? 400
        : 500;

    return c.json(result, statusCode);
  } catch (error) {
    console.error("Error fetching single organization:", error);

    return c.json(
      {
        status: "error",
        message: "Failed to fetch single organization",
      },
      500
    );
  }

})
// ?Endpoint for create update orginization
// todo: add validation schema for the body you idiot

org.post("/", async (c) => {
  try {
    const org = await c.req.json<TOrganization & { password: string }>();
    const dbUrl = c.env.DB_URL;
    let userId = null;

    if (!dbUrl) {
      return c.json(
        {
          status: "error",
          message: "Database configuration missing",
        },
        500
      );
    }

    if (org.id) {
      //TODO: update org
    } else {
      if (!org.email) {
        return c.json(
          {
            status: "error",
            message: "No email was provided",
          },
          500
        );
      }
      await auth(c.env).api.signUpEmail({
        body: {
          email: org.email,
          password: crypto.randomUUID(),
          name: org.name,
          role: "user",
        },
      });

      const ctx = await auth(c.env).$context;

      const userResult = await ctx.adapter.findOne({
        model: "user",
        where: [{ value: org.email, field: "email" }],
      });
      const userId = (userResult as any).id;

      //If creating new user went successfully, create new org and link the userId to it
      if (userId) {
        const orgResult = await createUpdateOrg({ ...org, userId }, dbUrl);

        if (orgResult.status === "success") {
          // Create the dashboards types related to the org
          // Note: if the org has a general dashbaord, then look for the category field
          if (orgResult.data[0].id) {
            const dashboardResults = await Promise.all(
              DASHBOARD_RELATED_COLUMN.map(async (el) => {
                try {
                  const value = Number(orgResult.data[el]);
                  if (value <= 0) return null;

                  return await createDashboard(
                    {
                      orgId: orgResult.data[0].id,
                      ...getDashboardBodyGivenSettingType(
                        el,
                        org.category ?? ""
                      ),
                    },
                    dbUrl
                  );
                } catch (error) {
                  console.error(`Failed to create dashboard for ${el}:`, error);
                  return null;
                }
              })
            );

            console.log("dashboardResults:::", dashboardResults);
            if (!dashboardResults.every((res) => res?.status === "success")) {
              return c.json(
                {
                  status: "error",
                  message: "Failed to create the orginazation dashboards",
                },
                500
              );
            }
          }
        } else {
          return c.json(
            {
              status: "error",
              message:
                "Failed to create the user account for this organization",
            },
            500
          );
        }

        const statusCode =
          orgResult.status === "success"
            ? org.id
              ? 200
              : 201 // 201 for create, 200 for update
            : orgResult.status === "warning"
            ? 400
            : 500;

        return c.json(orgResult, statusCode);
      }
    }
  } catch (error) {
    console.error("Organization creation/update error:", error);

    return c.json(
      {
        status: "error",
        message: "Failed to process organization data",
      },
      500
    );
  }
});

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
      message: "Limit must be between 1 and 100",
    }),
});
org.get("/", zValidator("query", querySchemaPaginatedOrgs), async (c) => {
  try {
    const { page, limit } = c.req.valid("query");
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

    const result = await getPaginatedOrgs(dbUrl, { page, limit });

    // Map to HTTP status code
    const statusCode =
      result.status === "success"
        ? 200
        : result.status === "warning"
        ? 400
        : 500;

    // Set pagination headers
    if (result.status === "success" && result.pagination) {
      c.header("X-Total-Count", result.pagination.total.toString());
      c.header("X-Page", result.pagination.currentPage.toString());
      c.header("X-Pages", result.pagination.totalPages.toString());
      c.header("X-Has-More", result.pagination.hasMore.toString());
    }

    return c.json(result, statusCode);
  } catch (error) {
    console.error("Error fetching organizations:", error);

    return c.json(
      {
        status: "error",
        message: "Failed to fetch organizations",
      },
      500
    );
  }
});
