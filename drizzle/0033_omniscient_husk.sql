
ALTER TABLE "organization" ALTER COLUMN "governanceIndicatorsSetting" SET DATA TYPE boolean USING  "governanceIndicatorsSetting"::boolean;--> statement-breakpoint
ALTER TABLE "organization" ALTER COLUMN "governanceIndicatorsSetting" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "organization" ALTER COLUMN "allDashboardsSetting" SET DATA TYPE boolean USING  "allDashboardsSetting"::boolean;--> statement-breakpoint
ALTER TABLE "organization" ALTER COLUMN "allDashboardsSetting" SET DEFAULT false;