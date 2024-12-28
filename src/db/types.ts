import { operationalEntries, operationalIndicators } from "./schema";

  
  export type TOperationalEntriesRecord = typeof operationalEntries.$inferSelect;
  export type TOperationalIndicatorsRecord = typeof operationalIndicators.$inferInsert


  export type TOperationalEntries = Omit<TOperationalIndicatorsRecord,"id"|"clientId"|"createdAt"|"updatedAt">

  export type TOperationalIndicators = Omit<TOperationalIndicatorsRecord,"id"|"clientId"|"createdAt"|"entriesId"|"updatedAt">
