
import { pgTable, text, serial, timestamp, boolean, numeric, uuid, integer, uniqueIndex } from "drizzle-orm/pg-core";

			
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
    email:text("email"),
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
    generalndicatorsSetting:numeric("generalndicatorsSetting"),
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
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const corporateEntries = pgTable("corporateEntries", {
    id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: integer("dashboardId").notNull().references(()=>dashbaord.id).unique(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
    COMPLIANCE_ADHERENCE_PRACTICES:numeric("COMPLIANCE_ADHERENCE_PRACTICES"),
    TRANSPARENCY_DISCLOSURE_PRACTICES:numeric("TRANSPARENCY_DISCLOSURE_PRACTICES"),
    FINANCIAL_SAFETY_PRACTICES:numeric("FINANCIAL_SAFETY_PRACTICES"),
    NO_SUCCESSFUL_HIRES_POST_EXP:numeric("NO_SUCCESSFUL_HIRES_POST_EXP"),
    TOTAL_HIRES:numeric("TOTAL_HIRES"),
    PERC_COMMIT_WORK_HOURS:numeric("PERC_COMMIT_WORK_HOURS"),
    NO_EXE_PRACTICES:numeric("NO_EXE_PRACTICES"),
    NO_PLANNED_PRACTICES:numeric("NO_PLANNED_PRACTICES"),
    NO_COMP_ELEMENTS:numeric("NO_COMP_ELEMENTS"),
    TOTAL_ELEMENTS:numeric("TOTAL_ELEMENTS"),
    NO_TIMELY_REPORTS:numeric("NO_TIMELY_REPORTS"),
    NO_REQUIRED_REPORTS:numeric("NO_REQUIRED_REPORTS"),
    NO_GRADES_BENEFITS_SATISF:numeric("NO_GRADES_BENEFITS_SATISF"),
    NO_RESPONSES_SATIS_FORM:numeric("NO_RESPONSES_SATIS_FORM"),
    TOTAL_GRADES_EMP_SATIS:numeric("TOTAL_GRADES_EMP_SATIS"),
    NO_RESPONSES_EMP_SATIS:numeric("NO_RESPONSES_EMP_SATIS"),
    TOTAL_GEADES_PARTENERS_SATIS:numeric("TOTAL_GEADES_PARTENERS_SATIS"),
    NO_RESPONSES_PARTERS_FORM:numeric("NO_RESPONSES_PARTERS_FORM"),
    TOTAL_GRADES_VOL_STATIS:numeric("TOTAL_GRADES_VOL_STATIS"),
    NO_RESPONSES_VOL_SATIS_FORM:numeric("NO_RESPONSES_VOL_SATIS_FORM"),
    TOTAL_GRADES_DON_STATIS:numeric("TOTAL_GRADES_DON_STATIS"),
    NO_RESPONSES_DON_SATIS_FORM:numeric("NO_RESPONSES_DON_SATIS_FORM"),
    TOTAL_SATIS_GRADES_ORG:numeric("TOTAL_SATIS_GRADES_ORG"),
    NO_ORG_MEMBERS:numeric("NO_ORG_MEMBERS"),
    TOTAL_GRADES_COM:numeric("TOTAL_GRADES_COM"),
    NO_RESPONSES_COM_SATIS:numeric("NO_RESPONSES_COM_SATIS"),
    TASKS_ACHIEVED_TIMELY_CEO:numeric("TASKS_ACHIEVED_TIMELY_CEO"),
    TOTAL_PLANNED_TASKS_CEO:numeric("TOTAL_PLANNED_TASKS_CEO"),
    AVG_EVAL_EMPS:numeric("AVG_EVAL_EMPS"),
    AVG_RES_SATIS_FORMS_EMP:numeric("AVG_RES_SATIS_FORMS_EMP"),
    EMP_EVAL:numeric("EMP_EVAL"),
    EMP_ACHIEVMENT_PERC:numeric("EMP_ACHIEVMENT_PERC"),
    NO_EXEC_DESC: numeric("NO_EXEC_DESC"),
    TOTAL_DESC: numeric("TOTAL_DESC"),
    NO_ACHIV_TARGETS: numeric("NO_ACHIV_TARGETS"),
    TOTAL_TARGETS: numeric("TOTAL_TARGETS"),

})
export const corporateIndicators = pgTable("corporateIndicators", {
    id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id).unique(),

        entriesId: uuid("entriesId").notNull().references(()=>corporateEntries.id).unique(),
        createdAt: timestamp('createdAt').notNull().defaultNow(),
        updatedAt: timestamp('updatedAt').notNull().defaultNow(),
        CORORATE_PERFORMANCE:numeric("CORORATE_PERFORMANCE"),
        GOVERANCE:numeric("GOVERANCE"),
        HR:numeric("HR"),
        PLANNING_ORGANIZING:numeric("PLANNING_ORGANIZING"),
        SATIS_MEASURMENT:numeric("SATIS_MEASURMENT"),
        CEO_PERFORMANCE:numeric("CEO_PERFORMANCE"),
        COMPLIANCE_ADHERENCE_PRACTICES:numeric("COMPLIANCE_ADHERENCE_PRACTICES"),
        TRANSPARENCY_DISCLOSURE_PRACTICES:numeric("TRANSPARENCY_DISCLOSURE_PRACTICES"),
        FINANCIAL_SAFETY_PRACTICES:numeric("FINANCIAL_SAFETY_PRACTICES"),

        RECRUITMENT:numeric("RECRUITMENT"),
        EMP_PERF_PROD:numeric("EMP_PERF_PROD"),
        EMP_DEV_TRAIN:numeric("EMP_DEV_TRAIN"),


        TARGETS_HIT_PERF_EVAL:numeric("TARGETS_HIT_PERF_EVAL"),
        JOB_COMMITMENT:numeric("JOB_COMMITMENT"),
        TRAIN_PLAN_EXEC:numeric("TRAIN_PLAN_EXEC"),
        TRAIN_IMPACT:numeric("TRAIN_IMPACT"),


        FOLLOWUP_OPERATIONAL_PLAN:numeric("FOLLOWUP_OPERATIONAL_PLAN"),
        QUALITY_OPERATIONAL_PLAN:numeric("QUALITY_OPERATIONAL_PLAN"),

        BENEF_SATIS_MEASURMENT:numeric("BENEF_SATIS_MEASURMENT"),
        EMP_SATIS_MEASURMENT:numeric("EMP_SATIS_MEASURMENT"),
        PARTENERS_SATIS_MEASURMENT:numeric("PARTENERS_SATIS_MEASURMENT"),
        VOLUN_SATIS_MEASURMENT:numeric("VOLUN_SATIS_MEASURMENT"),
        DONATORS_SATIS_MEASURMENT:numeric("DONATORS_SATIS_MEASURMENT"),
        ADMIN_ORG_SATIS_MEASURMENT:numeric("ADMIN_ORG_SATIS_MEASURMENT"),
        COMMUNITY_SATIS_MEASURMENT:numeric("COMMUNITY_SATIS_MEASURMENT"),




        EXEC_LEADERSHIP:numeric("EXEC_LEADERSHIP"),
        OPERATIONAL_PERF:numeric("OPERATIONAL_PERF"),
        ENTERPRISE_COMMUN:numeric("ENTERPRISE_COMMUN"),


        FOLLOWUP_BOARD_DECISION:numeric("FOLLOWUP_BOARD_DECISION"),
        OPERATIONAL_PLAN_ACHIVMENT_GOALS:numeric("OPERATIONAL_PLAN_ACHIVMENT_GOALS"),
        DAILY_OPS_MGMT:numeric("DAILY_OPS_MGMT"),
        FOLLOWUP_EMPS_PERF:numeric("FOLLOWUP_EMPS_PERF"),
})

