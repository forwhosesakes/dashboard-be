ALTER TABLE "financialEntries" ADD COLUMN "ACTUAL_RETURNS" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "EXPECTED_RETURNS" numeric;--> statement-breakpoint
ALTER TABLE "financialIndicators" ADD COLUMN "RETURNS_FROM_TARGET" numeric;