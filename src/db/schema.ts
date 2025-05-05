
import { pgTable, text, serial, timestamp, boolean, numeric, uuid, integer, uniqueIndex, unique } from "drizzle-orm/pg-core";

			
export const user = pgTable("user", {
					id: text("id").primaryKey(),
					name: text('name').notNull(),
 email: text('email').notNull().unique(),
 emailVerified: boolean('emailVerified').notNull(),
 image: text('image'),
 createdAt: timestamp('createdAt').notNull(),
 updatedAt: timestamp('updatedAt').notNull(),
 role: text('role'),
 banned: boolean('banned'),
 banReason: text('banReason'),
 banExpires: timestamp('banExpires'),
 subRole:text('subRole'),
				});

export const session = pgTable("session", {
					id: text("id").primaryKey(),
					expiresAt: timestamp('expiresAt').notNull(),
 token: text('token').notNull().unique(),
 createdAt: timestamp('createdAt').notNull(),
 updatedAt: timestamp('updatedAt').notNull(),
 ipAddress: text('ipAddress'),
 userAgent: text('userAgent'),
 userId: text('userId').notNull().references(()=> user.id,{onDelete:"cascade"}),
 impersonatedBy: text('impersonatedBy')
				});

export const account = pgTable("account", {
					id: text("id").primaryKey(),
					accountId: text('accountId').notNull(),
 providerId: text('providerId').notNull(),
 userId: text('userId').notNull().references(()=> user.id,{onDelete:"cascade"}),
 accessToken: text('accessToken'),
 refreshToken: text('refreshToken'),
 idToken: text('idToken'),
 accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
 refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
 scope: text('scope'),
 password: text('password'),
 createdAt: timestamp('createdAt').notNull(),
 updatedAt: timestamp('updatedAt').notNull()
				});

export const verification = pgTable("verification", {
					id: text("id").primaryKey(),
					identifier: text('identifier').notNull(),
 value: text('value').notNull(),
 expiresAt: timestamp('expiresAt').notNull(),
 createdAt: timestamp('createdAt'),
 updatedAt: timestamp('updatedAt')
				});




export const organization = pgTable("organization", {
    id: serial("id").primaryKey(),
    userId: text('userId').references(()=> user.id,{onDelete:"cascade"}),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
    name:text("name").notNull(),
    phoneNumber:text("phoneNumber"),
    email:text("email").unique(),
    type:text("type"),
    category:text("category"),
    licenseNumber:text("licenseNumber"),
    website:text("website"),


    address:text("address"),
    city:text("city"),
    neighbor:text("neighbor"),
    street:text("street"),
    map:text("map"),


    repName:text("repName"),
    repPhoneNumber:text("repPhoneNumber"),
    repEmail:text("repEmail"),


    logo:text("logo"),
    officialDocs:text("officialDocs"),
    operationalPlanImage:text("operationalPlanImage"),
    repSpeach:text("repSpeach"),

    licenseImage:text("licenseImage"),
    contractImage:text("contractImage"),
    additionalDocs:text("additionalDocs"),
    financialIndicatorsSetting:numeric("financialIndicatorsSetting"),
    operationalIndicatorsSetting:numeric("operationalIndicatorsSetting"),
    corporateIndicatorsSetting:numeric("corporateIndicatorsSetting"),
    generalndicatorsSetting:text("generalndicatorsSetting"),
    governanceIndicatorsSetting:boolean("governanceIndicatorsSetting").default(false),
    allDashboardsSetting:boolean("allDashboardsSetting").default(false),
                }, (table) => {
                    return {
                      idIdx: uniqueIndex('org_id_idx').on(table.id),
                    }
                }) 

export const dashbaord = pgTable("dashboard",{
    id: serial("id").primaryKey(),
    title:text("title").notNull(),
    content:text("content"),
    orgId: serial("orgId").references(()=>organization.id),
    type:text("type").notNull(),
    category:text("category"),
    theme:text("theme").default("default"),
    entriesId: uuid("entriesId"),
    indicatorsId: uuid("indicatorsId"),
    visible:boolean("visible").default(true),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
    
},(t) => [
    unique().on(t.orgId, t.type),
    unique('custom_name').on(t.orgId, t.type)
  ])

