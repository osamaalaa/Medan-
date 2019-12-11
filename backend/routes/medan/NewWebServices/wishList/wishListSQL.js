
let statements = {
    wishList : {
            statement :`SELECT PT.PHASE_TASK_ID, PT.DESCRIPTION,           
            PT.EMPLOYEE_ID, PT.START_DATE,          
              PT.END_DATE, PT.MILESTONE_ID,                  
              PT.TASK_CODE,(select WO.WORK_ORDER_ID from WORK_ORDERS wo where WO.STATUS_ID=5 and WO.PHASE_TASK_ID=PT.PHASE_TASK_ID) rejected_wo,  
              (select count(*) from OBJECTION_REQUESTS ob where OB.WORK_ORDER_ID=(select WO.WORK_ORDER_ID from WORK_ORDERS wo where WO.STATUS_ID=10 and WO.PHASE_TASK_ID=PT.PHASE_TASK_ID) )objection_count,        
              (SELECT PTEO.DESCRIPTION FROM PHASE_TASKS PTEO where PTEO.PHASE_TASK_ID=PT.PARENT_TASK_ID and nvl(PTEO.DELETED,0)=0) AS PHASE_TASKS_NAME,         
              PJ.PRIMARY_NAME PROJECT_NAME_AR,PJ.SECONDARY_NAME PROJECT_NAME_EN,           
              PJ.PROJECT_MANAGER_ID,           
              CI.AR_NAME CLIENT_NAME_AR,CI.EN_NAME CLIENT_NAME_EN ,  PT.PROJECT_ID  ,PT.PARENT_TASK_ID  ,(CASE WHEN PT.PARENT_TASK_ID is not null THEN (select PP.DESCRIPTION from PHASE_TASKS PP where   PP.PHASE_TASK_ID = PT.PARENT_TASK_ID) 
        END) PARENT_DESCRIPTION            
       FROM  PHASE_TASKS PT, PROJECTS PJ, CLIENTS CI           
       where nvl(PT.DELETED,0)=0 and nvl(PJ.DELETED,0)=0             
       and PT.PROJECT_ID = PJ.PROJECT_ID(+) AND PJ.CLIENT_ID = CI.CLIENT_ID(+)          
       AND PT.EMPLOYEE_ID = :EMPLOYEE_ID  AND PT.STATUS = 1  AND PT.TASK_TYPE = 211`,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  