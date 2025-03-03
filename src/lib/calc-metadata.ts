import { TCorporateEntries, TCorporateIndicators, TFinancialEntries, TFinancialIndicators, TMosquesEntries, TMosquesIndicators, TOperationalEntries, TOperationalIndicators, TOperationalIndicatorsRecord, TOrphansEntries, TOrphansIndicators } from "../db/types"


type IndicatorMetadata<T, M> = {
    weight:number,
    parent: keyof T | "ROOT", 
    arabicLabel:string,
    params: (keyof M | keyof T )[],
    formula: (...params:number[])=>number
}
export const OPERATIONAL_METADATA:{[key:string]:IndicatorMetadata<TOperationalIndicators, TOperationalEntries>} = {
   
    OPERATIONAL_PERFORMANCE: {
        weight: 0.30,
        parent: "ROOT",
        arabicLabel:"تنفيذ الخطة التشغيلية",
        params:["OPS_PLAN_EXEC","PRJKT_PRGM_MGMT","EFFIC_INTERNAL_OPS","EFFIC_INTERNAL_OPS" ],
        formula : (OPS_PLAN_EXEC:number,PRJKT_PRGM_MGMT:number,EFFIC_INTERNAL_OPS:number,VOLN_MGMT:number)=>(OPS_PLAN_EXEC*0.08/0.3)+(PRJKT_PRGM_MGMT*0.1/0.3)+(EFFIC_INTERNAL_OPS*0.07/0.3)+(VOLN_MGMT*0.05/0.3)
    },
    OPS_PLAN_EXEC: {
        weight: 0.08,
        parent: "ROOT",
        arabicLabel:"تنفيذ الخطة التشغيلية",
        params:["OPS_GOALS_ACH_PERC","PGRM_PRJKS_EXEC_PERC"],
        formula : (OPS_GOALS_ACH_PERC:number,PGRM_PRJKS_EXEC_PERC:number)=>(PGRM_PRJKS_EXEC_PERC*0.03)+(OPS_GOALS_ACH_PERC*0.05)
    },
    PRJKT_PRGM_MGMT:{
        weight: 0.1,
        parent: "ROOT",
        arabicLabel:"إدارة المشاريع والبرامج",
        params:["EFFIC_PRJKS_EXEC","EFFITV_PRJKS_PGRM","VOLN_CONTR_PRJKS_EXEC"],
        formula:(EFFIC_PRJKS_EXEC:number,EFFITV_PRJKS_PGRM:number, VOLN_CONTR_PRJKS_EXEC:number)=>(EFFIC_PRJKS_EXEC*0.03)+(EFFITV_PRJKS_PGRM*0.04)+(VOLN_CONTR_PRJKS_EXEC*0.03),
    },
    EFFIC_INTERNAL_OPS:{
        weight: 0.07,
        parent: "ROOT",
        arabicLabel:"كفاءة العمليات الداخلية",
        params:["QLY_SPEED_PROC_EXEC","DOCS_ARCHIV"],
        formula:(QLY_SPEED_PROC_EXEC:number,DOCS_ARCHIV:number)=>(QLY_SPEED_PROC_EXEC*0.04/0.07)+(DOCS_ARCHIV*0.03/0.07),
    },

    VOLN_MGMT:{
        weight: 0.05,
        parent: "ROOT",
        arabicLabel:"إدارة التطوع",
        params:["VOLUN_GROWTH_RATE_QUAR","VOLUN_SUST_PERC"],
        formula:(VOLUN_GROWTH_RATE_QUAR:number,VOLUN_SUST_PERC:number)=>(VOLUN_GROWTH_RATE_QUAR*0.025/0.05)+(VOLUN_SUST_PERC*0.025/0.05),
    },

    OPS_GOALS_ACH_PERC:{
        weight: 0.05,
        parent: "OPS_PLAN_EXEC",
        arabicLabel:"",
        params:["NO_OPERATIONAL_GOALS_ACHIEVED","NO_OPERATIONAL_GOALS_PLANNED"],
        formula : (NO_OPERATIONAL_GOALS_ACHIEVED:number,NO_OPERATIONAL_GOALS_PLANNED:number)=>NO_OPERATIONAL_GOALS_ACHIEVED/NO_OPERATIONAL_GOALS_PLANNED*100
  
    },

    PGRM_PRJKS_EXEC_PERC:{
        weight: 0.03,
        parent: "OPS_PLAN_EXEC",
        arabicLabel:"نسبة تنفيذ البرامج والمشاريع",
        params:["NO_PROGRAMS_EXECUTED","NO_PROGRAMS_PLANNED"],
        formula:(NO_PROGRAMS_EXECUTED:number,NO_PROGRAMS_PLANNED:number )=>NO_PROGRAMS_EXECUTED/NO_PROGRAMS_PLANNED*100,
    },

    EFFIC_PRJKS_EXEC:{
        weight: 0.03,
        parent: "PRJKT_PRGM_MGMT",
        arabicLabel:"كفاءة تنفيذ المشاريع",
        params:["PRJKT_TIMELY_COMP_PERC","BUDGET_COMMIT_PERC"],
        formula:(PRJKT_TIMELY_COMP_PERC:number,BUDGET_COMMIT_PERC:number)=>(PRJKT_TIMELY_COMP_PERC*0.015/0.03)+(BUDGET_COMMIT_PERC*0.015/0.03),
    },
    EFFITV_PRJKS_PGRM:{
        weight: 0.04,
        parent: "PRJKT_PRGM_MGMT",
        arabicLabel:"فعالية المشاريع والبرامج",
        params:["PRJK_GOALS_ACHV_PERC","REACH_TARGET_AUD_PERC"],
        formula:(PRJK_GOALS_ACHV_PERC:number,REACH_TARGET_AUD_PERC:number)=>(PRJK_GOALS_ACHV_PERC*0.02/0.04)+(REACH_TARGET_AUD_PERC*0.02/0.04)
    },
    VOLN_CONTR_PRJKS_EXEC:{
        weight: 0.03,
        parent: "PRJKT_PRGM_MGMT",
        arabicLabel:"مساهمة المتطوعين في تنفيذ المشاريع",
        params:["NO_PROGRAMS_WITH_PARTICIPANTS","NO_PROGRAMS_PROJECTS"],
        formula:(NO_PROGRAMS_WITH_PARTICIPANTS:number,NO_PROGRAMS_PROJECTS:number)=>NO_PROGRAMS_WITH_PARTICIPANTS/NO_PROGRAMS_PROJECTS*100,
    },
    QLY_SPEED_PROC_EXEC:{
        weight: 0.04,
        parent: "EFFIC_INTERNAL_OPS",
        arabicLabel:"جودة وسرعة تنفيذ الإجراءات",
        params:["NO_TIMELY_TRANSACTIONS","TOTAL_TRANSACTIONS"],
        formula:(NO_TIMELY_TRANSACTIONS:number,TOTAL_TRANSACTIONS:number )=>NO_TIMELY_TRANSACTIONS/TOTAL_TRANSACTIONS*100,
    },
    DOCS_ARCHIV:{
        weight: 0.03,
        parent: "EFFIC_INTERNAL_OPS",
        arabicLabel:"التوثيق والأرشفة",
        params:["NO_ARCHIVED_DOCS","TOTAL_DOCS"],
        formula:(NO_ARCHIVED_DOCS:number,TOTAL_DOCS:number )=>NO_ARCHIVED_DOCS/TOTAL_DOCS*100,
    },

    VOLUN_GROWTH_RATE_QUAR:{
        weight: 0.025,
        parent: "VOLN_MGMT",
        arabicLabel:"معدل النمو الربعي للمتطوعين",
        params:["NO_VOLUNTEERS_CURRENT_QUARTER","NO_VOLUNTEERS_NEXT_QUARTER"],
        formula:(NO_VOLUNTEERS_CURRENT_QUARTER:number,NO_VOLUNTEERS_NEXT_QUARTER:number)=>(NO_VOLUNTEERS_CURRENT_QUARTER-NO_VOLUNTEERS_NEXT_QUARTER)/NO_VOLUNTEERS_CURRENT_QUARTER*100,
    },
    VOLUN_SUST_PERC:{
        weight: 0.025,
        parent: "VOLN_MGMT",
        arabicLabel:"نسبة استدامة المتطوعين",
        params:["NO_VOLUNTEERS_CONT_3","TOTAL_VOLUNTEERS"],
        formula:(NO_VOLUNTEERS_CONT_3:number,TOTAL_VOLUNTEERS:number)=>NO_VOLUNTEERS_CONT_3/TOTAL_VOLUNTEERS*100,
    },

    PRJKT_TIMELY_COMP_PERC:{
        weight: 0.015,
        parent: "EFFIC_PRJKS_EXEC",
        arabicLabel:"نسبة إنجاز المشروع في الوقت المحدد",
        params:["NO_TIMELY_ACTIVITIES", "TOTAL_PLANNED_ACTIVITIES"],
        formula:(NO_TIMELY_ACTIVITIES:number,TOTAL_PLANNED_ACTIVITIES:number )=>NO_TIMELY_ACTIVITIES/TOTAL_PLANNED_ACTIVITIES*100,
    },
    BUDGET_COMMIT_PERC:{
        weight: 0.015,
        parent: "EFFIC_PRJKS_EXEC",
        arabicLabel:"نسبة الالتزام بالميزانية",
        params:["APPROVED_BUDGET","PLANNED_ACTUAL_DIFF" ],
        formula:(APPROVED_BUDGET:number,PLANNED_ACTUAL_DIFF:number)=>(APPROVED_BUDGET-PLANNED_ACTUAL_DIFF)/APPROVED_BUDGET*100,
    },

    PRJK_GOALS_ACHV_PERC:{
        weight: 0.02,
        parent: "EFFITV_PRJKS_PGRM",
        arabicLabel:"نسبة تحقيق أهداف المشروع",
        params:["NO_OUTPUTS_ACHIEVED","TOTAL_TARGETED_OUTPUTS"],
        formula:(NO_OUTPUTS_ACHIEVED:number,TOTAL_TARGETED_OUTPUTS:number)=>NO_OUTPUTS_ACHIEVED/TOTAL_TARGETED_OUTPUTS*100,
    },
    REACH_TARGET_AUD_PERC:{
        weight: 0.02,
        parent: "EFFITV_PRJKS_PGRM",
        arabicLabel:"نسبة الوصول للفئة المستهدفة",
        params:["NO_ACTUAL_BENEFICIARIES","PLANNED_TARGET_NUMBER" ],
        formula:(NO_ACTUAL_BENEFICIARIES:number,PLANNED_TARGET_NUMBER:number)=>NO_ACTUAL_BENEFICIARIES/PLANNED_TARGET_NUMBER*100,
    }
    
}


