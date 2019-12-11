
let statements = {
    workOrderInProg : {
            statement :`SELECT REQUEST_ID, APPLICATION_ID, APPLICATION_NAME,                       
            REQ_TYPE_ID, REQUEST_STATUS, REQ_TYPE_NAME,                       
             EMPLOYEE_ID, EMP_NAME,EMP_NAME_AR, INCOME_ACTION,                       
             TRANACTION_ID, TRANS_CLASSIFICATION, TRANACTION_TYPE,                       
             COMMENTS,ANSWER_ON_QUES, CREATED_DATE, OUTCOME_ACTION_DATE,                       
             TRANACTION_STATUS, ASK_REPLY_STEP, PARENT_TRANACTION_ID,                       
             FROM_DESTINATION_ID, FROM_DEST,FROM_DEST_AR, TO_DESTINATION_ID,                       
             TO_DEST,TO_DEST_AR, STEP_ID, OPENED,                      
             CLIENT_ID, PROJECT_ID, PROJECT_MANAGER_ID,                      
             PRIORITY, WORK_ORDER_CODE, WO_STATUS_ID,                      
             DESCRIPTION, CLIENT_NAME, PROJECT_NAME,                      
             EMPLOYEE_EMAIL, STEP_DESCRIPTION_EN, STEP_DESCRIPTION_AR,                      
             STEP_CLASSIFICATION,  
                               (select count(*) from DAILY_WORKING_HOURS DW where DW.WORK_ORDER_ID = INBOX_VIEW.WORK_ORDER_CODE and nvl(DW.DELETED,0)=0 ) DAILY_WORKING_COUNT                      
          FROM INBOX_VIEW         
          where TO_DESTINATION_ID = (SELECT DESTINATION_ID FROM TRANSACTION_DESTINATIONS                                           
                                                    WHERE EMPLOYEE_ID = :EMPLOYEE_ID and  nvl(DELETED,0)=0 ) and application_id=1 and WO_STATUS_ID != 8                
          order by REQUEST_ID DESC`,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
    
    rejectedWorkOrder : {
      statement :`SELECT REQUEST_ID, APPLICATION_ID, APPLICATION_NAME,                       
      REQ_TYPE_ID, REQUEST_STATUS, REQ_TYPE_NAME,                       
       EMPLOYEE_ID, EMP_NAME,EMP_NAME_AR, INCOME_ACTION,                       
       TRANACTION_ID, TRANS_CLASSIFICATION, TRANACTION_TYPE,                       
       COMMENTS,ANSWER_ON_QUES, CREATED_DATE, OUTCOME_ACTION_DATE,                       
       TRANACTION_STATUS, ASK_REPLY_STEP, PARENT_TRANACTION_ID,                       
       FROM_DESTINATION_ID, FROM_DEST,FROM_DEST_AR, TO_DESTINATION_ID,                       
       TO_DEST,TO_DEST_AR, STEP_ID, OPENED,                      
       CLIENT_ID, PROJECT_ID, PROJECT_MANAGER_ID,                      
       PRIORITY, WORK_ORDER_CODE, WO_STATUS_ID,                      
       DESCRIPTION, CLIENT_NAME, PROJECT_NAME,                      
       EMPLOYEE_EMAIL, STEP_DESCRIPTION_EN, STEP_DESCRIPTION_AR,                      
       STEP_CLASSIFICATION,  
                         (select count(*) from DAILY_WORKING_HOURS DW where DW.WORK_ORDER_ID = INBOX_VIEW.WORK_ORDER_CODE and nvl(DW.DELETED,0)=0 ) DAILY_WORKING_COUNT                      
    FROM INBOX_VIEW         
    where TO_DESTINATION_ID = (SELECT DESTINATION_ID FROM TRANSACTION_DESTINATIONS                                           
                                              WHERE EMPLOYEE_ID = :EMPLOYEE_ID and  nvl(DELETED,0)=0 ) and application_id=1 and WO_STATUS_ID = 5                
    order by REQUEST_ID DESC`,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
},

closedWorkOrder : {
  statement :`SELECT REQUEST_ID, APPLICATION_ID, APPLICATION_NAME,                       
  REQ_TYPE_ID, REQUEST_STATUS, REQ_TYPE_NAME,                       
   EMPLOYEE_ID, EMP_NAME,EMP_NAME_AR, INCOME_ACTION,                       
   TRANACTION_ID, TRANS_CLASSIFICATION, TRANACTION_TYPE,                       
   COMMENTS,ANSWER_ON_QUES, CREATED_DATE, OUTCOME_ACTION_DATE,                       
   TRANACTION_STATUS, ASK_REPLY_STEP, PARENT_TRANACTION_ID,                       
   FROM_DESTINATION_ID, FROM_DEST,FROM_DEST_AR, TO_DESTINATION_ID,                       
   TO_DEST,TO_DEST_AR, STEP_ID, OPENED,                      
   CLIENT_ID, PROJECT_ID, PROJECT_MANAGER_ID,                      
   PRIORITY, WORK_ORDER_CODE, WO_STATUS_ID,                      
   DESCRIPTION, CLIENT_NAME, PROJECT_NAME,                      
   EMPLOYEE_EMAIL, STEP_DESCRIPTION_EN, STEP_DESCRIPTION_AR,                      
   STEP_CLASSIFICATION,  
                     (select count(*) from DAILY_WORKING_HOURS DW where DW.WORK_ORDER_ID = INBOX_VIEW.WORK_ORDER_CODE and nvl(DW.DELETED,0)=0 ) DAILY_WORKING_COUNT                      
FROM INBOX_VIEW         
where TO_DESTINATION_ID = (SELECT DESTINATION_ID FROM TRANSACTION_DESTINATIONS                                           
                                          WHERE EMPLOYEE_ID = :EMPLOYEE_ID and  nvl(DELETED,0)=0 ) and application_id=1 and WO_STATUS_ID = 8                
order by REQUEST_ID DESC`,
  returns: [],
  bindings: [],
  qstring: "",
  requireCommit: false
}
}
  module.exports = statements ;
  