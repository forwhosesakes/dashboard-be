import { TDASHBOARD_STATUS } from "../types"

export const getDashboardStatus = ({indicatorsId,entriesId}:{indicatorsId:string|null,entriesId:string|null}):TDASHBOARD_STATUS=>{
   return   (entriesId )? indicatorsId? "COMPLETED" : "IN_PROGRESS": "NOT_STARTED"

}