import { count, eq } from "drizzle-orm";
import { StatusResponse } from "../../types/types";
import { dbCLient } from "../db-client";
import {
  corporateEntries,
  corporateIndicators,
  dashbaord,
  financialEntries,
  financialIndicators,
  generalEntries,
  generalIndicators,
  mosquesEntries,
  mosquesIndicators,
  operationalEntries,
  operationalIndicators,
  organization,
  orphansEntries,
  orphansIndicators,
  user,
} from "../schema";
import {
  PaginatedResponse,
  PaginationParams,
  TOrganization,
  TOrganizationOverview,
  TOrganizationOverviewRecord,
  TOrganizationRecord,
} from "../types";
import { mapSettingtoDashbaordType } from "../../lib/constants";
import { DASHBOARD_RELATED_COLUMN } from "../constants";
import { auth } from "../../lib/auth";

export const createUpdateOrg = (
  org: TOrganization | TOrganizationRecord,
  dbUrl: string
): Promise<StatusResponse<TOrganizationRecord | any>> => {
  console.log("org in createUpdateOrg ", org);

  return new Promise((resolve, reject) => {
    const db = dbCLient(dbUrl);

    db.insert(organization)
      .values(org)
      .returning()
      .onConflictDoUpdate({ target: organization.id, set: { ...org } })

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
  });
};

export const retrieveOrg = async (
  orgId: number,
  dbUrl: string
): Promise<StatusResponse<TOrganizationRecord>> => {
  // Input validation
  if (!dbUrl) {
    return {
      status: "error",
      message: "Database URL is required",
    };
  }

  if (!Number.isInteger(orgId) || orgId < 1) {
    return {
      status: "error",
      message: "Organization ID must be a positive integer",
    };
  }

  try {
    const db = dbCLient(dbUrl);
    const record = await db.query.organization.findFirst({
      where: eq(organization.id, orgId),
    });

    if (!record) {
      return {
        status: "warning",
        message: `No organization found with ID: ${orgId}`,
      };
    }

    return {
      status: "success",
      data: record,
    };
  } catch (error) {
    if (error instanceof Error) {
      // Handle connection errors
      if (error.message.includes("connection")) {
        return {
          status: "error",
          message: "Database connection failed",
        };
      }

      // Handle timeout errors
      if (error.message.includes("timeout")) {
        return {
          status: "error",
          message: "Database query timed out",
        };
      }

      return {
        status: "error",
        message: error.message,
      };
    }

    return {
      status: "error",
      message: "An unexpected error occurred",
    };
  }
};