export const corporateEntries = pgTable("corporateEntries", {
    id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: integer("dashboardId").notNull().references(()=>dashbaord.id).unique(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
    TOTAL_ASSIGNED_TASKS_DURING_PERIOD:numeric("TOTAL_ASSIGNED_TASKS_DURING_PERIOD"),
    TOTAL_COMPLETED_TASKS_DURING_PERIOD:numeric("TOTAL_COMPLETED_TASKS_DURING_PERIOD"),
    TOTAL_WORKING_DAYS:numeric("TOTAL_WORKING_DAYS"),
    TOTAL_EMPLOYEE_ATTENDANCE_DAYS:numeric("TOTAL_EMPLOYEE_ATTENDANCE_DAYS"),
    PERC_COMMIT_WORK_HOURS:numeric("PERC_COMMIT_WORK_HOURS"),
    NO_PLANNED_PRACTICES:numeric("NO_PLANNED_PRACTICES"),
    NO_EXE_PRACTICES:numeric("NO_EXE_PRACTICES"),
    TOTAL_FORMS_GRADES:numeric("TOTAL_FORMS_GRADES"),
    NO_RESPONSES_SATIS_FORM:numeric("NO_RESPONSES_SATIS_FORM"),
    NO_RESPONSES_EMP_SATIS:numeric("NO_RESPONSES_EMP_SATIS"),
    NO_RESPONSES_PARTERS_FORM:numeric("NO_RESPONSES_PARTERS_FORM"),
    NO_RESPOSES_VOL_SATIS_FORM:numeric("NO_RESPOSES_VOL_SATIS_FORM"),
    NO_RESPONSES_DONAT_SATIS_FORM:numeric("NO_RESPONSES_DONAT_SATIS_FORM"),
    NO_ORG_MEMBERS:numeric("NO_ORG_MEMBERS"),
    NO_GRADES_BENEFITS_SATISF:numeric("NO_GRADES_BENEFITS_SATISF"),
    TOTAL_GRADES_EMP_SATIS:numeric("TOTAL_GRADES_EMP_SATIS"),
    TOTAL_GEADES_PARTENERS_SATIS:numeric("TOTAL_GEADES_PARTENERS_SATIS"),
    TOTAL_GRADES_VOL_SATIS:numeric("TOTAL_GRADES_VOL_SATIS"),
    TOTAL_GRADES_DONAT_STATIS:numeric("TOTAL_GRADES_DONAT_STATIS"),
    TOTAL_SATIS_GRADES_ORG:numeric("TOTAL_SATIS_GRADES_ORG"),
    TOTAL_GRADES_COM:numeric("TOTAL_GRADES_COM"),
    NO_RESPONSES_COM_SATIS:numeric("NO_RESPONSES_COM_SATIS"),
    TOTAL_DECISIONS_BY_CEO:numeric("TOTAL_DECISIONS_BY_CEO"),
    TOTAL_EXECUTED_DECISIONS:numeric("TOTAL_EXECUTED_DECISIONS"),
    TOTAL_PLANNED_PROGRAMS:numeric("TOTAL_PLANNED_PROGRAMS"),
    TOTAL_ACHIEVED_PROGRAMS:numeric("TOTAL_ACHIEVED_PROGRAMS"),
    EMP_PERF_EVALUATION_AVG:numeric("EMP_PERF_EVALUATION_AVG"),
    BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE:numeric("BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE"),   
    DIRECT_MANAGER_EVALUATION:numeric("DIRECT_MANAGER_EVALUATION") 

})
export const corporateIndicators = pgTable("corporateIndicators", {
    id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id).unique(),

        entriesId: uuid("entriesId").notNull().references(()=>corporateEntries.id).unique(),
        createdAt: timestamp('createdAt').notNull().defaultNow(),
        updatedAt: timestamp('updatedAt').notNull().defaultNow(),
        CORORATE_PERFORMANCE:numeric("CORORATE_PERFORMANCE"),
        EMPLOYMENT_PERFORMANCE:numeric("EMPLOYMENT_PERFORMANCE"),
        EMP_PERF_AND_PROD:numeric("EMP_PERF_AND_PROD"),
        EMP_COMMITMENT:numeric("EMP_COMMITMENT"),
        DIRECT_MANAGER_EVALUATION:numeric("DIRECT_MANAGER_EVALUATION"),
        EMP_TRAINING_INDICATOR:numeric("EMP_TRAINING_INDICATOR"),
        BENEF_SATIS_MEASURMENT:numeric("BENEF_SATIS_MEASURMENT"),
        EMP_SATIS_MEASURMENT:numeric("EMP_SATIS_MEASURMENT"),
        PARTENERS_SATIS_MEASURMENT:numeric("PARTENERS_SATIS_MEASURMENT"),
        VOLUN_SATIS_MEASURMENT:numeric("VOLUN_SATIS_MEASURMENT"),
        DONATORS_SATIS_MEASURMENT:numeric("DONATORS_SATIS_MEASURMENT"),
        ADMIN_ORG_SATIS_MEASURMENT:numeric("ADMIN_ORG_SATIS_MEASURMENT"),
        COMMUNITY_SATIS_MEASURMENT:numeric("COMMUNITY_SATIS_MEASURMENT"),
      
        CEO_PERFORMANCE:numeric("CEO_PERFORMANCE"),


        FOLLOWUP_BOARD_DECISION:numeric("FOLLOWUP_BOARD_DECISION"),
        OPERATIONAL_PLAN_ACHIVMENT_GOALS:numeric("OPERATIONAL_PLAN_ACHIVMENT_GOALS"),
        DAILY_OPS_MGMT:numeric("DAILY_OPS_MGMT"),
        FOLLOWUP_EMPS_PERF:numeric("FOLLOWUP_EMPS_PERF"),
})

