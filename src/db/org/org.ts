import { count, eq } from "drizzle-orm";
import { StatusResponse } from "../../types/types";
import { dbCLient } from "../db-client";
import { organization } from "../schema";
import { PaginatedResponse, PaginationParams, TOrganization, TOrganizationOverview, TOrganizationOverviewRecord, TOrganizationRecord } from "../types";
import { mapSettingtoDashbaordType } from "../../lib/constants";



export const createUpdateOrg = (org:TOrganization|TOrganizationRecord, dbUrl: string):Promise<StatusResponse<TOrganizationRecord | any>> =>{

    return new Promise((resolve, reject) => {
        const db = dbCLient(dbUrl);

        db.insert(organization).values(org) 
        .onConflictDoUpdate({target:organization.id, set:{...org}})
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
    
    
    
    })
    


}

export const retrieveOrg = async (
    orgId: number, 
    dbUrl: string
  ): Promise<StatusResponse<TOrganizationRecord>> => {
    // Input validation
    if (!dbUrl) {
      return {
        status: "error",
        message: "Database URL is required"
      };
    }
  
    if (!Number.isInteger(orgId) || orgId < 1) {
      return {
        status: "error",
        message: "Organization ID must be a positive integer"
      };
    }
  
    try {
      const db = dbCLient(dbUrl);
      const record = await db.query.organization.findFirst({ 
        where: eq(organization.id, orgId) 
      });
  
      if (!record) {
        return {
          status: "warning",
          message: `No organization found with ID: ${orgId}`
        };
      }
  
      return {
        status: "success",
        data: record
      };
  
    } catch (error) {
      if (error instanceof Error) {
        // Handle connection errors
        if (error.message.includes('connection')) {
          return {
            status: "error",
            message: "Database connection failed"
          };
        }
        
        // Handle timeout errors
        if (error.message.includes('timeout')) {
          return {
            status: "error",
            message: "Database query timed out"
          };
        }
  
        return {
          status: "error",
          message: error.message
        };
      }
  
      return {
        status: "error",
        message: "An unexpected error occurred"
      };
    }
  };

export const getLatestNOrgs = async (
    n: number=5,
    dbUrl: string
  ): Promise<StatusResponse<TOrganizationRecord[]>> => {
    // Input validation
    if (!dbUrl) {
      return {
        status: "error",
        message: "Database URL is required"
      };
    }
  
    if (!Number.isInteger(n) || n <= 0) {
      return {
        status: "error",
        message: "Number of organizations must be a positive integer"
      };
    }
  
    try {
      const db = dbCLient(dbUrl);
      
      const records = await db.query.organization.findMany({
        orderBy: (orgs, { desc }) => [desc(orgs.createdAt)],
        limit: n
      });
  
      if (!Array.isArray(records)) {
        return {
          status: "warning",
          message: "Invalid response format from database"
        };
      }
  
      return {
        status: "success",
        data: records
      };
  
    } catch (error) {
      if (error instanceof Error) {
        // Handle connection errors
        if (error.message.includes('connection')) {
          return {
            status: "error",
            message: "Database connection failed"
          };
        }
        
        // Handle timeout errors
        if (error.message.includes('timeout')) {
          return {
            status: "error",
            message: "Database query timed out"
          };
        }
  
        return {
          status: "error",
          message: error.message
        };
      }
  
      return {
        status: "error",
        message: "An unexpected error occurred"
      };
    }
  };


export const getPaginatedOrgs = async (
    dbUrl: string,
    { page = 1, limit = 50 }: PaginationParams = {}
  ): Promise<PaginatedResponse<TOrganizationRecord>> => {
    const offset = (page - 1) * limit;
    
    try {
      const db = dbCLient(dbUrl);
      
      // Get total count and paginated records in parallel
      const [[{count:totalCount}], records] = await Promise.all([
        db.select({ count: count() }).from(organization),
        db.query.organization.findMany({
          limit: limit,
          offset: offset,
        })
      ]);
  
      const totalPages = Math.ceil(totalCount / limit);
      
      return {
        status: "success",
        data: records,
        pagination: {
          total: totalCount,
          currentPage: page,
          totalPages: totalPages,
          limit: limit,
          hasMore: page < totalPages
        }
      };
    } catch (error: any) {
      throw {
        status: "error",
        message: error,
      };
    }
  };


export const getPaginatedOrgsOverview = async (
  dbUrl: string,
  { page = 1, limit = 10 }: PaginationParams = {}
): Promise<PaginatedResponse<TOrganizationOverview>> => {
  const offset = (page - 1) * limit;
  
  try {
    const db = dbCLient(dbUrl);
    
    // Get total count and paginated records in parallel
    const [[{count:totalCount}], records] = await Promise.all([
      db.select({ count: count() }).from(organization),
      db.query.organization.findMany({
        limit: limit,
        offset: offset,
        columns:{
          id:true, 
          name:true, 
          email:true, 
          financialIndicatorsSetting:true, 
          corporateIndicatorsSetting:true, 
          operationalIndicatorsSetting:true, 
          generalndicatorsSetting:true,
        }
       
      })
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const result = records.map((record)=>{
    let dashboards: string[]= [];

    (["financialIndicatorsSetting", "corporateIndicatorsSetting","operationalIndicatorsSetting","generalndicatorsSetting"]).forEach((el: string)=>{
       if(Number(record[el as keyof TOrganizationOverviewRecord]) >0) {
        dashboards.push(mapSettingtoDashbaordType[el as keyof typeof mapSettingtoDashbaordType])
       }

      
      }
    
    )
    return {
      id:record.id,
      name:record.name,
      email:record.email,
      dashboards
     }
    })
    
    return {
      status: "success",
      data: result,
      pagination: {
        total: totalCount,
        currentPage: page,
        totalPages: totalPages,
        limit: limit,
        hasMore: page < totalPages
      }
    };
  } catch (error: any) {
    throw {
      status: "error",
      message: error,
    };
  }
};