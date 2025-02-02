import { and, eq, isNotNull, sql } from "drizzle-orm";
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
  orgId: number,
  entries: TDashboardEntries,
  dashboardType: Exclude<DashboardType, "GENERAL">,
  dbUrl: string
): Promise<StatusResponse<TOperationalEntriesRecord | any>> => {
  const db = dbCLient(dbUrl);

  return new Promise(async (resolve, reject) => {
    try {
    
      const currentDashboardRec = await db
        .select()
        .from(dashbaord)
        .where(
          and(
            eq(dashbaord.orgId, orgId),
            sql`UPPER(${dashbaord.type}) = UPPER(${dashboardType})`
          )
        );
      
      if (currentDashboardRec.length === 0) {
        reject({
          status: "error",
          message: "NO_SUCH_DASHBOARD",
        });
        return;
      }

      // check if the client exists first
      const client = await db.query.dashbaord
        .findFirst({
          where: and(
            eq(dashbaord.id, currentDashboardRec[0].id),
            eq(dashbaord.type, dashboardType.toLowerCase())
          ),
        });

      if (!client) {
        reject({
          status: "error",
          message: "no dashboard is here",
        });
        return;
      }

      // store the entries in the table [given the dashboard type]
      const record = await db
        .insert(dashboardEntryTables[dashboardType])
        .values({ dashbaordId: currentDashboardRec[0].id, ...entries })
        .onConflictDoUpdate({
          target: dashboardEntryTables[dashboardType].dashbaordId,
          // @ts-ignore
          set: { ...entries },
        })
        .returning();
      

        db.update(dashbaord)
        .set({ entriesId: record[0].id }).
        where( 
          eq(dashbaord.id, currentDashboardRec[0].id),
        ).then(()=>{
          resolve({
            status: "success",
            data: record,
          });
        })

   
      
    } catch (error: any) {
      reject({
        status: "error",
        message: error,
      });
    }
  });
};

// save entries for the general dashboards with categories
export const saveEntriesForGeneralDashboard = async (
  orgId: number,
  entries: TDashboardEntries,
  categoryType: CategoryType,
  dbUrl: string
): Promise<
  StatusResponse<TOrphansIndicatorsRecord | TMosquesIndicatorsRecord | any>
