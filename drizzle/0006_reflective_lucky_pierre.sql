ALTER TABLE "corporateEntries" ADD CONSTRAINT "corporateEntries_dashboardId_unique" UNIQUE("dashboardId");--> statement-breakpoint
ALTER TABLE "corporateIndicators" ADD CONSTRAINT "corporateIndicators_dashboardId_unique" UNIQUE("dashboardId");--> statement-breakpoint
ALTER TABLE "corporateIndicators" ADD CONSTRAINT "corporateIndicators_entriesId_unique" UNIQUE("entriesId");--> statement-breakpoint
ALTER TABLE "financialEntries" ADD CONSTRAINT "financialEntries_dashboardId_unique" UNIQUE("dashboardId");--> statement-breakpoint
ALTER TABLE "financialIndicators" ADD CONSTRAINT "financialIndicators_dashboardId_unique" UNIQUE("dashboardId");--> statement-breakpoint
ALTER TABLE "financialIndicators" ADD CONSTRAINT "financialIndicators_entriesId_unique" UNIQUE("entriesId");--> statement-breakpoint
ALTER TABLE "operationalEntries" ADD CONSTRAINT "operationalEntries_dashboardId_unique" UNIQUE("dashboardId");--> statement-breakpoint
ALTER TABLE "operationalIndicators" ADD CONSTRAINT "operationalIndicators_dashboardId_unique" UNIQUE("dashboardId");--> statement-breakpoint
ALTER TABLE "operationalIndicators" ADD CONSTRAINT "operationalIndicators_entriesId_unique" UNIQUE("entriesId");