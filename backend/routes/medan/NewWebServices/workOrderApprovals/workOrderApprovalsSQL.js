
let statements = {
   workOrderApprovals: {
   statement :`SELECT REQUEST_ID,
   APPLICATION_ID,
   APPLICATION_NAME,
   REQ_TYPE_ID,
   REQUEST_STATUS,
   REQ_TYPE_NAME,
   REQ_TYPE_DEFINITION_TYPE,
   EMPLOYEE_ID,
   EMP_NAME,
   EMP_NAME_AR,
   INCOME_ACTION,
   TRANACTION_ID,
   TRANS_CLASSIFICATION,
   TRANACTION_TYPE,
   COMMENTS,
   ANSWER_ON_QUES,
   CREATED_DATE,
   OUTCOME_ACTION_DATE,
   TRANACTION_STATUS,
   ASK_REPLY_STEP,
   PARENT_TRANACTION_ID,
   FROM_DESTINATION_ID,
   FROM_DEST,
   FROM_DEST_AR,
   TO_DESTINATION_ID,
   TO_DEST,
   TO_DEST_AR,
   STEP_ID,
   OPENED,
   REQ_CLASSIFICATION,
   CLIENT_ID,
   PROJECT_ID,
   PROJECT_MANAGER_ID,
   PRIORITY,
   WORK_ORDER_CODE,
   WO_STATUS_ID,
   DESCRIPTION,
   CLIENT_NAME,
   PROJECT_NAME,
   EMPLOYEE_EMAIL,
   STEP_DESCRIPTION_EN,
   STEP_DESCRIPTION_AR,
   STEP_CLASSIFICATION,
   (SELECT COUNT (*)
      FROM DAILY_WORKING_HOURS DW, work_orders wo
     WHERE     DW.WORK_ORDER_ID = REQUEST_ID
           AND DW.WORK_ORDER_ID = WO.WORK_ORDER_ID
           AND WO.PROJECT_ID = :proj_id
           AND NVL (DW.DELETED, 0) = 0)
      DAILY_WORKING_COUNT,
   (SELECT CASE
              WHEN REQ_TYPE_ID = 71
              THEN
                 (SELECT WO.WORK_ORDER_CODE
                    FROM PROJECTS p,
                         WORK_ORDERS wo,
                         OBJECTION_REQUESTS ob
                   WHERE     OB.WORK_ORDER_ID = WO.WORK_ORDER_ID
                         AND P.PROJECT_ID = :proj_id
                         AND P.PROJECT_ID = WO.PROJECT_ID
                         AND OB.OBJECTION_REQUEST_ID = REQUEST_ID)
              ELSE
                 NULL
           END
      FROM DUAL)
      work_order_code_obj,
   (SELECT CASE
              WHEN REQ_TYPE_ID = 71
              THEN
                 (SELECT WO.DESCRIPTION
                    FROM PROJECTS p,
                         WORK_ORDERS wo,
                         OBJECTION_REQUESTS ob
                   WHERE     OB.WORK_ORDER_ID = WO.WORK_ORDER_ID
                         AND P.PROJECT_ID = :proj_id
                         AND P.PROJECT_ID = WO.PROJECT_ID
                         AND OB.OBJECTION_REQUEST_ID = REQUEST_ID)
              ELSE
                 NULL
           END
      FROM DUAL)
      work_order_desc_obj,
   (SELECT CASE
              WHEN REQ_TYPE_ID = 71
              THEN
                 (SELECT P.PRIMARY_NAME
                    FROM PROJECTS p,
                         WORK_ORDERS wo,
                         OBJECTION_REQUESTS ob
                   WHERE     OB.WORK_ORDER_ID = WO.WORK_ORDER_ID
                         AND P.PROJECT_ID = :proj_id
                         AND P.PROJECT_ID = WO.PROJECT_ID
                         AND OB.OBJECTION_REQUEST_ID = REQUEST_ID)
              ELSE
                 NULL
           END
      FROM DUAL)
      project_name_obj_ar,
   (SELECT CASE
              WHEN REQ_TYPE_ID = 71
              THEN
                 (SELECT P.SECONDARY_NAME
                    FROM PROJECTS p,
                         WORK_ORDERS wo,
                         OBJECTION_REQUESTS ob
                   WHERE     OB.WORK_ORDER_ID = WO.WORK_ORDER_ID
                         AND P.PROJECT_ID = :proj_id
                         AND P.PROJECT_ID = WO.PROJECT_ID
                         AND OB.OBJECTION_REQUEST_ID = REQUEST_ID)
              ELSE
                 NULL
           END
      FROM DUAL)
      project_name_obj_en,
   (SELECT CASE
              WHEN REQ_TYPE_ID = 71
              THEN
                 (SELECT C.EN_NAME
                    FROM projects p,
                         clients c,
                         WORK_ORDERS wo,
                         OBJECTION_REQUESTS ob
                   WHERE     OB.WORK_ORDER_ID = WO.WORK_ORDER_ID
                         AND P.PROJECT_ID = :proj_id
                         AND P.PROJECT_ID = WO.PROJECT_ID
                         AND OB.OBJECTION_REQUEST_ID = REQUEST_ID
                         AND C.CLIENT_ID = P.CLIENT_ID)
              ELSE
                 NULL
           END
      FROM DUAL)
      client_name_en_obj,
   (SELECT CASE
              WHEN REQ_TYPE_ID = 71
              THEN
                 (SELECT C.AR_NAME
                    FROM projects p,
                         clients c,
                         WORK_ORDERS wo,
                         OBJECTION_REQUESTS ob
                   WHERE     OB.WORK_ORDER_ID = WO.WORK_ORDER_ID
                         AND P.PROJECT_ID = :proj_id
                         AND P.PROJECT_ID = WO.PROJECT_ID
                         AND OB.OBJECTION_REQUEST_ID = REQUEST_ID
                         AND C.CLIENT_ID = P.CLIENT_ID)
              ELSE
                 NULL
           END
      FROM DUAL)
      client_name_ar_obj
FROM INBOX_VIEW
WHERE     TO_DESTINATION_ID =
          (SELECT DESTINATION_ID
             FROM TRANSACTION_DESTINATIONS
            WHERE EMPLOYEE_ID = :EMPLOYEE_ID AND NVL (DELETED, 0) = 0)
   AND REQUEST_ID IS NOT NULL
   AND application_id = 1
   and project_id =:proj_id
  -- AND (REQ_CLASSIFICATION = 16 OR 16 = 0)
ORDER BY REQUEST_ID DESC`,
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;

  
  