export const governanceEntries = pgTable("governanceEntries", {
    id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id).unique(),
    entriesId: uuid("entriesId").notNull().references(()=>corporateEntries.id).unique(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
    COMPLIANCE_ADHERENCE_PRACTICES:text("COMPLIANCE_ADHERENCE_PRACTICES"),
    FINANCIAL_SAFETY_PRACTICES:text("FINANCIAL_SAFETY_PRACTICES"),
    TRANSPARENCY_DISCLOSURE_PRACTICES:text("TRANSPARENCY_DISCLOSURE_PRACTICES"),
})


export const operationalEntries = pgTable("operationalEntries",
{  id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id).unique(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
    NO_OPERATIONAL_GOALS_ACHIEVED:numeric("NO_OPERATIONAL_GOALS_ACHIEVED"),
    NO_OPERATIONAL_GOALS_PLANNED:numeric("NO_OPERATIONAL_GOALS_PLANNED"),
    NO_PROGRAMS_EXECUTED:numeric("NO_PROGRAMS_EXECUTED"),
    NO_PROGRAMS_PLANNED:numeric("NO_PROGRAMS_PLANNED"),
    NO_TIMELY_ACTIVITIES:numeric("NO_TIMELY_ACTIVITIES"),
    TOTAL_PLANNED_ACTIVITIES:numeric("TOTAL_PLANNED_ACTIVITIES"),
    APPROVED_BUDGET:numeric("APPROVED_BUDGET"),
    PLANNED_ACTUAL_DIFF:numeric("PLANNED_ACTUAL_DIFF"),
    NO_OUTPUTS_ACHIEVED:numeric("NO_OUTPUTS_ACHIEVED"),
    TOTAL_TARGETED_OUTPUTS:numeric("TOTAL_TARGETED_OUTPUTS"),
    NO_ACTUAL_BENEFICIARIES:numeric("NO_ACTUAL_BENEFICIARIES"),
    PLANNED_TARGET_NUMBER:numeric("PLANNED_TARGET_NUMBER"),
    NO_PROGRAMS_WITH_PARTICIPANTS:numeric("NO_PROGRAMS_WITH_PARTICIPANTS"),
    NO_PROGRAMS_PROJECTS:numeric("NO_PROGRAMS_PROJECTS"),
    NO_TIMELY_TRANSACTIONS:numeric("NO_TIMELY_TRANSACTIONS"),
    TOTAL_TRANSACTIONS:numeric("TOTAL_TRANSACTIONS"),
    NO_ARCHIVED_DOCS:numeric("NO_ARCHIVED_DOCS"),
    TOTAL_DOCS:numeric("TOTAL_DOCS"),
    NO_VOLUNTEERS_CURRENT_QUARTER:numeric("NO_VOLUNTEERS_CURRENT_QUARTER"),
    NO_VOLUNTEERS_NEXT_QUARTER:numeric("NO_VOLUNTEERS_NEXT_QUARTER"),
    NO_VOLUNTEERS_CONT_3:numeric("NO_VOLUNTEERS_CONT_3"),
    TOTAL_VOLUNTEERS:numeric("TOTAL_VOLUNTEERS")
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
        PRJK_GOALS_ACHV_PERC:numeric("PRJK_GOALS_ACHV_PERC"),

        REACH_TARGET_AUD_PERC:numeric("RECH_TARGET_AUD_PERC"),

})