export const governanceEntries = pgTable("governanceEntries", {
    id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id).unique(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
    COMPLIANCE_ADHERENCE_PRACTICES:text("COMPLIANCE_ADHERENCE_PRACTICES"),

    FINANCIAL_SAFETY_PRACTICES:text("FINANCIAL_SAFETY_PRACTICES"),
    TRANSPARENCY_DISCLOSURE_PRACTICES:text("TRANSPARENCY_DISCLOSURE_PRACTICES"),
    COMPLIANCE_ADHERENCE_PRACTICES_TOTAL:numeric("COMPLIANCE_ADHERENCE_PRACTICES_TOTAL"),
    FINANCIAL_SAFETY_PRACTICES_TOTAL:numeric("FINANCIAL_SAFETY_PRACTICES_TOTAL"),
    TRANSPARENCY_DISCLOSURE_PRACTICES_TOTAL:numeric("TRANSPARENCY_DISCLOSURE_PRACTICES_TOTAL"),

    COMPLIANCE_ADHERENCE_INDICATORS:text("COMPLIANCE_ADHERENCE_INDICATORS"),
    FINANCIAL_SAFETY_INDICATORS:text("FINANCIAL_SAFETY_INDICATORS"),
    TRANSPARENCY_DISCLOSURE_INDICATORS:text("TRANSPARENCY_DISCLOSURE_INDICATORS"),

})


