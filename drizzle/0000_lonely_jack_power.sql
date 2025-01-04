CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"password" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "corporateEntries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dashboardId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"COMPLIANCE_ADHERENCE_PRACTICES" numeric,
	"TRANSPARENCY_DISCLOSURE_PRACTICES" numeric,
	"FINANCIAL_SAFETY_PRACTICES" numeric,
	"NO_SUCCESSFUL_HIRES_POST_EXP" numeric,
	"TOTAL_HIRES" numeric,
	"PERC_COMMIT_WORK_HOURS" numeric,
	"NO_EXE_PRACTICES" numeric,
	"NO_PLANNED_PRACTICES" numeric,
	"NO_COMP_ELEMENTS" numeric,
	"TOTAL_ELEMENTS" numeric,
	"NO_TIMELY_REPORTS" numeric,
	"NO_REQUIRED_REPORTS" numeric,
	"NO_GRADES_BENEFITS_SATISF" numeric,
	"NO_RESPONSES_SATIS_FORM" numeric,
	"TOTAL_GRADES_EMP_SATIS" numeric,
	"NO_RESPONSES_EMP_SATIS" numeric,
	"TOTAL_GEADES_PARTENERS_SATIS" numeric,
	"TOTAL_RESPONSES_VOL_SATIS" numeric,
	"NO_RESPOSES_VOL_SATIS_FORM" numeric,
	"TOTAL_GRADES_VOL_STATIS" numeric,
	"NO_RESPONSES_VOL_SATIS_FORM" numeric,
	"TOTAL_SATIS_GRADES_ORG" numeric,
	"NO_ORG_MEMBERS" numeric,
	"TOTAL_GRADES_COM" numeric,
	"NO_RESPONSES_COM_SATIS" numeric,
	"TASKS_ACHIEVED_TIMELY_CEO" numeric,
	"TOTAL_PLANNED_TASKS_CEO" numeric,
	"AVG_EVAL_EMPS" numeric,
	"AVG_RES_SATIS_FORMS_EMP" numeric,
	"EMP_EVAL" numeric,
	"EMP_ACHIEVMENT_PERC" numeric
);
--> statement-breakpoint
CREATE TABLE "dashboard" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"clientId" text NOT NULL,
	"type" text NOT NULL,
	"category" text,
	"theme" text DEFAULT 'default',
	"entriesId" uuid,
	"indicatorsId" uuid,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "financialEntries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dashboardId" serial NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"COMPLIANCE_ADHERENCE_PRACTICES" numeric,
	"TRANSPARENCY_DISCLOSURE_PRACTICES" numeric,
	"FINANCIAL_SAFETY_PRACTICES" numeric,
	"NO_SUCCESSFUL_HIRES_POST_EXP" numeric,
	"TOTAL_HIRES" numeric,
	"PERC_COMMIT_WORK_HOURS" numeric,
	"NO_EXE_PRACTICES" numeric,
	"NO_PLANNED_PRACTICES" numeric,
	"NO_COMP_ELEMENTS" numeric,
	"TOTAL_ELEMENTS" numeric,
	"NO_TIMELY_REPORTS" numeric,
	"NO_REQUIRED_REPORTS" numeric,
	"NO_GRADES_BENEFITS_SATISF" numeric,
	"NO_RESPONSES_SATIS_FORM" numeric,
	"TOTAL_GRADES_EMP_SATIS" numeric,
	"NO_RESPONSES_EMP_SATIS" numeric,
	"TOTAL_GEADES_PARTENERS_SATIS" numeric,
	"TOTAL_RESPONSES_VOL_SATIS" numeric,
	"NO_RESPOSES_VOL_SATIS_FORM" numeric,
	"TOTAL_GRADES_VOL_STATIS" numeric,
	"NO_RESPONSES_VOL_SATIS_FORM" numeric,
	"TOTAL_SATIS_GRADES_ORG" numeric,
	"NO_ORG_MEMBERS" numeric,
	"TOTAL_GRADES_COM" numeric,
	"NO_RESPONSES_COM_SATIS" numeric,
	"TASKS_ACHIEVED_TIMELY_CEO" numeric,
	"TOTAL_PLANNED_TASKS_CEO" numeric,
	"AVG_EVAL_EMPS" numeric,
	"AVG_RES_SATIS_FORMS_EMP" numeric,
	"EMP_EVAL" numeric,
	"EMP_ACHIEVMENT_PERC" numeric
);
--> statement-breakpoint
CREATE TABLE "generalEntries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dashboardId" serial NOT NULL,
	"category" text NOT NULL,
	"entryName" text NOT NULL,
	"entryValue" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "generalIndicators" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dashboardId" serial NOT NULL,
	"category" text NOT NULL,
	"indicatorName" text NOT NULL,
	"indicatorValue" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "operationalEntries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dashboardId" serial NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"NO_OPERATIONAL_GOALS_ACHIEVED" numeric,
	"NO_OPERATIONAL_GOALS_PLANNED" numeric,
	"NO_PROGRAMS_EXECUTED" numeric,
	"NO_PROGRAMS_PLANNED" numeric,
	"NO_TIMELY_ACTIVITIES" numeric,
	"TOTAL_PLANNED_ACTIVITIES" numeric,
	"APPROVED_BUDGET" numeric,
	"PLANNED_ACTUAL_DIFF" numeric,
	"NO_OUTPUTS_ACHIEVED" numeric,
	"TOTAL_TARGETED_OUTPUTS" numeric,
	"NO_ACTUAL_BENEFICIARIES" numeric,
	"PLANNED_TARGET_NUMBER" numeric,
	"NO_PROGRAMS_WITH_PARTICIPANTS" numeric,
	"NO_PROGRAMS_PROJECTS" numeric,
	"NO_TIMELY_TRANSACTIONS" numeric,
	"TOTAL_TRANSACTIONS" numeric,
	"NO_ARCHIVED_DOCS" numeric,
	"TOTAL_DOCS" numeric,
	"NO_VOLUNTEERS_CURRENT_QUARTER" numeric,
	"NO_VOLUNTEERS_NEXT_QUARTER" numeric,
	"NO_VOLUNTEERS_CONT_3" numeric,
	"TOTAL_VOLUNTEERS" numeric
);
--> statement-breakpoint
CREATE TABLE "operationalIndicators" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dashboardId" serial NOT NULL,
	"entriesId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"OPS_PLAN_EXEC" numeric,
	"PRJKT_PRGM_MGMT" numeric,
	"EFFIC_INTERNAL_OPS" numeric,
	"VOLN_MGMT" numeric,
	"OPS_GOALS_ACH_PERC" numeric,
	"PGRM_PRJKS_EXEC_PERC" numeric,
	"EFFIC_PRJKS_EXEC" numeric,
	"EFFITV_PRJKS_PGRM" numeric,
	"VOLN_CONTR_PRJKS_EXEC" numeric,
	"QLY_SPEED_PROC_EXEC" numeric,
	"DOCS_ARCHIV" numeric,
	"VOLUN_GROWTH_RATE_QUAR" numeric,
	"VOLUN_SUST_PERC" numeric,
	"PRJKT_TIMELY_COMP_PERC" numeric,
	"BUDGET_COMMIT_PERC" numeric,
	"PRJK_GOALS_ACHV_PERC" numeric,
	"RECH_TARGET_AUD_PERC" numeric
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL,
	"impersonatedBy" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean NOT NULL,
	"image" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"role" text,
	"banned" boolean,
	"banReason" text,
	"banExpires" timestamp,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp,
	"updatedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD CONSTRAINT "corporateEntries_dashboardId_dashboard_id_fk" FOREIGN KEY ("dashboardId") REFERENCES "public"."dashboard"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dashboard" ADD CONSTRAINT "dashboard_clientId_user_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD CONSTRAINT "financialEntries_dashboardId_dashboard_id_fk" FOREIGN KEY ("dashboardId") REFERENCES "public"."dashboard"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generalEntries" ADD CONSTRAINT "generalEntries_dashboardId_dashboard_id_fk" FOREIGN KEY ("dashboardId") REFERENCES "public"."dashboard"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generalIndicators" ADD CONSTRAINT "generalIndicators_dashboardId_dashboard_id_fk" FOREIGN KEY ("dashboardId") REFERENCES "public"."dashboard"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operationalEntries" ADD CONSTRAINT "operationalEntries_dashboardId_dashboard_id_fk" FOREIGN KEY ("dashboardId") REFERENCES "public"."dashboard"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operationalIndicators" ADD CONSTRAINT "operationalIndicators_dashboardId_dashboard_id_fk" FOREIGN KEY ("dashboardId") REFERENCES "public"."dashboard"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operationalIndicators" ADD CONSTRAINT "operationalIndicators_entriesId_operationalEntries_id_fk" FOREIGN KEY ("entriesId") REFERENCES "public"."operationalEntries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;