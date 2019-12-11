
let statements = {
    getAllRiskResponses: {
            statement :`
            SELECT RESPONSE_ID,
                   RISK_ID,
                   RESPONSE_DESCRIPTION,
                   RESPONSE_ORDER,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM RISK_RESPONSES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneRiskResponsesByID:{
        statement:`
        SELECT RESPONSE_ID,
               RISK_ID,
               RESPONSE_DESCRIPTION,
               RESPONSE_ORDER,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM RISK_RESPONSES
   WHERE RESPONSE_ID = :RESPONSE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  