export const operationalEntries = pgTable("operationalEntries",
{  id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id).unique(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
    NO_PROGRAMS_EXECUTED:numeric("NO_PROGRAMS_EXECUTED"),
    NO_PROGRAMS_PLANNED:numeric("NO_PROGRAMS_PLANNED"),
    APPROVED_BUDGET:numeric("APPROVED_BUDGET"),
    TOTAL_PERIOD_EXPENSES:numeric("TOTAL_PERIOD_EXPENSES"),
    NO_ACTUAL_BENEFICIARIES:numeric("NO_ACTUAL_BENEFICIARIES"),
    PLANNED_TARGET_NUMBER:numeric("PLANNED_TARGET_NUMBER"),
    NO_PROGRAMS_WITH_PARTICIPANTS:numeric("NO_PROGRAMS_WITH_PARTICIPANTS"),
    NO_PROGRAMS_PROJECTS:numeric("NO_PROGRAMS_PROJECTS"),
    NO_VOLUNTEERS_CURRENT_QUARTER:numeric("NO_VOLUNTEERS_CURRENT_QUARTER"),
    NO_VOLUNTEERS_NEXT_QUARTER:numeric("NO_VOLUNTEERS_NEXT_QUARTER"),
    NO_VOLUNTEERS_CONT_3:numeric("NO_VOLUNTEERS_CONT_3"),
    TOTAL_VOLUNTEERS:numeric("TOTAL_VOLUNTEERS"),
    DISBURSED_AMOUNTS_QUARTERLY:numeric("DISBURSED_AMOUNTS_QUARTERLY"),
    ACTIVITY_EXPENSES:numeric("ACTIVITY_EXPENSES"),
    ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES:numeric("ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES"),
    SERVICE_EXPENSES:numeric("SERVICE_EXPENSES"),
    SALARY_EXPENSES:numeric("SALARY_EXPENSES"),
    MARKETING_EXPENSES:numeric("MARKETING_EXPENSES"),
    MISCELLANEOUS_EXPENSES:numeric("MISCELLANEOUS_EXPENSES"),
    OTHER_EXPENSES:numeric("OTHER_EXPENSES"),
    APPROVED_AMOUNTS_QUARTERLY:numeric("APPROVED_AMOUNTS_QUARTERLY"),
    APPROVED_ACTIVITY_EXPENSES:numeric("APPROVED_ACTIVITY_EXPENSES"),
    APPROVED_ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES:numeric("APPROVED_ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES"),
    APPROVED_SERVICE_EXPENSES:numeric("APPROVED_SERVICE_EXPENSES"),
    APPROVED_SALARY_EXPENSES:numeric("APPROVED_SALARY_EXPENSES"),
    APPROVED_MISCELLANEOUS_EXPENSES:numeric("APPROVED_MISCELLANEOUS_EXPENSES"),
    APPROVED_MARKETING_EXPENSES:numeric("APPROVED_MARKETING_EXPENSES"),
    APPROVED_OTHER_EXPENSES:numeric("APPROVED_OTHER_EXPENSES"),
 
}

)


export const operationalIndicators = pgTable("operationalIndicators", {
    id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id).unique(),

        entriesId: uuid("entriesId").notNull().references(()=>operationalEntries.id).unique(),
        createdAt: timestamp('createdAt').notNull().defaultNow(),
        updatedAt: timestamp('updatedAt').notNull().defaultNow(),
        OPERATIONAL_PERFORMANCE:numeric("OPERATIONAL_PERFORMANCE"),
        OPS_PLAN_EXEC:numeric("OPS_PLAN_EXEC"),
        PRJKT_PRGM_MGMT:numeric("PRJKT_PRGM_MGMT"),
        EFFIC_INTERNAL_OPS:numeric("EFFIC_INTERNAL_OPS"),
        VOLN_MGMT:numeric("VOLN_MGMT"),
        OPS_GOALS_ACH_PERC:numeric("OPS_GOALS_ACH_PERC"),
        PGRM_PRJKS_EXEC_PERC:numeric("PGRM_PRJKS_EXEC_PERC"),
        EFFIC_PRJKS_EXEC:numeric("EFFIC_PRJKS_EXEC"),
        EFFITV_PRJKS_PGRM:numeric("EFFITV_PRJKS_PGRM"),

        VOLN_CONTR_PRJKS_EXEC:numeric("VOLN_CONTR_PRJKS_EXEC"),
        QLY_SPEED_PROC_EXEC:numeric("QLY_SPEED_PROC_EXEC"),

        DOCS_ARCHIV:numeric("DOCS_ARCHIV"),
        VOLUN_GROWTH_RATE_QUAR:numeric("VOLUN_GROWTH_RATE_QUAR"),

        VOLUN_SUST_PERC:numeric("VOLUN_SUST_PERC"),
        PRJKT_TIMELY_COMP_PERC:numeric("PRJKT_TIMELY_COMP_PERC"),


        BUDGET_COMMIT_PERC:numeric("BUDGET_COMMIT_PERC"),
        REACH_TARGET_AUD_PERC:numeric("RECH_TARGET_AUD_PERC"),
      


})


