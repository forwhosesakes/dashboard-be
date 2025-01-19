
import { pgTable, text, serial, timestamp, boolean, numeric, uuid, integer } from "drizzle-orm/pg-core";

			
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
 banExpires: timestamp('banExpires')
				});

export const session = pgTable("session", {
					id: text("id").primaryKey(),
					expiresAt: timestamp('expiresAt').notNull(),
 token: text('token').notNull().unique(),
 createdAt: timestamp('createdAt').notNull(),
 updatedAt: timestamp('updatedAt').notNull(),
 ipAddress: text('ipAddress'),
 userAgent: text('userAgent'),
 userId: text('userId').notNull().references(()=> user.id),
 impersonatedBy: text('impersonatedBy')
				});

export const account = pgTable("account", {
					id: text("id").primaryKey(),
					accountId: text('accountId').notNull(),
 providerId: text('providerId').notNull(),
 userId: text('userId').notNull().references(()=> user.id),
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
                }) 

export const dashbaord = pgTable("dashboard",{
    id: serial("id").primaryKey(),
    title:text("title").notNull(),
    content:text("content"),
    clientId: text("clientId").notNull().references(()=>user.id),
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
    dashbaordId: integer("dashboardId").notNull().references(()=>dashbaord.id),
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
    TOTAL_RESPONSES_VOL_SATIS:numeric("TOTAL_RESPONSES_VOL_SATIS"),
    NO_RESPOSES_VOL_SATIS_FORM:numeric("NO_RESPOSES_VOL_SATIS_FORM"),
    TOTAL_GRADES_VOL_STATIS:numeric("TOTAL_GRADES_VOL_STATIS"),
    NO_RESPONSES_VOL_SATIS_FORM:numeric("NO_RESPONSES_VOL_SATIS_FORM"),
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






                   

})

export const operationalEntries = pgTable("operationalEntries",
{  id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id),
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
    TOTAL_VOLUNTEERS:numeric("TOTAL_VOLUNTEERS"),








}

)


export const operationalIndicators = pgTable("operationalIndicators", {
    id: uuid("id").primaryKey().defaultRandom(),
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id),

        entriesId: uuid("entriesId").notNull().references(()=>operationalEntries.id),
        createdAt: timestamp('createdAt').notNull().defaultNow(),
        updatedAt: timestamp('updatedAt').notNull().defaultNow(),
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
    dashbaordId: serial("dashboardId").notNull().references(()=>dashbaord.id),
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
    TOTAL_RESPONSES_VOL_SATIS:numeric("TOTAL_RESPONSES_VOL_SATIS"),
    NO_RESPOSES_VOL_SATIS_FORM:numeric("NO_RESPOSES_VOL_SATIS_FORM"),
    TOTAL_GRADES_VOL_STATIS:numeric("TOTAL_GRADES_VOL_STATIS"),
    NO_RESPONSES_VOL_SATIS_FORM:numeric("NO_RESPONSES_VOL_SATIS_FORM"),
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
    operationalEntries,corporateEntries,financialEntries,generalEntries,generalIndicators,dashbaord
}