ALTER TABLE "operationalIndicators" ADD COLUMN "DISBURSED_AMOUNTS_QUARTERLY" numeric;--> statement-breakpoint
ALTER TABLE "operationalIndicators" ADD COLUMN "APPROVED_AMOUNTS_QUARTERLY" numeric;--> statement-breakpoint
ALTER TABLE "operationalIndicators" DROP COLUMN "PRJK_GOALS_ACHV_PERC";