export const financialEntries = pgTable("financialEntries", {
    id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id).unique(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
    GENERAL_ADMINSTRATIVE_EXPENSES:numeric("GENERAL_ADMINSTRATIVE_EXPENSES"),
    GOVERENCE_EXPENSES:numeric("GOVERENCE_EXPENSES"),
    PROGRAMS_EXPENSES_BOUNDED:numeric("PROGRAMS_EXPENSES_BOUNDED"),
    PROGRAMS_EXPENSES_UNBOUNDED:numeric("PROGRAMS_EXPENSES_UNBOUNDED"),
    PROGRAMS_EXPENSES:numeric("PROGRAMS_EXPENSES"),
    GENERAL_ADMINSTRATIVE_EXPENSES_ACT:numeric("GENERAL_ADMINSTRATIVE_EXPENSES_ACT"),
    AWQAF_EXPENSES:numeric("AWQAF_EXPENSES"),
    INVESTMENT_EXPENSES:numeric("INVESTMENT_EXPENSES"),
    SUSTAINBILITY_EXPENSES:numeric("SUSTAINBILITY_EXPENSES"),
    FUND_RAISING_EXPENSES:numeric("FUND_RAISING_EXPENSES"),
    TOTAL_EXPENSES:numeric("TOTAL_EXPENSES"),
    AWQAF_REVENUE:numeric("AWQAF_REVENUE"),
    INVESTMENT_REVENUE:numeric("INVESTMENT_REVENUE"),
    SUSTAINBILITY_REVENUE:numeric("SUSTAINBILITY_REVENUE"),
    BOUNDED_CHARITY:numeric("BOUNDED_CHARITY"),
    UNBOUNDED_CHARITY:numeric("UNBOUNDED_CHARITY"),
    TOTAL_CHARITY:numeric("TOTAL_CHARITY"),
    CASH_RELATED:numeric("CASH_RELATED"),
    TRADED_INVESTMENTS:numeric("TRADED_INVESTMENTS"),
    SUSTAIN_ASSETS_WAQFI:numeric("SUSTAIN_ASSETS_WAQFI"),
    SUSTAIN_ASSETS_INVEST:numeric("SUSTAIN_ASSETS_INVEST"),
    SUSTAIN_ASSETS_FIN:numeric("SUSTAIN_ASSETS_FIN"),
    CURRENT_LIABILITIES:numeric("CURRENT_LIABILITIES"),
    BOUNDED_NET_ASSETS:numeric("BOUNDED_NET_ASSETS"),
    AWQAF_NET_ASSETS_CASH:numeric("AWQAF_NET_ASSETS_CASH"),
    GOV_PLATFORMS_REVENUE:numeric("GOV_PLATFORMS_REVENUE"),
    PRGMS_PRJKS_REVENUE:numeric("PRGMS_PRJKS_REVENUE"),
    NO_PAID_MEMBERSHIP:numeric("NO_PAID_MEMBERSHIP"),
    TOTAL_MEMBERSHIP:numeric("TOTAL_MEMBERSHIP"),
    FIN_VALUE_VOLUN:numeric("FIN_VALUE_VOLUN"),
    OPERATIONAL_EXPANSES:numeric("OPERATIONAL_EXPANSES"),
    LAST_YEAR_REVENUE:numeric("LAST_YEAR_REVENUE"),
    NO_CONT_VOLUN:numeric("NO_CONT_VOLUN"),
    NO_TOTAL_VOLUN_LAST_YEAR:numeric("NO_TOTAL_VOLUN_LAST_YEAR"),
    NO_TOTAL_MONEY_VAT:numeric("NO_TOTAL_MONEY_VAT"),
    START_LIABILITIES:numeric("START_LIABILITIES"),
    END_LIABILITIES:numeric("END_LIABILITIES"),
    TOTAL_TAX_REFUND:numeric("TOTAL_TAX_REFUND")
})



