
let statements = {
    approvalBox: {
    statement :`SELECT
    REQUEST_ID, APPLICATION_ID, APPLICATION_NAME,
     REQ_TYPE_ID, REQUEST_STATUS, REQ_TYPE_NAME,REQ_TYPE_DEFINITION_TYPE,
     EMPLOYEE_ID, EMP_NAME,EMP_NAME_AR, INCOME_ACTION,
     TRANACTION_ID, TRANS_CLASSIFICATION, TRANACTION_TYPE,
     COMMENTS,ANSWER_ON_QUES, CREATED_DATE, OUTCOME_ACTION_DATE,
     TRANACTION_STATUS, ASK_REPLY_STEP, PARENT_TRANACTION_ID,
     FROM_DESTINATION_ID, FROM_DEST,FROM_DEST_AR, TO_DESTINATION_ID,
     TO_DEST,TO_DEST_AR, STEP_ID, OPENED,REQ_CLASSIFICATION,
     CLIENT_ID, PROJECT_ID, PROJECT_MANAGER_ID,
     PRIORITY, WORK_ORDER_CODE, WO_STATUS_ID,
     DESCRIPTION, CLIENT_NAME, PROJECT_NAME,
     EMPLOYEE_EMAIL, STEP_DESCRIPTION_EN, STEP_DESCRIPTION_AR,
     STEP_CLASSIFICATION, STEP_NEED_ACTION_FLAG, LAST_STEP_NEED_ACTION_FLAG,
     (select count(*) from DAILY_WORKING_HOURS DW where DW.WORK_ORDER_ID=REQUEST_ID and nvl(DW.DELETED,0)=0 )DAILY_WORKING_COUNT,
     (select case when REQ_TYPE_ID=71 then (select WO.WORK_ORDER_CODE from PROJECTS p ,WORK_ORDERS wo ,OBJECTION_REQUESTS ob
    where OB.WORK_ORDER_ID=WO.WORK_ORDER_ID and P.PROJECT_ID=WO.PROJECT_ID and OB.OBJECTION_REQUEST_ID=REQUEST_ID) else null end from dual) work_order_code_obj,
    (select case when REQ_TYPE_ID=71 then (select WO.DESCRIPTION from PROJECTS p ,WORK_ORDERS wo ,OBJECTION_REQUESTS ob
    where OB.WORK_ORDER_ID=WO.WORK_ORDER_ID and P.PROJECT_ID=WO.PROJECT_ID and OB.OBJECTION_REQUEST_ID=REQUEST_ID) else null end from dual) work_order_desc_obj,
     (select case when REQ_TYPE_ID=71 then (select P.PRIMARY_NAME  from  PROJECTS p ,WORK_ORDERS wo ,OBJECTION_REQUESTS ob
    where OB.WORK_ORDER_ID=WO.WORK_ORDER_ID and P.PROJECT_ID=WO.PROJECT_ID and OB.OBJECTION_REQUEST_ID=REQUEST_ID) else null end from dual) project_name_obj_ar,
    (select case when REQ_TYPE_ID=71 then (select P.SECONDARY_NAME from PROJECTS p ,WORK_ORDERS wo ,OBJECTION_REQUESTS ob
    where OB.WORK_ORDER_ID=WO.WORK_ORDER_ID and P.PROJECT_ID=WO.PROJECT_ID and OB.OBJECTION_REQUEST_ID=REQUEST_ID) else null end from dual) project_name_obj_en,
    (select case when REQ_TYPE_ID=71 then (select C.EN_NAME from projects p, clients c ,WORK_ORDERS wo ,OBJECTION_REQUESTS ob
    where OB.WORK_ORDER_ID=WO.WORK_ORDER_ID and P.PROJECT_ID=WO.PROJECT_ID and OB.OBJECTION_REQUEST_ID=REQUEST_ID
    and C.CLIENT_ID = P.CLIENT_ID) else null end from dual) client_name_en_obj,
    (select case when REQ_TYPE_ID=71 then (select C.AR_NAME  from projects p, clients c ,WORK_ORDERS wo ,OBJECTION_REQUESTS ob
    where OB.WORK_ORDER_ID=WO.WORK_ORDER_ID and P.PROJECT_ID=WO.PROJECT_ID and OB.OBJECTION_REQUEST_ID=REQUEST_ID
    and C.CLIENT_ID = P.CLIENT_ID) else null end from dual) client_name_ar_obj
    FROM INBOX_VIEW
    where TO_DESTINATION_ID = (SELECT DESTINATION_ID FROM TRANSACTION_DESTINATIONS
                             WHERE EMPLOYEE_ID = :spEmployeeId and  nvl(DELETED,0)=0 ) and REQUEST_ID is not null and application_id=1
                             and (REQ_CLASSIFICATION=:p_reqClassification  or :p_reqClassification=0)
    order by REQUEST_ID DESC`,
             bindings: [],
             qstring: "",
             requireCommit: false
     }    
 }
   module.exports = statements ;
 
   
   