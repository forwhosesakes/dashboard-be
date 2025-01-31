import { Hono } from "hono";
import { initCorporateIndicators, initFinancialIndicators, initOperationalIndicators } from "./utils";
import {
  CORPORATE_METADATA,
  FINANCIAL_METADATA,
  OPERATIONAL_METADATA,
} from "../../lib/calc-metadata";
import {
  createDashboard,
  getDashboardEntries,
  getDashboardIndicators,
  getDashboardsOverviewForOrg,
  saveEntriesForDashboard,
  saveIndicatorsForDashboard,
} from "../../db/dashbaord/dashboard";
import { AuthVariables, DashboardType } from "../../types/types";
import { TDashboard } from "../../db/types";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const querySchemaGetIndicators = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: "ID must be numeric" }) // Only match numeric strings
    .transform((val) => parseInt(val))
    .refine((val) => val > 0, { message: "ID must be a positive number" }),
  type: z
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(
      z.enum(["OPERATIONAL", "FINANCIAL", "CORPORATE"], {
        errorMap: () => ({ message: "Invalid dashboard type" }),
      })
    ),
});

export const dashboard = new Hono<{
  Variables: AuthVariables;
  Bindings: Env;
}>();
dashboard.get("/", (c) => c.json({ data: "Hello dashbaord" }));

//get entries for a specific dashboard
dashboard.get(
  "/entries/:type/:id",
  zValidator("param", querySchemaGetIndicators),
  async (c) => {
    const { id: dashbaordId, type } = c.req.valid("param");
    const dashboardType = type.toUpperCase() as DashboardType;
    return getDashboardEntries(
      Number(dashbaordId),
      dashboardType,
      c.env.DB_URL
    )
      .then((response) => {
        return c.json({ data: response.data });
      })
      .catch((e) => {
        return c.json({ code: "API_ERROR", message: e });
      });
  }
);

// upload entries for one dashbaord

dashboard.post(
  "/entries/:type/:id",
  zValidator("param", querySchemaGetIndicators),
  async (c) => {
    const { id: dashbaordId, type } = c.req.valid("param");
    const dashboardType = type.toUpperCase() as DashboardType;
    const entries = await c.req.formData();
    let indicators;
    let DASHBOARD_METADATA;
    let entriesTable;

    try {
      switch (dashboardType) {
        case "CORPORATE":
          indicators = initCorporateIndicators();
          DASHBOARD_METADATA = CORPORATE_METADATA;
          entriesTable = "corporateEntries";
          break;
        case "OPERATIONAL":
          indicators = initOperationalIndicators();
          DASHBOARD_METADATA = OPERATIONAL_METADATA;
          entriesTable = "operationalEntries";
          break;
        case "FINANCIAL":
          indicators = initFinancialIndicators();
          DASHBOARD_METADATA = FINANCIAL_METADATA;
          entriesTable = "financialEntries";
          break;
        default:
          throw new Error("API ERROR: no such type");
      }
      // convert entries formdata to json
      const entriesObject: any = {};
      entries.forEach(function (value, key) {
        entriesObject[key] = value;
      });

      // Save the entries in the db
      const entriesRecord = await saveEntriesForDashboard(
        Number(dashbaordId),
        entriesObject,
        dashboardType,
        c.env.DB_URL
      );
      console.log(
        "successfully saved the entries for the client",
        entriesRecord
      );

      for (const [key, value] of Object.entries(indicators)) {
        console.log("entries",key,"meta",DASHBOARD_METADATA[key]);
        
        const paramsValues = DASHBOARD_METADATA[key].params.map((param) =>
          Number(entries.get(param))
        );
        const indRes = DASHBOARD_METADATA[key].formula(...paramsValues);
        // @ts-ignore
        indicators[key] = indRes;
        entries.set(key, String(indRes));
      }
      // save the indicators in db.. that's rlly it
      const indicatorRecords = await saveIndicatorsForDashboard(
        Number(dashbaordId),
        entriesRecord.data[0].id,
        indicators,
        dashboardType,
        c.env.DB_URL
      );
      console.log("data:  ", entries);
      console.log("indicators:  ", indicators);
      return c.json({ indicators: indicatorRecords });
    } catch (e) {
      console.log("error :::", e);
      return c.json({ code: "WRONG_PARAMETER", message: e });
    }
  }
);

dashboard.get(
  "/indicators/:type/:id",
  zValidator("param", querySchemaGetIndicators),
  async (c) => {
    const { id: dashbaordId, type } = c.req.valid("param");
    const dashboardType = type.toUpperCase() as DashboardType;
    return getDashboardIndicators(
      Number(dashbaordId),
      dashboardType,
      c.env.DB_URL
    )
      .then((response) => {
        return c.json({ data: response.data });
      })
      .catch((e) => {
        return c.json({ code: "API_ERROR", message: e });
      });
  }
);

// create dashboard
dashboard.post("", async (c) => {
  const dashboardData = (await c.req.json()) as TDashboard;
  //todo: validate the type of dashbord data
  return createDashboard(dashboardData, c.env.DB_URL)
    .then((response) => {
      return c.json({ data: response.data });
    })
    .catch((e) => {
      return c.json({ code: "API_ERROR", message: e });
    });
});

//Get dashboard overview for one org
dashboard.get("/overview/:orgId", async (c) => {
  const orgId = c.req.param("orgId");
  return getDashboardsOverviewForOrg(orgId, c.env.DB_URL)
    .then((response) => {
      return c.json({ data: response.data });
    })
    .catch((e) => {
      return c.json({ code: "API_ERROR", message: e });
    });
});

//todo: delete dashboard
