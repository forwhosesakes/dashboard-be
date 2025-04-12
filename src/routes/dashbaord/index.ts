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
  getGovernanceEntries,
  getGovernanceIndicators,
  removeEntriesAndIndicators,
  saveEntriesForDashboard,
  saveEntriesForGeneralDashboard,
  saveGovernanceEntries,
  saveIndicatorsForDashboard,
  saveIndicatorsForGeneralDashboard,
} from "../../db/dashbaord/dashboard";
import { AuthVariables, DashboardType } from "../../types/types";
import { TDashboard } from "../../db/types";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";



const VALID_GOVERNANCE_TYPES = [
  "COMPLIANCE_ADHERENCE_PRACTICES",
  "FINANCIAL_SAFETY_PRACTICES",
  "TRANSPARENCY_DISCLOSURE_PRACTICES"
] as const;

// Custom transformer for case-insensitive type validation
const governanceTypeSchema = z.string()
  .transform(val => val.toUpperCase())
  .refine(val => VALID_GOVERNANCE_TYPES.includes(val as any), {
    message: "Invalid governance type"
  })
  .transform(val => val as typeof VALID_GOVERNANCE_TYPES[number]);
// Params schema
const govParamsSchema = z.object({
  id: z.string(),
  type: governanceTypeSchema
});

const govBodySchema = z.object({
  responses: z.record(z.string(), z.any()),
  indicators: z.record(z.string(), z.any()),
  total:z.number()
});

// Reuse the existing parameter validation schema
const deleteParamsSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: "ID must be numeric" })
    .transform((val) => parseInt(val))
    .refine((val) => val > 0, { message: "ID must be a positive number" }),
  type: z
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(
      z.enum(["OPERATIONAL", "FINANCIAL", "CORPORATE", "GENERAL", "MOSQUES", "ORPHANS"], {
        errorMap: () => ({ message: "Invalid dashboard type" }),
      })
    ),
});

const querySchemaDelete = z.object({
  category: z
    .string()
    .transform((val) => val?.toUpperCase())
    .pipe(
      z.enum(["ORPHANS", "MOSQUES"], {
        errorMap: () => ({ message: "Invalid category type" }),
      })
    )
    .optional(),
});

