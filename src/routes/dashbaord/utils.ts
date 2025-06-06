import { DASHBOARD_RELATED_COLUMN } from "../../db/constants"
import { TCorporateIndicators, TFinancialIndicators, TMosquesIndicators, TOperationalIndicators, TOrphansIndicators } from "../../db/types"


export const  getDashboardBodyGivenSettingType = (settingType:  typeof DASHBOARD_RELATED_COLUMN[number], visible:boolean,category?:string)=>{
switch (settingType) {
    case "governanceIndicatorsSetting":
        return {
            title:"NEW_GOVERNANCE_INDICATORS",
            type:"governance",
            visible
        }
    case "financialIndicatorsSetting":
        return {
            title:"NEW_FINANCIAL_INDICATORS",
            type:"financial",
            visible
        }
        case "corporateIndicatorsSetting":
            return {
                title:"NEW_CORPORATE_INDICATORS",
                type:"corporate",
                visible
            }
        case "operationalIndicatorsSetting":
        
            return {
                title:"NEW_OPERATIONAL_INDICATORS",
                type:"operational",
                visible
            }
            case "generalndicatorsSetting":
                default:
                 return {
                    title:"NEW_GENERAL_INDICATORS", 
                    type:"general",
                    visible,
                    category:category??"",
                 }

}
}



export const initOperationalIndicators = ()=>{
    let indicators:TOperationalIndicators = {
        PGRM_PRJKS_EXEC_PERC:(0).toPrecision(3),
        BUDGET_COMMIT_PERC:(0).toPrecision(3),
        REACH_TARGET_AUD_PERC:(0).toPrecision(3),
        VOLN_CONTR_PRJKS_EXEC:(0).toPrecision(3),
        VOLUN_GROWTH_RATE_QUAR:(0).toPrecision(3),
        VOLUN_SUST_PERC:(0).toPrecision(3),
   
       
     
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

        
        ABL_COVER_OBLIG:(0).toPrecision(3),
        DONAT_MONEY_RAISING:(0).toPrecision(3),
        FINANCIAL_SUSTAIN:(0).toPrecision(3),
        PRGRMS_EXPENSES:(0).toPrecision(3),
        ADMIN_EXPENSES:(0).toPrecision(3),
        FINANCIAL_PERF:(0).toPrecision(3),
        RETURNS_FROM_TARGET:(0).toPrecision(3)
    }
    return indicators
}





export const initCorporateIndicators = ()=>{
    let indicators:TCorporateIndicators = {
        DIRECT_MANAGER_EVALUATION:(0).toPrecision(3),

        FOLLOWUP_EMPS_PERF:(0).toPrecision(3),

        EMP_PERF_AND_PROD:(0).toPrecision(3),
        EMP_COMMITMENT:(0).toPrecision(3),
        EMP_TRAINING_INDICATOR:(0).toPrecision(3),
        BENEF_SATIS_MEASURMENT:(0).toPrecision(3),
        EMP_SATIS_MEASURMENT:(0).toPrecision(3),
        PARTENERS_SATIS_MEASURMENT:(0).toPrecision(3),
        VOLUN_SATIS_MEASURMENT:(0).toPrecision(3),
        DONATORS_SATIS_MEASURMENT:(0).toPrecision(3),
        ADMIN_ORG_SATIS_MEASURMENT:(0).toPrecision(3),
        COMMUNITY_SATIS_MEASURMENT:(0).toPrecision(3),
        DAILY_OPS_MGMT:(0).toPrecision(3),

        FOLLOWUP_BOARD_DECISION:(0).toPrecision(3),
        OPERATIONAL_PLAN_ACHIVMENT_GOALS:(0).toPrecision(3),
        CEO_PERFORMANCE:(0).toPrecision(3),
        EMPLOYMENT_PERFORMANCE:(0).toPrecision(3),


        
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
