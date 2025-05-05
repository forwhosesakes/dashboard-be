ALTER TABLE "dashboard" ADD CONSTRAINT "dashboard_orgId_type_unique" UNIQUE("orgId","type");--> statement-breakpoint
ALTER TABLE "dashboard" ADD CONSTRAINT "custom_name" UNIQUE("orgId","type");