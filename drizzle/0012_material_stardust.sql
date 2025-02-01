CREATE TABLE "mosquesEntries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dashboardId" serial NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"NO_EXEC_CONST_REQS" numeric,
	"TOTAL_CONST_REQS" numeric,
	"NO_MOSQUES_ND_CONST" numeric,
	"TOTAL_REG_MOSQUES" numeric,
	"NO_MOSQUES_COMP_CONST" numeric,
	"TOTAL_MOSQUES_PLAN_CONST" numeric,
	"TOTAL_ANNUAL_EXPANSES_MOSQUES" numeric,
	"NO_SERV_MOSQUES" numeric,
	"NO_RESV_COMPL_MOSQUES" numeric,
	"NO_EXEC_PRJKS_MOSQUES" numeric,
	CONSTRAINT "mosquesEntries_dashboardId_unique" UNIQUE("dashboardId")
);
--> statement-breakpoint
CREATE TABLE "mosquesIndicators" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dashboardId" serial NOT NULL,
	"entriesId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"PERC_COMP_REQS_MOSQUES" numeric,
	"PERC_COMP_ND_MOSQUES" numeric,
	"PERC_PRJK_PG_MOSQUES" numeric,
	"AVG_COMP_EXP_ANN_MOSQUES" numeric,
	"AVG_COMP_MOSQUES" numeric,
	CONSTRAINT "mosquesIndicators_dashboardId_unique" UNIQUE("dashboardId"),
	CONSTRAINT "mosquesIndicators_entriesId_unique" UNIQUE("entriesId")
);
--> statement-breakpoint
CREATE TABLE "orphansEntries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dashboardId" serial NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"NO_ADOPTED_ORPHANS" numeric,
	"TOTAL_TARGETED_ORPHANS" numeric,
	"TOTAL_MONTHLY_ADOP_EXP" numeric,
	"NO_ORPHANS_PRGM" numeric,
	"TOTAL_ORPHANS_QUAL_PRGM" numeric,
	"TOTAL_ANNUAL_EXP_ORPHANS" numeric,
	"NO_BENF_ORPHANS" numeric,
	"NO_STD_ORPHANS" numeric,
	"TOTAL_ORPHANS_STD_AGE" numeric,
	"NO_ORPHANS_STD_UNI" numeric,
	"TOTAL_ORPHANS_AGE_UNI" numeric,
	"TOTAL_MARKS_ORPHANS" numeric,
	"NO_GEN_EDU_ORPHANS" numeric,
	"NO_HLTH_ORPHANS" numeric,
	"TOTAL_ORPHANS" numeric,
	CONSTRAINT "orphansEntries_dashboardId_unique" UNIQUE("dashboardId")
);
--> statement-breakpoint
CREATE TABLE "orphansIndicators" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dashboardId" serial NOT NULL,
	"entriesId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"PERC_COMP_REQS_MOSQUES" numeric,
	"TOTAL_ORPHANS" numeric,
	"MON_AVG_ADOP_ORPHANS" numeric,
	"PERC_ORPHANS_BENF_SRV" numeric,
	"AVG_ANNUAL_EXP_ORPHANS" numeric,
	"PERC_ORPHANS_GEN_EDU" numeric,
	"PERC_ORPHANS_UNI_EDU" numeric,
	"AVG_ORPHANS_MARKS" numeric,
	"HLTH_CVG" numeric,
	CONSTRAINT "orphansIndicators_dashboardId_unique" UNIQUE("dashboardId"),
	CONSTRAINT "orphansIndicators_entriesId_unique" UNIQUE("entriesId")
);
--> statement-breakpoint
ALTER TABLE "mosquesEntries" ADD CONSTRAINT "mosquesEntries_dashboardId_dashboard_id_fk" FOREIGN KEY ("dashboardId") REFERENCES "public"."dashboard"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mosquesIndicators" ADD CONSTRAINT "mosquesIndicators_dashboardId_dashboard_id_fk" FOREIGN KEY ("dashboardId") REFERENCES "public"."dashboard"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mosquesIndicators" ADD CONSTRAINT "mosquesIndicators_entriesId_mosquesEntries_id_fk" FOREIGN KEY ("entriesId") REFERENCES "public"."mosquesEntries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orphansEntries" ADD CONSTRAINT "orphansEntries_dashboardId_dashboard_id_fk" FOREIGN KEY ("dashboardId") REFERENCES "public"."dashboard"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orphansIndicators" ADD CONSTRAINT "orphansIndicators_dashboardId_dashboard_id_fk" FOREIGN KEY ("dashboardId") REFERENCES "public"."dashboard"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orphansIndicators" ADD CONSTRAINT "orphansIndicators_entriesId_orphansEntries_id_fk" FOREIGN KEY ("entriesId") REFERENCES "public"."orphansEntries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "PRESENCE_OPERATIONAL_APPROVED_PLAN";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "GOALS_CALRITY_MEASUERABILITY";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "PROGRAMS_SELECTION";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "PRESENCE_DISCRETIONARY_BUDGETS";