import { and, eq, isNotNull } from "drizzle-orm";
import { dbCLient } from "../db-client";
import {
  TDashboard,
  TDashboardEntries,
  TDashboardIndicators,
  TDashboardRecord,
  TMosquesIndicatorsRecord,
  TOperationalEntriesRecord,
  TOperationalIndicatorsRecord,
  TOrphansIndicatorsRecord,
} from "../types";
import {
  corporateEntries,
  corporateIndicators,
  dashbaord,
  financialEntries,
  financialIndicators,
  mosquesEntries,
  mosquesIndicators,
  operationalEntries,
  operationalIndicators,
  orphansEntries,
  orphansIndicators,
} from "../schema";
import { CategoryType, DashboardType, StatusResponse } from "../../types/types";
import { getDashboardStatus } from "./utils";

const dashboardEntryTables = {
  OPERATIONAL: operationalEntries,
  CORPORATE: corporateEntries,
  FINANCIAL: financialEntries,
  //TODO: Remove these later
  MOSQUES: mosquesEntries,
  ORPHANS: orphansEntries,
};

const dashboardIndicatorTables = {
  OPERATIONAL: operationalIndicators,
  CORPORATE: corporateIndicators,
  FINANCIAL: financialIndicators,
  //TODO: Remove these later
  MOSQUES: mosquesIndicators,
  ORPHANS: orphansIndicators,
};
// save entries for the three type
export const saveEntriesForDashboard = async (
  dashbaordId: number,
  entries: TDashboardEntries,
  dashboardType: Exclude<DashboardType, "GENERAL">,
  dbUrl: string
): Promise<StatusResponse<TOperationalEntriesRecord | any>> => {
  return new Promise((resolve, reject) => {
    const db = dbCLient(dbUrl);
    // check if the client exits first
    db.query.dashbaord
      .findFirst({
        where:
          eq(dashbaord.id, dashbaordId) &&
          eq(dashbaord.type, dashboardType.toLowerCase()),
      })
      .then((client) => {
        if (client) {
          //store the entries in the table [given the dashbaord type]
          db.insert(dashboardEntryTables[dashboardType])

            .values({ dashbaordId, ...entries })
            .onConflictDoUpdate({
              target: dashboardEntryTables[dashboardType].dashbaordId,
              // @ts-ignore
              set: { ...entries },
            })
            .returning()
            .then((record) => {
              resolve({
                status: "success",
                data: record,
              });
            })
            .catch((e: any) => {
              reject({
                status: "error",
                message: e,
              });
            });
        } else
          reject({
            status: "error",
            message: "no dashboard is here",
          });
      })
      .catch((e) => {
        reject({
          status: "error",
          message: e,
        });
      });
  });
};

// save entries for the general dashboards with categories
export const saveEntriesForGeneralDashboard = async (
  dashbaordId: number,
  entries: TDashboardEntries,
  categoryType: CategoryType,
  dbUrl: string
): Promise<
  StatusResponse<TOrphansIndicatorsRecord | TMosquesIndicatorsRecord | any>
> => {
  return new Promise((resolve, reject) => {
    const db = dbCLient(dbUrl);
    // check if the client exits first
    db.query.dashbaord
      .findFirst({
        where:
          eq(dashbaord.id, dashbaordId) &&
          eq(dashbaord.category, categoryType.toLowerCase()),
      })
      .then((rec) => {
        console.log("rec::::::", rec);

        if (rec) {
          //store the entries in the table [given the dashbaord type]
          console.log("entries", entries);
          db.insert(dashboardEntryTables[categoryType])

            .values({ dashbaordId, ...entries })
            .onConflictDoUpdate({
              target: dashboardEntryTables[categoryType].dashbaordId,
              // @ts-ignore
              set: { ...entries },
            })
            .returning()
            .then((record) => {
              resolve({
                status: "success",
                data: record,
              });
            })
            .catch((e: any) => {
              reject({
                status: "error",
                message: e,
              });
            });
        } else
          reject({
            status: "error",
            message: "DASHBOARD_NOT_FOUND",
          });
      })
      .catch((e) => {
        reject({
          status: "error",
          message: e,
        });
      });
  });
};