export const getLatestNOrgs = async (
  n: number = 5,
  dbUrl: string
): Promise<StatusResponse<TOrganizationRecord[]>> => {
  // Input validation
  if (!dbUrl) {
    return {
      status: "error",
      message: "Database URL is required",
    };
  }

  if (!Number.isInteger(n) || n <= 0) {
    return {
      status: "error",
      message: "Number of organizations must be a positive integer",
    };
  }

  try {
    const db = dbCLient(dbUrl);

    const records = await db.query.organization.findMany({
      orderBy: (orgs, { desc }) => [desc(orgs.createdAt)],
      limit: n,
    });

    if (!Array.isArray(records)) {
      return {
        status: "warning",
        message: "Invalid response format from database",
      };
    }

    return {
      status: "success",
      data: records,
    };
  } catch (error) {
    if (error instanceof Error) {
      // Handle connection errors
      if (error.message.includes("connection")) {
        return {
          status: "error",
          message: "Database connection failed",
        };
      }

      // Handle timeout errors
      if (error.message.includes("timeout")) {
        return {
          status: "error",
          message: "Database query timed out",
        };
      }

      return {
        status: "error",
        message: error.message,
      };
    }

    return {
      status: "error",
      message: "An unexpected error occurred",
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
    const [[{ count: totalCount }], records] = await Promise.all([
      db.select({ count: count() }).from(organization),
      db.query.organization.findMany({
        limit: limit,
        offset: offset,
      }),
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
        hasMore: page < totalPages,
      },
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
    const [[{ count: totalCount }], records] = await Promise.all([
      db.select({ count: count() }).from(organization),
      db.query.organization.findMany({
        limit: limit,
        offset: offset,
        columns: {
          id: true,
          name: true,
          email: true,
          financialIndicatorsSetting: true,
          corporateIndicatorsSetting: true,
          operationalIndicatorsSetting: true,
          generalndicatorsSetting: true,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const result = records.map((record) => {
      console.log("records:::", record);

      let dashboards: string[] = [];

      DASHBOARD_RELATED_COLUMN.forEach((el: string) => {
        // console.log("dashboard::", record[el as keyof TOrganizationOverviewRecord]);

        if (Number(record[el as keyof TOrganizationOverviewRecord]) > 0) {
          dashboards.push(
            mapSettingtoDashbaordType[
              el as keyof typeof mapSettingtoDashbaordType
            ]
          );
        }
      });
      return {
        id: record.id,
        name: record.name,
        email: record.email,
        dashboards,
      };
    });

    return {
      status: "success",
      data: result,
      pagination: {
        total: totalCount,
        currentPage: page,
        totalPages: totalPages,
        limit: limit,
        hasMore: page < totalPages,
      },
    };
  } catch (error: any) {
    throw {
      status: "error",
      message: error,
    };
  }
};

export const getOrgByUserId = async (
  userId: string,
  dbUrl: string
): Promise<StatusResponse<TOrganizationRecord>> => {
  if (!dbUrl) {
    return {
      status: "error",
      message: "Database URL is required",
    };
  }

  if (typeof userId !== "string") {
    return {
      status: "error",
      message: "User ID must be a string",
    };
  }
  try {
    const db = dbCLient(dbUrl);

    const record = await db.query.organization.findFirst({
      where: eq(organization.userId, userId),
    });

    if (!record) {
      return {
        status: "warning",
        message: `No organization found with User ID: ${userId}`,
      };
    }

    return {
      status: "success",
      data: record,
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("connection")) {
        return {
          status: "error",
          message: "Database connection failed",
        };
      }

      if (error.message.includes("timeout")) {
        return {
          status: "error",
          message: "Database query timed out",
        };
      }
      return {
        status: "error",
        message: error.message,
      };
    }
    return {
      status: "error",
      message: "An unexpected error occured",
    };
  }
};


export const removeOrganization = async (orgId: number, dbUrl: string) => {
  try {
    const db = dbCLient(dbUrl);
  
      const org = await db
        .select({ userId: organization.userId })
        .from(organization)
        .where(eq(organization.id, orgId))
        .limit(1);

      if (!org.length) {
        return { success: false, error: "Organization not found" };
      }
      const userId = org[0].userId;

      const dashboards = await db
        .select({ id: dashbaord.id })
        .from(dashbaord)
        .where(eq(dashbaord.orgId, orgId));

      for (const dashboard of dashboards) {
        try {
          await Promise.all([
            db.delete(corporateIndicators)
              .where(eq(corporateIndicators.dashbaordId, dashboard.id))
              .catch(e => console.error('Failed to delete corporate indicators:', e)),
            db.delete(operationalIndicators)
              .where(eq(operationalIndicators.dashbaordId, dashboard.id))
              .catch(e => console.error('Failed to delete operational indicators:', e)),
            db.delete(financialIndicators)
              .where(eq(financialIndicators.dashbaordId, dashboard.id))
              .catch(e => console.error('Failed to delete financial indicators:', e)),
            db.delete(mosquesIndicators)
              .where(eq(mosquesIndicators.dashbaordId, dashboard.id))
              .catch(e => console.error('Failed to delete mosques indicators:', e)),
            db.delete(orphansIndicators)
              .where(eq(orphansIndicators.dashbaordId, dashboard.id))
              .catch(e => console.error('Failed to delete orphans indicators:', e)),
            db.delete(generalIndicators)
              .where(eq(generalIndicators.dashbaordId, dashboard.id))
              .catch(e => console.error('Failed to delete general indicators:', e))
          ]);

          await Promise.all([
            db.delete(corporateEntries)
              .where(eq(corporateEntries.dashbaordId, dashboard.id))
              .catch(e => console.error('Failed to delete corporate entries:', e)),
            db.delete(operationalEntries)
              .where(eq(operationalEntries.dashbaordId, dashboard.id))
              .catch(e => console.error('Failed to delete operational entries:', e)),
            db.delete(financialEntries)
              .where(eq(financialEntries.dashbaordId, dashboard.id))
              .catch(e => console.error('Failed to delete financial entries:', e)),
            db.delete(mosquesEntries)
              .where(eq(mosquesEntries.dashbaordId, dashboard.id))
              .catch(e => console.error('Failed to delete mosques entries:', e)),
            db.delete(orphansEntries)
              .where(eq(orphansEntries.dashbaordId, dashboard.id))
              .catch(e => console.error('Failed to delete orphans entries:', e)),
            db.delete(generalEntries)
              .where(eq(generalEntries.dashbaordId, dashboard.id))
              .catch(e => console.error('Failed to delete general entries:', e))
          ]);
        } catch (error) {
          console.error('Failed to delete dashboard data:', error);
          throw error;

        }
      }

      await db.delete(dashbaord).where(eq(dashbaord.orgId, orgId));
      await db.delete(organization).where(eq(organization.id, orgId));

      if (userId) {
        await db.delete(user).where(eq(user.id, userId));
    
      }

      
    
    return { status: "success" };
  } catch (e) {
    console.error("Error deleting organization:", e);
    return {
      status: "error",
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
};