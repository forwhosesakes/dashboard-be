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
    PGRM_PRJKS_EXEC_PERC:{
        weight: 0.03,
        parent: "OPS_PLAN_EXEC",
        arabicLabel:"نسبة تنفيذ البرامج والمشاريع",
        params:["NO_PROGRAMS_EXECUTED","NO_PROGRAMS_PLANNED"],
        formula:(NO_PROGRAMS_EXECUTED:number,NO_PROGRAMS_PLANNED:number )=>NO_PROGRAMS_EXECUTED/NO_PROGRAMS_PLANNED*100,
    },


  
    VOLN_CONTR_PRJKS_EXEC:{
        weight: 0.03,
        parent: "PRJKT_PRGM_MGMT",
        arabicLabel:"مساهمة المتطوعين في تنفيذ المشاريع",
        params:["NO_PROGRAMS_WITH_PARTICIPANTS","NO_PROGRAMS_PROJECTS"],
        formula:(NO_PROGRAMS_WITH_PARTICIPANTS:number,NO_PROGRAMS_PROJECTS:number)=>NO_PROGRAMS_WITH_PARTICIPANTS/NO_PROGRAMS_PROJECTS*100,
    },
   

    VOLUN_GROWTH_RATE_QUAR:{
        weight: 0.025,
        parent: "VOLN_MGMT",
        arabicLabel:"معدل النمو الربعي للمتطوعين",
        params:["NO_VOLUNTEERS_CURRENT_QUARTER","NO_VOLUNTEERS_NEXT_QUARTER"],
        formula:(NO_VOLUNTEERS_CURRENT_QUARTER:number,NO_VOLUNTEERS_NEXT_QUARTER:number)=>(NO_VOLUNTEERS_CURRENT_QUARTER-NO_VOLUNTEERS_NEXT_QUARTER)/NO_VOLUNTEERS_NEXT_QUARTER*100,
    },
    VOLUN_SUST_PERC:{
        weight: 0.025,
        parent: "VOLN_MGMT",
        arabicLabel:"نسبة استدامة المتطوعين",
        params:["NO_VOLUNTEERS_CONT_3","TOTAL_VOLUNTEERS"],
        formula:(NO_VOLUNTEERS_CONT_3:number,TOTAL_VOLUNTEERS:number)=>NO_VOLUNTEERS_CONT_3/TOTAL_VOLUNTEERS*100,
    },


    BUDGET_COMMIT_PERC:{
        weight: 0.015,
        parent: "EFFIC_PRJKS_EXEC",
        arabicLabel:"نسبة الالتزام بالميزانية",
        params:["APPROVED_BUDGET","TOTAL_PERIOD_EXPENSES" ],
        formula:(APPROVED_BUDGET:number,TOTAL_PERIOD_EXPENSES:number)=>(APPROVED_BUDGET-TOTAL_PERIOD_EXPENSES)/APPROVED_BUDGET*100,
    },

    REACH_TARGET_AUD_PERC:{
        weight: 0.02,
        parent: "EFFITV_PRJKS_PGRM",
        arabicLabel:"نسبة الوصول للفئة المستهدفة",
        params:["NO_ACTUAL_BENEFICIARIES","PLANNED_TARGET_NUMBER" ],
        formula:(NO_ACTUAL_BENEFICIARIES:number,PLANNED_TARGET_NUMBER:number)=>NO_ACTUAL_BENEFICIARIES/PLANNED_TARGET_NUMBER*100,
    },
 
    
}


