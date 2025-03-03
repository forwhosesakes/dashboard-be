import { DASHBOARD_RELATED_COLUMN } from "../../db/constants"
import { TCorporateIndicators, TFinancialIndicators, TMosquesIndicators, TOperationalIndicators, TOrphansIndicators } from "../../db/types"


export const  getDashboardBodyGivenSettingType = (settingType:  typeof DASHBOARD_RELATED_COLUMN[number], category?:string)=>{
switch (settingType) {
    case "financialIndicatorsSetting":
        return {
            title:"NEW_FINANCIAL_INDICATORS",
            type:"financial"
        }
        case "corporateIndicatorsSetting":
            return {
                title:"NEW_CORPORATE_INDICATORS",
                type:"corporate"
            }
        case "operationalIndicatorsSetting":
        
            return {
                title:"NEW_OPERATIONAL_INDICATORS",
                type:"operational"
            }
            case "generalndicatorsSetting":
                default:
                 return {
                    title:"NEW_GENERAL_INDICATORS", 
                    type:"general",
                    category:category??"",
                 }

}
}



export const initOperationalIndicators = ()=>{
    let indicators:TOperationalIndicators = {
        REACH_TARGET_AUD_PERC:(0).toPrecision(3),
        PRJK_GOALS_ACHV_PERC:(0).toPrecision(3),
        BUDGET_COMMIT_PERC:(0).toPrecision(3),
        PRJKT_TIMELY_COMP_PERC:(0).toPrecision(3),
        VOLUN_SUST_PERC:(0).toPrecision(3),
        VOLUN_GROWTH_RATE_QUAR:(0).toPrecision(3),
        DOCS_ARCHIV:(0).toPrecision(3),
        QLY_SPEED_PROC_EXEC:(0).toPrecision(3),
        EFFIC_PRJKS_EXEC:(0).toPrecision(3),
        VOLN_CONTR_PRJKS_EXEC:(0).toPrecision(3),
        PGRM_PRJKS_EXEC_PERC:(0).toPrecision(3),
        OPS_GOALS_ACH_PERC:(0).toPrecision(3),
        EFFITV_PRJKS_PGRM:(0).toPrecision(3),
        VOLN_MGMT:(0).toPrecision(3),
        EFFIC_INTERNAL_OPS:(0).toPrecision(3),
        PRJKT_PRGM_MGMT:(0).toPrecision(3),
        OPS_PLAN_EXEC:(0).toPrecision(3),
        OPERATIONAL_PERFORMANCE:(0).toPrecision(3)
    }
    return indicators
}

export const initFinancialIndicators = ()=>{
    let indicators:TFinancialIndicators = {
        TOTAL_TAX_REFUND:(0).toPrecision(3),
        ADMIN_TO_TOTAL_EXPENSES:(0).toPrecision(3),
        REV_FIN_SUST_TO_TOTAL_EXPENSES:(0).toPrecision(3),
        PRGRMS_TO_TOTAL_EXPENSES:(0).toPrecision(3),
        SUST_TO_TOTAL_EXPENSES:(0).toPrecision(3),
        SUST_EXPENSEES_TO_REV:(0).toPrecision(3),

        SUST_RETURN_TO_ASSETS:(0).toPrecision(3),
        FUND_RAISING_TO_TOTAL_EXPENSES:(0).toPrecision(3),
        FUND_RAISING_TO_TOTAL_DONAT:(0).toPrecision(3),
        CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF:(0).toPrecision(3),
        NET_CACHE_INVEST_ADMIN_EXPENSES:(0).toPrecision(3),

        
        DONAT_PERC:(0).toPrecision(3),
        PLATFORM_REV_PERC:(0).toPrecision(3),
        PRGMS_PRJKS_REV:(0).toPrecision(3),
        PAID_MEMBERSHIP_PERC:(0).toPrecision(3),
        ECO_RETURN_VOLUN:(0).toPrecision(3),
        RATE_REV_ANNUAL_GROWTH:(0).toPrecision(3),
        COMMIT_DISC_PERC:(0).toPrecision(3),
        RATE_SUST_DONAT:(0).toPrecision(3),
        EFFECIENT_RESOURCE_MGMT:(0).toPrecision(3),
        DIVERSITY_INCOME_RESOURCES:(0).toPrecision(3),
        ABL_COVER_OBLIG:(0).toPrecision(3),
        DONAT_MONEY_RAISING:(0).toPrecision(3),
        FINANCIAL_SUSTAIN:(0).toPrecision(3),
        PRGRMS_EXPENSES:(0).toPrecision(3),
        ADMIN_EXPENSES:(0).toPrecision(3),
        FINANCIAL_RESOURCES_DEV:(0).toPrecision(3),
        FINANCIAL_PERF:(0).toPrecision(3),
        TOTAL_FINANCIAL_PEFORMANCE:(0).toPrecision(3),
    }
    return indicators
}





