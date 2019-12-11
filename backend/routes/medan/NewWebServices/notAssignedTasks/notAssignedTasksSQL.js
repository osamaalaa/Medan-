
let statements = {
    notAssignedTasks: {
            statement :`SELECT PT.PHASE_TASK_ID,pt.TASK_CODE,
              PT.DESCRIPTION, PT.START_DATE,    
             (select MEASURE_NAME_EN  from BOQ_MEASUREMENTS_SUB bms where bms.SUB_MEASURE_ID =  (select BQ.LAST_UNIT_OF_M from project_boq bq where BQ.BOQ_ID=(select PM.BOQ_ID from  project_milestone pm where PM.MILESTONE_ID=PT.MILESTONE_ID ) ))LAST_UNIT_OF_M_EN,                
              PT.END_DATE, PT.RISK_DATE,        
              PT.DURATION, PT.PROJECT_ID,     
              PT.MILESTONE_ID, PT.EMPLOYEE_ID,     
              PJ.PRIMARY_NAME,        
              PJ.SECONDARY_NAME ,       
             (select MEASURE_NAME_AR  from BOQ_MEASUREMENTS_SUB bms where bms.SUB_MEASURE_ID =  (select BQ.LAST_UNIT_OF_M from project_boq bq where BQ.BOQ_ID=(select PM.BOQ_ID from  project_milestone pm where PM.MILESTONE_ID=PT.MILESTONE_ID ) ))LAST_UNIT_OF_M_AR     
            FROM PHASE_TASKS pt,        
              PROJECTS pj        
            WHERE PT.TASK_TYPE =211        
            AND PT.PROJECT_ID =PJ.PROJECT_ID(+)        
            AND PJ.STATUS            >0        
            AND PT.STATUS            =1        
            AND NVL(PJ.DELETED,0)    =0        
            AND NVL(pt.DELETED,0)    =0        
            AND PJ.PROJECT_MANAGER_ID= :EMPLOYEE_ID
              `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  