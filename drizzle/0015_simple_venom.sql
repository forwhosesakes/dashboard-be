CREATE TABLE "governanceEntries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dashboardId" serial NOT NULL,
	"entriesId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"COMPLIANCE_ADHERENCE_PRACTICES" text,
	"FINANCIAL_SAFETY_PRACTICES" text,
	"TRANSPARENCY_DISCLOSURE_PRACTICES" text,
	CONSTRAINT "governanceEntries_dashboardId_unique" UNIQUE("dashboardId"),
	CONSTRAINT "governanceEntries_entriesId_unique" UNIQUE("entriesId")
);
--> statement-breakpoint
ALTER TABLE "governanceEntries" ADD CONSTRAINT "governanceEntries_dashboardId_dashboard_id_fk" FOREIGN KEY ("dashboardId") REFERENCES "public"."dashboard"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "governanceEntries" ADD CONSTRAINT "governanceEntries_entriesId_corporateEntries_id_fk" FOREIGN KEY ("entriesId") REFERENCES "public"."corporateEntries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "org_id_idx" ON "organization" USING btree ("id");