// save indicators for the three type
export const saveIndicatorsForDashboard = async (
  dashbaordId: number,
  entriesId: string,
  indicators: TDashboardIndicators,
  dashboardType: Exclude<DashboardType, "GENERAL">,
  dbUrl: string
): Promise<StatusResponse<TOperationalIndicatorsRecord>> => {
  return new Promise((resolve, reject) => {
    const db = dbCLient(dbUrl);
    // check if the client exits first
    db.query.dashbaord
      .findFirst({ where: eq(dashbaord.id, dashbaordId) })
      .then((client) => {
        if (client) {
          //store the entries in the table [given the dashbaord type]
          db.insert(dashboardIndicatorTables[dashboardType])
            .values({ dashbaordId, entriesId, ...indicators })

            .onConflictDoUpdate({
              target: dashboardEntryTables[dashboardType].dashbaordId,
              // @ts-ignore
              set: { ...indicators },
            })
            .returning()
            .then((record) => {
              resolve({
                status: "success",
                data: record,
              });
            })
            .catch((e: any) => {
              reject({
                status: "error",
                message: e,
              });
            });
        } else
          reject({
            status: "error",
            message: "no dashboard is here",
          });
      })
      .catch((e) => {
        reject({
          status: "error",
          message: e,
        });
      });
  });
};

// save indicators for the general dashboard

export const saveIndicatorsForGeneralDashboard = async (
  dashbaordId: number,
  entriesId: string,
  indicators: TDashboardIndicators,
  categoryType: CategoryType,
  dbUrl: string
): Promise<StatusResponse<TOperationalIndicatorsRecord>> => {
  return new Promise((resolve, reject) => {
    const db = dbCLient(dbUrl);
    // check if the client exits first
    db.query.dashbaord
      .findFirst({ where: eq(dashbaord.id, dashbaordId) })
      .then((client) => {
        if (client) {
          //store the entries in the table [given the dashbaord type]
          db.insert(dashboardIndicatorTables[categoryType])
            .values({ dashbaordId, entriesId, ...indicators })

            .onConflictDoUpdate({
              target: dashboardEntryTables[categoryType].dashbaordId,
              // @ts-ignore
              set: { ...indicators },
            })
            .returning()
            .then((record) => {
              resolve({
                status: "success",
                data: record,
              });
            })
            .catch((e: any) => {
              reject({
                status: "error",
                message: e,
              });
            });
        } else
          reject({
            status: "error",
            message: "no dashboard is here",
          });
      })
      .catch((e) => {
        reject({
          status: "error",
          message: e,
        });
      });
  });
};

export const createDashboard = (
  dashboardData: TDashboard,
  dbUrl: string
): Promise<StatusResponse<TDashboardRecord>> => {
  console.log("create dashbaord db:", dashboardData);

  return new Promise((resolve, reject) => {
    const db = dbCLient(dbUrl);
    db.insert(dashbaord)
      .values(dashboardData)
      .returning()
      .then((res) => {
        resolve({ status: "success", data: res });
      })
      .catch((e) => {
        reject({
          status: "error",
          message: "error in creating a new dashboard" + e,
        });
      });
  });
};

export const retrieveAllDashboardsForClient = (
  orgId: string,
  dbUrl: string
): Promise<StatusResponse<TDashboardRecord[]>> => {
  //TODO: 1.retrieve all records from the dashboard table with client id
  return new Promise((resolve, reject) => {
    const db = dbCLient(dbUrl);
    db.query.dashbaord
      .findMany({ where: eq(dashbaord.orgId, Number(orgId)) })
      .then((res: TDashboardRecord[]) => {
        resolve({ status: "success", data: res });
      })
      .catch((e) => {
        reject({
          status: "error",
          message: "error occured in [retrieveAllDashboardsForClient]:" + e,
        });
      });
  });
};