export const FINANCIAL_METADATA :{[key:string]:IndicatorMetadata<TFinancialIndicators, TFinancialEntries>}= {
    TOTAL_FINANCIAL_PEFORMANCE:{
        weight: 0.30,
        parent: "ROOT",
        arabicLabel:"الأداء المالي",
        params:["FINANCIAL_PERF","FINANCIAL_RESOURCES_DEV"],
        formula : (FINANCIAL_PERF:number,FINANCIAL_RESOURCES_DEV:number)=>(FINANCIAL_PERF*0.16/0.3)+(FINANCIAL_RESOURCES_DEV*0.14/0.3)
   
    },
    FINANCIAL_PERF: {
        weight: 0.16,
        parent: "ROOT",
        arabicLabel:"الأداء المالي",
        params:["ADMIN_EXPENSES","PRGRMS_EXPENSES", "FINANCIAL_SUSTAIN", "DONAT_MONEY_RAISING","ABL_COVER_OBLIG"],
        formula : (ADMIN_EXPENSES:number,PRGRMS_EXPENSES:number,FINANCIAL_SUSTAIN:number,DONAT_MONEY_RAISING:number,ABL_COVER_OBLIG:number)=>(ADMIN_EXPENSES*0.032/0.16)+(PRGRMS_EXPENSES*0.07/0.16)+(FINANCIAL_SUSTAIN*0.02/0.16)+(DONAT_MONEY_RAISING*0.018/0.16)+(ABL_COVER_OBLIG*0.02/0.16)
   
    },

    FINANCIAL_RESOURCES_DEV: {
        weight: 0.14,
        parent: "FINANCIAL_PERF",
        arabicLabel:"تنمية الموارد المالية ",
        params:["DIVERSITY_INCOME_RESOURCES","EFFECIENT_RESOURCE_MGMT"],
        formula : (DIVERSITY_INCOME_RESOURCES:number,EFFECIENT_RESOURCE_MGMT:number)=>(DIVERSITY_INCOME_RESOURCES*0.08/0.14)+(EFFECIENT_RESOURCE_MGMT*0.06/0.14)
    },

    ADMIN_EXPENSES: {
        weight: 0.032,
        parent: "FINANCIAL_PERF",
        arabicLabel:"مصاريف إدارية",
        params:["ADMIN_TO_TOTAL_EXPENSES","REV_FIN_SUST_TO_TOTAL_EXPENSES"],
        formula : (ADMIN_TO_TOTAL_EXPENSES:number,REV_FIN_SUST_TO_TOTAL_EXPENSES:number)=>(ADMIN_TO_TOTAL_EXPENSES*0.026/0.032)+(REV_FIN_SUST_TO_TOTAL_EXPENSES*0.006/0.032)
    },
    PRGRMS_EXPENSES: {
        weight: 0.07,
        parent: "FINANCIAL_PERF",
        arabicLabel:"مصاريف البرامج و الأنشطة ",
        params:["PRGRMS_TO_TOTAL_EXPENSES"],
        formula : (PRGRMS_TO_TOTAL_EXPENSES:number)=>(PRGRMS_TO_TOTAL_EXPENSES)
    },
    FINANCIAL_SUSTAIN: {
        weight: 0.02,
        parent: "FINANCIAL_PERF",
        arabicLabel:"الاستدامة المالية ",
        params:["SUST_TO_TOTAL_EXPENSES","SUST_EXPENSEES_TO_REV", "SUST_RETURN_TO_ASSETS"],
        formula : (SUST_TO_TOTAL_EXPENSES:number,SUST_EXPENSEES_TO_REV:number, SUST_RETURN_TO_ASSETS:number)=>(SUST_TO_TOTAL_EXPENSES*0.006/0.02)+(SUST_EXPENSEES_TO_REV*0.006/0.02)+(SUST_RETURN_TO_ASSETS*0.008/0.02)
    },
    DONAT_MONEY_RAISING: {
        weight: 0.018,
        parent: "FINANCIAL_PERF",
        arabicLabel:"جمع الأموال و التبرعات  ",
        params:["FUND_RAISING_TO_TOTAL_EXPENSES","DONAT_MONEY_RAISING"],
        formula : (FUND_RAISING_TO_TOTAL_EXPENSES:number,DONAT_MONEY_RAISING:number)=>(FUND_RAISING_TO_TOTAL_EXPENSES*0.008/0.018)+(DONAT_MONEY_RAISING*0.009/0.018)
    },

    ABL_COVER_OBLIG: {
        weight: 0.02,
        parent: "FINANCIAL_PERF",
        arabicLabel:" قدرة الجمعية على تغطية التزاماتها المستقبلية ",
        params:["CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF","NET_CACHE_INVEST_ADMIN_EXPENSES"],
        formula : (CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF:number,NET_CACHE_INVEST_ADMIN_EXPENSES:number)=>(CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF*0.012/0.02)+(NET_CACHE_INVEST_ADMIN_EXPENSES*0.008/0.02)
    },


    DIVERSITY_INCOME_RESOURCES: {
        weight: 0.08,
        parent: "FINANCIAL_RESOURCES_DEV",
        arabicLabel:" تنوع مصادر الدخل ",
        params:["DONAT_PERC","PLATFORM_REV_PERC", "PRGMS_PRJKS_REV","PAID_MEMBERSHIP_PERC","ECO_RETURN_VOLUN"],
        formula : (DONAT_PERC:number,PLATFORM_REV_PERC:number, PRGMS_PRJKS_REV:number,PAID_MEMBERSHIP_PERC:number,ECO_RETURN_VOLUN:number)=>(DONAT_PERC*0.02/0.08)+(PLATFORM_REV_PERC*0.011/0.08)+(PRGMS_PRJKS_REV*0.02/0.08)+(PAID_MEMBERSHIP_PERC*0.015/0.08)+(ECO_RETURN_VOLUN*0.01/0.08)
    },
    EFFECIENT_RESOURCE_MGMT: {
        weight: 0.06,
        parent: "FINANCIAL_RESOURCES_DEV",
        arabicLabel:"كفاءة إدارة الموارد",
        params:["RATE_REV_ANNUAL_GROWTH","COMMIT_DISC_PERC", "RATE_SUST_DONAT"],
        formula : (RATE_REV_ANNUAL_GROWTH:number,COMMIT_DISC_PERC:number, RATE_SUST_DONAT:number)=>(RATE_REV_ANNUAL_GROWTH*0.02/0.06)+(COMMIT_DISC_PERC*0.02/0.06)+(RATE_SUST_DONAT*0.02/0.06)
    },

    ADMIN_TO_TOTAL_EXPENSES: {
        weight: 0.026,
        parent: "ADMIN_EXPENSES",
        arabicLabel:"المصاريف الإدارية إلى اجمالي المصاريف",
        params:["GENERAL_ADMINSTRATIVE_EXPENSES","TOTAL_EXPENSES"],
        formula : (GENERAL_ADMINSTRATIVE_EXPENSES:number,TOTAL_EXPENSES:number)=>(GENERAL_ADMINSTRATIVE_EXPENSES/(TOTAL_EXPENSES))*100
    },


    REV_FIN_SUST_TO_TOTAL_EXPENSES: {
        weight: 0.006,
        parent: "ADMIN_EXPENSES",
        arabicLabel:"عوائد الاستدامة المالية إلى المصاريف الإدارية",
        params:["SUSTAINBILITY_REVENUE","GENERAL_ADMINSTRATIVE_EXPENSES"],
        formula : (SUSTAINBILITY_REVENUE:number,GENERAL_ADMINSTRATIVE_EXPENSES:number)=>(SUSTAINBILITY_REVENUE/GENERAL_ADMINSTRATIVE_EXPENSES)*100
    },

    PRGRMS_TO_TOTAL_EXPENSES: {
        weight: 0.07,
        parent: "PRGRMS_EXPENSES",
        arabicLabel:"مصاريف البرامج والأنشطة إلى اجمالي المصاريف",
        params:["PROGRAMS_EXPENSES","GENERAL_ADMINSTRATIVE_EXPENSES_ACT", "TOTAL_EXPENSES"],
        formula : (PROGRAMS_EXPENSES:number,GENERAL_ADMINSTRATIVE_EXPENSES_ACT:number,TOTAL_EXPENSES:number)=>(PROGRAMS_EXPENSES+GENERAL_ADMINSTRATIVE_EXPENSES_ACT)/TOTAL_EXPENSES*100
    },
    SUST_TO_TOTAL_EXPENSES: {
        weight: 0.006,
        parent: "FINANCIAL_SUSTAIN",
        arabicLabel:"مصاريف الاستدامة إلى اجمالي المصاريف",
        params:["SUSTAINBILITY_EXPENSES", "TOTAL_EXPENSES"],
        formula : (SUSTAINBILITY_EXPENSES:number,TOTAL_EXPENSES:number)=>SUSTAINBILITY_EXPENSES/TOTAL_EXPENSES*100
    },
    SUST_EXPENSEES_TO_REV: {
        weight: 0.006,
        parent: "FINANCIAL_SUSTAIN",
        arabicLabel:"مصاريف الاستدامة إلى عوائد الاستدامة",
        params:["SUSTAINBILITY_EXPENSES", "AWQAF_REVENUE", "INVESTMENT_REVENUE"],
        formula : (SUSTAINBILITY_EXPENSES:number,AWQAF_REVENUE:number,INVESTMENT_REVENUE:number, )=>SUSTAINBILITY_EXPENSES/(AWQAF_REVENUE+INVESTMENT_REVENUE)*100
    },
    SUST_RETURN_TO_ASSETS: {
        weight: 0.008,
        parent: "FINANCIAL_SUSTAIN",
        arabicLabel:"العائد من الاستدامة إلى اجمالي أصول الاستدامة",
        params:[ "AWQAF_REVENUE", "INVESTMENT_REVENUE", "SUSTAIN_ASSETS_WAQFI","SUSTAIN_ASSETS_INVEST"],
        formula : (AWQAF_REVENUE:number,INVESTMENT_REVENUE:number,SUSTAIN_ASSETS_WAQFI:number,SUSTAIN_ASSETS_INVEST:number )=>(AWQAF_REVENUE+INVESTMENT_REVENUE)/(SUSTAIN_ASSETS_WAQFI+SUSTAIN_ASSETS_INVEST)*100
    },
    FUND_RAISING_TO_TOTAL_EXPENSES: {
        weight: 0.009,
        parent: "DONAT_MONEY_RAISING",
        arabicLabel:"مصاريف جمع الأموال إلى اجمالي المصاريف ",
        params:[ "FUND_RAISING_EXPENSES", "TOTAL_EXPENSES"],
        formula : (FUND_RAISING_EXPENSES:number,TOTAL_EXPENSES:number )=>FUND_RAISING_EXPENSES/TOTAL_EXPENSES*100
    },

    FUND_RAISING_TO_TOTAL_DONAT: {
        weight: 0.008,
        parent: "DONAT_MONEY_RAISING",
        arabicLabel:"مصاريف جمع الأموال إلى اجمالي التبرعات",
        params:[ "FUND_RAISING_EXPENSES", "TOTAL_CHARITY"],
        formula : (FUND_RAISING_EXPENSES:number,TOTAL_CHARITY:number )=>FUND_RAISING_EXPENSES/TOTAL_CHARITY*100
    },
    CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF: {
        weight: 0.012,
        parent: "ABL_COVER_OBLIG",
        arabicLabel:"النقد وما ي حكمه إلى (صافي الأصول المقيدة + صافي أصول النقدية الأوقاف)",
        params:[ "CASH_RELATED", "BOUNDED_NET_ASSETS","AWQAF_NET_ASSETS_CASH","CURRENT_LIABILITIES"],
        formula : (CASH_RELATED:number,BOUNDED_NET_ASSETS:number ,AWQAF_NET_ASSETS_CASH:number,CURRENT_LIABILITIES:number)=>CASH_RELATED/(BOUNDED_NET_ASSETS+AWQAF_NET_ASSETS_CASH+CURRENT_LIABILITIES)*100
    },
    NET_CACHE_INVEST_ADMIN_EXPENSES: {
        weight: 0.008,
        parent: "ABL_COVER_OBLIG",
        arabicLabel:"صافي النقد والاستثمارات المتداولة إلى المصاريف الإدارية التقديرية",
        params:[ "CASH_RELATED", "TRADED_INVESTMENTS","CURRENT_LIABILITIES","BOUNDED_NET_ASSETS","AWQAF_NET_ASSETS_CASH"],
        formula : (CASH_RELATED:number,TRADED_INVESTMENTS:number ,CURRENT_LIABILITIES:number,BOUNDED_NET_ASSETS:number,AWQAF_NET_ASSETS_CASH:number)=>(CASH_RELATED+TRADED_INVESTMENTS)-(CURRENT_LIABILITIES+BOUNDED_NET_ASSETS+AWQAF_NET_ASSETS_CASH)*12/360
    },
    DONAT_PERC: {
        weight: 0.02,
        parent: "DIVERSITY_INCOME_RESOURCES",
        arabicLabel:"نسبة التبرعات (مقيدة/غير مقيدة)",
        params:[ "UNBOUNDED_CHARITY", "TOTAL_CHARITY"],
        formula : (UNBOUNDED_CHARITY:number,TOTAL_CHARITY:number )=>(UNBOUNDED_CHARITY/TOTAL_CHARITY)*100
    },

    PLATFORM_REV_PERC: {
        weight: 0.011,
        parent: "DIVERSITY_INCOME_RESOURCES",
        arabicLabel:"نسبة الإيرادات من المنصات",
        params:[ "UNBOUNDED_CHARITY", "TOTAL_CHARITY"],
        formula : (UNBOUNDED_CHARITY:number,TOTAL_CHARITY:number )=>(UNBOUNDED_CHARITY/TOTAL_CHARITY)*100
    },
    PRGMS_PRJKS_REV: {
        weight: 0.02,
        parent: "DIVERSITY_INCOME_RESOURCES",
        arabicLabel:"  عوائد البرامج و المشاريع",
        params:[ "PRGMS_PRJKS_REVENUE", "GOV_PLATFORMS_REVENUE","AWQAF_REVENUE","INVESTMENT_REVENUE","SUSTAINBILITY_REVENUE"],
        formula : (PRGMS_PRJKS_REVENUE:number,GOV_PLATFORMS_REVENUE:number,AWQAF_REVENUE:number,INVESTMENT_REVENUE:number,SUSTAINBILITY_REVENUE:number )=>PRGMS_PRJKS_REVENUE/(GOV_PLATFORMS_REVENUE+AWQAF_REVENUE+INVESTMENT_REVENUE+SUSTAINBILITY_REVENUE+PRGMS_PRJKS_REVENUE)*100
    },

    PAID_MEMBERSHIP_PERC: {
        weight: 0.015,
        parent: "DIVERSITY_INCOME_RESOURCES",
        arabicLabel:"نسبة العضويات المسددة",
        params:[ "NO_PAID_MEMBERSHIP", "TOTAL_MEMBERSHIP"],
        formula : (NO_PAID_MEMBERSHIP:number,TOTAL_MEMBERSHIP:number)=>NO_PAID_MEMBERSHIP/TOTAL_MEMBERSHIP*100
    },
    ECO_RETURN_VOLUN: {
        weight: 0.01,
        parent: "DIVERSITY_INCOME_RESOURCES",
        arabicLabel:"العائد الاقتصادي من التطوع",
        params:[ "FIN_VALUE_VOLUN", "OPERATIONAL_EXPANSES"],
        formula : (FIN_VALUE_VOLUN:number,OPERATIONAL_EXPANSES:number)=>FIN_VALUE_VOLUN/OPERATIONAL_EXPANSES*100
    },

    RATE_REV_ANNUAL_GROWTH: {
        weight: 0.02,
        parent: "EFFECIENT_RESOURCE_MGMT",
        arabicLabel:"  معدل نمو الإيرادات السنوي ",
        params:[ "GOV_PLATFORMS_REVENUE", "AWQAF_REVENUE", "INVESTMENT_REVENUE", "SUSTAINBILITY_REVENUE","PRGMS_PRJKS_REVENUE","LAST_YEAR_REVENUE"],
        formula : (GOV_PLATFORMS_REVENUE:number,AWQAF_REVENUE:number,INVESTMENT_REVENUE:number,SUSTAINBILITY_REVENUE:number,PRGMS_PRJKS_REVENUE:number,LAST_YEAR_REVENUE:number  )=>(GOV_PLATFORMS_REVENUE+AWQAF_REVENUE+INVESTMENT_REVENUE+SUSTAINBILITY_REVENUE+PRGMS_PRJKS_REVENUE-LAST_YEAR_REVENUE)/LAST_YEAR_REVENUE*100
    },
    COMMIT_DISC_PERC: {
        weight: 0.02,
        parent: "EFFECIENT_RESOURCE_MGMT",
        arabicLabel:" نسبة تخفيض الالتزامات",
        params:[ "START_LIABILITIES", "END_LIABILITIES"],
        formula : (START_LIABILITIES:number,END_LIABILITIES:number)=>(START_LIABILITIES-END_LIABILITIES)/START_LIABILITIES*100
    },
    RATE_SUST_DONAT: {
        weight: 0.02,
        parent: "EFFECIENT_RESOURCE_MGMT",
        arabicLabel:"معدل استدامة المتبرعين",
        params:[ "NO_CONT_VOLUN", "NO_TOTAL_VOLUN_LAST_YEAR"],
        formula : (NO_CONT_VOLUN:number,NO_TOTAL_VOLUN_LAST_YEAR:number)=>NO_CONT_VOLUN/NO_TOTAL_VOLUN_LAST_YEAR*100
    },
    TOTAL_TAX_REFUND: {
        weight: 0.02,
        parent: "ROOT",
        arabicLabel:"إجمالي المبالغ المستردة من الضريبة  ",
        params:[ "TOTAL_TAX_REFUND"],
        formula : (TOTAL_TAX_REFUND:number)=>TOTAL_TAX_REFUND
    }
}




