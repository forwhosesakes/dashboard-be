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
  organization,
  orphansEntries,
  orphansIndicators,
} from "./schema";

export type TOperationalEntriesRecord = typeof operationalEntries.$inferSelect;
export type TOperationalIndicatorsRecord =
  typeof operationalIndicators.$inferInsert;
  export type TFinancialEntriesRecord = typeof financialEntries.$inferInsert
  export type TFinancialIndicatorsRecord = typeof financialIndicators.$inferInsert

  export type TCorporateEntriesRecord = typeof corporateEntries.$inferInsert
  export type TCorporateIndicatorsRecord = typeof corporateIndicators.$inferInsert


  export type TOrphansEntriesRecord = typeof orphansEntries.$inferInsert
  export type TOrphansIndicatorsRecord = typeof orphansIndicators.$inferInsert

  export type TMosquesEntriesRecord = typeof mosquesEntries.$inferInsert
  export type TMosquesIndicatorsRecord = typeof mosquesIndicators.$inferInsert

export type TDashboardRecord = typeof dashbaord.$inferSelect;
export type TDashboard = typeof dashbaord.$inferInsert;
export type TOrganization = typeof organization.$inferInsert;
export type TOrganizationRecord = typeof organization.$inferSelect;
export type TOrganizationOverviewRecord = Pick<
  TOrganizationRecord,
  | "id"
  | "name"
  | "email"
  | "corporateIndicatorsSetting"
  | "financialIndicatorsSetting"
  | "operationalIndicatorsSetting"
  | "generalndicatorsSetting"
>;
export type TOrganizationOverview =
  | Pick<TOrganizationOverviewRecord, "id" | "name" | "email">
  | { dashboards: any[] };

export type TOperationalEntries = Omit<
  TOperationalEntriesRecord,
  "id" | "dashbaordId" | "createdAt" | "updatedAt"
>;

export type TOperationalIndicators = Omit<
  TOperationalIndicatorsRecord,
  "id" | "dashbaordId" | "createdAt" | "entriesId" | "updatedAt"
>;

export type TFinancialEntries = Omit<
  TFinancialEntriesRecord,
  "id" | "dashbaordId" | "createdAt" | "updatedAt"
>;

export type TFinancialIndicators = Omit<
  TFinancialIndicatorsRecord,
  "id" | "dashbaordId" | "createdAt" | "entriesId" | "updatedAt"
>;

export type TCorporateEntries = Omit<
  TCorporateEntriesRecord,
  "id" | "dashbaordId" | "createdAt" | "updatedAt"
>;

export type TCorporateIndicators = Omit<
  TCorporateIndicatorsRecord,
  "id" | "dashbaordId" | "createdAt" | "entriesId" | "updatedAt"
>;

export type TOrphansEntries = Omit<
  TOrphansEntriesRecord,
  "id" | "dashbaordId" | "createdAt" | "updatedAt"
>;

export type TOrphansIndicators = Omit<
  TOrphansIndicatorsRecord,
  "id" | "dashbaordId" | "createdAt" | "entriesId" | "updatedAt"
>;
export type TMosquesEntries = Omit<
  TMosquesEntriesRecord,
  "id" | "dashbaordId" | "createdAt" | "updatedAt"
>;

export type TMosquesIndicators = Omit<
  TMosquesIndicatorsRecord,
  "id" | "dashbaordId" | "createdAt" | "entriesId" | "updatedAt"
>;


export type TDashboardEntries = TOperationalEntries | TCorporateEntries | TFinancialEntries | TOrphansEntries | TMosquesEntries;
export type TDashboardIndicators = TOperationalIndicators | TFinancialIndicators | TCorporateIndicators | TOrphansIndicators | TMosquesIndicators;
export type TDASHBOARD_STATUS = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED";

const DB_ERRORS = {
  DUPLICATE_KEY: "ER_DUP_ENTRY",
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
