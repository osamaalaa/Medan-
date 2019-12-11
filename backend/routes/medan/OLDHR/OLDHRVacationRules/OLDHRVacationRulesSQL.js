
let statements = {
    getAllOLDHRVacationRules: {
            statement :`
            SELECT VACATION_RULE_ID,
                   VACATION_RULE_CODE,
                   VACATION_RULE_ARNAME,
                   VACATION_RULE_ENNAME,
                   STATUS,
                   SUBTRACTION_METHOD,
                   SUBTRACTION_DESTINATION_APPROV,
                   SUBTRACT_AFTER,
                   CHECK_ATTENDANCE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM OLDHR_VACATION_RULES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneOLDHRVacationRulesByID:{
        statement:`
        SELECT VACATION_RULE_ID,
               VACATION_RULE_CODE,
               VACATION_RULE_ARNAME,
               VACATION_RULE_ENNAME,
               STATUS,
               SUBTRACTION_METHOD,
               SUBTRACTION_DESTINATION_APPROV,
               SUBTRACT_AFTER,
               CHECK_ATTENDANCE,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM OLDHR_VACATION_RULES
   WHERE VACATION_RULE_ID = :VACATION_RULE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  