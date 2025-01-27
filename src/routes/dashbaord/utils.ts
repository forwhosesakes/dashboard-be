import { DASHBOARD_RELATED_COLUMN } from "../../db/org/constants"
import { TFinancialIndicators, TOperationalIndicators } from "../../db/types"


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
    }
    return indicators
}

export const initFinancialIndicators = ()=>{
    let indicators:TFinancialIndicators = {
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


        

    }
    return indicators
}