export const getDashboardsOverviewForOrg = (
  orgId: string,
  dbUrl: string
): Promise<StatusResponse<any[]>> => {
  return new Promise((resolve, reject) => {
    const db = dbCLient(dbUrl);
    db.query.dashbaord
      .findMany({ where: eq(dashbaord.orgId, Number(orgId)) })
      .then((res: TDashboardRecord[]) => {
        const transformedResponse = res.map((record) => ({
          id: record.id,
          title: record.title,
          status: getDashboardStatus({
            entriesId: record.entriesId,
            indicatorsId: record.indicatorsId,
          }),
        }));

        resolve({ status: "success", data: transformedResponse });
      })
      .catch((e) => {
        reject({
          status: "error",
          message: "error occured in [getDashboardsOverviewForOrg]:" + e,
        });
      });
  });
};

//todo: implement this
export const retrieveDashboardContent = (
  dashboardData: TDashboard,
  mode: "ENTRIES" | "INDICATORS" | "ALL"
) => {
  //TODO: 1.retrieve   records from the dashboard table with org id
  //2. depending on the type you decide the table you are going to fetch from
  //3. the fetching would be diffrent if it's a general dashboard
};
export const getDashboardIndicators = (
  dashbaordId: number,
  dashboardType: Exclude<DashboardType, "GENERAL">,
  dbUrl: string
): Promise<StatusResponse<any[]>> => {
  const db = dbCLient(dbUrl);
  return new Promise((resolve, reject) => {
    db.select()
      .from(dashboardIndicatorTables[dashboardType])
      .where(
        eq(dashboardIndicatorTables[dashboardType].dashbaordId, dashbaordId)
      )
      .then((res) => {
        resolve({ status: "success", data: res });
      })
      .catch((e) => {
        reject({
          status: "error",
          message: "error occured in [getDashboardIndicators]:" + e,
        });
      });
  });
};

export const getDashboardEntries = async (
  dashbaordId: number,
  dashboardType: DashboardType,
  dbUrl: string
): Promise<StatusResponse<any[]>> => {
  const db = dbCLient(dbUrl);
  let categoryType = null;

  //todo: if the dashboard type is general then find the category
  if (dashboardType === "GENERAL") {
    const currentDashboardRec = await db
      .select()
      .from(dashbaord)
      .where(and(eq(dashbaord.id, dashbaordId), isNotNull(dashbaord.category)));

    categoryType = currentDashboardRec.length
      ? (currentDashboardRec[0].category
          ?.toString()
          .toLocaleUpperCase() as CategoryType)
      : null;
    if (categoryType === null) return { status: "success", data: [] };
  }

  const entryTable =
    dashboardType === "GENERAL" && categoryType !== null
      ? dashboardEntryTables[categoryType]
      : dashboardEntryTables[
          dashboardType as Exclude<DashboardType, "GENERAL">
        ];

  return new Promise((resolve, reject) => {
    db.select()
      .from(entryTable)
      .where(eq(entryTable.dashbaordId, dashbaordId))
      .then((res) => {
        resolve({ status: "success", data: res });
      })
      .catch((e) => {
        reject({
          status: "error",
          message: "error occured in [getDashboardEntries]:" + e,
        });
      });
  });
};