export const financialEntries = pgTable("financialEntries", {
    id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id).unique(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
    TRADED_INVESTMENTS:numeric("TRADED_INVESTMENTS"),
    UNTRADED_INVESTMENTS:numeric("UNTRADED_INVESTMENTS"),
    AWQAF_INVESTMENTS:numeric("AWQAF_INVESTMENTS"),
    AWQAF_FIXED_ASSETS:numeric("AWQAF_FIXED_ASSETS"),
    CASHE_RELATED:numeric("CASHE_RELATED"),
    CURRENT_LIABILITIES:numeric("CURRENT_LIABILITIES"),
    LIMITED_NET_ASSETS:numeric("LIMITED_NET_ASSETS"),
    AWQAF_NET_ASSETS:numeric("AWQAF_NET_ASSETS"),
    GENERAL_ADMINSTRATIVE_EXPENSES:numeric("GENERAL_ADMINSTRATIVE_EXPENSES"),
    GOVERENCE_EXPENSES:numeric("GOVERENCE_EXPENSES"),
    PROGRAMS_EXPENSES:numeric("PROGRAMS_EXPENSES"),
    ADMINISTRATIVE_EXPENSES_CHARGED_TO_THE_ACTIVITY:numeric("ADMINISTRATIVE_EXPENSES_CHARGED_TO_THE_ACTIVITY"),
    AWQAF_DIST_EXPENSES:numeric("AWQAF_DIST_EXPENSES"),
    INVESTMENT_EXPENSES:numeric("INVESTMENT_EXPENSES"),
    FUND_RAISING_EXPENSES:numeric("FUND_RAISING_EXPENSES"),
    UNRESTRICTED_REVENUE:numeric("UNRESTRICTED_REVENUE"),
    RESTRICTED_REVENUE:numeric("RESTRICTED_REVENUE"),
    AWQAF_QUARTER_REVENUE:numeric("AWQAF_QUARTER_REVENUE"),
    PROFIT_AWQAF_INVESTMENTS:numeric("PROFIT_AWQAF_INVESTMENTS"),
    ZAKAT:numeric("ZAKAT"),
    RESTRICTED_CASH_DONATIONS:numeric("RESTRICTED_CASH_DONATIONS"),
    RESTRICTED_IN_KIND_DONATIONS:numeric("RESTRICTED_IN_KIND_DONATIONS"),
    RESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES:numeric("RESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES"),
    GOVERNMENT_GRANT_DONATIONS:numeric("GOVERNMENT_GRANT_DONATIONS"),
    UNRESTRICTED_CASH_DONATIONS:numeric("UNRESTRICTED_CASH_DONATIONS"),
    UNRESTRICTED_IN_KIND_DONATIONS:numeric("UNRESTRICTED_IN_KIND_DONATIONS"),
    UNRESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES:numeric("UNRESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES"),
    DONATION_BY_LIABILITY_REDUCTION:numeric("DONATION_BY_LIABILITY_REDUCTION"),
    TOTAL_TAX_REFUND:numeric("TOTAL_TAX_REFUND"),
    PROGRAM_AND_ACTIVITY_REVENUES:numeric("PROGRAM_AND_ACTIVITY_REVENUES"),
    RESTRICTED_DESIGNATED_PROGRAM_AND_ACTIVITY_FEES:numeric("RESTRICTED_DESIGNATED_PROGRAM_AND_ACTIVITY_FEES"),
    GENERAL_ASSEMBLY_MEMBERS_SUBSCRIPTION_TOTAL:numeric("GENERAL_ASSEMBLY_MEMBERS_SUBSCRIPTION_TOTAL"),


    TOTAL_EXPENSES:numeric("TOTAL_EXPENSES"),
    TOTAL_SUSTAINABILITY_ASSETS:numeric("TOTAL_SUSTAINABILITY_ASSETS"),
    TOTAL_NET_RESTRICTED_ASSETS_AND_WAQF_CASH:numeric("TOTAL_NET_RESTRICTED_ASSETS_AND_WAQF_CASH"),
    TOTAL_ADMINISTRATIVE_GENERAL_AND_GOVERNANCE_EXPENSES:numeric("TOTAL_ADMINISTRATIVE_GENERAL_AND_GOVERNANCE_EXPENSES"),
    ECONOMIC_RETURN_OF_VOLUNTEERING:numeric("ECONOMIC_RETURN_OF_VOLUNTEERING"),
    ACTUAL_RETURNS:numeric("ACTUAL_RETURNS"),
    EXPECTED_RETURNS:numeric("EXPECTED_RETURNS"),





    TOTAL_PROGRAM_AND_ACTIVITY_EXPENSES:numeric("TOTAL_PROGRAM_AND_ACTIVITY_EXPENSES"),
    TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES:numeric("TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES"),
    TOTAL_SUSTAINABILITY_RETURNS:numeric("TOTAL_SUSTAINABILITY_RETURNS"),
    TOTAL_DONATIONS:numeric("TOTAL_DONATIONS"),
    IMPORTANT_VALUES_AND_PERCENTAGES_SUPPORTING_FINANCIAL_RESOURCES:numeric("IMPORTANT_VALUES_AND_PERCENTAGES_SUPPORTING_FINANCIAL_RESOURCES"),


})



