CREATE TABLE "corporateIndicators" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dashboardId" serial NOT NULL,
	"entriesId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"ENTERPRISE_PERFORMANCE" numeric,
	"GOVERANCE" numeric,
	"HR" numeric,
	"PLANNING_ORGANIZING" numeric,
	"SATIS_MEASURMENT" numeric,
	"CEO_PERFORMANCE" numeric,
	"COMPLIANCE_ADHERENCE_PRACTICES" numeric,
	"TRANSPARENCY_DISCLOSURE_PRACTICES" numeric,
	"FINANCIAL_SAFETY_PRACTICES" numeric,
	"RECRUITMENT" numeric,
	"EMP_PERF_PROD" numeric,
	"EMP_DEV_TRAIN" numeric,
	"HIRING_QUALITY" numeric,
	"TARGETS_HIT_PERF_EVAL" numeric,
	"JOB_COMMITMENT" numeric,
	"TRAIN_PLAN_EXEC" numeric,
	"TRAIN_IMPACT" numeric,
	"FOLLOWUP_OPERATIONAL_PLAN" numeric,
	"QUALITY_OPERATIONAL_PLAN" numeric,
	"PRESENCE_OPERATIONAL_APPROVED_PLAN" numeric,
	"GOALS_CALRITY_MEASUERABILITY" numeric,
	"PROGRAMS_SELECTION" numeric,
	"PRESENCE_DISCRETIONARY_BUDGETS" numeric,
	"PRESENCE_IMPLEMENTATION_TIMETABLE" numeric,
	"PERIODIC_FOLLOWUP_REPORTS" numeric,
	"BENEF_SATIS_MEASURMENT" numeric,
	"EMP_SATIS_MEASURMENT" numeric,
	"PARTENERS_SATIS_MEASURMENT" numeric,
	"VOLUN_SATIS_MEASURMENT" numeric,
	"DONATORS_SATIS_MEASURMENT" numeric,
	"ADMIN_ORG_SATIS_MEASURMENT" numeric,
	"COMMUNITY_SATIS_MEASURMENT" numeric,
	"SERVICES_QUALITY" numeric,
	"RESPONSIVNESS" numeric,
	"ISSUES_MGMT" numeric,
	"WORK_ENV" numeric,
	"DEV_MOTIV" numeric,
	"TASKS_SCOPES_CLARITY" numeric,
	"AGREEMENT_COMMIT" numeric,
	"EFFECTIVE_COMMUNICATION" numeric,
	"VOLUN_WORK_ORG" numeric,
	"TRAIN_SUPPORT" numeric,
	"EFFORT_APPR" numeric,
	"TRANS_DONATIONS_CONS" numeric,
	"COMMUNICATION_REPORTS" numeric,
	"CONTR_IMPACT" numeric,
	"REPORTS_CLARITY" numeric,
	"GOALS_ACHIEVMENT" numeric,
	"ENTERPRISE_REPUT" numeric,
	"COMMUNITY_INTERACTIVITY" numeric,
	"EXEC_LEADERSHIP" numeric,
	"OPERATIONAL_PERF" numeric,
	"ENTERPRISE_COMMUN" numeric,
	"FOLLOWUP_BOARD_DECISION" numeric,
	"OPERATIONAL_PLAN_ACHIVMENT_GOALS" numeric,
	"DAILY_OPS_MGMT" numeric,
	"FOLLOWUP_EMPS_PERF" numeric,
	"EMPS_PARTN_STAKE" numeric
);
--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "COMPLIANCE_ADHERENCE_PRACTICES" TO "GOVERENCE_EXPENSES";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "TRANSPARENCY_DISCLOSURE_PRACTICES" TO "PROGRAMS_EXPENSES_BOUNDED";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "FINANCIAL_SAFETY_PRACTICES" TO "PROGRAMS_EXPENSES_UNBOUNDED";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "NO_SUCCESSFUL_HIRES_POST_EXP" TO "PROGRAMS_EXPENSES";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "TOTAL_HIRES" TO "GENERAL_ADMINSTRATIVE_EXPENSES_ACT";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "PERC_COMMIT_WORK_HOURS" TO "AWQAF_EXPENSES";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "NO_EXE_PRACTICES" TO "INVESTMENT_EXPENSES";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "NO_PLANNED_PRACTICES" TO "SUSTAINBILITY_EXPENSES";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "NO_COMP_ELEMENTS" TO "FUND_RAISING_EXPENSES";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "TOTAL_ELEMENTS" TO "TOTAL_EXPENSES";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "NO_TIMELY_REPORTS" TO "AWQAF_REVENUE";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "NO_REQUIRED_REPORTS" TO "INVESTMENT_REVENUE";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "NO_GRADES_BENEFITS_SATISF" TO "SUSTAINBILITY_REVENUE";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "NO_RESPONSES_SATIS_FORM" TO "BOUNDED_CHARITY";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "TOTAL_GRADES_EMP_SATIS" TO "UNBOUNDED_CHARITY";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "NO_RESPONSES_EMP_SATIS" TO "TOTAL_CHARITY";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "TOTAL_GEADES_PARTENERS_SATIS" TO "CASH_RELATED";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "TOTAL_RESPONSES_VOL_SATIS" TO "TRADED_INVESTMENTS";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "NO_RESPOSES_VOL_SATIS_FORM" TO "SUSTAIN_ASSETS_WAQFI";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "TOTAL_GRADES_VOL_STATIS" TO "SUSTAIN_ASSETS_INVEST";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "NO_RESPONSES_VOL_SATIS_FORM" TO "SUSTAIN_ASSETS_FIN";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "TOTAL_SATIS_GRADES_ORG" TO "CURRENT_LIABILITIES";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "NO_ORG_MEMBERS" TO "BOUNDED_NET_ASSETS";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "TOTAL_GRADES_COM" TO "AWQAF_NET_ASSETS_CASH";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "NO_RESPONSES_COM_SATIS" TO "GOV_PLATFORMS_REVENUE";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "TASKS_ACHIEVED_TIMELY_CEO" TO "PRGMS_PRJKS_REVENUE";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "TOTAL_PLANNED_TASKS_CEO" TO "NO_PAID_MEMBERSHIP";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "AVG_EVAL_EMPS" TO "TOTAL_MEMBERSHIP";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "AVG_RES_SATIS_FORMS_EMP" TO "FIN_VALUE_VOLUN";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "EMP_EVAL" TO "OPERATIONAL_EXPANSES";--> statement-breakpoint
ALTER TABLE "financialEntries" RENAME COLUMN "EMP_ACHIEVMENT_PERC" TO "LAST_YEAR_REVENUE";--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "GENERAL_ADMINSTRATIVE_EXPENSES" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "NO_CONT_VOLUN" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "NO_TOTAL_VOLUN_LAST_YEAR" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "NO_TOTAL_MONEY_VAT" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "START_LIABILITIES" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "END_LIABILITIES" numeric;--> statement-breakpoint
ALTER TABLE "corporateIndicators" ADD CONSTRAINT "corporateIndicators_dashboardId_dashboard_id_fk" FOREIGN KEY ("dashboardId") REFERENCES "public"."dashboard"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "corporateIndicators" ADD CONSTRAINT "corporateIndicators_entriesId_operationalEntries_id_fk" FOREIGN KEY ("entriesId") REFERENCES "public"."operationalEntries"("id") ON DELETE no action ON UPDATE no action;