export const CORPORATE_METADATA :{[key:string]:IndicatorMetadata<TCorporateIndicators, TCorporateEntries>}= {
    CORORATE_PERFORMANCE: {
        weight: 0.4,
        parent: "ROOT",
        arabicLabel:"الأداء المؤسسي",
        params:["GOVERANCE","HR", "PLANNING_ORGANIZING", "SATIS_MEASURMENT","CEO_PERFORMANCE"],
        formula : (GOVERANCE:number,HR:number,PLANNING_ORGANIZING:number,SATIS_MEASURMENT:number,CEO_PERFORMANCE:number)=>(GOVERANCE*0.12/0.4)+(HR*0.08/0.4)+(PLANNING_ORGANIZING*0.06/0.4)+(SATIS_MEASURMENT*0.1/0.4)+(CEO_PERFORMANCE*0.04/0.4)
    },

    GOVERANCE: {
        weight: 0.12,
        parent: "CORORATE_PERFORMANCE",
        arabicLabel:" الحوكمة  ",
        params:["COMPLIANCE_ADHERENCE_PRACTICES","TRANSPARENCY_DISCLOSURE_PRACTICES","FINANCIAL_SAFETY_PRACTICES"],
        formula : (COMPLIANCE_ADHERENCE_PRACTICES:number,TRANSPARENCY_DISCLOSURE_PRACTICES:number,FINANCIAL_SAFETY_PRACTICES:number)=>(COMPLIANCE_ADHERENCE_PRACTICES*0.045/0.12)+(TRANSPARENCY_DISCLOSURE_PRACTICES*0.045/0.12) + (FINANCIAL_SAFETY_PRACTICES*0.03/0.12) 
    },

    HR: {
        weight: 0.08,
        parent: "CORORATE_PERFORMANCE",
        arabicLabel:" الموارد البشرية",
        params:["RECRUITMENT","EMP_PERF_PROD","EMP_DEV_TRAIN"],
        formula : (RECRUITMENT:number,EMP_PERF_PROD:number,EMP_DEV_TRAIN:number)=>(RECRUITMENT*0.02/0.08)+(EMP_PERF_PROD*0.035/0.08)+(EMP_DEV_TRAIN*0.025/0.08)
    },
    PLANNING_ORGANIZING: {
        weight: 0.06,
        parent: "CORORATE_PERFORMANCE",
        arabicLabel:"التخطيط و التنظيم",
        params:["FOLLOWUP_OPERATIONAL_PLAN","QUALITY_OPERATIONAL_PLAN"],
        formula : (FOLLOWUP_OPERATIONAL_PLAN:number,QUALITY_OPERATIONAL_PLAN:number)=>(FOLLOWUP_OPERATIONAL_PLAN*0.03/0.06)+(QUALITY_OPERATIONAL_PLAN*0.04/0.06)
    },
    SATIS_MEASURMENT: {
        weight: 0.1,
        parent: "CORORATE_PERFORMANCE",
        arabicLabel:" قياس الرضا ",
        params:["BENEF_SATIS_MEASURMENT","EMP_SATIS_MEASURMENT", "PARTENERS_SATIS_MEASURMENT","VOLUN_SATIS_MEASURMENT","DONATORS_SATIS_MEASURMENT","ADMIN_ORG_SATIS_MEASURMENT","COMMUNITY_SATIS_MEASURMENT"],
        formula : (BENEF_SATIS_MEASURMENT:number,EMP_SATIS_MEASURMENT:number, PARTENERS_SATIS_MEASURMENT:number, VOLUN_SATIS_MEASURMENT:number,DONATORS_SATIS_MEASURMENT:number,ADMIN_ORG_SATIS_MEASURMENT:number,COMMUNITY_SATIS_MEASURMENT:number)=>(BENEF_SATIS_MEASURMENT*0.025/0.1)+(EMP_SATIS_MEASURMENT*0.02/0.1)+(PARTENERS_SATIS_MEASURMENT*0.01/0.1)+(VOLUN_SATIS_MEASURMENT*0.015/0.1)+(DONATORS_SATIS_MEASURMENT*0.015/0.1)+(ADMIN_ORG_SATIS_MEASURMENT*0.01/0.1)+(COMMUNITY_SATIS_MEASURMENT*0.005/0.1)
    },
    CEO_PERFORMANCE: {
        weight: 0.04,
        parent: "CORORATE_PERFORMANCE",
        arabicLabel:"  أداء المدير التنفيذي ",
        params:["EXEC_LEADERSHIP","OPERATIONAL_PERF","ENTERPRISE_COMMUN"],
        formula : (EXEC_LEADERSHIP:number,OPERATIONAL_PERF:number,ENTERPRISE_COMMUN:number)=>(EXEC_LEADERSHIP*0.02/0.04)+(OPERATIONAL_PERF*0.015/0.04)+(ENTERPRISE_COMMUN*0.005/0.04)
    },

    COMPLIANCE_ADHERENCE_PRACTICES: {
        weight: 0.02,
        parent: "GOVERANCE",
        arabicLabel:" ممارسات الامتثال و الالتزام",
        params:["COMPLIANCE_ADHERENCE_PRACTICES"],
        formula : (COMPLIANCE_ADHERENCE_PRACTICES:number)=>(COMPLIANCE_ADHERENCE_PRACTICES)
    },
    TRANSPARENCY_DISCLOSURE_PRACTICES: {
        weight: 0.02,
        parent: "GOVERANCE",
        arabicLabel:" ممارسات الشفافية و الإفصاح",
        params:["TRANSPARENCY_DISCLOSURE_PRACTICES"],
        formula : (TRANSPARENCY_DISCLOSURE_PRACTICES:number)=>(TRANSPARENCY_DISCLOSURE_PRACTICES)
    },
    
FINANCIAL_SAFETY_PRACTICES: {
        weight: 0.02,
        parent: "GOVERANCE",
        arabicLabel:"   ممارسات السلامة المالية",
        params:["FINANCIAL_SAFETY_PRACTICES"],
        formula : (FINANCIAL_SAFETY_PRACTICES:number)=>(FINANCIAL_SAFETY_PRACTICES)
    },


    RECRUITMENT: {
        weight: 0.02,
        parent: "HR",
        arabicLabel:"التوظيف والاستقطاب",
        params:["NO_SUCCESSFUL_HIRES_POST_EXP","TOTAL_HIRES"],
        formula : (NO_SUCCESSFUL_HIRES_POST_EXP:number,TOTAL_HIRES:number)=>(NO_SUCCESSFUL_HIRES_POST_EXP/TOTAL_HIRES)*100
    },
    EMP_PERF_PROD: {
        weight: 0.035,
        parent: "HR",
        arabicLabel:"أداء وإنتاجية الموظفين",
        params:["TARGETS_HIT_PERF_EVAL","JOB_COMMITMENT"],
        formula : (TARGETS_HIT_PERF_EVAL:number,JOB_COMMITMENT:number)=>(TARGETS_HIT_PERF_EVAL*0.025/0.035)+(JOB_COMMITMENT*0.01/0.035)
    },

    EMP_DEV_TRAIN: {
        weight: 0.025,
        parent: "HR",
        arabicLabel:"تطوير وتدريب الموظفين",
        params:["TRAIN_PLAN_EXEC","TRAIN_IMPACT"],
        formula : (TRAIN_PLAN_EXEC:number,TRAIN_IMPACT:number)=>(TRAIN_PLAN_EXEC*0.0125/0.025)+(TRAIN_IMPACT*0.0125/0.025)
    },


    TARGETS_HIT_PERF_EVAL: {
        weight: 0.025,
        parent: "EMP_PERF_PROD",
        arabicLabel:" تحقيق المستهدفات و تقييم الأداء",
        params:["EMP_EVAL","EMP_ACHIEVMENT_PERC"],
        formula : (EMP_EVAL:number,EMP_ACHIEVMENT_PERC:number)=>((EMP_EVAL*0.6)+(EMP_ACHIEVMENT_PERC)*0.4)
    },

    JOB_COMMITMENT: {
        weight: 0.01,
        parent: "EMP_PERF_PROD",
        arabicLabel:"الانضباط الوظيفي",
        params:["PERC_COMMIT_WORK_HOURS"],
        formula : (PERC_COMMIT_WORK_HOURS:number)=>PERC_COMMIT_WORK_HOURS
    },
    TRAIN_PLAN_EXEC: {
        weight: 0.01,
        parent: "EMP_DEV_TRAIN",
        arabicLabel:"تنفيذ خطة التدريب",
        params:["NO_EXE_PRACTICES", "NO_PLANNED_PRACTICES"],
        formula : (NO_EXE_PRACTICES:number,NO_PLANNED_PRACTICES:number)=>NO_EXE_PRACTICES/NO_PLANNED_PRACTICES*100
    },
    TRAIN_IMPACT: {
        weight: 0.01,
        parent: "EMP_DEV_TRAIN",
        arabicLabel:"تنفيذ خطة التدريب",
        params:["AVG_EVAL_EMPS"],
        formula : (AVG_EVAL_EMPS:number)=>AVG_EVAL_EMPS
    },
    FOLLOWUP_OPERATIONAL_PLAN: {
        weight: 0.008,
        parent: "PLANNING_ORGANIZING",
        arabicLabel:"متابعة الخطة التشغيلية",
        params:[ "NO_TIMELY_REPORTS", "NO_REQUIRED_REPORTS"],
        formula : (NO_TIMELY_REPORTS:number,NO_REQUIRED_REPORTS:number)=>(NO_TIMELY_REPORTS/NO_REQUIRED_REPORTS)*100
    },
    QUALITY_OPERATIONAL_PLAN: {
        weight: 0.008,
        parent: "PLANNING_ORGANIZING",
        arabicLabel:" جودة الخطة التشغيلية ",
        params:[ "NO_COMP_ELEMENTS", "TOTAL_ELEMENTS"],
        formula : (NO_COMP_ELEMENTS:number,TOTAL_ELEMENTS:number)=>(NO_COMP_ELEMENTS/TOTAL_ELEMENTS)*100
    },

    BENEF_SATIS_MEASURMENT: {
        weight: 0.008,
        parent: "SATIS_MEASURMENT",
        arabicLabel:"قياس رضا المستفيدين",
        params:[ "NO_GRADES_BENEFITS_SATISF", "NO_RESPONSES_SATIS_FORM"],
        formula : (NO_GRADES_BENEFITS_SATISF:number,NO_RESPONSES_SATIS_FORM:number )=>NO_GRADES_BENEFITS_SATISF/NO_RESPONSES_SATIS_FORM*100
    },
    EMP_SATIS_MEASURMENT: {
        weight: 0.008,
        parent: "SATIS_MEASURMENT",
        arabicLabel:"قياس رضا الموظفين",
        params:[ "TOTAL_GRADES_EMP_SATIS", "NO_RESPONSES_EMP_SATIS"],
        formula : (TOTAL_GRADES_EMP_SATIS:number,NO_RESPONSES_EMP_SATIS:number )=>TOTAL_GRADES_EMP_SATIS/NO_RESPONSES_EMP_SATIS*100
    },
    PARTENERS_SATIS_MEASURMENT: {
        weight: 0.008,
        parent: "SATIS_MEASURMENT",
        arabicLabel:" قياس رضا الشركاء والموردين ",
        params:[ "TOTAL_GEADES_PARTENERS_SATIS", "NO_RESPONSES_PARTERS_FORM"],
        formula : (TOTAL_GEADES_PARTENERS_SATIS:number,NO_RESPONSES_PARTERS_FORM:number )=>TOTAL_GEADES_PARTENERS_SATIS/NO_RESPONSES_PARTERS_FORM*100
    },

    VOLUN_SATIS_MEASURMENT: {
        weight: 0.008,
        parent: "SATIS_MEASURMENT",
        arabicLabel:" قياس رضا المتطوعين",
        params:[ "TOTAL_GRADES_VOL_STATIS", "NO_RESPONSES_VOL_SATIS_FORM"],
        formula : (TOTAL_GRADES_VOL_STATIS:number,NO_RESPONSES_VOL_SATIS_FORM:number )=>TOTAL_GRADES_VOL_STATIS/NO_RESPONSES_VOL_SATIS_FORM*100
    },
    DONATORS_SATIS_MEASURMENT: {
        weight: 0.008,
        parent: "SATIS_MEASURMENT",
        arabicLabel:" قياس رضا المتبرعين والداعمين ",
        params:[ "TOTAL_GRADES_DON_STATIS", "NO_RESPONSES_DON_SATIS_FORM"],
        formula : (TOTAL_GRADES_DON_STATIS:number,NO_RESPONSES_DON_SATIS_FORM:number )=>TOTAL_GRADES_DON_STATIS/NO_RESPONSES_DON_SATIS_FORM*100
    },

    ADMIN_ORG_SATIS_MEASURMENT: {
        weight: 0.008,
        parent: "SATIS_MEASURMENT",
        arabicLabel:" قياس رضا الجمعية العمومية ومجلس الإدارة ",
        params:[ "TOTAL_SATIS_GRADES_ORG", "NO_ORG_MEMBERS"],
        formula : (TOTAL_SATIS_GRADES_ORG:number,NO_ORG_MEMBERS:number )=>TOTAL_SATIS_GRADES_ORG/NO_ORG_MEMBERS*100
    },

    COMMUNITY_SATIS_MEASURMENT: {
        weight: 0.008,
        parent: "SATIS_MEASURMENT",
        arabicLabel:"قياس رضا المجتمع والصورة الذهنية",
        params:[ "TOTAL_GRADES_COM", "NO_RESPONSES_COM_SATIS"],
        formula : (TOTAL_GRADES_COM:number,NO_RESPONSES_COM_SATIS:number )=>TOTAL_GRADES_COM/NO_RESPONSES_COM_SATIS*100
    },


    EXEC_LEADERSHIP: {
        weight: 0.02,
        parent: "CEO_PERFORMANCE",
        arabicLabel:"القيادة التنفيذية ",
        params:[ "FOLLOWUP_BOARD_DECISION", "OPERATIONAL_PLAN_ACHIVMENT_GOALS"],
        formula : (FOLLOWUP_BOARD_DECISION:number,OPERATIONAL_PLAN_ACHIVMENT_GOALS:number )=>FOLLOWUP_BOARD_DECISION*0.01/0.02+OPERATIONAL_PLAN_ACHIVMENT_GOALS*0.01/0.02
    },
    OPERATIONAL_PERF: {
        weight: 0.015,
        parent: "CEO_PERFORMANCE",
        arabicLabel:"الأداء التشغيلي  ",
        params:[ "DAILY_OPS_MGMT", "FOLLOWUP_EMPS_PERF"],
        formula : (DAILY_OPS_MGMT:number,FOLLOWUP_EMPS_PERF:number )=>DAILY_OPS_MGMT*0.01/0.015+FOLLOWUP_EMPS_PERF*0.01/0.015
    },

    ENTERPRISE_COMMUN: {
        weight: 0.005,
        parent: "CEO_PERFORMANCE",
        arabicLabel:" التواصل المؤسسي ",
        params:[ "AVG_RES_SATIS_FORMS_EMP"],
        formula : (AVG_RES_SATIS_FORMS_EMP:number )=>AVG_RES_SATIS_FORMS_EMP*0.5
    },
    FOLLOWUP_BOARD_DECISION: {
        weight: 0.005,
        parent: "EXEC_LEADERSHIP",
        arabicLabel:" متابعة تنفيذ قرارات مجلس الإدارة  ",
        params:[ "NO_EXEC_DESC", "TOTAL_DESC"],
        formula : (NO_EXEC_DESC:number,TOTAL_DESC:number )=>NO_EXEC_DESC/TOTAL_DESC*100
    },
    OPERATIONAL_PLAN_ACHIVMENT_GOALS: {
        weight: 0.005,
        parent: "EXEC_LEADERSHIP",
        arabicLabel:" تحقيق مستهدفات الخطة التشغيلية ",
        params:[ "NO_ACHIV_TARGETS", "TOTAL_TARGETS"],
        formula : (NO_ACHIV_TARGETS:number,TOTAL_TARGETS:number )=>NO_ACHIV_TARGETS/TOTAL_TARGETS*100
    },


    DAILY_OPS_MGMT: {
        weight: 0.005,
        parent: "OPERATIONAL_PERF",
        arabicLabel:"إدارة العمليات اليومية",
        params:[ "TASKS_ACHIEVED_TIMELY_CEO", "TOTAL_PLANNED_TASKS_CEO"],
        formula : (TASKS_ACHIEVED_TIMELY_CEO:number,TOTAL_PLANNED_TASKS_CEO:number )=>TASKS_ACHIEVED_TIMELY_CEO/TOTAL_PLANNED_TASKS_CEO*0.75
    },

    FOLLOWUP_EMPS_PERF: {
        weight: 0.005,
        parent: "OPERATIONAL_PERF",
        arabicLabel:"متابعة أداء الموظفين  ",
        params:[ "AVG_EVAL_EMPS"],
        formula : (AVG_EVAL_EMPS:number )=>AVG_EVAL_EMPS*0.75
    },




}