export const FINANCIAL_METADATA :{[key:string]:IndicatorMetadata<TFinancialIndicators, TFinancialEntries>}= {

    FINANCIAL_PERF: {
        weight: 0.16,
        parent: "ROOT",
        arabicLabel:"الأداء المالي",
        params:["ADMIN_EXPENSES","PRGRMS_EXPENSES", "FINANCIAL_SUSTAIN", "DONAT_MONEY_RAISING","ABL_COVER_OBLIG"],
        formula : (ADMIN_EXPENSES:number,PRGRMS_EXPENSES:number,FINANCIAL_SUSTAIN:number,DONAT_MONEY_RAISING:number,ABL_COVER_OBLIG:number)=>(ADMIN_EXPENSES*0.2)+(PRGRMS_EXPENSES*0.45)+(FINANCIAL_SUSTAIN*0.1)+(DONAT_MONEY_RAISING*0.1)+(ABL_COVER_OBLIG*0.15)
    },

    ADMIN_EXPENSES: {
        weight: 0.032,
        parent: "FINANCIAL_PERF",
        arabicLabel:"المصاريف الإدارية والعمومية",
        params:["ADMIN_TO_TOTAL_EXPENSES","REV_FIN_SUST_TO_TOTAL_EXPENSES"],
        formula : (ADMIN_TO_TOTAL_EXPENSES:number,REV_FIN_SUST_TO_TOTAL_EXPENSES:number)=>(ADMIN_TO_TOTAL_EXPENSES*0.8)+(REV_FIN_SUST_TO_TOTAL_EXPENSES*0.2)
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
        params:["SUST_TO_TOTAL_EXPENSES","SUST_EXPENSEES_TO_REV"],
        formula : (SUST_TO_TOTAL_EXPENSES:number,SUST_EXPENSEES_TO_REV:number)=>(SUST_TO_TOTAL_EXPENSES*0.5)+(SUST_EXPENSEES_TO_REV*0.5)
    },
    DONAT_MONEY_RAISING: {
        weight: 0.018,
        parent: "FINANCIAL_PERF",
        arabicLabel:"جمع الأموال و التبرعات  ",
        params:["FUND_RAISING_TO_TOTAL_EXPENSES","FUND_RAISING_TO_TOTAL_DONAT"],
        formula : (FUND_RAISING_TO_TOTAL_EXPENSES:number,FUND_RAISING_TO_TOTAL_DONAT:number)=>(FUND_RAISING_TO_TOTAL_EXPENSES*0.5)+(FUND_RAISING_TO_TOTAL_DONAT*0.5)
    },

    ABL_COVER_OBLIG: {
        weight: 0.02,
        parent: "FINANCIAL_PERF",
        arabicLabel:" قدرة الجمعية على تغطية التزاماتها المستقبلية ",
        params:["CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF","NET_CACHE_INVEST_ADMIN_EXPENSES"],
        formula : (CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF:number,NET_CACHE_INVEST_ADMIN_EXPENSES:number)=>(CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF*0.7)+(NET_CACHE_INVEST_ADMIN_EXPENSES*0.3)
    },
    ADMIN_TO_TOTAL_EXPENSES: {
        weight: 0.8,
        parent: "ADMIN_EXPENSES",
        arabicLabel:"المصاريف الإدارية والعمومية إلى اجمالي المصاريف",
        params:["TOTAL_ADMINISTRATIVE_GENERAL_AND_GOVERNANCE_EXPENSES","TOTAL_EXPENSES"],
        formula : (TOTAL_ADMINISTRATIVE_GENERAL_AND_GOVERNANCE_EXPENSES:number,TOTAL_EXPENSES:number)=>{
            const res = (TOTAL_ADMINISTRATIVE_GENERAL_AND_GOVERNANCE_EXPENSES/(TOTAL_EXPENSES)) * 100
            console.log("Calculating ADMIN_TO_TOTAL_EXPENSES .....");
            console.log("Parameters:");
            console.log("GENERAL_ADMINSTRATIVE_EXPENTOTAL_ADMINISTRATIVE_GENERAL_AND_GOVERNANCE_EXPENSESSES:::",TOTAL_ADMINISTRATIVE_GENERAL_AND_GOVERNANCE_EXPENSES);
            console.log("TOTAL_EXPENSES:::",TOTAL_EXPENSES);
            console.log("res::", res);
            
            if (res >=25) return 0
            else if (res>=15) return (100 - 10*(res-15))
            else  return 100
            }
    },
    REV_FIN_SUST_TO_TOTAL_EXPENSES: {
        weight: 0.006,
        parent: "ADMIN_EXPENSES",
        arabicLabel:"عوائد الاستدامة المالية إلى المصاريف الإدارية والعمومية",
        params:["TOTAL_SUSTAINABILITY_RETURNS","TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES","GENERAL_ADMINSTRATIVE_EXPENSES"],
        formula : (TOTAL_SUSTAINABILITY_RETURNS:number,TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES:number,GENERAL_ADMINSTRATIVE_EXPENSES:number)=>{
            console.log("Calculating REV_FIN_SUST_TO_TOTAL_EXPENSES .....");
            console.log("Parameters:");
            console.log("TOTAL_SUSTAINABILITY_RETURNS:::",TOTAL_SUSTAINABILITY_RETURNS);
            console.log("TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES:::",TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES);
            console.log("GENERAL_ADMINSTRATIVE_EXPENSES:::",GENERAL_ADMINSTRATIVE_EXPENSES);
                        
            const res = ((TOTAL_SUSTAINABILITY_RETURNS-TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES)/GENERAL_ADMINSTRATIVE_EXPENSES)*100

            console.log("Formula result:", res);
            
        if(res>=100)
            return 100
        else if (res<=0)
            return 0
        else 
            return res  //TODO: but in percent    
        }
    },

    PRGRMS_TO_TOTAL_EXPENSES: {
        weight: 0.07,
        parent: "PRGRMS_EXPENSES",
        arabicLabel:"مصاريف البرامج والأنشطة إلى اجمالي المصاريف",
        params:["PROGRAMS_EXPENSES","ADMINISTRATIVE_EXPENSES_CHARGED_TO_THE_ACTIVITY", "TOTAL_EXPENSES"],
        formula : (PROGRAMS_EXPENSES:number,ADMINISTRATIVE_EXPENSES_CHARGED_TO_THE_ACTIVITY:number,TOTAL_EXPENSES:number)=>{
            console.log("Calculating PRGRMS_TO_TOTAL_EXPENSES .....");
            console.log("Parameters:");
            console.log("PROGRAMS_EXPENSES:::",PROGRAMS_EXPENSES);
            console.log("ADMINISTRATIVE_EXPENSES_CHARGED_TO_THE_ACTIVITY:::",ADMINISTRATIVE_EXPENSES_CHARGED_TO_THE_ACTIVITY);
            console.log("TOTAL_EXPENSES:::",TOTAL_EXPENSES);
            const res = (PROGRAMS_EXPENSES + ADMINISTRATIVE_EXPENSES_CHARGED_TO_THE_ACTIVITY)/TOTAL_EXPENSES * 100


            console.log("res::",res);
            
            if (res>80) return 100
            else if (res >= 41 && res <=80) return 2.5*(res-40)
            else return 0
        }
    },
    SUST_TO_TOTAL_EXPENSES: {
        weight: 0.006,
        parent: "FINANCIAL_SUSTAIN",
        arabicLabel:"مصاريف الاستدامة إلى اجمالي المصاريف",
        params:["TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES", "TOTAL_EXPENSES"],
        formula : (TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES:number,TOTAL_EXPENSES:number)=>{
            
            
            const res= TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES/TOTAL_EXPENSES*100

            console.log("Calculating SUST_TO_TOTAL_EXPENSES .....");
            console.log("Parameters:");
            console.log("TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES:::",TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES);
            console.log("TOTAL_EXPENSES:::",TOTAL_EXPENSES);
            console.log("res::", res);
            
            if (res < 5) return 100
            else if (res >=5 && res <10) return (100 - 20*(res-5))
            else return 0 

        
        }
    },
    SUST_EXPENSEES_TO_REV: {
        weight: 0.006,
        parent: "FINANCIAL_SUSTAIN",
        arabicLabel:"نسبة مصاريف الاستدامة إلى عوائد الاستدامة ",
        params:["TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES", "TOTAL_SUSTAINABILITY_RETURNS"],
        formula : (TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES:number,TOTAL_SUSTAINABILITY_RETURNS:number )=>{
            
            const res = (TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES/(TOTAL_SUSTAINABILITY_RETURNS))*100


            console.log("Calculating SUST_EXPENSEES_TO_REV .....");
            console.log("Parameters:");
            console.log("TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES:::",TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES);
            console.log("TOTAL_SUSTAINABILITY_RETURNS:::",TOTAL_SUSTAINABILITY_RETURNS);
            console.log("res::", res);
            
            if (res<10) return 100
            else if (res>=10 && res <20) return (100 - 10*(res-10))
             else return 0
        }
    },
    SUST_RETURN_TO_ASSETS: {
        weight: 0.008,
        parent: "FINANCIAL_SUSTAIN",
        arabicLabel:"نسبة عوائد الاستدامة إلى إجمالي أصول الاستدامة",
        params:[ "TOTAL_SUSTAINABILITY_RETURNS", "TOTAL_SUSTAINABILITY_ASSETS"],
        formula : (TOTAL_SUSTAINABILITY_RETURNS:number,TOTAL_SUSTAINABILITY_ASSETS:number )=>{
            const res = TOTAL_SUSTAINABILITY_RETURNS/TOTAL_SUSTAINABILITY_ASSETS * 100

            console.log("Calculating SUST_RETURN_TO_ASSETS .....");
            console.log("Parameters:");
            console.log("TOTAL_SUSTAINABILITY_RETURNS:::",TOTAL_SUSTAINABILITY_RETURNS);
            console.log("TOTAL_SUSTAINABILITY_ASSETS:::",TOTAL_SUSTAINABILITY_ASSETS);
            console.log("res::", res);
            
            if(res <=0) return 0
            else if(res >=7.5) return 100
            else return ((res/7.5)*100)

        }
    },
    FUND_RAISING_TO_TOTAL_EXPENSES: {
        weight: 0.009,
        parent: "DONAT_MONEY_RAISING",
        arabicLabel:" نسبة مصاريف جمع الأموال إلى اجمالي المصاريف ",
        params:[ "FUND_RAISING_EXPENSES", "TOTAL_EXPENSES"],
        formula : (FUND_RAISING_EXPENSES:number,TOTAL_EXPENSES:number )=>{
            const res = FUND_RAISING_EXPENSES/TOTAL_EXPENSES*100
            console.log("Calculating FUND_RAISING_TO_TOTAL_EXPENSES .....");
            console.log("Parameters:");
            console.log("FUND_RAISING_EXPENSES:::",FUND_RAISING_EXPENSES);
            console.log("TOTAL_EXPENSES:::",TOTAL_EXPENSES);
            console.log("res::", res);
            
        
            if (res < 5) return 100
            else if (res >=5 && res <10) return (100 - 20*(res-5))
            else return 0 
        }
    },

    FUND_RAISING_TO_TOTAL_DONAT: {
        weight: 0.008,
        parent: "DONAT_MONEY_RAISING",
        arabicLabel:" نسبة مصاريف جمع الأموال إلى اجمالي التبرعات",
        params:[ "FUND_RAISING_EXPENSES", "TOTAL_DONATIONS"],
        formula : (FUND_RAISING_EXPENSES:number,TOTAL_DONATIONS:number )=>{

            const res = FUND_RAISING_EXPENSES/TOTAL_DONATIONS*100
            console.log("Calculating FUND_RAISING_TO_TOTAL_DONAT .....");
            console.log("Parameters:");
            console.log("FUND_RAISING_EXPENSES:::",FUND_RAISING_EXPENSES);
            console.log("TOTAL_DONATIONS:::",TOTAL_DONATIONS);
            console.log("res::", res);
            
            if (res <10) return 100
            else if (res >=10 && res<19) return (100 - 10*(res-10))
            else return 0;
        
        }
    },
    CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF: {
        weight: 0.012,
        parent: "ABL_COVER_OBLIG",
        arabicLabel:"نسبة النقد وما في حكمه الى (صافي الأصول المقيدة+ صافي أصول الأوقاف النقدية + الالتزامات المتداول)",
        params:[ "CASHE_RELATED", "LIMITED_NET_ASSETS","AWQAF_NET_ASSETS","CURRENT_LIABILITIES"],
        formula : (CASHE_RELATED:number,LIMITED_NET_ASSETS:number ,AWQAF_NET_ASSETS:number,CURRENT_LIABILITIES:number)=>{
        
        const res = CASHE_RELATED/(LIMITED_NET_ASSETS+AWQAF_NET_ASSETS+CURRENT_LIABILITIES)*100

        console.log("Calculating CACHE_RELATED_TO_NET_ASSETS_AND_AWQAF .....");
        console.log("Parameters:");
        console.log("CASHE_RELATED:::",CASHE_RELATED);
        console.log("LIMITED_NET_ASSETS:::",LIMITED_NET_ASSETS);
        console.log("AWQAF_NET_ASSETS:::",AWQAF_NET_ASSETS);
        console.log("CURRENT_LIABILITIES:::",CURRENT_LIABILITIES);
        console.log("res::", res);
        
        if(res > 100) return 100
        else if (res >=50 && res <=100) return res
        else return 0
        
        }
    },
    NET_CACHE_INVEST_ADMIN_EXPENSES: {
        weight: 0.008,
        parent: "ABL_COVER_OBLIG",
        arabicLabel:"نسبة صافي النقد والاستثمارات المتداولة الى المصاريف الإدارية التقديرية",
        params:[ "CASHE_RELATED", "TRADED_INVESTMENTS","CURRENT_LIABILITIES","LIMITED_NET_ASSETS","AWQAF_NET_ASSETS","GENERAL_ADMINSTRATIVE_EXPENSES"],
        formula : (CASHE_RELATED:number,TRADED_INVESTMENTS:number ,CURRENT_LIABILITIES:number,LIMITED_NET_ASSETS:number,AWQAF_NET_ASSETS:number,GENERAL_ADMINSTRATIVE_EXPENSES:number)=>{
        const res = ((((CASHE_RELATED+TRADED_INVESTMENTS)- (CURRENT_LIABILITIES+LIMITED_NET_ASSETS+AWQAF_NET_ASSETS))/GENERAL_ADMINSTRATIVE_EXPENSES)) * 12
        console.log("Calculating NET_CACHE_INVEST_ADMIN_EXPENSES .....");
        console.log("Parameters:");
        console.log("CASHE_RELATED:::",CASHE_RELATED);
        console.log("TRADED_INVESTMENTS:::",TRADED_INVESTMENTS);
        console.log("CURRENT_LIABILITIES:::",CURRENT_LIABILITIES);
        console.log("AWQAF_NET_ASSETS:::",AWQAF_NET_ASSETS);
        console.log("GENERAL_ADMINSTRATIVE_EXPENSES:::",GENERAL_ADMINSTRATIVE_EXPENSES);

        console.log("res::", res);
        
        if(res<12) return res/12
        else if (res>=12 && res <=18) return 100
        else return (100 - 12.5 *(res-18))
        }
    },
    TOTAL_TAX_REFUND: {
        weight: 0.02,
        parent: "ROOT",
        arabicLabel:"إجمالي المبالغ المستردة من الضريبة  ",
        params:[ "TOTAL_TAX_REFUND"],
        formula : (TOTAL_TAX_REFUND:number)=>TOTAL_TAX_REFUND
    },


    ECONOMIC_RETURN_OF_VOLUNTEERING:{ weight: 0.02,
        parent: "ROOT",
        arabicLabel:"العائد الاقتصادي للتطوع ",
        params:[ "ECONOMIC_RETURN_OF_VOLUNTEERING"],
        formula : (ECONOMIC_RETURN_OF_VOLUNTEERING:number)=>ECONOMIC_RETURN_OF_VOLUNTEERING

    }
}




