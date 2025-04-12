ALTER TABLE "organization" ALTER COLUMN "generalndicatorsSetting" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "governanceIndicatorsSetting" text;