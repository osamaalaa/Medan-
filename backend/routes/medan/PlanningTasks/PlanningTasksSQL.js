
let statements = {
    getAllPlanningTasks: {
            statement :` SELECT PHASE_TASK_ID,
                   START_DATE,
                   END_DATE,
                   DESCRIPTION,
                   CREATED_BY,
                   CREATED_DATE,
                   STATUS,
                   DURATION,
                   EMPLOYEE_ID,
                   RISK_DATE,
                   TRACK_PHASE_ID,
                   INCOMING_STATUS,
                   TASK_CODE,
                   TASK_TYPE,
                   PARENT_TASK_ID,
                   PROJECT_ID,
                   MILESTONE_ID,
                   PERCENTAGE_COMPLETE,
                   ASSIGN_DATE,
                   ASSIGN_BY,
                   TASK_CLASSIFICATION_ID,
                   TASK_CATEGORY_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM PLANNING_TASKS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOnePlanningTasksByID:{
        statement:`SELECT PHASE_TASK_ID,
        START_DATE,
        END_DATE,
        DESCRIPTION,
        CREATED_BY,
        CREATED_DATE,
        STATUS,
        DURATION,
        EMPLOYEE_ID,
        RISK_DATE,
        TRACK_PHASE_ID,
        INCOMING_STATUS,
        TASK_CODE,
        TASK_TYPE,
        PARENT_TASK_ID,
        PROJECT_ID,
        MILESTONE_ID,
        PERCENTAGE_COMPLETE,
        ASSIGN_DATE,
        ASSIGN_BY,
        TASK_CLASSIFICATION_ID,
        TASK_CATEGORY_ID,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        SUBSIDIARY_ID
   FROM PLANNING_TASKS
   WHERE PHASE_TASK_ID = :PHASE_TASK_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  