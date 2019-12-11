
let statements = {
    openIncidents: {
            statement :`SELECT IR.INC_REP_REQUEST_ID, IR.DESCRIPTION,IR.REF_REQUEST_TYPE,ir.PROJECT_ID,                        
            IR.CREATION_DATE, IR.CREATED_BY,IR.WORK_ORDER_ID,           
            IR.WORK_ORDER_OWNER,(select es.manager_id from employees es where es.employee_id= IR.WORK_ORDER_OWNER) manager_id ,           
            to_number(IR.STATUS) IR_STATUS ,PJ.PRIMARY_NAME,PJ.SECONDARY_NAME,PJ.CLIENT_ID,    
           (CASE IR.REF_REQUEST_TYPE WHEN 1 THEN (select wo.DESCRIPTION from work_orders wo where wo.WORK_ORDER_ID=IR.WORK_ORDER_ID )    
               WHEN 2 THEN (select pt.DESCRIPTION from phase_tasks pt where IR.WORK_ORDER_ID=pt.PHASE_TASK_ID )    
            WHEN 3 THEN (select su.ISSUE_TITLE from issues su where su.ISSUE_ID=IR.WORK_ORDER_ID )END)REF_DESCRIPTION    
        FROM INCIDENT_REPORT_REQUESTS IR ,projects pj       
         where nvl(IR.DELETED,0)=0 and PJ.PROJECT_ID(+)=IR.PROJECT_ID and nvl(pj.deleted,0)=0   and WORK_ORDER_OWNER = :WORK_ORDER_OWNER AND IR.STATUS = 1            
         ORDER BY IR.REF_REQUEST_TYPE,IR.STATUS ,CREATION_DATE desc 
              `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },

    openIncident: {
      statement :`SELECT IR.INC_REP_REQUEST_ID,  
      IR.DESCRIPTION,IR.REF_REQUEST_TYPE,ir.PROJECT_ID,                        
      IR.CREATION_DATE, IR.CREATED_BY,IR.WORK_ORDER_ID,(select es.first_name2 ||' '|| es.s_second_name from employees es where es.employee_id= IR.WORK_ORDER_OWNER) WORK_ORDER_ID_name ,           
      IR.WORK_ORDER_OWNER,(select es.manager_id from employees es where es.employee_id= IR.WORK_ORDER_OWNER) manager_id , 
         (select es.first_name2 ||' '|| es.s_second_name from employees es where es.employee_id= IR.WORK_ORDER_OWNER and  es.manager_id = (select es.manager_id from employees es where es.employee_id= IR.WORK_ORDER_OWNER )) manager_name,         
      to_number(IR.STATUS) IR_STATUS ,PJ.PRIMARY_NAME,PJ.SECONDARY_NAME,PJ.CLIENT_ID,
      (select en_name from clients c where c.client_id = PJ.CLIENT_ID ) client_name ,    
     (CASE IR.REF_REQUEST_TYPE WHEN 1 THEN (select wo.DESCRIPTION from work_orders wo where wo.WORK_ORDER_ID=IR.WORK_ORDER_ID )    
         WHEN 2 THEN (select pt.DESCRIPTION from phase_tasks pt where IR.WORK_ORDER_ID=pt.PHASE_TASK_ID )    
      WHEN 3 THEN (select su.ISSUE_TITLE from issues su where su.ISSUE_ID=IR.WORK_ORDER_ID )END)REF_DESCRIPTION    
  FROM INCIDENT_REPORT_REQUESTS IR ,projects pj       
   where nvl(IR.DELETED,0)=0 and PJ.PROJECT_ID(+)=IR.PROJECT_ID and nvl(pj.deleted,0)=0   and INC_REP_REQUEST_ID = :INC_REP_REQUEST_ID AND IR.STATUS = 1            
   ORDER BY IR.REF_REQUEST_TYPE,IR.STATUS ,CREATION_DATE desc 
        `,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
},
getIncidentByEmployeeId: {
  statement :`SELECT 
  INCIDENT_ID,
   RELATED_REQUEST_ID, 
   INCIDENT_TITLE, 
     CUSTOMER, TICKET_NUMBER, INCIDENT_START_DATE, 
     INCIDENT_END_DATE, INCIDENT_TOTAL_DURATION, AVAILABILITY_IMPACT, 
     INCIDENT_LEVEL, RELATED_CHANGE, RELATED_PROBLEM, 
     RELATED_USER_REQUEST, RELATED_INCIDENT, REPORT_DATE, 
     INCIDENT_DESCRIPTION, SERVICES_AFFECTED, BUSINESS_IMPACT, 
     RESOLUTION_AND_ACTIONS_TAKEN, ROOT_CAUSE_ANALYSIS, OTHER_KEY_ACTION_ITEMS, 
     EMPLOYEE_ID, MANAGER_ID, STATUS, 
     DELETED, DELETED_BY, DELETED_DATE, 
     SUBSIDIARY_ID, PROJECT_ID, REF_REQUEST_TYPE, 
     CORRECTIVE_ACTIONS, PREVENTIVE_ACTIONS, INCIDENT_BRIEF
  FROM HR.INCIDENT_REPORTS WHERE DELETED = 0 AND EMPLOYEE_ID = :EMPLOYEE_ID
    `,
  returns: [],
  bindings: [],
  qstring: "",
  requireCommit: false
},
    
    getIncidentsReports: {
      statement :`SELECT 
      I.INCIDENT_ID, I.RELATED_REQUEST_ID, I.INCIDENT_TITLE, 
         I.CUSTOMER, I.TICKET_NUMBER, I.INCIDENT_START_DATE, 
         I.INCIDENT_END_DATE, I.INCIDENT_TOTAL_DURATION, I.AVAILABILITY_IMPACT, 
         I.INCIDENT_LEVEL, I.RELATED_CHANGE, I.RELATED_PROBLEM, 
         I.RELATED_USER_REQUEST, I.RELATED_INCIDENT, I.REPORT_DATE, 
         I.INCIDENT_DESCRIPTION, I.SERVICES_AFFECTED, I.BUSINESS_IMPACT, 
         I.RESOLUTION_AND_ACTIONS_TAKEN, I.ROOT_CAUSE_ANALYSIS, I.OTHER_KEY_ACTION_ITEMS, 
         I.EMPLOYEE_ID, I.MANAGER_ID, I.STATUS, 
         I.DELETED, I.DELETED_BY, I.DELETED_DATE, 
         I.SUBSIDIARY_ID, I.PROJECT_ID, I.REF_REQUEST_TYPE, 
         I.CORRECTIVE_ACTIONS, I.PREVENTIVE_ACTIONS, I.INCIDENT_BRIEF
      FROM HR.INCIDENT_REPORTS I
        `,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
},


insertIncidentReport: {
  statement: `
  INSERT INTO HR.INCIDENT_REPORTS (INCIDENT_ID,
    INCIDENT_TITLE,
    TICKET_NUMBER,
    INCIDENT_START_DATE,
    INCIDENT_END_DATE,
    INCIDENT_TOTAL_DURATION,
    REPORT_DATE,
    INCIDENT_DESCRIPTION,
    PROJECT_ID,
    CORRECTIVE_ACTIONS,
    PREVENTIVE_ACTIONS,
    INCIDENT_BRIEF)
  VALUES (
    INCIDENT_REPORTS_SEQ.NEXTVAL,
    :INCIDENT_TITLE,
    :TICKET_NUMBER,
    :INCIDENT_START_DATE,
    :INCIDENT_END_DATE,
    :INCIDENT_TOTAL_DURATION,
    sysdate,
    :INCIDENT_DESCRIPTION,
    :PROJECT_ID,
    :CORRECTIVE_ACTIONS,
    :PREVENTIVE_ACTIONS,
    :INCIDENT_BRIEF
  )
  RETURN   INCIDENT_TITLE INTO  :R_INCIDENT_TITLE
  `,
  returns: ["R_INCIDENT_TITLE"],
  bindings: [],
  qstring: "",
  requireCommit: true
  },

  getOpenIncidentById: {
    statement :`SELECT 
    I.INCIDENT_ID, I.RELATED_REQUEST_ID, I.INCIDENT_TITLE, 
       I.CUSTOMER, I.TICKET_NUMBER, I.INCIDENT_START_DATE, 
       I.INCIDENT_END_DATE, I.INCIDENT_TOTAL_DURATION, I.AVAILABILITY_IMPACT, 
       I.INCIDENT_LEVEL, I.RELATED_CHANGE, I.RELATED_PROBLEM, 
       I.RELATED_USER_REQUEST, I.RELATED_INCIDENT, I.REPORT_DATE, 
       I.INCIDENT_DESCRIPTION, I.SERVICES_AFFECTED, I.BUSINESS_IMPACT, 
       I.RESOLUTION_AND_ACTIONS_TAKEN, I.ROOT_CAUSE_ANALYSIS, I.OTHER_KEY_ACTION_ITEMS, 
       I.EMPLOYEE_ID, I.MANAGER_ID, I.STATUS, 
       I.DELETED, I.DELETED_BY, I.DELETED_DATE, 
       I.SUBSIDIARY_ID, I.PROJECT_ID, I.REF_REQUEST_TYPE, 
       I.CORRECTIVE_ACTIONS, I.PREVENTIVE_ACTIONS, I.INCIDENT_BRIEF
    FROM HR.INCIDENT_REPORTS I where RELATED_REQUEST_ID = :RELATED_REQUEST_ID
      `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
}
     

}
  module.exports = statements ;
  