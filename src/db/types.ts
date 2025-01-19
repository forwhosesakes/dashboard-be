import { dashbaord, operationalEntries, operationalIndicators, organization } from "./schema";

  
  export type TOperationalEntriesRecord = typeof operationalEntries.$inferSelect;
  export type TOperationalIndicatorsRecord = typeof operationalIndicators.$inferInsert
  export type TDashboardRecord = typeof dashbaord.$inferSelect
  export type TDashboard = typeof dashbaord.$inferInsert
  export type TOrganization = typeof organization.$inferInsert
  export type TOrganizationRecord = typeof organization.$inferSelect
  export type TOrganizationOverviewRecord=   Pick<TOrganizationRecord,"id"|"name"|"email"|"corporateIndicatorsSetting"|"financialIndicatorsSetting"|"operationalIndicatorsSetting"|"generalndicatorsSetting">
  export type TOrganizationOverview=   Pick<TOrganizationOverviewRecord,"id"|"name"|"email"> |{dashboards:any[]}


  


  export type TOperationalEntries = Omit<TOperationalEntriesRecord,"id"|"dashbaordId"|"createdAt"|"updatedAt">

  export type TOperationalIndicators = Omit<TOperationalIndicatorsRecord,"id"|"dashbaordId"|"createdAt"|"entriesId"|"updatedAt">


  export type TDashboardEntries = TOperationalEntries
  export type TDashboardIndicators = TOperationalIndicators



  const DB_ERRORS = {
    DUPLICATE_KEY: 'ER_DUP_ENTRY',
  };
  
  export interface DatabaseError {
    type: string;
    message: string;
    stack?: string;
    code: string;
    errno: number;
    sql: string;
    sqlState: string;
    sqlMessage: string;
  }


  export interface PaginationParams {
    page?: number;
    limit?: number;
  }
  
  export interface PaginatedResponse<T> {
    status: string;
    data: T[];
    pagination: {
      total: number;
      currentPage: number;
      totalPages: number;
      limit: number;
      hasMore: boolean;
    };
  }
  