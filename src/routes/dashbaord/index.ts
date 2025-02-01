import { Hono } from "hono";
import {
  initCorporateIndicators,
  initFinancialIndicators,
  initMosquesIndicators,
  initOperationalIndicators,
  initOrphansIndicators,
} from "./utils";
import {
  CORPORATE_METADATA,
  FINANCIAL_METADATA,
  MOSQUES_METADATA,
  OPERATIONAL_METADATA,
  ORPHANS_METADATA,
} from "../../lib/calc-metadata";
import {
  createDashboard,
  getDashboardEntries,
  getDashboardIndicators,
  getDashboardsOverviewForOrg,
  getGeneralDashboardIndicatorsForOneOrg,
  saveEntriesForDashboard,
  saveEntriesForGeneralDashboard,
  saveIndicatorsForDashboard,
  saveIndicatorsForGeneralDashboard,
} from "../../db/dashbaord/dashboard";
import { AuthVariables, DashboardType } from "../../types/types";
import { TDashboard } from "../../db/types";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const querySchemaGetIndicators = z.object({
  category: z
    .string()
    .transform((val) => val?.toUpperCase())
    .pipe(
      z.enum(["ORPHANS", "MOSQUES"], {
        errorMap: () => ({ message: "Invalid category type" }),
      })
    )
    .optional()

});
const paramsSchemaGetIndicators = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: "ID must be numeric" }) // Only match numeric strings
    .transform((val) => parseInt(val))
    .refine((val) => val > 0, { message: "ID must be a positive number" }),
  type: z
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(
      z.enum(["OPERATIONAL", "FINANCIAL", "CORPORATE", "GENERAL"], {
        errorMap: () => ({ message: "Invalid dashboard type" }),
      })
    ),
});

const paramsGeneralSchemaGetIndicators = z.object({
  orgId: z
    .string()
    .regex(/^\d+$/, { message: "ID must be numeric" }) // Only match numeric strings
    .transform((val) => parseInt(val))
    .refine((val) => val > 0, { message: "ID must be a positive number" }),

});

export const dashboard = new Hono<{
  Variables: AuthVariables;
  Bindings: Env;
}>();
dashboard.get("/", (c) => c.json({ data: "Hello dashbaord" }));

//get entries for a specific org
dashboard.get(
  "/entries/:type/:id",
  zValidator("param", paramsSchemaGetIndicators),
  async (c) => {
    const { id: orgId, type } = c.req.valid("param");
    const dashboardType = type.toUpperCase()  as DashboardType
    return getDashboardEntries(Number(orgId), dashboardType, c.env.DB_URL)
      .then((response) => {
        return c.json({ data: response.data });
      })
      .catch((e) => {
        console.log("error in getting entries endpoint", e);   
        return c.json({ code: "API_ERROR", message: e });
      });
  }
);

// upload entries for one dashbaord given org Id
dashboard.post(
  "/entries/:type/:id",
  zValidator("param", paramsSchemaGetIndicators),
  zValidator("query", querySchemaGetIndicators),
  async (c) => {
    const { id: orgId, type } = c.req.valid("param");
    const { category } = c.req.valid("query");

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

        case "GENERAL":
          if (category === "MOSQUES") {
            indicators = initMosquesIndicators();
            DASHBOARD_METADATA = MOSQUES_METADATA;
          } else if (category === "ORPHANS") {
            indicators = initOrphansIndicators();
            DASHBOARD_METADATA = ORPHANS_METADATA;
          } else throw new Error("API ERROR: no such category");
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
      let entriesRecord;
      if (dashboardType === "GENERAL" && category) {
        entriesRecord = await saveEntriesForGeneralDashboard(
          Number(orgId),
          entriesObject,
          category,
          c.env.DB_URL
        );
      } else {
        entriesRecord = await saveEntriesForDashboard(
          Number(orgId),
          entriesObject,
          dashboardType as Exclude<DashboardType, "GENERAL">,
          c.env.DB_URL
        );
      }

      console.log(
        "successfully saved the entries for the client",
        entriesRecord
      );

      for (const [key, value] of Object.entries(indicators)) {
        console.log("entries", key, "meta", DASHBOARD_METADATA[key]);

        const paramsValues = DASHBOARD_METADATA[key].params.map((param) =>
          Number(entries.get(param))
        );
        const indRes = DASHBOARD_METADATA[key].formula(...paramsValues);
        // @ts-ignore
        indicators[key] = indRes;
        entries.set(key, String(indRes));
      }
      // save the indicators in db.. that's rlly it
      let indicatorRecords;
      if (dashboardType === "GENERAL" && category) {
        indicatorRecords = await saveIndicatorsForGeneralDashboard(
          Number(entriesRecord.data[0].dashbaordId),
          entriesRecord.data[0].id,
          indicators,
          category,
          c.env.DB_URL
        );
      }
      else {
        indicatorRecords = await saveIndicatorsForDashboard(
          Number(entriesRecord.data[0].dashbaordId),
          entriesRecord.data[0].id,
          indicators,
          dashboardType as Exclude<DashboardType, "GENERAL">,
          c.env.DB_URL
        );

      }

   
      console.log("data:  ", entries);
      console.log("indicators:  ", indicators);
      return c.json({ indicators: indicatorRecords });
    } catch (e) {
      console.log("error :::", e);
      return c.json({ code: "WRONG_PARAMETER", message: e });
    }
  }
);
//get indicators for a specific dashboard given org Id
dashboard.get(
  "/indicators/:type/:id",
  zValidator("param", paramsSchemaGetIndicators),
  async (c) => {
    const { id: orgId, type } = c.req.valid("param");
    const dashboardType = type.toUpperCase() as Exclude<
      DashboardType,
      "GENERAL"
    >;
    return getDashboardIndicators(
      Number(orgId),
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

//get general indicators for one dashbaord given the orginzation 
dashboard.get("/general/:orgId",  zValidator("param",paramsGeneralSchemaGetIndicators), async (c) => {
  const {  orgId } = c.req.valid("param")
  return getGeneralDashboardIndicatorsForOneOrg(orgId, c.env.DB_URL)
  .then((response) => {
    return c.json({ data: response.data });
  })
  .catch((e) => {
    return c.json({ code: "API_ERROR", message: e });
  });


})

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
