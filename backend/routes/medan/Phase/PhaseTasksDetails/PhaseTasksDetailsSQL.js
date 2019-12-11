
let statements = {
    getAllPhaseTaskDetail: {
            statement :`
            SELECT DETAIL_ID,
                   TASK_ID,
                   DESCRIPTION,
                   UPLOAD_PATH,
                   CREATED_BY,
                   CREATION_DATE,
                   MODIFIED_BY,
                   MODIFICATION_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   DWN_FLG,
                   FILE_ID,
                   SUBSIDIARY_ID,
                   FILE_NAME
              FROM PHASE_TASKS_DETAILS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOnePhaseTaskDetailByID:{
        statement:`
        SELECT DETAIL_ID,
               TASK_ID,
               DESCRIPTION,
               UPLOAD_PATH,
               CREATED_BY,
               CREATION_DATE,
               MODIFIED_BY,
               MODIFICATION_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               DWN_FLG,
               FILE_ID,
               SUBSIDIARY_ID,
               FILE_NAME
          FROM PHASE_TASKS_DETAILS
   WHERE  DETAIL_ID = :DETAIL_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  