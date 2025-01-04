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
  dashbaord,
  financialEntries,
  operationalEntries,
  operationalIndicators,
  user,
} from "../schema";
import { StatusResponse } from "../../types/types";
type DashboardType = "OPERATIONAL" | "CORPRATE" | "FINANCIAL";

const dashboardEntryTables = {
  OPERATIONAL: operationalEntries,
  CORPRATE: corporateEntries,
  FINANCIAL: financialEntries,
};

const dashboardIndicatorTables = {
  OPERATIONAL: operationalIndicators,
  CORPRATE: operationalIndicators,
  FINANCIAL: operationalIndicators,
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
      .findFirst({ where: eq(dashbaord.id, dashbaordId) })
      .then((client) => {
        if (client) {
          //store the entries in the table [given the dashbaord type]
          db.insert(dashboardEntryTables[dashboardType])
            .values({ dashbaordId, ...entries })
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
export const retrieveAllDashboardsForClient = (clientId: string,dbUrl:string):Promise<StatusResponse<TDashboardRecord[]>>=>{
    //TODO: 1.retrieve all records from the dashboard table with client id 
    return new Promise((resolve, reject) => {
        const db = dbCLient(dbUrl);
        db.query.dashbaord.findMany({ where: eq(dashbaord.clientId, clientId) }).then((res:TDashboardRecord[])=>{
            resolve({status:"success",data:res})
        }).catch((e)=>{
            reject({status:"error",message:"error occured in [retrieveAllDashboardsForClient]:"+e})

        })
    })

}

//todo: implement this 
export const retrieveDashboardContent = (dashboardData:TDashboard, mode:"ENTRIES"|"INDICATORS"|"ALL")=>{
    //TODO: 1.retrieve   records from the dashboard table with client id 
    //2. depending on the type you decide the table you are going to fetch from 
    //3. the fetching would be diffrent if it's a general dashboard 
 



}