export const ORPHANS_METADATA :{[key:string]:IndicatorMetadata<TOrphansIndicators, TOrphansEntries>}= {
    ORPHANS_COV_PERC: {
        weight: 0.4,
        parent: "ROOT",
        arabicLabel:"نسبة تغطية كفالة الأيتام ",
        params:["NO_ADOPTED_ORPHANS","TOTAL_TARGETED_ORPHANS"],
        formula : (NO_ADOPTED_ORPHANS:number,TOTAL_TARGETED_ORPHANS:number)=>(NO_ADOPTED_ORPHANS/TOTAL_TARGETED_ORPHANS*100)
    },


    TOTAL_ORPHANS: {
        weight: 0.4,
        parent: "ROOT",
        arabicLabel:"عدد الأيتام المكفولين ",
        params:["TOTAL_ORPHANS"],
        formula : (TOTAL_ORPHANS:number)=>(TOTAL_ORPHANS)
    },

    MON_AVG_ADOP_ORPHANS: {
        weight: 0.4,
        parent: "ROOT",
        arabicLabel:" متوسط تكلفة الكفالة الشهرية للأيتام",
        params:["TOTAL_MONTHLY_ADOP_EXP","TOTAL_ORPHANS"],
        formula : (TOTAL_MONTHLY_ADOP_EXP:number,TOTAL_ORPHANS:number)=>TOTAL_MONTHLY_ADOP_EXP/TOTAL_ORPHANS*100
    },
    PERC_ORPHANS_BENF_SRV: {
        weight: 0.4,
        parent: "ROOT",
        arabicLabel:" نسبة الأيتام المستفيدين من البرامج التأهيلية   ",
        params:["NO_ORPHANS_PRGM","TOTAL_ORPHANS_QUAL_PRGM"],
        formula : (NO_ORPHANS_PRGM:number,TOTAL_ORPHANS_QUAL_PRGM:number)=>NO_ORPHANS_PRGM/TOTAL_ORPHANS_QUAL_PRGM*100
    },
    AVG_ANNUAL_EXP_ORPHANS: {
        weight: 0.4,
        parent: "ROOT",
        arabicLabel:"معدل التكلفة السنوية للخدمات المقدمة لكل يتيم ",
        params:["TOTAL_ANNUAL_EXP_ORPHANS","NO_BENF_ORPHANS"],
        formula : (TOTAL_ANNUAL_EXP_ORPHANS:number,NO_BENF_ORPHANS:number)=>TOTAL_ANNUAL_EXP_ORPHANS/NO_BENF_ORPHANS
    },



    PERC_ORPHANS_GEN_EDU: {
        weight: 0.4,
        parent: "ROOT",
        arabicLabel:" نسبة الأيتام في التعليم العام",
        params:["NO_STD_ORPHANS","TOTAL_ORPHANS_STD_AGE"],
        formula : (NO_STD_ORPHANS:number,TOTAL_ORPHANS_STD_AGE:number)=>NO_STD_ORPHANS/TOTAL_ORPHANS_STD_AGE*100
    },

    PERC_ORPHANS_UNI_EDU: {
        weight: 0.4,
        parent: "ROOT",
        arabicLabel:"نسبة الأيتام في التعليم الجامعي",
        params:["NO_ORPHANS_STD_UNI","TOTAL_ORPHANS_AGE_UNI"],
        formula : (NO_ORPHANS_STD_UNI:number,TOTAL_ORPHANS_AGE_UNI:number)=>NO_ORPHANS_STD_UNI/TOTAL_ORPHANS_AGE_UNI*100
    },


    AVG_ORPHANS_MARKS: {
        weight: 0.4,
        parent: "ROOT",
        arabicLabel:"معدل التحصيل الدراسي للأيتام (متوسط المعدلات)",
        params:["TOTAL_MARKS_ORPHANS","NO_GEN_EDU_ORPHANS"],
        formula : (TOTAL_MARKS_ORPHANS:number,NO_GEN_EDU_ORPHANS:number)=>TOTAL_MARKS_ORPHANS/NO_GEN_EDU_ORPHANS
    },

    HLTH_CVG: {
        weight: 0.4,
        parent: "ROOT",
        arabicLabel:"معدل التحصيل الدراسي للأيتام (متوسط المعدلات)",
        params:["NO_HLTH_ORPHANS","TOTAL_ORPHANS"],
        formula : (NO_HLTH_ORPHANS:number,TOTAL_ORPHANS:number)=>NO_HLTH_ORPHANS/TOTAL_ORPHANS*100
    },
}


