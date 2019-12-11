
let statements = {
    getAllRisks: {
            statement :`
            SELECT RISK_ID,
                   RISK_DESCRIPTION,
                   RISK_WEIGHT,
                   RISK_TYPE,
                   RISK_CLASSIFICATION,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM RISKS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneRisksByID:{
        statement:`
        SELECT RISK_ID,
               RISK_DESCRIPTION,
               RISK_WEIGHT,
               RISK_TYPE,
               RISK_CLASSIFICATION,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM RISKS
   WHERE RISK_ID = :RISK_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  