> => {
  return new Promise(async (resolve, reject) => {
    const db = dbCLient(dbUrl);

    try {
      const currentDashboardRec = await db
        .select()
        .from(dashbaord)
        .where(
          and(
            eq(dashbaord.orgId, orgId),
            isNotNull(dashbaord.category),
            sql`UPPER(${dashbaord.type}) = UPPER('GENERAL')`
          )
        );

      if (currentDashboardRec.length === 0) {
        reject({
          status: "error",
          message: "NO_SUCH_DASHBOARD",
        });
        return;
      }

      // check if the client exists first
      const rec = await db.query.dashbaord
        .findFirst({
          where: and(
            eq(dashbaord.id, currentDashboardRec[0].id),
            eq(dashbaord.category, categoryType.toLowerCase())
          ),
        });

      console.log("rec::::::", rec);

      if (!rec) {
        reject({
          status: "error",
          message: "DASHBOARD_NOT_FOUND",
        });
        return;
      }

      //store the entries in the table [given the dashboard type]
      console.log("entries", entries);
      const record = await db
        .insert(dashboardEntryTables[categoryType])
        .values({ dashbaordId: currentDashboardRec[0].id, ...entries })
        .onConflictDoUpdate({
          target: dashboardIndicatorTables[categoryType].dashbaordId,
          // @ts-ignore
          set: { ...entries },
        })
        .returning();
        db.update(dashbaord)
        .set({ entriesId: record[0].id }).
        where( and(
          eq(dashbaord.id, currentDashboardRec[0].id),
        )).then(()=>{
          resolve({
            status: "success",
            data: record,
          });
        })

    

    } catch (error: any) {
      reject({
        status: "error",
        message: error,
      });
    }
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
    console.log("saveIndicatorsForDashboard:dashbaordId",dashbaordId);
    

    // check if the client exits first
    db.query.dashbaord
      .findFirst({ where: eq(dashbaord.id, dashbaordId) })
      .then((client) => {
        if (client) {
          //store the entries in the table [given the dashbaord type]
          db.insert(dashboardIndicatorTables[dashboardType])
            .values({ dashbaordId, entriesId, ...indicators })

            .onConflictDoUpdate({
              target: dashboardIndicatorTables[dashboardType].dashbaordId ,
              // @ts-ignore
              set: { ...indicators },
            })
            .returning()
            .then((record) => {

              db.update(dashbaord)
              .set({ indicatorsId: record[0].id }).
              where( and(
                eq(dashbaord.id, dashbaordId),
              )).then(()=>{
                resolve({
                  status: "success",
                  data: record,
                });
              })
            
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
              db.update(dashbaord)
              .set({ indicatorsId: record[0].id }).
              where( 
                eq(dashbaord.id, dashbaordId),
              ).then(()=>{
                resolve({
                  status: "success",
                  data: record,
                });
              })
             
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
        console.log("record::::", res);
          
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

export const getDashboardIndicators = (
  orgId: number,
  dashboardType: Exclude<DashboardType, "GENERAL">,
  dbUrl: string
): Promise<StatusResponse<any[]>> => {
  const db = dbCLient(dbUrl);
  return new Promise(async (resolve, reject) => {
    const currentDashboardRec = await db
      .select()
      .from(dashbaord)
      .where(
        and(
          eq(dashbaord.orgId, orgId),
          sql`UPPER(${dashbaord.type}) = UPPER(${dashboardType})`
        )
      );
    if (currentDashboardRec.length == 0) {
      reject({
        status: "error",
        message: "NO_SUCH_DASHBOARD",
      });
    }
    db.select()
      .from(dashboardIndicatorTables[dashboardType])
      .where(
        eq(
          dashboardIndicatorTables[dashboardType].dashbaordId,
          currentDashboardRec[0].id
        )
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
  orgId: number,
  dashboardType: DashboardType,
  dbUrl: string
): Promise<StatusResponse<any[]>> => {
  const db = dbCLient(dbUrl);
  return new Promise(async (resolve, reject) => {
    let categoryType = null;
    const condition =
      dashboardType === "GENERAL"
        ? isNotNull(dashbaord.category)
        : sql`UPPER(${dashbaord.type}) = UPPER(${dashboardType})`;
    const currentDashboardRec = await db
      .select()
      .from(dashbaord)
      .where(and(eq(dashbaord.orgId, orgId), condition));

    console.log("current dashboard", currentDashboardRec);
    if (currentDashboardRec.length == 0) {
      reject({
        status: "error",
        message: "NO_SUCH_DASHBOARD",
      });
    }
    if (dashboardType === "GENERAL") {
      categoryType = currentDashboardRec[0].category
        ? (currentDashboardRec[0].category
            ?.toString()
            .toLocaleUpperCase() as CategoryType)
        : null;
      if (categoryType === null) resolve({ status: "success", data: [] });
    }

    const entryTable =
      dashboardType === "GENERAL" && categoryType !== null
        ? dashboardEntryTables[categoryType]
        : dashboardEntryTables[
            dashboardType as Exclude<DashboardType, "GENERAL">
          ];

    db.select()
      .from(entryTable)
      .where(eq(entryTable.dashbaordId, currentDashboardRec[0].id))
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


    console.log("generalIndicators::",generalIndicators);
    
    try {
      const whereCondition = and(
          eq(dashbaord.orgId, orgId),
          isNotNull(dashbaord.category)
      );
      
      console.log("Where condition:", whereCondition);
      
      const currentDashboardRec = await db
          .select()
          .from(dashbaord)
          .where(whereCondition);
          
      console.log("currentDashboardRec::", currentDashboardRec);
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
        .where(
          eq(
            indicatorsTablesCategory[category].dashbaordId,
            currentDashboardRec[0].id
          )
        );
      if (categoryIndicators) {
        generalIndicators = {
          ...generalIndicators,
          category_data: { category, ...categoryIndicators[0] },
        };
      }
    }
      
  } catch (error:any) {
   console.log("error:::", error);
   
      throw error;
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



