ALTER TABLE "governanceEntries" DROP CONSTRAINT "governanceEntries_entriesId_unique";--> statement-breakpoint
ALTER TABLE "governanceEntries" DROP CONSTRAINT "governanceEntries_entriesId_corporateEntries_id_fk";
--> statement-breakpoint
ALTER TABLE "governanceEntries" DROP COLUMN "entriesId";