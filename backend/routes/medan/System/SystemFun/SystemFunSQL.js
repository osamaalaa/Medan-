
let statements = {
    getAllSystemFun: {
            statement :`
            SELECT FUNCTIONS_ID,
                   FUNCTION_CODE,
                   PRIMARY_NAME,
                   SECONDARY_NAME,
                   FUNCTION_TYPE,
                   STATUS,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM SYSTEM_FUNCTIONS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneSystemFunByID:{
        statement:`
        SELECT FUNCTIONS_ID,
               FUNCTION_CODE,
               PRIMARY_NAME,
               SECONDARY_NAME,
               FUNCTION_TYPE,
               STATUS,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM SYSTEM_FUNCTIONS
   WHERE FUNCTIONS_ID = :FUNCTIONS_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  