export const CORPORATE_METADATA :{[key:string]:IndicatorMetadata<TCorporateIndicators, TCorporateEntries>}= {
    // CORORATE_PERFORMANCE: {
    //     weight: 0.4,
    //     parent: "ROOT",
    //     arabicLabel:"الأداء المؤسسي",
    //     params:["GOVERANCE","HR", "PLANNING_ORGANIZING", "SATIS_MEASURMENT","CEO_PERFORMANCE"],
    //     formula : (GOVERANCE:number,HR:number,PLANNING_ORGANIZING:number,SATIS_MEASURMENT:number,CEO_PERFORMANCE:number)=>(GOVERANCE*0.12/0.4)+(HR*0.08/0.4)+(PLANNING_ORGANIZING*0.06/0.4)+(SATIS_MEASURMENT*0.1/0.4)+(CEO_PERFORMANCE*0.04/0.4)
    // },

    BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE: {
        weight: 0.035,
        parent: "CEO_PERFORMANCE",
        arabicLabel:"تقييم مجلس الإدارة للمدير التنفيذي",
        params:["BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE"],
        formula : (BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE:number)=>BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE
    },
    DAILY_OPS_MGMT: {
        weight: 0.035,
        parent: "CEO_PERFORMANCE",
        arabicLabel:"تقييم مجلس الإدارة للمدير التنفيذي",
        params:["BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE"],
        formula : (BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE:number)=>BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE
    },

    EMPLOYMENT_PERFORMANCE: {
        weight: 0.12,
        parent: "ROOT",
        arabicLabel:"الأداء الوظيفي",
        params:["EMP_PERF_AND_PROD","EMP_COMMITMENT","DIRECT_MANAGER_EVALUATION"],
        formula : (EMP_PERF_AND_PROD:number,EMP_COMMITMENT:number,DIRECT_MANAGER_EVALUATION:number)=>{
            console.log("EMPLOYMENT_PERFORMANCE");
            
            console.log("EMP_PERF_AND_PROD",EMP_PERF_AND_PROD);
            console.log("EMP_COMMITMENT",EMP_COMMITMENT);
            console.log("DIRECT_MANAGER_EVALUATION",DIRECT_MANAGER_EVALUATION);

            
            const res= (EMP_PERF_AND_PROD*0.4)+(EMP_COMMITMENT*0.3) + (DIRECT_MANAGER_EVALUATION*0.3) 
            console.log("res::",res);
            
        
        
        
        return res
        }
    },

    EMP_PERF_AND_PROD: {
        weight: 0.08,
        parent: "EMPLOYMENT_PERFORMANCE",
        arabicLabel:"أداء وإنتاجية الموظفين",
        params:["TOTAL_COMPLETED_TASKS_DURING_PERIOD","TOTAL_ASSIGNED_TASKS_DURING_PERIOD"],
        formula : (TOTAL_COMPLETED_TASKS_DURING_PERIOD:number,TOTAL_ASSIGNED_TASKS_DURING_PERIOD:number)=>(TOTAL_COMPLETED_TASKS_DURING_PERIOD/TOTAL_ASSIGNED_TASKS_DURING_PERIOD*100)
    },
    EMP_COMMITMENT: {
        weight: 0.06,
        parent: "EMPLOYMENT_PERFORMANCE",
        arabicLabel:"الالتزام الوظيفي",
        params:["TOTAL_EMPLOYEE_ATTENDANCE_DAYS","TOTAL_WORKING_DAYS","PERC_COMMIT_WORK_HOURS"],
        formula : (TOTAL_EMPLOYEE_ATTENDANCE_DAYS:number,TOTAL_WORKING_DAYS:number,PERC_COMMIT_WORK_HOURS:number)=>{
            console.log("EMP_COMMITMENT::")
            const res = (((TOTAL_EMPLOYEE_ATTENDANCE_DAYS/TOTAL_WORKING_DAYS)*70)+(PERC_COMMIT_WORK_HOURS*0.3))
            console.log("TOTAL_EMPLOYEE_ATTENDANCE_DAYS::",TOTAL_EMPLOYEE_ATTENDANCE_DAYS )
            console.log("TOTAL_WORKING_DAYS::",TOTAL_WORKING_DAYS )
            console.log("PERC_COMMIT_WORK_HOURS::",PERC_COMMIT_WORK_HOURS )

            console.log("EMP_COMMITMENT::",res )
            
            return res}
    },
    DIRECT_MANAGER_EVALUATION: {
        weight: 0.1,
        parent: "CORORATE_PERFORMANCE",
        arabicLabel:"تقييم المدير المباشر",
        params:["DIRECT_MANAGER_EVALUATION"],
        formula : (DIRECT_MANAGER_EVALUATION:number )=>(DIRECT_MANAGER_EVALUATION)
    },
    EMP_TRAINING_INDICATOR: {
        weight: 0.04,
        parent: "ROOT",
        arabicLabel:"مؤشر تدريب الموظفين",
        params:["NO_EXE_PRACTICES","NO_PLANNED_PRACTICES"],
        formula : (NO_EXE_PRACTICES:number,NO_PLANNED_PRACTICES:number)=>(NO_EXE_PRACTICES/NO_PLANNED_PRACTICES)*100
    },

    BENEF_SATIS_MEASURMENT: {
        weight: 0.02,
        parent: "ROOT",
        arabicLabel:"قياس رضا المستفيدين",
        params:["NO_GRADES_BENEFITS_SATISF","TOTAL_FORMS_GRADES","NO_RESPONSES_SATIS_FORM"],
        formula : (NO_GRADES_BENEFITS_SATISF:number,TOTAL_FORMS_GRADES:number,NO_RESPONSES_SATIS_FORM:number)=>(NO_GRADES_BENEFITS_SATISF/(TOTAL_FORMS_GRADES*NO_RESPONSES_SATIS_FORM))*100
    },
    EMP_SATIS_MEASURMENT: {
        weight: 0.02,
        parent: "ROOT",
        arabicLabel:"قياس رضا الموظفين",
        params:["TOTAL_GRADES_EMP_SATIS","TOTAL_FORMS_GRADES","NO_RESPONSES_EMP_SATIS"],
        formula : (TOTAL_GRADES_EMP_SATIS:number,TOTAL_FORMS_GRADES:number,NO_RESPONSES_EMP_SATIS:number)=>(TOTAL_GRADES_EMP_SATIS/(TOTAL_FORMS_GRADES*NO_RESPONSES_EMP_SATIS))*100
    },
    
    PARTENERS_SATIS_MEASURMENT: {
        weight: 0.02,
        parent: "ROOT",
        arabicLabel:"قياس رضا الشركاء والموردين",
        params:["TOTAL_GEADES_PARTENERS_SATIS","TOTAL_FORMS_GRADES","NO_RESPONSES_PARTERS_FORM"],
        formula : (TOTAL_GEADES_PARTENERS_SATIS:number,TOTAL_FORMS_GRADES:number,NO_RESPONSES_PARTERS_FORM:number)=>(TOTAL_GEADES_PARTENERS_SATIS/(TOTAL_FORMS_GRADES*NO_RESPONSES_PARTERS_FORM))*100
    },


    VOLUN_SATIS_MEASURMENT: {
        weight: 0.02,
        parent: "ROOT",
        arabicLabel:"قياس رضا المتطوعين",
        params:["TOTAL_GRADES_VOL_SATIS","TOTAL_FORMS_GRADES","NO_RESPOSES_VOL_SATIS_FORM"],
        formula : (TOTAL_GRADES_VOL_SATIS:number,TOTAL_FORMS_GRADES:number,NO_RESPOSES_VOL_SATIS_FORM:number)=>(TOTAL_GRADES_VOL_SATIS/(TOTAL_FORMS_GRADES*NO_RESPOSES_VOL_SATIS_FORM))*100
    },
    DONATORS_SATIS_MEASURMENT: {
        weight: 0.035,
        parent: "ROOT",
        arabicLabel:"قياس رضا المتبرعين والداعمين",
        params:["TOTAL_GRADES_DONAT_STATIS","TOTAL_FORMS_GRADES","NO_RESPONSES_DONAT_SATIS_FORM"],
        formula : (TOTAL_GRADES_DONAT_STATIS:number,TOTAL_FORMS_GRADES:number,NO_RESPONSES_DONAT_SATIS_FORM:number)=>(TOTAL_GRADES_DONAT_STATIS/(TOTAL_FORMS_GRADES*NO_RESPONSES_DONAT_SATIS_FORM))*100
    },

    ADMIN_ORG_SATIS_MEASURMENT: {
        weight: 0.035,
        parent: "ROOT",
        arabicLabel:"قياس رضا الجمعية العمومية ومجلس الإدارة",
        params:["TOTAL_SATIS_GRADES_ORG","TOTAL_FORMS_GRADES","NO_ORG_MEMBERS"],
        formula : (TOTAL_SATIS_GRADES_ORG:number,TOTAL_FORMS_GRADES:number,NO_ORG_MEMBERS:number)=>(TOTAL_SATIS_GRADES_ORG/(TOTAL_FORMS_GRADES*NO_ORG_MEMBERS))*100
    },


    COMMUNITY_SATIS_MEASURMENT: {
        weight: 0.035,
        parent: "ROOT",
        arabicLabel:"قياس رضا المجتمع والصورة الذهنية",
        params:["TOTAL_GRADES_COM","TOTAL_FORMS_GRADES","NO_RESPONSES_COM_SATIS"],
        formula : (TOTAL_GRADES_COM:number,TOTAL_FORMS_GRADES:number,NO_RESPONSES_COM_SATIS:number)=>(TOTAL_GRADES_COM/(TOTAL_FORMS_GRADES*NO_RESPONSES_COM_SATIS))*100
    },



    CEO_PERFORMANCE: {
        weight: 0.035,
        parent: "ROOT",
        arabicLabel:"أداء المدير التنفيذي",
        params:["FOLLOWUP_BOARD_DECISION","OPERATIONAL_PLAN_ACHIVMENT_GOALS","FOLLOWUP_EMPS_PERF","BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE"],
        formula : (FOLLOWUP_BOARD_DECISION:number,OPERATIONAL_PLAN_ACHIVMENT_GOALS:number,FOLLOWUP_EMPS_PERF:number,BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE:number)=>((FOLLOWUP_BOARD_DECISION+OPERATIONAL_PLAN_ACHIVMENT_GOALS+FOLLOWUP_EMPS_PERF+BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE)/4)
    },



    FOLLOWUP_BOARD_DECISION: {
        weight: 0.035,
        parent: "CEO_PERFORMANCE",
        arabicLabel:"متابعة تنفيذ قرارات مجلس الإدارة",
        params:["TOTAL_EXECUTED_DECISIONS","TOTAL_DECISIONS_BY_CEO"],
        formula : (TOTAL_EXECUTED_DECISIONS:number,TOTAL_DECISIONS_BY_CEO:number)=>(TOTAL_EXECUTED_DECISIONS/TOTAL_DECISIONS_BY_CEO*100)
    },




    OPERATIONAL_PLAN_ACHIVMENT_GOALS: {
        weight: 0.035,
        parent: "CEO_PERFORMANCE",
        arabicLabel:"تحقيق برامج الخطة التشغيلية",
        params:["TOTAL_ACHIEVED_PROGRAMS","TOTAL_PLANNED_PROGRAMS"],
        formula : (TOTAL_EXECUTETOTAL_ACHIEVED_PROGRAMSD_DECISIONS:number,TOTAL_PLANNED_PROGRAMS:number)=>(TOTAL_EXECUTETOTAL_ACHIEVED_PROGRAMSD_DECISIONS/TOTAL_PLANNED_PROGRAMS*100)
    },


    FOLLOWUP_EMPS_PERF: {
        weight: 0.035,
        parent: "CEO_PERFORMANCE",
        arabicLabel:"متابعة أداء الموظفين",
        params:["EMP_PERF_EVALUATION_AVG"],
        formula : (EMP_PERF_EVALUATION_AVG:number)=>(EMP_PERF_EVALUATION_AVG/4/100)*100
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