export const financialIndicators = pgTable("financialIndicators", {
    id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id).unique(),

        entriesId: uuid("entriesId").notNull().references(()=>financialEntries.id).unique(),
        createdAt: timestamp('createdAt').notNull().defaultNow(),
        updatedAt: timestamp('updatedAt').notNull().defaultNow(),
        TOTAL_FINANCIAL_PEFORMANCE:numeric("TOTAL_FINANCIAL_PEFORMANCE"),
        FINANCIAL_PERF:numeric("FINANCIAL_PERF"),
        FINANCIAL_RESOURCES_DEV:numeric("FINANCIAL_RESOURCES_DEV"),
        PRGRMS_EXPENSES:numeric("PRGRMS_EXPENSES"),
        FINANCIAL_SUSTAIN:numeric("FINANCIAL_SUSTAIN"),
        ADMIN_EXPENSES:numeric("ADMIN_EXPENSES"),

        DONAT_MONEY_RAISING:numeric("DONAT_MONEY_RAISING"),

        ABL_COVER_OBLIG:numeric("ABL_COVER_OBLIG"),
        DIVERSITY_INCOME_RESOURCES:numeric("DIVERSITY_INCOME_RESOURCES"),
        EFFECIENT_RESOURCE_MGMT:numeric("EFFECIENT_RESOURCE_MGMT"),
        ADMIN_TO_TOTAL_EXPENSES:numeric("ADMIN_TO_TOTAL_EXPENSES"),

        REV_FIN_SUST_TO_TOTAL_EXPENSES:numeric("REV_FIN_SUST_TO_TOTAL_EXPENSES"),
        PRGRMS_TO_TOTAL_EXPENSES:numeric("PRGRMS_TO_TOTAL_EXPENSES"),
        FUND_RAISING_TO_TOTAL_EXPENSES:numeric("FUND_RAISING_TO_TOTAL_EXPENSES"),
        SUST_EXPENSEES_TO_REV:numeric("SUST_EXPENSEES_TO_REV"),
        SUST_RETURN_TO_ASSETS:numeric("SUST_RETURN_TO_ASSETS"),
        FUND_RAISING_TO_TOTAL_DONAT:numeric("FUND_RAISING_TO_TOTAL_DONAT"),
        CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF:numeric("CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF"),
        SUST_TO_TOTAL_EXPENSES:numeric("SUST_TO_TOTAL_EXPENSES"),
        NET_CACHE_INVEST_ADMIN_EXPENSES:numeric("NET_CACHE_INVEST_ADMIN_EXPENSES"),
        DONAT_PERC:numeric("DONAT_PERC"),
        PLATFORM_REV_PERC:numeric("PLATFORM_REV_PERC"),
        PRGMS_PRJKS_REV:numeric("PRGMS_PRJKS_REV"),
        PAID_MEMBERSHIP_PERC:numeric("PAID_MEMBERSHIP_PERC"),
        ECO_RETURN_VOLUN:numeric("ECO_RETURN_VOLUN"),
        RATE_REV_ANNUAL_GROWTH:numeric("RATE_REV_ANNUAL_GROWTH"),
        COMMIT_DISC_PERC:numeric("COMMIT_DISC_PERC"),
        RATE_SUST_DONAT:numeric("RATE_SUST_DONAT"),
        TOTAL_TAX_REFUND:numeric("TOTAL_TAX_REFUND")
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