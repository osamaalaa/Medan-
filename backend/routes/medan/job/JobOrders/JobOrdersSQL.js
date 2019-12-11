
let statements = {
    getAllJobOrders: {
            statement :`
            SELECt  JOB_ORDER_ID,
                   CODE,
                   JOB_ORDER_DESC,
                   ASSET_ACTION_ID,
                   EMPLOYEE_ID,
                   STATUS,
                   CREATED_BY,
                   CREATION_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   REQUEST_ID,
                   DETAIL_PLAN_ID,
                   PROJECT_ID,
                   BOQ_ID,
                   MILESTONE_ID,
                   ASSET_ID,
                   OPERATION_TYPE,
                   JOB_ORDER_DATE
              FROM JOB_ORDERS  `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneJobOrdersByID:{
        statement:`
                  SELECT job_order_id, 
                  JobOrdersEO.code, 
                  JobOrdersEO.job_order_desc, 
                  JobOrdersEO.asset_action_id, 
                  JobOrdersEO.employee_id, 
                  JobOrdersEO.status, 
                  JobOrdersEO.created_by, 
                  JobOrdersEO.creation_date, 
                  JobOrdersEO.deleted, 
                  JobOrdersEO.deleted_by, 
                  JobOrdersEO.deleted_date, 
                  JobOrdersEO.request_id, 
                  JobOrdersEO.detail_plan_id, 
                  JobOrdersEO.project_id, 
                  JobOrdersEO.boq_id, 
                  JobOrdersEO.milestone_id, 
                  JobOrdersEO.asset_id, 
                  JobOrdersEO.operation_type, 
                  JobOrdersEO.job_order_date, 
                  (SELECT PQ.boq_description 
                  FROM   project_boq pq 
                  WHERE  Nvl (PQ.deleted, 0) = 0 
                           AND PQ.boq_id = JobOrdersEO.boq_id)                    AS 
                  BOQ_DESC, 
                  (SELECT PM.milestone_name 
                  FROM   project_milestone pm 
                  WHERE  Nvl (PM.deleted, 0) = 0 
                           AND PM.milestone_id = JobOrdersEO.milestone_id)        AS 
                  Mile_Name, 
                  (SELECT PR.primary_name 
                  FROM   projects pr 
                  WHERE  Nvl (pr.deleted, 0) = 0 
                           AND PR.project_id = JobOrdersEO.project_id)            AS 
                  Project_Name_Ar, 
                  (SELECT PR.secondary_name 
                  FROM   projects pr 
                  WHERE  Nvl (pr.deleted, 0) = 0 
                           AND PR.project_id = JobOrdersEO.project_id)            AS 
                  Project_Name_En, 
                  (SELECT ADEF.asset_serial 
                  FROM   assets_definition adef 
                  WHERE  Nvl (ADEF.deleted, 0) = 0 
                           AND ADEF.asset_id = JobOrdersEO.asset_id)              AS 
                  Asset_Serial, 
                  (SELECT ADEF.asset_name 
                  FROM   assets_definition adef 
                  WHERE  Nvl (ADEF.deleted, 0) = 0 
                           AND ADEF.asset_id = JobOrdersEO.asset_id)              AS 
                  Asset_Name, 
                  (SELECT To_char(ADEF.created_date, 'dd,MM,YYYY') 
                  FROM   assets_definition adef 
                  WHERE  Nvl (ADEF.deleted, 0) = 0 
                           AND ADEF.asset_id = JobOrdersEO.asset_id)              AS 
                  Asset_Creation_Date, 
                  (SELECT CASE 
                           WHEN ADEF.asset_type = 300 THEN 'origin' 
                           WHEN ADEF.asset_type = 301 THEN 'equibment' 
                           WHEN ADEF.asset_type = 302 THEN 'location' 
                           WHEN ADEF.asset_type = 303 THEN 'resource' 
                           END 
                  FROM   assets_definition adef 
                  WHERE  Nvl (ADEF.deleted, 0) = 0 
                           AND ADEF.asset_id = JobOrdersEO.asset_id)              AS 
                  Asset_Type_EN, 
                  (SELECT CASE 
                           WHEN ADEF.asset_type = 300 THEN 'أصل' 
                           WHEN ADEF.asset_type = 301 THEN 'معدة' 
                           WHEN ADEF.asset_type = 302 THEN 'موقع' 
                           WHEN ADEF.asset_type = 303 THEN 'مورد' 
                           END 
                  FROM   assets_definition adef 
                  WHERE  Nvl (ADEF.deleted, 0) = 0 
                           AND ADEF.asset_id = JobOrdersEO.asset_id)              AS 
                  Asset_Type_AR, 
                  (SELECT LD.secondary_name 
                  FROM   lookup_details ld 
                  WHERE  LD.lookup_detail_id = JobOrdersEO.operation_type 
                           AND Nvl (LD.deleted, 0) = 0)                           AS 
                  Oper_Type_en, 
                  (SELECT LD.primary_name 
                  FROM   lookup_details ld 
                  WHERE  LD.lookup_detail_id = JobOrdersEO.operation_type 
                           AND Nvl (LD.deleted, 0) = 0)                           AS 
                  Oper_Type_ar, 
                  Getempname_lang ((SELECT PMAD.supervisor_id 
                                    FROM   project_mile_asset_det pmad 
                                    WHERE  Nvl (PMAD.deleted, 0) = 0 
                                          AND PMAD.asset_action_id = 
                                                JobOrdersEO.asset_action_id 
                                          AND PMAD.milestone_asset_id = 
                                                (SELECT PQA.boq_asset_id 
                                                FROM 
                                                project_boq_assets pqa 
                                                                           WHERE 
                                                Nvl (PQA.deleted, 0) = 0 
                                                AND PQA.milestone_id = 
                                                   JobOrdersEO.milestone_id 
                                                AND PQA.asset_id = 
                                                   JobOrdersEO.asset_id)), 1, 2) AS 
                  Supervisor_Name_En, 
                  Getempname_lang ((SELECT PMAD.supervisor_id 
                                    FROM   project_mile_asset_det pmad 
                                    WHERE  Nvl (PMAD.deleted, 0) = 0 
                                          AND PMAD.asset_action_id = 
                                                JobOrdersEO.asset_action_id 
                                          AND PMAD.milestone_asset_id = 
                                                (SELECT PQA.boq_asset_id 
                                                FROM 
                                                project_boq_assets pqa 
                                                                           WHERE 
                                                Nvl (PQA.deleted, 0) = 0 
                                                AND PQA.milestone_id = 
                                                   JobOrdersEO.milestone_id 
                                                AND PQA.asset_id = 
                                                   JobOrdersEO.asset_id)), 1, 1) AS 
                  Supervisor_Name_Ar
            FROM   job_orders JobOrdersEO 
            WHERE  JobOrdersEO.job_order_id = :JOB_ORDER_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getJobOrderByReqID: {
      statement :`SELECT JobOrdersEO.JOB_ORDER_ID,
      JobOrdersEO.ASSET_ACTION_ID,
      JobOrdersEO.BOQ_ID,
      JobOrdersEO.CODE,
      JobOrdersEO.CREATED_BY,
      JobOrdersEO.CREATION_DATE,
      JobOrdersEO.DELETED,
      JobOrdersEO.DELETED_BY,
      JobOrdersEO.DELETED_DATE,
      JobOrdersEO.DETAIL_PLAN_ID,
      JobOrdersEO.EMPLOYEE_ID,
      JobOrdersEO.JOB_ORDER_DESC,
      JobOrdersEO.MILESTONE_ID,
      JobOrdersEO.PROJECT_ID,
      JobOrdersEO.REQUEST_ID,
      JobOrdersEO.STATUS,
      (SELECT PQ.BOQ_DESCRIPTION
         FROM PROJECT_BOQ pq
        WHERE NVL (PQ.DELETED, 0) = 0 AND PQ.BOQ_ID = JobOrdersEO.BOQ_ID)
         AS BOQ_DESC,
      (SELECT PM.MILESTONE_NAME
         FROM PROJECT_MILESTONE pm
        WHERE     NVL (PM.DELETED, 0) = 0
              AND PM.MILESTONE_ID = JobOrdersEO.MILESTONE_ID)
         AS Mile_Name,
      (SELECT PR.PRIMARY_NAME
         FROM PROJECTS pr
        WHERE     NVL (pr.DELETED, 0) = 0
              AND PR.PROJECT_ID = JobOrdersEO.PROJECT_ID)
         AS Project_Name_Ar,
      (SELECT PR.SECONDARY_NAME
         FROM PROJECTS pr
        WHERE     NVL (pr.DELETED, 0) = 0
              AND PR.PROJECT_ID = JobOrdersEO.PROJECT_ID)
         AS Project_Name_En,
      (SELECT ADEF.ASSET_SERIAL
         FROM ASSETS_DEFINITION adef
        WHERE     NVL (ADEF.DELETED, 0) = 0
              AND ADEF.ASSET_ID = JobOrdersEO.ASSET_ID)
         AS Asset_Serial,
      (SELECT ADEF.ASSET_NAME
         FROM ASSETS_DEFINITION adef
        WHERE     NVL (ADEF.DELETED, 0) = 0
              AND ADEF.ASSET_ID = JobOrdersEO.ASSET_ID)
         AS Asset_Name,
      (SELECT ADEF.DESCRIPTION
         FROM ASSETS_DEFINITION adef
        WHERE     NVL (ADEF.DELETED, 0) = 0
              AND ADEF.ASSET_ID = JobOrdersEO.ASSET_ID)
         AS VIEW_ATTR,
      (SELECT ADEF.CREATED_DATE
         FROM ASSETS_DEFINITION adef
        WHERE     NVL (ADEF.DELETED, 0) = 0
              AND ADEF.ASSET_ID = JobOrdersEO.ASSET_ID)
         AS Asset_Creation_Date,
      (SELECT CASE
                 WHEN ADEF.ASSET_TYPE = 300 THEN 'origin'
                 WHEN ADEF.ASSET_TYPE = 301 THEN 'equibment'
                 WHEN ADEF.ASSET_TYPE = 302 THEN 'location'
                 WHEN ADEF.ASSET_TYPE = 303 THEN 'resource'
              END
         FROM ASSETS_DEFINITION adef
        WHERE     NVL (ADEF.DELETED, 0) = 0
              AND ADEF.ASSET_ID = JobOrdersEO.ASSET_ID)
         AS Asset_Type_EN,
         (SELECT CASE
                 WHEN ADEF.ASSET_TYPE = 300 THEN 'أصل'
                 WHEN ADEF.ASSET_TYPE = 301 THEN 'معدة'
                 WHEN ADEF.ASSET_TYPE = 302 THEN 'موقع'
                 WHEN ADEF.ASSET_TYPE = 303 THEN 'مورد'
              END
         FROM ASSETS_DEFINITION adef
        WHERE     NVL (ADEF.DELETED, 0) = 0
              AND ADEF.ASSET_ID = JobOrdersEO.ASSET_ID)
         AS Asset_Type_AR,
      (SELECT WOS.AR_NAME
         FROM WORK_ORDER_STATUS wos
        WHERE     NVL (WOS.DELETED, 0) = 0
              AND WOS.STATUS_ID = JobOrdersEO.STATUS)
         AS VIEW_ATTR,
      (SELECT WOS.AR_NAME2
         FROM WORK_ORDER_STATUS wos
        WHERE     NVL (WOS.DELETED, 0) = 0
              AND WOS.STATUS_ID = JobOrdersEO.STATUS)
         AS VIEW_ATTR,
      JobOrdersEO.ASSET_ID,
      JobOrdersEO.OPERATION_TYPE,
      (SELECT LD.SECONDARY_NAME
         FROM LOOKUP_DETAILS ld
        WHERE     LD.LOOKUP_DETAIL_ID = JobOrdersEO.OPERATION_TYPE
              AND NVL (LD.DELETED, 0) = 0)
         AS Oper_Type_en,
      (SELECT LD.PRIMARY_NAME
         FROM LOOKUP_DETAILS ld
        WHERE     LD.LOOKUP_DETAIL_ID = JobOrdersEO.OPERATION_TYPE
              AND NVL (LD.DELETED, 0) = 0)
         AS Oper_Type_ar,
      GETEMPNAME_LANG (
         (SELECT PMAD.SUPERVISOR_ID
            FROM PROJECT_MILE_ASSET_DET pmad
           WHERE     NVL (PMAD.DELETED, 0) = 0
                 AND PMAD.ASSET_ACTION_ID = JobOrdersEO.ASSET_ACTION_ID
                 AND PMAD.MILESTONE_ASSET_ID =
                        (SELECT PQA.BOQ_ASSET_ID
                           FROM PROJECT_BOQ_ASSETS pqa
                          WHERE     NVL (PQA.DELETED, 0) = 0
                                AND PQA.MILESTONE_ID =
                                       JobOrdersEO.MILESTONE_ID
                                AND PQA.ASSET_ID = JobOrdersEO.ASSET_ID)),
         1,
         2)
         AS Supervisor_Name_En,
         GETEMPNAME_LANG (
         (SELECT PMAD.SUPERVISOR_ID
            FROM PROJECT_MILE_ASSET_DET pmad
           WHERE     NVL (PMAD.DELETED, 0) = 0
                 AND PMAD.ASSET_ACTION_ID = JobOrdersEO.ASSET_ACTION_ID
                 AND PMAD.MILESTONE_ASSET_ID =
                        (SELECT PQA.BOQ_ASSET_ID
                           FROM PROJECT_BOQ_ASSETS pqa
                          WHERE     NVL (PQA.DELETED, 0) = 0
                                AND PQA.MILESTONE_ID =
                                       JobOrdersEO.MILESTONE_ID
                                AND PQA.ASSET_ID = JobOrdersEO.ASSET_ID)),
         1,
         1)
         AS Supervisor_Name_Ar,
         (SELECT CASE
          WHEN ( (SELECT AD.ASSET_TYPE
                    FROM ASSETS_DEFINITION ad
                   WHERE     NVL (AD.DELETED, 0) = 0
                         AND AD.ASSET_ID = JobOrdersEO.ASSET_ID) = 302)
          THEN
             0
          WHEN (SELECT CASE
                          WHEN EXISTS
                                  (SELECT *
                                     FROM ASSET_COUNTERS ac
                                    WHERE     NVL (AC.DELETED, 0) = 0
                                          AND AC.ASSET_ID =
                                                 JobOrdersEO.ASSET_ID)
                          THEN
                             1
                          ELSE
                             0
                       END
                  FROM DUAL) = 0
          THEN
             0
          ELSE
             1
        END
      FROM DUAL) asset_has_counter,
      JobOrdersEO.JOB_ORDER_DATE,
      JobOrdersEO.JOB_ORDER_TYPE,
      JOBORDERSEO.ATT_TEMPLATE_ID
 FROM JOB_ORDERS JobOrdersEO
WHERE (JobOrdersEO.DELETED = 0 OR JobOrdersEO.DELETED IS NULL)
and JobOrdersEO.REQUEST_ID = :REQUEST_ID
 
`,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
},

updateJobOrder: {
   statement: `
   UPDATE JOB_ORDERS
   SET STATUS = :STATUS
   WHERE JOB_ORDER_ID = :JOB_ORDER_ID
   `,
   returns: [],
   bindings: [],
   qstring: "",
   requireCommit: true
},


createJobOrder: {
   statement: `
   INSERT INTO  JOB_ORDERS (JOB_ORDER_ID,
      CODE,
      JOB_ORDER_DESC,
      ASSET_ACTION_ID,
      EMPLOYEE_ID,
      STATUS,
      CREATED_BY,
      CREATION_DATE,
      DELETED_DATE,
      REQUEST_ID,
      DETAIL_PLAN_ID,
      PROJECT_ID,
      BOQ_ID,
      MILESTONE_ID,
      ASSET_ID,
      OPERATION_TYPE,
      JOB_ORDER_DATE,
      JOB_ORDER_TYPE)
  VALUES (
   JOB_ORDERS_SEQ.NEXTVAL,
   :CODE,
   :JOB_ORDER_DESC,
   :ASSET_ACTION_ID,
   :EMPLOYEE_ID,
   :STATUS,
   :CREATED_BY,
   sysdate,
   sysdate,
   :REQUEST_ID,
   :DETAIL_PLAN_ID,
   :PROJECT_ID,
   :BOQ_ID,
   :MILESTONE_ID,
   :ASSET_ID,
   :OPERATION_TYPE,
   sysdate,
      :JOB_ORDER_TYPE
  )
  RETURN   CODE, JOB_ORDER_DESC, ASSET_ACTION_ID, EMPLOYEE_ID , REQUEST_ID, PROJECT_ID
  INTO  :R_CODE, :R_JOB_ORDER_DESC, :R_ASSET_ACTION_ID , :R_EMPLOYEE_ID , :R_REQUEST_ID , :R_PROJECT_ID
  `,
  returns: ["R_CODE", "R_JOB_ORDER_DESC", "R_ASSET_ACTION_ID", "R_EMPLOYEE_ID", "R_REQUEST_ID", "R_PROJECT_ID"],
   bindings: [],
   qstring: "",
   requireCommit: true
},

jobOrderINProgress :{
       statement : `SELECT
       REQUEST_ID,
        APPLICATION_ID,
         APPLICATION_NAME,
        REQ_TYPE_ID,
         REQUEST_STATUS, 
         REQ_TYPE_NAME,
         REQ_TYPE_DEFINITION_TYPE,
        EMPLOYEE_ID,
         EMP_NAME,EMP_NAME_AR,
          INCOME_ACTION,
        TRANACTION_ID,
         TRANS_CLASSIFICATION,
          TRANACTION_TYPE,
        COMMENTS,ANSWER_ON_QUES,
         CREATED_DATE,
          OUTCOME_ACTION_DATE,
        TRANACTION_STATUS, 
        ASK_REPLY_STEP,
         PARENT_TRANACTION_ID,
        FROM_DESTINATION_ID,
         FROM_DEST,FROM_DEST_AR,
          TO_DESTINATION_ID,
        TO_DEST,TO_DEST_AR,
         STEP_ID,
          OPENED,REQ_CLASSIFICATION,
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
                                WHERE EMPLOYEE_ID = :EMPLOYEE_ID and  nvl(DELETED,0)=0 ) and REQUEST_ID is not null and application_id=1
                                and (REQ_CLASSIFICATION=16)
                                and    STEP_CLASSIFICATION=261
       order by REQUEST_ID DESC`,
       bindings: [],
   qstring: "",
   requireCommit: true
}

}
  module.exports = statements ;
  