const querySchemaGetIndicators = z.object({
  category: z
    .string()
    .transform((val) => val?.toUpperCase())
    .pipe(
      z.enum(["ORPHANS", "MOSQUES"], {
        errorMap: () => ({ message: "Invalid category type" }),
      })
    )
    .optional(),
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
// upload entries for governance form in corporate dashboard
dashboard.post(
  "governance/entries/:id/:type",
  zValidator("param", govParamsSchema),
  zValidator("json", govBodySchema),
  async (c) => {
    try {
      const { id, type } = c.req.valid("param");
      const { responses,total ,indicators} = c.req.valid("json");
      console.log("POST governance/entries/:id/:type", responses);
      const cleanedUp:any = {};
  
      for (const key in responses) {
        if (Object.prototype.hasOwnProperty.call(responses, key)) {
          const value = responses[key];
          if (value !== null && value !== undefined && value !== '') {
            cleanedUp[key] = value;
          }
       
        }
      }

      

      const result = await saveGovernanceEntries(
        parseInt(id),
        cleanedUp,
        indicators,
        total,
        type,
        c.env.DB_URL
      );

      return c.json(result);
    } catch (error: any) {
      return c.json({
        status: "error",
        message: error.message || 'Failed to process governance form data'
      }, 500);
    }
  }
);

// GET endpoint governance form in gov dashboard
dashboard.get(
  "/governance/entries/:id/:type",
  zValidator("param", govParamsSchema),
  async (c) => {

    try {
      const { id:orgId, type } = c.req.valid("param");
      

      const result = await getGovernanceEntries(
        Number(orgId),
        type,
        c.env.DB_URL
      );

      return c.json(result);
    } catch (error: any) {
      return c.json({
        status: "error",
        message: error.message || 'Failed to fetch governance data'
      }, 500);
    }
  }
);

// GET endpoint governance indciator for one org

dashboard.get(
  "/governance/indicators/:id",
  async (c) => {

    try {
      const orgId = c.req.param("id");
      const result = await getGovernanceIndicators(
        Number(orgId),
        c.env.DB_URL
      );

      return c.json(result);
    } catch (error: any) {
      return c.json({
        status: "error",
        message: error.message || 'Failed to fetch governance data'
      }, 500);
    }
  }
);


//get entries for a specific org
dashboard.get(
  "/entries/:type/:id",
  zValidator("param", paramsSchemaGetIndicators),
  async (c) => {
    const { id: orgId, type } = c.req.valid("param");
    const dashboardType = type.toUpperCase() as DashboardType;
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
  async (c) => {
    const { id: orgId, type } = c.req.valid("param");
    const dashboardType = type.toUpperCase() as DashboardType;
    const entries = await c.req.formData();
    let indicators;
    let DASHBOARD_METADATA;
    let entriesTable;
    console.log("entries::",entries);
    

  

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
          //todo: wrong, temp for now
          indicators = initMosquesIndicators();
          DASHBOARD_METADATA = MOSQUES_METADATA;
          break;
        default:
          throw new Error("API ERROR: no such type");
      }
      // convert entries formdata to json
      const entriesObject: any = {};
      entries.forEach(function (value, key) {
      if (value !== null && value !== undefined && value !== '' && value !== 'null') 
        entriesObject[key] = value;
      else 
      entriesObject[key] = 0
      });

      // Save the entries in the db
      let entriesRecord,category;
      if (dashboardType === "GENERAL") {
        [entriesRecord,category] = await saveEntriesForGeneralDashboard(
          Number(orgId),
          entriesObject,
          c.env.DB_URL
        );
        if (category === "MOSQUES") {
          indicators = initMosquesIndicators();
          DASHBOARD_METADATA = MOSQUES_METADATA;
        } else if (category === "ORPHANS") {
          indicators = initOrphansIndicators();
          DASHBOARD_METADATA = ORPHANS_METADATA;
        } else throw new Error("API ERROR: no such category");
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
      } else {
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
    const dashboardType = type.toUpperCase() as DashboardType |"GOVERNANCE";
    try {
      const res =
        dashboardType === "GENERAL"
          ? await getGeneralDashboardIndicatorsForOneOrg(orgId, c.env.DB_URL):
            dashboardType === "GOVERNANCE"?await getGeneralDashboardIndicatorsForOneOrg(orgId, c.env.DB_URL)
          : await getDashboardIndicators(
              Number(orgId),
              dashboardType as Exclude<DashboardType, "GENERAL">,
              c.env.DB_URL
            );

      return c.json({ data: res.data });
    } catch (e) {
      return c.json({ code: "API_ERROR", message: e });
    }
  }
);

//get general indicators for one dashbaord given the orginzation
dashboard.get(
  "/general/:orgId",
  zValidator("param", paramsGeneralSchemaGetIndicators),
  async (c) => {
    const { orgId } = c.req.valid("param");
    return getGeneralDashboardIndicatorsForOneOrg(orgId, c.env.DB_URL)
      .then((response) => {
        return c.json({ data: response.data });
      })
      .catch((e) => {
        return c.json({ code: "API_ERROR", message: e });
      });
  }
);

dashboard.delete(
  "/entries/:type/:id",
  zValidator("param", deleteParamsSchema),
  zValidator("query", querySchemaDelete),
  async (c) => {
    try {
      const { id: orgId, type } = c.req.valid("param");
      const { category } = c.req.valid("query");
      
      // Handle GENERAL type with categories
      const dashboardType = type.toLowerCase() as DashboardType;
    

      const result = await removeEntriesAndIndicators(
         orgId,
         dashboardType,
        c.env.DB_URL
      );

      return c.json(result);
      
    } catch (error: any) {
      console.error("Error deleting entries and indicators:", error);
      
      return c.json({
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred while deleting entries and indicators'
      }, 400);
    }
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
