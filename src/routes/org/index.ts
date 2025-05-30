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
  getOrgByUserId,
  getOrgCount,
} from "../../db/org/org";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { auth } from "../../lib/auth";
import { DASHBOARD_RELATED_COLUMN, MAIN_DASHBOARD_RELATED_COLUMN } from "../../db/constants";
import { createDashboard } from "../../db/dashbaord/dashboard";
import { getDashboardBodyGivenSettingType } from "../dashbaord/utils";
import { sendEmail } from "../../lib/send-email";
import { StatusCode } from "hono/utils/http-status";

export const org = new Hono<{
  Variables: AuthVariables;
  Bindings: Env;
}>();

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

org.delete(
  "/pre/:id",
  zValidator("param", querySchemaLRetriveOrg),
  async (c) => {
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
  }
);
// ?Endpoint for create update orginization
// todo: add validation schema for the body you idiot

org.post("/", async (c) => {
  try {
    const org = await c.req.json<TOrganization & { password: string }>();
    const dbUrl = c.env.DB_URL;
    let orgResult;
    let statusCode;
    console.log("org to be added/updated::", org);

    if (!dbUrl) {
      return c.json(
        {
          status: "error",
          message: "Database configuration missing",
        },
        500
      );
    }

    //update exisitng org operation
    if (org.id) {
      orgResult = await createUpdateOrg({ ...org }, dbUrl);
      statusCode =
        orgResult.status === "success"
          ? org.id
            ? 200
            : 201 // 201 for create, 200 for update
          : orgResult.status === "warning"
          ? 400
          : 500;
    } 
    
    
    //Create new orginzation
    else {
      if (!org.email) {
        return c.json(
          {
            status: "error",
            message: "NO_PROVIDED_EMAIL",
          },
          500
        );
      }
      const tempPass = crypto.randomUUID();
      await auth(c.env).api.signUpEmail({
        body: {
          email: org.email.toLowerCase(),
          password: tempPass,
          name: org.name,
          role: "user",
        },
      });

      const ctx = await auth(c.env).$context;

      const userResult = await ctx.adapter.findOne({
        model: "user",
        where: [{ value: org.email.toLowerCase(), field: "email" }],
      });
      const userId = (userResult as any).id;

      //If creating new user went successfully, create new org and link the userId to it
      if (userId) {
         orgResult = await createUpdateOrg({ ...org, userId }, dbUrl);
        console.log("orgResult::", orgResult);

       

        
        if (orgResult.status === "success") {
        // send welcoming email

        await sendEmail(
          {
            to: org.email,
            subject: "  نرحب بانضمام جمعيتكم إلى كدان! ",
            template: "member-invite",
            props: { name: org.name, email: org.email, password: tempPass },
          },
          c.env.RESEND_API,
          c.env.MAIN_EMAIL
        );

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
      }
    }

    if (orgResult?.status === "success") {
      // Create the dashboards types related to the org
      // Note: if the org has a general dashbaord, then look for the category field


      console.log("Going to create new dashboard now, update the visiblity if org id and type already exists")
   
      await createDashboard(
        {
          orgId: orgResult.data[0].id,
          ...getDashboardBodyGivenSettingType(
            "governanceIndicatorsSetting",
            /^true$/i.test(orgResult.data[0].governanceIndicatorsSetting),
            org.category ?? ""
          ),
        },
        dbUrl
      );
    




      await Promise.all(
        MAIN_DASHBOARD_RELATED_COLUMN.map(async (el) => {
          try {
            return await createDashboard(
              {
                orgId: orgResult.data[0].id,
                ...getDashboardBodyGivenSettingType(
                  el,
              /^true$/i.test(orgResult.data[0].allDashboardsSetting),
                  org.category ?? ""
                ),
              },
              dbUrl
            );
          } catch (error) {
            console.error(
              `Failed to create dashboard for ${el}:`,
              error
            );
            return null;
          }
        })
      );
    } else {
      return c.json(
        {
          status: "error",
          message: "Failed to create the user account for this organization",
        },
        500
      );
    }
    return c.json(orgResult, statusCode as StatusCode);
  } catch (error) {
    console.error("Organization creation/update error:", error);

    return c.json(
      {
        status: "error",
        message:
          (error as any)?.body?.code ?? "Failed to process organization data",
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

const querySchemaGetOrgByUserId = z.object({
  userId: z.string(),
});
org.get(
  "getOrgByUserId/:userId",
  zValidator("param", querySchemaGetOrgByUserId),
  async (c) => {
    try {
      const { userId } = c.req.valid("param");
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
      const result = await getOrgByUserId(userId, dbUrl);

      const statusCode =
        result.status === "success"
          ? 200
          : result.status === "warning"
          ? 400
          : 500;

      return c.json(result, statusCode);
    } catch (error) {
      console.error("Error fetching single organization by user ID: ", error);

      return c.json(
        {
          status: "error",
          message: "Failed to fetch single organization by user ID",
        },
        500
      );
    }
  }
);

org.get("count", async (c) => {
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
    const result = await getOrgCount(dbUrl);

    const statusCode =
      result.status === "success"
        ? 200
        : result.status === "warning"
        ? 400
        : 500;

    return c.json(result, statusCode);
  } catch (error) {
    console.error("Error fetching organizations count ", error);

    return c.json(
      {
        status: "error",
        message: "Error fetching organizations count",
      },
      500
    );
  }
});
