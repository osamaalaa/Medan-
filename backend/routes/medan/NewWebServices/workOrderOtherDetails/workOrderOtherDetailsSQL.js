
let statements = {
    workOrderOtherDetails: {
            statement :`select (select AR_NAME from WORK_ORDER_STATUS where STATUS_ID = :STATUS_ID) status,
            (select TASK_CODE from PHASE_TASKS where PHASE_TASK_ID = :PHASE_TASK_ID) taskcode,
            (select PRIMARY_NAME from LOOKUP_DETAILS where LOOKUP_DETAIL_ID = (SELECT TASK_CLASSIFICATION_ID from PHASE_TASKS WHERE PHASE_TASK_ID = :PHASE_TASK_ID) ) classification ,
            (select PB.BOQ_DESCRIPTION from project_boq pb where PB.BOQ_ID =(select PJ.BOQ_ID from PROJECT_MILESTONE pj where PJ.MILESTONE_ID = :MILESTONE_ID ) ) boqDesc ,
            (select DESCRIPTION from WORK_ORDERS where WO_PARENT_ID = (select WO_PARENT_ID from WORK_ORDERS where WORK_ORDER_ID = :WORK_ORDER_ID)) WO_PARENT_Desc ,
            (select MILESTONE_NAME from PROJECT_MILESTONE where MILESTONE_ID = :MILESTONE_ID) MILESTONE_NAME ,
            (select b.MEASURE_NAME_EN from BOQ_MEASUREMENTS_SUB b where SUB_MEASURE_ID = (select BSB.SUB_MEASURE_ID from PHASE_TASKS PT,PROJECT_MILESTONE PM,PROJECT_BOQ BQ,BOQ_MEASUREMENTS_SUB BSB   where PT.PHASE_TASK_ID = :PHASE_TASK_ID  and PT.MILESTONE_ID=PM.MILESTONE_ID and BQ.BOQ_ID=PM.BOQ_ID and BQ.LAST_UNIT_OF_M=BSB.SUB_MEASURE_ID)) MEASURE_NAME_EN,
            (select b.MEASURE_NAME_AR from BOQ_MEASUREMENTS_SUB b where SUB_MEASURE_ID = (select BSB.SUB_MEASURE_ID from PHASE_TASKS PT,PROJECT_MILESTONE PM,PROJECT_BOQ BQ,BOQ_MEASUREMENTS_SUB BSB   where PT.PHASE_TASK_ID = :PHASE_TASK_ID  and PT.MILESTONE_ID=PM.MILESTONE_ID and BQ.BOQ_ID=PM.BOQ_ID and BQ.LAST_UNIT_OF_M=BSB.SUB_MEASURE_ID)) MEASURE_NAME_AR 
             from dual
              `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  