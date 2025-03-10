ALTER TABLE "corporateEntries" ADD COLUMN "TOTAL_ASSIGNED_TASKS_DURING_PERIOD" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD COLUMN "TOTAL_COMPLETED_TASKS_DURING_PERIOD" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD COLUMN "TOTAL_WORKING_DAYS" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD COLUMN "TOTAL_EMPLOYEE_ATTENDANCE_DAYS" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD COLUMN "TOTAL_FORMS_GRADES" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD COLUMN "NO_RESPOSES_VOL_SATIS_FORM" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD COLUMN "NO_RESPONSES_DONAT_SATIS_FORM" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD COLUMN "TOTAL_GRADES_VOL_SATIS" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD COLUMN "TOTAL_GRADES_DONAT_STATIS" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD COLUMN "TOTAL_DECISIONS_BY_CEO" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD COLUMN "TOTAL_EXECUTED_DECISIONS" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD COLUMN "TOTAL_PLANNED_PROGRAMS" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD COLUMN "TOTAL_ACHIEVED_PROGRAMS" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD COLUMN "EMP_PERF_EVALUATION_AVG" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD COLUMN "BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" ADD COLUMN "DIRECT_MANAGER_EVALUATION" numeric;--> statement-breakpoint
ALTER TABLE "corporateIndicators" ADD COLUMN "EMPLOYMENT_PERFORMANCE" numeric;--> statement-breakpoint
ALTER TABLE "corporateIndicators" ADD COLUMN "EMP_PERF_AND_PROD" numeric;--> statement-breakpoint
ALTER TABLE "corporateIndicators" ADD COLUMN "EMP_COMMITMENT" numeric;--> statement-breakpoint
ALTER TABLE "corporateIndicators" ADD COLUMN "DIRECT_MANAGER_EVALUATION" numeric;--> statement-breakpoint
ALTER TABLE "corporateIndicators" ADD COLUMN "EMP_TRAINING_INDICATOR" numeric;--> statement-breakpoint
ALTER TABLE "operationalEntries" ADD COLUMN "TOTAL_PERIOD_EXPENSES" numeric;--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "COMPLIANCE_ADHERENCE_PRACTICES";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "TRANSPARENCY_DISCLOSURE_PRACTICES";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "FINANCIAL_SAFETY_PRACTICES";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "NO_SUCCESSFUL_HIRES_POST_EXP";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "TOTAL_HIRES";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "NO_COMP_ELEMENTS";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "TOTAL_ELEMENTS";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "NO_TIMELY_REPORTS";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "NO_REQUIRED_REPORTS";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "TOTAL_GRADES_VOL_STATIS";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "NO_RESPONSES_VOL_SATIS_FORM";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "TOTAL_GRADES_DON_STATIS";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "NO_RESPONSES_DON_SATIS_FORM";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "NO_RESPONSES_COM_SATIS";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "TASKS_ACHIEVED_TIMELY_CEO";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "TOTAL_PLANNED_TASKS_CEO";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "AVG_EVAL_EMPS";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "AVG_RES_SATIS_FORMS_EMP";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "EMP_EVAL";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "EMP_ACHIEVMENT_PERC";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "NO_EXEC_DESC";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "TOTAL_DESC";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "NO_ACHIV_TARGETS";--> statement-breakpoint
ALTER TABLE "corporateEntries" DROP COLUMN "TOTAL_TARGETS";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "GOVERANCE";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "HR";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "PLANNING_ORGANIZING";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "SATIS_MEASURMENT";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "COMPLIANCE_ADHERENCE_PRACTICES";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "TRANSPARENCY_DISCLOSURE_PRACTICES";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "FINANCIAL_SAFETY_PRACTICES";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "RECRUITMENT";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "EMP_PERF_PROD";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "EMP_DEV_TRAIN";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "TARGETS_HIT_PERF_EVAL";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "JOB_COMMITMENT";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "TRAIN_PLAN_EXEC";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "TRAIN_IMPACT";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "FOLLOWUP_OPERATIONAL_PLAN";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "QUALITY_OPERATIONAL_PLAN";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "EXEC_LEADERSHIP";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "OPERATIONAL_PERF";--> statement-breakpoint
ALTER TABLE "corporateIndicators" DROP COLUMN "ENTERPRISE_COMMUN";--> statement-breakpoint
ALTER TABLE "operationalEntries" DROP COLUMN "NO_OPERATIONAL_GOALS_ACHIEVED";--> statement-breakpoint
ALTER TABLE "operationalEntries" DROP COLUMN "NO_OPERATIONAL_GOALS_PLANNED";--> statement-breakpoint
ALTER TABLE "operationalEntries" DROP COLUMN "NO_TIMELY_ACTIVITIES";--> statement-breakpoint
ALTER TABLE "operationalEntries" DROP COLUMN "TOTAL_PLANNED_ACTIVITIES";--> statement-breakpoint
ALTER TABLE "operationalEntries" DROP COLUMN "PLANNED_ACTUAL_DIFF";--> statement-breakpoint
ALTER TABLE "operationalEntries" DROP COLUMN "NO_OUTPUTS_ACHIEVED";--> statement-breakpoint
ALTER TABLE "operationalEntries" DROP COLUMN "TOTAL_TARGETED_OUTPUTS";--> statement-breakpoint
ALTER TABLE "operationalEntries" DROP COLUMN "NO_TIMELY_TRANSACTIONS";--> statement-breakpoint
ALTER TABLE "operationalEntries" DROP COLUMN "TOTAL_TRANSACTIONS";--> statement-breakpoint
ALTER TABLE "operationalEntries" DROP COLUMN "NO_ARCHIVED_DOCS";--> statement-breakpoint
ALTER TABLE "operationalEntries" DROP COLUMN "TOTAL_DOCS";