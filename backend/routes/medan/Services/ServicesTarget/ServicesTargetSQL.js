
let statements = {
    getAllServicesTarget: {
            statement :`
            SELECT LIST_ID,
                   PROJECT_ID,
                   FUNCTION_ID,
                   TARGET_VALUE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   TARGET_VALUE_TYPE,
                   REFERENCE_ID,
                   REFERENCE_TYPE,
                   DESCRIPTION
              FROM SERVICE_TARGETS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneServicesTargetByID:{
        statement:`
        SELECT LIST_ID,
               PROJECT_ID,
               FUNCTION_ID,
               TARGET_VALUE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               TARGET_VALUE_TYPE,
               REFERENCE_ID,
               REFERENCE_TYPE,
               DESCRIPTION
          FROM SERVICE_TARGETS
   WHERE LIST_ID = :LIST_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  