export const getGeneralDashboardIndicatorsForOneOrg = async (
  dashbaordId: number,
  orgId: number,
  dbUrl: string
): Promise<StatusResponse<any>> => {
  const db = dbCLient(dbUrl);
  let generalIndicators = {};

  try {
    //todo: check if the org has financial dashboard
    // if it has, retrive the values of :ECO_RETURN_VOLUN,FINANCIAL_PERF,ADMIN_EXPENSES
    const finResult = await db
      .select({
        ECO_RETURN_VOLUN: financialIndicators.ECO_RETURN_VOLUN,
        FINANCIAL_PERF: financialIndicators.FINANCIAL_PERF,
        ADMIN_EXPENSES: financialIndicators.ADMIN_EXPENSES,
      })
      .from(financialIndicators)
      .innerJoin(dashbaord, eq(dashbaord.id, financialIndicators.dashbaordId))
      .where(eq(dashbaord.orgId, orgId));
    console.log("finResult:", finResult);
    if (finResult.length) {
      console.log("yay????");

      generalIndicators = { ...generalIndicators, ...finResult[0] };
    }

    //todo: check if the org has corporate dashboard
    // if it has, retrive the values of :CORPORATE_PERFORMANCE,VOLUN_SATIS_MEASURMENT,BENEF_SATIS_MEASURMENT,ADMIN_ORG_SATIS_MEASURMENT
    const corResult = await db
      .select({
        CORPORATE_PERFORMANCE: corporateIndicators.CORORATE_PERFORMANCE,
        VOLUN_SATIS_MEASURMENT: corporateIndicators.VOLUN_SATIS_MEASURMENT,
        BENEF_SATIS_MEASURMENT: corporateIndicators.BENEF_SATIS_MEASURMENT,
        ADMIN_ORG_SATIS_MEASURMENT:
          corporateIndicators.ADMIN_ORG_SATIS_MEASURMENT,
      })
      .from(corporateIndicators)
      .innerJoin(dashbaord, eq(dashbaord.id, corporateIndicators.dashbaordId))
      .where(eq(dashbaord.orgId, orgId));
    console.log("corResult:", corResult);
    if (corResult.length) {
      generalIndicators = { ...generalIndicators, ...corResult[0] };
    }

    //todo: check if the org has operational dashboard
    // if it has, retrive the values of :OPS_PLAN_EXEC,PRJKT_PRGM_MGMT,EFFIC_INTERNAL_OPS,VOLN_MGMT
    const opResult = await db
      .select({
        OPS_PLAN_EXEC: operationalIndicators.OPS_PLAN_EXEC,
        PRJKT_PRGM_MGMT: operationalIndicators.PRJKT_PRGM_MGMT,
        EFFIC_INTERNAL_OPS: operationalIndicators.EFFIC_INTERNAL_OPS,
        VOLN_MGMT: operationalIndicators.VOLN_MGMT,
      })
      .from(operationalIndicators)
      .innerJoin(dashbaord, eq(dashbaord.id, operationalIndicators.dashbaordId))
      .where(eq(dashbaord.orgId, orgId));
    console.log("opResult:", opResult);
    if (opResult.length) {
      generalIndicators = { ...generalIndicators, ...opResult[0] };
    }

    //todo: check if the dashboard has any category
    const currentDashboardRec = await db
      .select()
      .from(dashbaord)
      .where(and(eq(dashbaord.id, dashbaordId), isNotNull(dashbaord.category)));

    const category =
      currentDashboardRec.length &&
      (currentDashboardRec[0].category
        ?.toString()
        .toLocaleUpperCase() as CategoryType);

    const indicatorsTablesCategory = {
      MOSQUES: mosquesIndicators,
      ORPHANS: orphansIndicators,
    };
    if (category === "MOSQUES" || category === "ORPHANS") {
      const categoryIndicators = await db
        .select()
        .from(indicatorsTablesCategory[category])
        .where(eq(indicatorsTablesCategory[category].dashbaordId, dashbaordId));
      if (categoryIndicators) {
        generalIndicators = {
          ...generalIndicators,
          category_data: { category, ...categoryIndicators[0] },
        };
      }
    }
    console.log("generalIndicators::", generalIndicators);

    return { status: "success", data: generalIndicators };
  } catch (e) {
    return {
      status: "error",
      message: "error occured in [getGeneralDashboardIndicatorsForOneOrg]:" + e,
    };
  }

  //  const result = await  db.select({financialIndicatorsSetting:organization.financialIndicatorsSetting,
  //     operationalIndicatorsSetting:organization.operationalIndicatorsSetting,
  //     corporateIndicatorsSetting:organization.corporateIndicatorsSetting}).from(organization).where(  eq(organization.id, orgId),)
  //     const { financialIndicatorsSetting, operationalIndicatorsSetting,corporateIndicatorsSetting } = result[0];
};