export const initCorporateIndicators = ()=>{
    let indicators:TCorporateIndicators = {
        FOLLOWUP_EMPS_PERF:(0).toPrecision(3),
        DAILY_OPS_MGMT:(0).toPrecision(3),
        OPERATIONAL_PLAN_ACHIVMENT_GOALS:(0).toPrecision(3),
        FOLLOWUP_BOARD_DECISION:(0).toPrecision(3),
        ENTERPRISE_COMMUN:(0).toPrecision(3),

        COMMUNITY_SATIS_MEASURMENT:(0).toPrecision(3),
        ADMIN_ORG_SATIS_MEASURMENT:(0).toPrecision(3),
        DONATORS_SATIS_MEASURMENT:(0).toPrecision(3),
        VOLUN_SATIS_MEASURMENT:(0).toPrecision(3),
        PARTENERS_SATIS_MEASURMENT:(0).toPrecision(3),

        
        EMP_SATIS_MEASURMENT:(0).toPrecision(3),
        BENEF_SATIS_MEASURMENT:(0).toPrecision(3),
        QUALITY_OPERATIONAL_PLAN:(0).toPrecision(3),
        FOLLOWUP_OPERATIONAL_PLAN:(0).toPrecision(3),
        TRAIN_IMPACT:(0).toPrecision(3),
        TRAIN_PLAN_EXEC:(0).toPrecision(3),
        JOB_COMMITMENT:(0).toPrecision(3),
        TARGETS_HIT_PERF_EVAL:(0).toPrecision(3),
FINANCIAL_SAFETY_PRACTICES:(0).toPrecision(3),
        TRANSPARENCY_DISCLOSURE_PRACTICES:(0).toPrecision(3),
        COMPLIANCE_ADHERENCE_PRACTICES:(0).toPrecision(3),
        OPERATIONAL_PERF:(0).toPrecision(3),
        EXEC_LEADERSHIP:(0).toPrecision(3),
        EMP_DEV_TRAIN:(0).toPrecision(3),
        EMP_PERF_PROD:(0).toPrecision(3),
        RECRUITMENT:(0).toPrecision(3),
        CEO_PERFORMANCE:(0).toPrecision(3),
        SATIS_MEASURMENT:(0).toPrecision(3),

        PLANNING_ORGANIZING:(0).toPrecision(3),
        HR:(0).toPrecision(3),
        GOVERANCE:(0).toPrecision(3),
        CORORATE_PERFORMANCE:(0).toPrecision(3),



        

    }
    return indicators
}

export const initOrphansIndicators = ()=>{
    let indicators:TOrphansIndicators = {
        TOTAL_ORPHANS:(0).toPrecision(3),
        ORPHANS_COV_PERC:(0).toPrecision(3),
        MON_AVG_ADOP_ORPHANS:(0).toPrecision(3),
        PERC_ORPHANS_BENF_SRV:(0).toPrecision(3),
        AVG_ANNUAL_EXP_ORPHANS:(0).toPrecision(3),

        PERC_ORPHANS_GEN_EDU:(0).toPrecision(3),
        PERC_ORPHANS_UNI_EDU:(0).toPrecision(3),
        AVG_ORPHANS_MARKS:(0).toPrecision(3),
        HLTH_CVG:(0).toPrecision(3),

    }
    return indicators
}

export const initMosquesIndicators = ()=>{
    let indicators:TMosquesIndicators = {
        PERC_COMP_REQS_MOSQUES:(0).toPrecision(3),
        PERC_COMP_ND_MOSQUES:(0).toPrecision(3),
        PERC_PRJK_PG_MOSQUES:(0).toPrecision(3),
        AVG_COMP_EXP_ANN_MOSQUES:(0).toPrecision(3),
        AVG_COMP_MOSQUES:(0).toPrecision(3),

    }
    return indicators
}
