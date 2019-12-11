
let statements = {
    getAllOLDHRATRuesTempDetail: {
            statement :`
            SELECT ID,
                   TEMPLATE_ID,
                   SCHEDULE_ID,
                   START_DATE,
                   END_DATE,
                   STATUS,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM OLDHR_ATT_RULE_TEMP_DETAILS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneOLDHRATRuesTempDetailByID:{
        statement:`
        SELECT ID,
               TEMPLATE_ID,
               SCHEDULE_ID,
               START_DATE,
               END_DATE,
               STATUS,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM OLDHR_ATT_RULE_TEMP_DETAILS
   WHERE ID = :ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  