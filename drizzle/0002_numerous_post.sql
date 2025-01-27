CREATE TABLE "organization" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"phoneNumber" text,
	"email" text,
	"type" text,
	"category" text,
	"licenseNumber" text,
	"website" text,
	"address" text,
	"city" text,
	"neighbor" text,
	"street" text,
	"map" text,
	"repName" text,
	"repPhoneNumber" text,
	"repEmail" text,
	"logo" text,
	"officialDocs" text,
	"operationalPlanImage" text,
	"repSpeach" text,
	"licenseImage" text,
	"contractImage" text,
	"additionalDocs" text,
	"financialIndicatorsSetting" numeric,
	"operationalIndicatorsSetting" numeric,
	"corporateIndicatorsSetting" numeric,
	"generalndicatorsSetting" numeric
);
--> statement-breakpoint
ALTER TABLE "dashboard" DROP CONSTRAINT "dashboard_clientId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "dashboard" ADD COLUMN "orgId" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dashboard" ADD CONSTRAINT "dashboard_orgId_organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dashboard" DROP COLUMN "clientId";