export const financialIndicators = pgTable("financialIndicators", {
    id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id).unique(),
    entriesId: uuid("entriesId").notNull().references(()=>financialEntries.id).unique(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
    
    FINANCIAL_PERF: numeric("FINANCIAL_PERF"),
    ADMIN_EXPENSES: numeric("ADMIN_EXPENSES"),
    PRGRMS_EXPENSES: numeric("PRGRMS_EXPENSES"),
    FINANCIAL_SUSTAIN: numeric("FINANCIAL_SUSTAIN"),
    DONAT_MONEY_RAISING: numeric("DONAT_MONEY_RAISING"),
    ABL_COVER_OBLIG: numeric("ABL_COVER_OBLIG"),
    ADMIN_TO_TOTAL_EXPENSES: numeric("ADMIN_TO_TOTAL_EXPENSES"),
    REV_FIN_SUST_TO_TOTAL_EXPENSES: numeric("REV_FIN_SUST_TO_TOTAL_EXPENSES"),
    PRGRMS_TO_TOTAL_EXPENSES: numeric("PRGRMS_TO_TOTAL_EXPENSES"),
    SUST_TO_TOTAL_EXPENSES: numeric("SUST_TO_TOTAL_EXPENSES"),
    SUST_EXPENSEES_TO_REV: numeric("SUST_EXPENSEES_TO_REV"),
    SUST_RETURN_TO_ASSETS: numeric("SUST_RETURN_TO_ASSETS"),
    FUND_RAISING_TO_TOTAL_EXPENSES: numeric("FUND_RAISING_TO_TOTAL_EXPENSES"),
    FUND_RAISING_TO_TOTAL_DONAT: numeric("FUND_RAISING_TO_TOTAL_DONAT"),
    CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF: numeric("CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF"),
    NET_CACHE_INVEST_ADMIN_EXPENSES: numeric("NET_CACHE_INVEST_ADMIN_EXPENSES"),
    ECONOMIC_RETURN_OF_VOLUNTEERING:numeric("ECONOMIC_RETURN_OF_VOLUNTEERING"),
    RETURNS_FROM_TARGET:numeric("RETURNS_FROM_TARGET"),

    TOTAL_TAX_REFUND: numeric("TOTAL_TAX_REFUND")
})

export const mosquesEntries = pgTable("mosquesEntries", {
    id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id).unique(),

        createdAt: timestamp('createdAt').notNull().defaultNow(),
        updatedAt: timestamp('updatedAt').notNull().defaultNow(),
        NO_EXEC_CONST_REQS:numeric("NO_EXEC_CONST_REQS"),
        TOTAL_CONST_REQS:numeric("TOTAL_CONST_REQS"),
        NO_MOSQUES_ND_CONST:numeric("NO_MOSQUES_ND_CONST"),
        TOTAL_REG_MOSQUES:numeric("TOTAL_REG_MOSQUES"),
        NO_MOSQUES_COMP_CONST:numeric("NO_MOSQUES_COMP_CONST"),
        TOTAL_MOSQUES_PLAN_CONST:numeric("TOTAL_MOSQUES_PLAN_CONST"),
        TOTAL_ANNUAL_EXPANSES_MOSQUES:numeric("TOTAL_ANNUAL_EXPANSES_MOSQUES"),
        NO_SERV_MOSQUES:numeric("NO_SERV_MOSQUES"),
        NO_RESV_COMPL_MOSQUES:numeric("NO_RESV_COMPL_MOSQUES"),
        NO_EXEC_PRJKS_MOSQUES:numeric("NO_EXEC_PRJKS_MOSQUES"),
})
export const mosquesIndicators = pgTable("mosquesIndicators", {
    id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id).unique(),

        entriesId: uuid("entriesId").notNull().references(()=>mosquesEntries.id).unique(),
        createdAt: timestamp('createdAt').notNull().defaultNow(),
        updatedAt: timestamp('updatedAt').notNull().defaultNow(),
        PERC_COMP_REQS_MOSQUES:numeric("PERC_COMP_REQS_MOSQUES"),
        PERC_COMP_ND_MOSQUES:numeric("PERC_COMP_ND_MOSQUES"),
        PERC_PRJK_PG_MOSQUES:numeric("PERC_PRJK_PG_MOSQUES"),
        AVG_COMP_EXP_ANN_MOSQUES:numeric("AVG_COMP_EXP_ANN_MOSQUES"),
        AVG_COMP_MOSQUES:numeric("AVG_COMP_MOSQUES"),
})


