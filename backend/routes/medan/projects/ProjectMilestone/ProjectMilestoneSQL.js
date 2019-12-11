
let statements = {
    getAllProjectMilestone: {
            statement :`
            SELECT MILESTONE_ID,
               MILESTONE_CODE,
               MILESTONE_NAME,
               MILESTONE_DESCRIPTION,
               MILESTONE_DELIVERER,
               (select first_name from employees E where E.employee_id = P.MILESTONE_DELIVERER) Deliverer_f_name,
               (select second_name from employees E where E.employee_id = P.MILESTONE_DELIVERER) Deliverer_s_name,
               MILESTONE_RECEIVER,
               (select first_name from employees E where E.employee_id = P.MILESTONE_RECEIVER) RECEIVER_f_name,
               (select second_name from employees E where E.employee_id = P.MILESTONE_RECEIVER) RECEIVER_s_name,
               VALUE_TYPE,
               VALUE,
               MILESTONE_AMOUNT,
               EXPECTED_DILIVERY_DATE,
               DEDUCTIONS,
               PROJECT_ID,
               ACHIVEMENT_CERTIFICATE,
               COLLECTED_AMOUNT,
               DOWNPAYMENT,
               COLLECTED_PERCENTAGE,
               BOQ_ID,
               PROMISED_DATE,
               CRITICAL,
               DURATION,
               RISK_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               REQUEST_TYPE_ID,
               SUBSIDIARY_ID,
               WO_CLASS_REQUIRED,
               CREATION_DATE,
               DEDUCT_VALUE,
               ACTION_FLAG,
               WO_PASS_VALUE
          FROM PROJECT_MILESTONE P `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneProjectMilestoneByID:{
        statement:`
        SELECT MILESTONE_ID,
               MILESTONE_CODE,
               MILESTONE_NAME,
               MILESTONE_DESCRIPTION,
               MILESTONE_DELIVERER,
               (select first_name from employees E where E.employee_id = P.MILESTONE_DELIVERER) Deliverer_f_name,
               (select second_name from employees E where E.employee_id = P.MILESTONE_DELIVERER) Deliverer_s_name,
               MILESTONE_RECEIVER,
               (select first_name from employees E where E.employee_id = P.MILESTONE_RECEIVER) RECEIVER_f_name,
               (select second_name from employees E where E.employee_id = P.MILESTONE_RECEIVER) RECEIVER_s_name,
               VALUE_TYPE,
               VALUE,
               MILESTONE_AMOUNT,
               EXPECTED_DILIVERY_DATE,
               DEDUCTIONS,
               PROJECT_ID,
               ACHIVEMENT_CERTIFICATE,
               COLLECTED_AMOUNT,
               DOWNPAYMENT,
               COLLECTED_PERCENTAGE,
               BOQ_ID,
               PROMISED_DATE,
               CRITICAL,
               DURATION,
               RISK_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               REQUEST_TYPE_ID,
               SUBSIDIARY_ID,
               WO_CLASS_REQUIRED,
               CREATION_DATE,
               DEDUCT_VALUE,
               ACTION_FLAG,
               WO_PASS_VALUE
          FROM PROJECT_MILESTONE P
   WHERE MILESTONE_ID = :MILESTONE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOneProjectMilestoneByProjectID:{
     statement:`
     SELECT MILESTONE_ID,
            MILESTONE_CODE,
            MILESTONE_NAME,
            MILESTONE_DESCRIPTION,
            MILESTONE_DELIVERER,
            (select first_name from employees E where E.employee_id = P.MILESTONE_DELIVERER) Deliverer_f_name,
            (select second_name from employees E where E.employee_id = P.MILESTONE_DELIVERER) Deliverer_s_name,
            MILESTONE_RECEIVER,
            (select first_name from employees E where E.employee_id = P.MILESTONE_RECEIVER) RECEIVER_f_name,
            (select second_name from employees E where E.employee_id = P.MILESTONE_RECEIVER) RECEIVER_s_name,
            VALUE_TYPE,
            VALUE,
            MILESTONE_AMOUNT,
            EXPECTED_DILIVERY_DATE,
            DEDUCTIONS,
            PROJECT_ID,
            ACHIVEMENT_CERTIFICATE,
            COLLECTED_AMOUNT,
            DOWNPAYMENT,
            COLLECTED_PERCENTAGE,
            BOQ_ID,
            PROMISED_DATE,
            CRITICAL,
            DURATION,
            RISK_ID,
            DELETED,
            DELETED_BY,
            DELETED_DATE,
            REQUEST_TYPE_ID,
            SUBSIDIARY_ID,
            WO_CLASS_REQUIRED,
            CREATION_DATE,
            DEDUCT_VALUE,
            ACTION_FLAG,
            WO_PASS_VALUE
       FROM PROJECT_MILESTONE P
WHERE PROJECT_ID = :PROJECT_ID `,
     returns: [],
     bindings: [],
     qstring: "",
     requireCommit: false
 },



 getOneProjectMilestoneByBoqId:{
     statement:`
     SELECT MILESTONE_ID,
            MILESTONE_CODE,
            MILESTONE_NAME,
            MILESTONE_DESCRIPTION,
            MILESTONE_DELIVERER,
            (select first_name from employees E where E.employee_id = P.MILESTONE_DELIVERER) Deliverer_f_name,
            (select second_name from employees E where E.employee_id = P.MILESTONE_DELIVERER) Deliverer_s_name,
            MILESTONE_RECEIVER,
            (select first_name from employees E where E.employee_id = P.MILESTONE_RECEIVER) RECEIVER_f_name,
            (select second_name from employees E where E.employee_id = P.MILESTONE_RECEIVER) RECEIVER_s_name,
            VALUE_TYPE,
            VALUE,
            MILESTONE_AMOUNT,
            EXPECTED_DILIVERY_DATE,
            DEDUCTIONS,
            PROJECT_ID,
            ACHIVEMENT_CERTIFICATE,
            COLLECTED_AMOUNT,
            DOWNPAYMENT,
            COLLECTED_PERCENTAGE,
            BOQ_ID,
            PROMISED_DATE,
            CRITICAL,
            DURATION,
            RISK_ID,
            DELETED,
            DELETED_BY,
            DELETED_DATE,
            REQUEST_TYPE_ID,
            SUBSIDIARY_ID,
            WO_CLASS_REQUIRED,
            CREATION_DATE,
            DEDUCT_VALUE,
            ACTION_FLAG,
            WO_PASS_VALUE
       FROM PROJECT_MILESTONE P
WHERE BOQ_ID = :BOQ_ID `,
     returns: [],
     bindings: [],
     qstring: "",
     requireCommit: false
 },

    insertProjectMilestone: {
     statement: `
     INSERT INTO PROJECT_MILESTONE (MILESTONE_ID,
          MILESTONE_NAME,
          MILESTONE_DESCRIPTION,
          EXPECTED_DILIVERY_DATE,
          BOQ_ID,
          PROJECT_ID,
          VALUE,
          PROMISED_DATE,
          CRITICAL,
          DURATION,
          MILESTONE_DELIVERER,
          MILESTONE_RECEIVER,
          WO_CLASS_REQUIRED,
          CREATION_DATE,
          WO_PASS_VALUE)
  VALUES (PROJECT_MILESTONE_SEQ.NEXTVAL,
     :MILESTONE_NAME,
     :MILESTONE_DESCRIPTION,
     :EXPECTED_DILIVERY_DATE,
     :BOQ_ID,
     :PROJECT_ID,
     :VALUE,
     :PROMISED_DATE,
     :CRITICAL,
     :DURATION,
     :MILESTONE_DELIVERER,
     :MILESTONE_RECEIVER,
     :WO_CLASS_REQUIRED,
     sysdate,
     :WO_PASS_VALUE)
     `,
     returns: [],
     bindings: [],
     qstring: "",
     requireCommit: true
 },
  
  

  deleteProjectMilestone :{
     statement :`update project_milestone
                 set deleted = 1
                 where project_id = :project_id
                 and milestone_id = :milestone_id
                 and boq_id = :boq_id  `,
     bindings: [],
 qstring: "",
 requireCommit: true
},

updateProjectMilestone: {
    statement: `
    UPDATE PROJECT_MILESTONE
    SET  MILESTONE_NAME = :MILESTONE_NAME,
         MILESTONE_DESCRIPTION = :MILESTONE_DESCRIPTION,
         EXPECTED_DILIVERY_DATE = :EXPECTED_DILIVERY_DATE,
         BOQ_ID = :BOQ_ID,
         PROJECT_ID = :PROJECT_ID,
         VALUE = :VALUE,
         PROMISED_DATE = :PROMISED_DATE,
         CRITICAL = :CRITICAL,
         DURATION = :DURATION,
         MILESTONE_DELIVERER = :MILESTONE_DELIVERER,
         MILESTONE_RECEIVER = :MILESTONE_RECEIVER,
         WO_CLASS_REQUIRED = :WO_CLASS_REQUIRED,
         WO_PASS_VALUE = :WO_PASS_VALUE
         WHERE  MILESTONE_ID = :MILESTONE_ID
    `,
    bindings: [],
    qstring: "",
    requireCommit: true
},

getProjectMilestone:{
    statement:`
    SELECT MILESTONE_ID,
           MILESTONE_NAME,
           (select boq_description from project_boq b where b.boq_id = P.BOQ_ID ) boq_description,
           (select start_date from project_boq b where b.boq_id = P.BOQ_ID ) start_date,
           (select duration from project_boq b where b.boq_id = P.BOQ_ID ) duration
      FROM PROJECT_MILESTONE P
WHERE CRITICAL = 1
and project_id = :project_id `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
},

getProjectMilestoneByProId:{
    statement:`
    SELECT MILESTONE_ID,
           MILESTONE_NAME,
           BOQ_ID,
           (select boq_description from project_boq q where q.BOQ_ID = P.BOQ_ID ) boq_description,
           (select start_date from project_boq b where b.boq_id = P.BOQ_ID ) start_date,
           (select duration from project_boq b where b.boq_id = P.BOQ_ID ) duration
      FROM PROJECT_MILESTONE P
WHERE PROJECT_ID = :PROJECT_ID `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
},

deliverables:{
    statement:`
    SELECT description,
           (select MILESTONE_NAME from project_milestone m where m.milestone_id = P.milestone_id ) MILESTONE_NAME ,
           (select secondary_name from lookup_details where lookup_detail_id = P.status) status
      FROM MILESTONE_DELEVRABLES  P
      where P.milestone_id in ( select m.milestone_id from project_milestone m  where m.project_id = :project_id ) `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
}

}
  module.exports = statements ;
  