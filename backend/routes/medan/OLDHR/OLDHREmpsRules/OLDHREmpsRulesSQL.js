
let statements = {
    getAllOLDHREmpsRules: {
            statement :`
            SELECT EMPLOYEE_ID,
                   HR_EMPS_RULES_ID,
                   START_DATE,
                   END_DATE,
                   STATUS,
                   VACATION_RULE_ID,
                   TEMPLATE_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM OLDHR_EMPLOYEES_RULES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneOLDHREmpsRulesByID:{
        statement:`
        SELECT EMPLOYEE_ID,
               HR_EMPS_RULES_ID,
               START_DATE,
               END_DATE,
               STATUS,
               VACATION_RULE_ID,
               TEMPLATE_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM OLDHR_EMPLOYEES_RULES
   WHERE EMPLOYEE_ID = :EMPLOYEE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  