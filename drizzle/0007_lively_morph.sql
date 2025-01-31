ALTER TABLE "corporateEntries" ADD COLUMN "NO_EXEC_DESC" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD COLUMN "TOTAL_DESC" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD COLUMN "NO_ACHIV_TARGETS" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD COLUMN "TOTAL_TARGETS" numeric;--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "PRESENCE_IMPLEMENTATION_TIMETABLE";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "PERIODIC_FOLLOWUP_REPORTS";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "SERVICES_QUALITY";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "RESPONSIVNESS";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "ISSUES_MGMT";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "WORK_ENV";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "DEV_MOTIV";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "TASKS_SCOPES_CLARITY";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "AGREEMENT_COMMIT";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "EFFECTIVE_COMMUNICATION";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "VOLUN_WORK_ORG";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "TRAIN_SUPPORT";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "EFFORT_APPR";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "TRANS_DONATIONS_CONS";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "COMMUNICATION_REPORTS";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "CONTR_IMPACT";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "REPORTS_CLARITY";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "GOALS_ACHIEVMENT";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "ENTERPRISE_REPUT";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "COMMUNITY_INTERACTIVITY";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "EMPS_PARTN_STAKE";