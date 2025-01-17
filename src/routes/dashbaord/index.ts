import { Hono } from "hono";
import { initOperationalIndicators } from "./utils";
import { OPERATIONAL_METADATA } from "../../lib/calc-metadata";
import {
  createDashboard,
  saveEntriesForDashboard,
  saveIndicatorsForDashboard,
} from "../../db/dashbaord/dashboard";
import { AuthVariables, DashboardType, Env } from "../../types/types";
import { TDashboard } from "../../db/types";

export const dashboard = new Hono<{
  Variables: AuthVariables;
  Bindings: CloudflareBindings & Env;
}>();
dashboard.get("/", (c) => c.json({ data: "Hello dashbaord" }));

//get entries for a specific dashboard
dashboard.get("/entries/:id", (c) =>
  c.json({ data: "Hello dashbaord entries" })
);

// upload entries for one dashbaord
dashboard.post("/entries/:type/:id", async (c) => {
  console.log("context::: ", c.env);
  const dashbaordId = c.req.param("id");
  const dashboardType = c.req.param("type").toUpperCase() as DashboardType;
  const entries = await c.req.formData();
  let indicators;
  let DASHBOARD_METADATA;
  let entriesTable;

  try {
    switch (dashboardType) {
      case "CORPRATE":
        indicators = initOperationalIndicators();
        DASHBOARD_METADATA = OPERATIONAL_METADATA;
        entriesTable = "corprateEntries";
        break;
      case "OPERATIONAL":
        indicators = initOperationalIndicators();
        DASHBOARD_METADATA = OPERATIONAL_METADATA;
        entriesTable = "operationalEntries";
        break;
      case "FINANCIAL":
        indicators = initOperationalIndicators();
        DASHBOARD_METADATA = OPERATIONAL_METADATA;
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
      dashbaordId,
      entriesObject,
      dashboardType,
      c.env.DB_URL
    );
    console.log("successfully saved the entries for the client", entriesRecord);

    for (const [key, value] of Object.entries(indicators)) {
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
      dashbaordId,
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
});

//todo: getting the dashboard indicators upon entering the dashboard page
dashboard.get("/indicators/:type/:id", async (c) => {
  const dashbaordId = c.req.param("id");
  const dashboardType = c.req.param("type").toUpperCase() as DashboardType;
});

//todo: create dashboard
dashboard.post("",async (c) => {
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

//todo: update dashboard
//todo: delete dashboard
//todo: get all dashboards for a given client
