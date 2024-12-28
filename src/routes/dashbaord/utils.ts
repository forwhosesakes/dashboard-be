import { TOperationalIndicators } from "../../db/types"

const initOperationalIndicators = ()=>{
    let indi:TOperationalIndicators = {
        REACH_TARGET_AUD_PERC:(0).toPrecision(3),
        PRJK_GOALS_ACHV_PERC:(0).toPrecision(3),
        BUDGET_COMMIT_PERC:(0).toPrecision(3),
        PRJKT_TIMELY_COMP_PERC:(0).toPrecision(3),
        VOLUN_SUST_PERC:(0).toPrecision(3),
        VOLUN_GROWTH_RATE_QUAR:(0).toPrecision(3),
        DOCS_ARCHIV:(0).toPrecision(3),
        QLY_SPEED_PROC_EXEC:(0).toPrecision(3),
        PGRM_PRJKS_EXEC_PERC:(0).toPrecision(3),
        OPS_GOALS_ACH_PERC:(0).toPrecision(3),
        EFFITV_PRJKS_PGRM:(0).toPrecision(3),
        VOLN_MGMT:(0).toPrecision(3),
        EFFIC_INTERNAL_OPS:(0).toPrecision(3),
        PRJKT_PRGM_MGMT:(0).toPrecision(3),
        OPS_PLAN_EXEC:(0).toPrecision(3),
    }
}