import { eq } from "drizzle-orm";
import { dbCLient } from "../db-client";
import {
  TDashboard,
  TDashboardEntries,
  TDashboardIndicators,
  TDashboardRecord,
  TOperationalEntriesRecord,
  TOperationalIndicatorsRecord,
} from "../types";
import {
  corporateEntries,
  corporateIndicators,
  dashbaord,
  financialEntries,
  financialIndicators,
  operationalEntries,
  operationalIndicators,
} from "../schema";
import { StatusResponse } from "../../types/types";
import { getDashboardStatus } from "./utils";
type DashboardType = "OPERATIONAL" | "CORPORATE" | "FINANCIAL";

const dashboardEntryTables = {
  OPERATIONAL: operationalEntries,
  CORPORATE: corporateEntries,
  FINANCIAL: financialEntries,
};

const dashboardIndicatorTables = {
  OPERATIONAL: operationalIndicators,
  CORPORATE: corporateIndicators,
  FINANCIAL: financialIndicators,
};

export const saveEntriesForDashboard = async (
  dashbaordId: number,
  entries: TDashboardEntries,
  dashboardType: DashboardType,
  dbUrl: string
): Promise<StatusResponse<TOperationalEntriesRecord | any>> => {
  return new Promise((resolve, reject) => {
    const db = dbCLient(dbUrl);
    // check if the client exits first
    db.query.dashbaord
      .findFirst({ where: eq(dashbaord.id, dashbaordId) && eq(dashbaord.type, dashboardType.toLowerCase()) })
      .then((client) => {
        if (client) {
          //store the entries in the table [given the dashbaord type]
          db.insert(dashboardEntryTables[dashboardType])
          
            .values({ dashbaordId, ...entries })
            // @ts-ignore
            .onConflictDoUpdate({target:dashboardEntryTables[dashboardType].dashbaordId,set:{...entries}})
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

export const saveIndicatorsForDashboard = async (
  dashbaordId: number,
  entriesId: string,
  indicators: TDashboardIndicators,
  dashboardType: DashboardType,
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
            // @ts-ignore

            .onConflictDoUpdate({target:dashboardEntryTables[dashboardType].dashbaordId,set:{...indicators}})
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

//!not tested
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
          id:record.id,
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
export const getDashboardIndicators = (  dashbaordId: number,
  dashboardType: DashboardType,
  dbUrl: string):Promise<StatusResponse<any[]>>=>{
    const db = dbCLient(dbUrl);
    return new Promise((resolve, reject) => {
      db.select().from(dashboardIndicatorTables[dashboardType])
      .where(eq(dashboardIndicatorTables[dashboardType].dashbaordId, dashbaordId)).then((res)=>{
        resolve({ status: "success", data: res });
      }).catch((e)=>{
        reject({
          status: "error",
          message: "error occured in [getDashboardIndicators]:" + e,
        });
      
      })
    })
 


}



export const getDashboardEntries = (  dashbaordId: number,
  dashboardType: DashboardType,
  dbUrl: string):Promise<StatusResponse<any[]>>=>{
    const db = dbCLient(dbUrl);
    return new Promise((resolve, reject) => {
      db.select().from(dashboardEntryTables[dashboardType])
      .where(eq(dashboardEntryTables[dashboardType].dashbaordId, dashbaordId)).then((res)=>{
        resolve({ status: "success", data: res });
      }).catch((e)=>{
        reject({
          status: "error",
          message: "error occured in [getDashboardEntries]:" + e,
        });
      
      })
    })
 


}
