
type IndicatorMetadata = {
    weight:number,
    parent: string, 
    arabicLabel:string,
    params: string[],
    formula: (...params:number[])=>number
}
export const OPERATIONAL_METADATA:{[key:string]:IndicatorMetadata} = {
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