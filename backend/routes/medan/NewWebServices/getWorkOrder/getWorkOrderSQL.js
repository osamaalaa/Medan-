
let statements = {
    getWorkOrder: {
            statement :`SELECT * FROM Work_Orders m WHERE m.PROJECT_ID = :PROJECT_ID `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
    
    getWorkOrderClassification :{
      statement :`select primary_name , secondary_name from lookup_details where lookup_id = 133 `,
      bindings: [],
      qstring: "",
      requireCommit: false
},


getPhaseTasks :{
  statement :`select phase_task_id, description from phase_tasks `,
  bindings: [],
  qstring: "",
  requireCommit: false
},

getWorkorderMilestone :{
  statement :`select milestone_id, milestone_name, milestone_description from project_milestone `,
  bindings: [],
  qstring: "",
  requireCommit: false
},

getMeasurements :{
  statement :`select * from boq_measurements_sub `,
  bindings: [],
  qstring: "",
  requireCommit: false
},

getWorkorderbyEmpId :{
  statement :`SELECT 
  W.WORK_ORDER_ID, W.WORK_ORDER_CODE, W.EMPLOYEE_ID, (select first_name2 || ' '|| s_second_name from AOT_GEN.employees where employee_id = W.EMPLOYEE_ID) as emp_name,
     W.PROJECT_ID, (select primary_name from projects where project_id = W.PROJECT_ID) as project_name, W.STATUS_ID, W.DESCRIPTION, 
     W.START_DATE, W.END_DATE, W.ACTUAL_START_DATE, 
     W.ACTUAL_END_DATE, W.CREATION_DATE, W.TYPE_ID, 
     W.DURATION, W.ACTUAL_DURATION, W.PRIORITY, 
     W.PHASE_TASK_ID, W.COMING_FROM, W.INCIDENT_REPORT_REQUEST_SENT, 
     W.WORK_ORDER_CLASSIFICATION, W.WORK_ORDER_COST, W.IMPLEMENTATION_FRAM, 
     W.DELETED, W.DELETED_BY, W.DELETED_DATE, 
     W.MILESTONE_ID, W.TRACK_PHASE_ID, W.PROJCT_TRACK_ID, 
     W.WO_PARENT_ID, W.SUBSIDIARY_ID, W.WO_TEMPLATE_ID, 
     W.ISSUE_ID, W.TIME_UNIT, W.MEASURE_VALUE, 
     W.MEASURE_UNIT, W.ACTUAL_MEASURE_VALUE, W.MILESTONE_PAY_ID, 
     W.ASSET_ID
  FROM HR.WORK_ORDERS W where W.EMPLOYEE_ID = :EMPLOYEE_ID `,
  bindings: [],
  qstring: "",
  requireCommit: false
},

getWorkOrderStatus : {
  statement :`select status_id, ar_name, ar_name2 from work_order_status`,
  bindings: [],
  qstring: "",
  requireCommit: false
}

}
  module.exports = statements ;
  