export const MOSQUES_METADATA :{[key:string]:IndicatorMetadata<TMosquesIndicators, TMosquesEntries>}= {
    PERC_COMP_REQS_MOSQUES: {


        weight: 0.4,
        parent: "ROOT",
        arabicLabel:"نسبة تغطية طلبات الصيانة    ",
        params:["NO_EXEC_CONST_REQS","TOTAL_CONST_REQS"],
        formula : (NO_EXEC_CONST_REQS:number,TOTAL_CONST_REQS:number)=>NO_EXEC_CONST_REQS/TOTAL_CONST_REQS*100
    },
    PERC_COMP_ND_MOSQUES: {
        weight: 0.4,
        parent: "ROOT",
        arabicLabel:"نسبة المساجد المحتاجة للترميم  ",
        params:["NO_MOSQUES_ND_CONST","TOTAL_REG_MOSQUES"],
        formula : (NO_MOSQUES_ND_CONST:number,TOTAL_REG_MOSQUES:number)=>NO_MOSQUES_ND_CONST/TOTAL_REG_MOSQUES
    },

    PERC_PRJK_PG_MOSQUES: {
        weight: 0.4,
        parent: "ROOT",
        arabicLabel:"نسبة إنجاز مشاريع البناء  ",
        params:["NO_MOSQUES_COMP_CONST","TOTAL_MOSQUES_PLAN_CONST"],
        formula : (NO_MOSQUES_COMP_CONST:number,TOTAL_MOSQUES_PLAN_CONST:number)=> NO_MOSQUES_COMP_CONST/TOTAL_MOSQUES_PLAN_CONST
    },

    AVG_COMP_EXP_ANN_MOSQUES: {
        weight: 0.4,
        parent: "ROOT",
        arabicLabel:"متوسط تكلفة الصيانة السنوية لكل مسجد",
        params:["TOTAL_ANNUAL_EXPANSES_MOSQUES","NO_SERV_MOSQUES"],
        formula : (TOTAL_ANNUAL_EXPANSES_MOSQUES:number,NO_SERV_MOSQUES:number)=> TOTAL_ANNUAL_EXPANSES_MOSQUES/NO_SERV_MOSQUES
    },

    AVG_COMP_MOSQUES: {
        weight: 0.4,
        parent: "ROOT",
        arabicLabel:"معدل الشكاوى",
        params:["NO_RESV_COMPL_MOSQUES","NO_EXEC_PRJKS_MOSQUES"],
        formula : (NO_RESV_COMPL_MOSQUES:number,NO_EXEC_PRJKS_MOSQUES:number)=> NO_RESV_COMPL_MOSQUES/NO_EXEC_PRJKS_MOSQUES
    },



}
