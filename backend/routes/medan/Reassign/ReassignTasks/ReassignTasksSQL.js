
let statements = {
    getAllReassignTasks: {
            statement :`
            SELECT TASK_ID,
                   START_DATE,
                   END_DATE,
                   PHASE_TASK_ID,
                   STATUS,
                   DURATION,
                   EMPLOYEE_ID,
                   PERCENTAGE_COMPLETE,
                   ASSIGN_DATE,
                   ASSIGN_BY,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   RE_REQUEST_ID
              FROM REASSIGNED_TASKS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneReassignTasksByID:{
        statement:`
        SELECT TASK_ID,
               START_DATE,
               END_DATE,
               PHASE_TASK_ID,
               STATUS,
               DURATION,
               EMPLOYEE_ID,
               PERCENTAGE_COMPLETE,
               ASSIGN_DATE,
               ASSIGN_BY,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               RE_REQUEST_ID
          FROM REASSIGNED_TASKS
   WHERE TASK_ID = :TASK_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  