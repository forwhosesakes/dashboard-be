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
  governanceEntries,
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



type GovernanceType = 
  | "COMPLIANCE_ADHERENCE_PRACTICES"
  | "FINANCIAL_SAFETY_PRACTICES"
  | "TRANSPARENCY_DISCLOSURE_PRACTICES";

  export const saveGovernanceEntries = async (
    orgId: number,
    responses: Record<string, any>,
    type: GovernanceType,
    dbUrl: string
  ): Promise<StatusResponse<any>> => {
    return new Promise(async (resolve, reject) => {
      const db = dbCLient(dbUrl);
  
      try {
        // Calculate total score
        const totalScore = Object.values(responses).reduce((sum, value) => sum + (Number(value.toString().split("-")[0])), 0);
        
  
        // Find the general dashboard for this organization
        const currentDashboard = await db
          .select()
          .from(dashbaord)
          .where(
            and(
              eq(dashbaord.orgId, orgId),
              sql`UPPER(${dashbaord.type}) = UPPER('CORPORATE')`
            )
          );

  
        if (currentDashboard.length === 0) {
          reject({
            status: "error",
            message: "NO_SUCH_DASHBOARD",
          });
          return;
        }
  
        const dashboardId = currentDashboard[0].id;
  
      // Store raw responses in governance entries
     // Store raw responses in governance entries with onConflictDoUpdate
     const governanceRecord = await db.insert(governanceEntries)
     .values({
       dashbaordId: dashboardId,
       [type]: JSON.stringify(responses),
       [type+"_TOTAL"]:totalScore
     })
     .onConflictDoUpdate({
       target: governanceEntries.dashbaordId,
       set: { 
         [type]: JSON.stringify(responses),
       [type+"_TOTAL"]:totalScore

       }
     })
     .returning();
        resolve({
          status: "success",
          data: {
            score: totalScore,
            entries: governanceRecord[0]
          }
        });
  
      } catch (error: any) {
        console.log("error in [saveGovernanceEntries]",error);
        
        reject({
          status: "error",
          message: error,
        });
      }
    });
  };
  
  export const getGovernanceEntries = async (
    orgId: number,
    type: GovernanceType,
    dbUrl: string
  ): Promise<StatusResponse<any>> => {
    return new Promise(async (resolve, reject) => {
      const db = dbCLient(dbUrl);
  
      try {
        // Find the general dashboard for this organization
        const currentDashboard = await db
          .select()
          .from(dashbaord)
          .where(
            and(
              eq(dashbaord.orgId, orgId),
              sql`UPPER(${dashbaord.type}) = UPPER('CORPORATE')`

            )
          );
  
        if (currentDashboard.length === 0) {
          reject({
            status: "error",
            message: "NO_SUCH_DASHBOARD",
          });
          return;
        }
  
        const dashboardId = currentDashboard[0].id;
  
        // Get governance entries content
        const governanceEntry = await db.query.governanceEntries.findFirst({
          where: and(
            eq(governanceEntries.dashbaordId, dashboardId),
          )
        });
  
        if (!governanceEntry) {
          resolve({
            status: "success",
            data: null
          });
          return;
        }
  
        resolve({
          status: "success",
          data: {records:governanceEntry[type],total:governanceEntry[type+"_TOTAL" as keyof typeof governanceEntry]}
        });
  
      } catch (error: any) {
        console.log("error in [getGovernanceEntries]",error );
        
        reject({
          status: "error",
          message: error,
        });
      }
    });
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
            .toLocaleUpperCase() as CategoryType | "NONE")
        : null;
        console.log("we should be here:::", categoryType)

      if (categoryType === null || categoryType === "NONE") {
    console.log("we should be here:::", categoryType)

        resolve({ status: "success", data: [] });}
    }

    const entryTable =
      dashboardType === "GENERAL" && categoryType !== null && categoryType !== "NONE"
        ? dashboardEntryTables[categoryType]
        : dashboardEntryTables[
            dashboardType as Exclude<DashboardType, "GENERAL">
          ];

    db.select()
      .from(entryTable)
      .where(eq(entryTable.dashbaordId, currentDashboardRec[0].id))
      .then((res) => {
        console.log("getDashboardEntries::", res)
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

//Removes entries and indicators record for a dashboard (given orginzation and type)
export const removeEntriesAndIndicators= async(orgId: number,
  dashboardType: DashboardType,
  dbUrl: string) :Promise<StatusResponse<any[]>>=>{
    try {
  const db = dbCLient(dbUrl);
  
      // First get the dashboard ID for this org and type
      const dashboard = await db.select().from(dashbaord)
        .where(and(eq(dashbaord.orgId,orgId),eq(dashbaord.type, dashboardType)))

        .limit(1);
  
      if (!dashboard || dashboard.length === 0) {
        throw new Error(`No dashboard found for organization ${orgId} with type ${dashboardType}`);
      }
  
      const dashboardId = dashboard[0].id;
  
      // Delete entries and indicators based on dashboard type
      switch (dashboardType.toLowerCase()) {
        case 'corporate':
          // Delete indicators first due to foreign key constraint
          await db.delete(corporateIndicators)
            .where(eq(corporateIndicators.dashbaordId, dashboardId));
          // Then delete entries
          await db.delete(corporateEntries)
            .where(eq(corporateEntries.dashbaordId, dashboardId));
            
          break;
        
        case 'operational':
          await db.delete(operationalIndicators)
            .where(eq(operationalIndicators.dashbaordId, dashboardId));
          await db.delete(operationalEntries)
            .where(eq(operationalEntries.dashbaordId, dashboardId));
          break;
        
        case 'financial':
          await db.delete(financialIndicators)
            .where(eq(financialIndicators.dashbaordId, dashboardId));
          await db.delete(financialEntries)
            .where(eq(financialEntries.dashbaordId, dashboardId));
          break;
        
        case 'mosques':
          await db.delete(mosquesIndicators)
            .where(eq(mosquesIndicators.dashbaordId, dashboardId));
          await db.delete(mosquesEntries)
            .where(eq(mosquesEntries.dashbaordId, dashboardId));
          break;
        
        case 'orphans':
          await db.delete(orphansIndicators)
            .where(eq(orphansIndicators.dashbaordId, dashboardId));
          await db.delete(orphansEntries)
            .where(eq(orphansEntries.dashbaordId, dashboardId));
          break;
     
        
        default:
          throw new Error(`Unsupported dashboard type: ${dashboardType}`);
      }
  
      return {
        status: "success",
        message: `Successfully removed ${dashboardType} entries and indicators for organization ${orgId}`
      };
  
    } catch (e) {
   
      throw e instanceof Error ? e : new Error("Unknown error occurred");
    }
           

}

export const getGeneralDashboardIndicatorsForOneOrg = async (
  orgId: number,
  dbUrl: string
): Promise<StatusResponse<any>> => {
  const db = dbCLient(dbUrl);
  let generalIndicators:any = {};

  try {
    //todo: check if the org has financial dashboard
    // if it has, retrive the values of :ECO_RETURN_VOLUN,FINANCIAL_PERF,ADMIN_EXPENSES
    const finResult = await db
      .select({
        ECONOMIC_RETURN_OF_VOLUNTEERING: financialIndicators.ECONOMIC_RETURN_OF_VOLUNTEERING,
        FINANCIAL_PERF: financialIndicators.FINANCIAL_PERF,
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
        VOLUN_SATIS_MEASURMENT: corporateIndicators.VOLUN_SATIS_MEASURMENT,
        BENEF_SATIS_MEASURMENT: corporateIndicators.BENEF_SATIS_MEASURMENT,
        EMP_SATIS_MEASURMENT: corporateIndicators.EMP_SATIS_MEASURMENT,
        PARTENERS_SATIS_MEASURMENT: corporateIndicators.PARTENERS_SATIS_MEASURMENT,
        DONATORS_SATIS_MEASURMENT: corporateIndicators.DONATORS_SATIS_MEASURMENT,
        ADMIN_ORG_SATIS_MEASURMENT: corporateIndicators.ADMIN_ORG_SATIS_MEASURMENT,
        COMMUNITY_SATIS_MEASURMENT:  corporateIndicators.COMMUNITY_SATIS_MEASURMENT,
      })
      .from(corporateIndicators)
      .innerJoin(dashbaord, eq(dashbaord.id, corporateIndicators.dashbaordId))
      .where(eq(dashbaord.orgId, orgId));
    console.log("corResult:", corResult);
    if (corResult.length) {
      const AVG_SATIS_MEASURMENT= Object.values(corResult[0]).reduce((accumulator, currentValue)=> accumulator + Number(currentValue),0)
      generalIndicators = { ...generalIndicators, ...corResult[0] ,AVG_SATIS_MEASURMENT};
    }

    const opResult = await db
      .select({
        BUDGET_COMMIT_PERC: operationalIndicators.BUDGET_COMMIT_PERC,
        PGRM_PRJKS_EXEC_PERC: operationalIndicators.PGRM_PRJKS_EXEC_PERC,
      
      })
      .from(operationalIndicators)
      .innerJoin(dashbaord, eq(dashbaord.id, operationalIndicators.dashbaordId))
      .where(eq(dashbaord.orgId, orgId));
    if (opResult.length) {
      generalIndicators = { ...generalIndicators, ...opResult[0] };
    }
    try {
      const whereCondition = and(
          eq(dashbaord.orgId, orgId),
          isNotNull(dashbaord.category)
      );
      
      const currentDashboardRec = await db
          .select()
          .from(dashbaord)
          .where(whereCondition);
          
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
  

    return { status: "success", data: [generalIndicators] };
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



