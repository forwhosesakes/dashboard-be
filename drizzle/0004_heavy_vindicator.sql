ALTER TABLE "corporateIndicators" DROP CONSTRAINT "corporateIndicators_entriesId_operationalEntries_id_fk";
--> statement-breakpoint
ALTER TABLE "financialIndicators" DROP CONSTRAINT "financialIndicators_entriesId_operationalEntries_id_fk";
--> statement-breakpoint
ALTER TABLE "corporateIndicators" ADD CONSTRAINT "corporateIndicators_entriesId_corporateEntries_id_fk" FOREIGN KEY ("entriesId") REFERENCES "public"."corporateEntries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "financialIndicators" ADD CONSTRAINT "financialIndicators_entriesId_financialEntries_id_fk" FOREIGN KEY ("entriesId") REFERENCES "public"."financialEntries"("id") ON DELETE no action ON UPDATE no action;