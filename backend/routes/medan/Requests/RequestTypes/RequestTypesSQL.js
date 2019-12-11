
let statements = {
    getAllRequestTypes: {
            statement :`
            SELECT TYPE_ID,
                   APPLICATION_ID,
                   TYPE_CODE,
                   AR_NAME,
                   EN_NAME,
                   DISTRIBUTION_TYPE,
                   STATUS,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   DEFINITION_TYPE,
                   SUBSIDIARY_ID,
                   PROJECT_ID,
                   MODIFIED_BY,
                   MODIFICATION_DATE
              FROM REQUEST_TYPES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneRequestTypesByID:{
        statement:`
        SELECT TYPE_ID,
               APPLICATION_ID,
               TYPE_CODE,
               AR_NAME,
               EN_NAME,
               DISTRIBUTION_TYPE,
               STATUS,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               DEFINITION_TYPE,
               SUBSIDIARY_ID,
               PROJECT_ID,
               MODIFIED_BY,
               MODIFICATION_DATE
          FROM REQUEST_TYPES
   WHERE TYPE_ID = :TYPE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  