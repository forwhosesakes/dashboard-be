ALTER TABLE "financialEntries" RENAME COLUMN "PROGRAMS_EXPENSES_BOUNDED" TO "UNTRADED_INVESTMENTS";--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "AWQAF_INVESTMENTS" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "AWQAF_FIXED_ASSETS" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "CASHE_RELATED" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "LIMITED_NET_ASSETS" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "AWQAF_NET_ASSETS" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "ADMINISTRATIVE_EXPENSES_CHARGED_TO_THE_ACTIVITY" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "AWQAF_DIST_EXPENSES" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "UNRESTRICTED_REVENUE" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "RESTRICTED_REVENUE" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "AWQAF_QUARTER_REVENUE" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "PROFIT_AWQAF_INVESTMENTS" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "ZAKAT" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "RESTRICTED_CASH_DONATIONS" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "RESTRICTED_IN_KIND_DONATIONS" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "RESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "GOVERNMENT_GRANT_DONATIONS" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "UNRESTRICTED_CASH_DONATIONS" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "UNRESTRICTED_IN_KIND_DONATIONS" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "UNRESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "DONATION_BY_LIABILITY_REDUCTION" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "PROGRAM_AND_ACTIVITY_REVENUES" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "RESTRICTED_DESIGNATED_PROGRAM_AND_ACTIVITY_FEES" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" ADD COLUMN "GENERAL_ASSEMBLY_MEMBERS_SUBSCRIPTION_TOTAL" numeric;--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "PROGRAMS_EXPENSES_UNBOUNDED";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "GENERAL_ADMINSTRATIVE_EXPENSES_ACT";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "AWQAF_EXPENSES";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "SUSTAINBILITY_EXPENSES";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "TOTAL_EXPENSES";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "AWQAF_REVENUE";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "INVESTMENT_REVENUE";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "SUSTAINBILITY_REVENUE";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "BOUNDED_CHARITY";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "UNBOUNDED_CHARITY";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "TOTAL_CHARITY";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "CASH_RELATED";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "TRADED_INVESTMENTS";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "SUSTAIN_ASSETS_WAQFI";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "SUSTAIN_ASSETS_INVEST";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "SUSTAIN_ASSETS_FIN";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "BOUNDED_NET_ASSETS";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "AWQAF_NET_ASSETS_CASH";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "GOV_PLATFORMS_REVENUE";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "PRGMS_PRJKS_REVENUE";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "NO_PAID_MEMBERSHIP";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "TOTAL_MEMBERSHIP";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "FIN_VALUE_VOLUN";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "OPERATIONAL_EXPANSES";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "LAST_YEAR_REVENUE";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "NO_CONT_VOLUN";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "NO_TOTAL_VOLUN_LAST_YEAR";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "NO_TOTAL_MONEY_VAT";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "START_LIABILITIES";--> statement-breakpoint
ALTER TABLE "financialEntries" DROP COLUMN "END_LIABILITIES";