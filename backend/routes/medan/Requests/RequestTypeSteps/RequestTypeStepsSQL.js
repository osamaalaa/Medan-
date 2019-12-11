
let statements = {
    getAllRequestTypeSteps: {
            statement :`
            SELECT STEP_ID,
                   TYPE_ID,
                   DESTINATION_ID,
                   STEP_ORDER,
                   STEP_NEED_ACTION,
                   STATUS,
                   DESCRIPTION_EN,
                   DESCRIPTION_AR,
                   CLASSIFICATION,
                   STEP_COLOR,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID,
                   MODIFIED_BY,
                   MODIFICATION_DATE
              FROM REQUEST_TYPE_STEPS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneRequestTypeStepsByID:{
        statement:`
        SELECT STEP_ID,
               TYPE_ID,
               DESTINATION_ID,
               STEP_ORDER,
               STEP_NEED_ACTION,
               STATUS,
               DESCRIPTION_EN,
               DESCRIPTION_AR,
               CLASSIFICATION,
               STEP_COLOR,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID,
               MODIFIED_BY,
               MODIFICATION_DATE
          FROM REQUEST_TYPE_STEPS
   WHERE STEP_ID = :STEP_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  