export const orphansEntries = pgTable("orphansEntries", {
    id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id).unique(),

        createdAt: timestamp('createdAt').notNull().defaultNow(),
        updatedAt: timestamp('updatedAt').notNull().defaultNow(),
        NO_ADOPTED_ORPHANS:numeric("NO_ADOPTED_ORPHANS"),
        TOTAL_TARGETED_ORPHANS:numeric("TOTAL_TARGETED_ORPHANS"),
        TOTAL_MONTHLY_ADOP_EXP:numeric("TOTAL_MONTHLY_ADOP_EXP"),
        NO_ORPHANS_PRGM:numeric("NO_ORPHANS_PRGM"),
        TOTAL_ORPHANS_QUAL_PRGM:numeric("TOTAL_ORPHANS_QUAL_PRGM"),
        TOTAL_ANNUAL_EXP_ORPHANS:numeric("TOTAL_ANNUAL_EXP_ORPHANS"),
        NO_BENF_ORPHANS:numeric("NO_BENF_ORPHANS"),
        NO_STD_ORPHANS:numeric("NO_STD_ORPHANS"),
        TOTAL_ORPHANS_STD_AGE:numeric("TOTAL_ORPHANS_STD_AGE"),
        NO_ORPHANS_STD_UNI:numeric("NO_ORPHANS_STD_UNI"),



        TOTAL_ORPHANS_AGE_UNI:numeric("TOTAL_ORPHANS_AGE_UNI"),
        TOTAL_MARKS_ORPHANS:numeric("TOTAL_MARKS_ORPHANS"),
        NO_GEN_EDU_ORPHANS:numeric("NO_GEN_EDU_ORPHANS"),
        NO_HLTH_ORPHANS:numeric("NO_HLTH_ORPHANS"),
        TOTAL_ORPHANS:numeric("TOTAL_ORPHANS"),

})
export const orphansIndicators = pgTable("orphansIndicators", {
    id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id).unique(),

        entriesId: uuid("entriesId").notNull().references(()=>orphansEntries.id).unique(),
        createdAt: timestamp('createdAt').notNull().defaultNow(),
        updatedAt: timestamp('updatedAt').notNull().defaultNow(),
        ORPHANS_COV_PERC:numeric("PERC_COMP_REQS_MOSQUES"),
        TOTAL_ORPHANS:numeric("TOTAL_ORPHANS"),
        MON_AVG_ADOP_ORPHANS:numeric("MON_AVG_ADOP_ORPHANS"),
        PERC_ORPHANS_BENF_SRV:numeric("PERC_ORPHANS_BENF_SRV"),
        AVG_ANNUAL_EXP_ORPHANS:numeric("AVG_ANNUAL_EXP_ORPHANS"),
        PERC_ORPHANS_GEN_EDU:numeric("PERC_ORPHANS_GEN_EDU"),
        PERC_ORPHANS_UNI_EDU:numeric("PERC_ORPHANS_UNI_EDU"),
        AVG_ORPHANS_MARKS:numeric("AVG_ORPHANS_MARKS"),
        HLTH_CVG:numeric("HLTH_CVG"),
        
})

export const generalEntries = pgTable("generalEntries",{
    id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id),
    category: text("category").notNull(),
    entryName:text("entryName").notNull(),
    entryValue: text("entryValue").notNull(),


})


export const generalIndicators = pgTable("generalIndicators",{
    id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id),
    category: text("category").notNull(),
    indicatorName:text("indicatorName").notNull(),
    indicatorValue: text("indicatorValue").notNull(),
})



export const schema = {user,session,account,verification,operationalIndicators,organization,
    operationalEntries,corporateEntries,financialEntries,generalEntries,generalIndicators,dashbaord, corporateIndicators, governanceEntries
}