
let statements = {
    getAllOLDHRATRulesTemp: {
            statement :`
            SELECT TEMPLATE_ID,
                   RULE_SETTING_ID,
                   OVERTIME_RULE_ID,
                   PERMISSION_RULE_ID,
                   PUNISHMENT_RULE_ID,
                   TEMPLATE_CODE,
                   TEMPLATE_AR_NAME,
                   TEMPLATE_EN_NAME,
                   STATUS,
                   VACATION_RULE_ID,
                   DELAYING_RULE_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM OLDHR_ATT_RULE_TEMPLATE `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneOLDHRATRulesTempByID:{
        statement:`
        SELECT TEMPLATE_ID,
               RULE_SETTING_ID,
               OVERTIME_RULE_ID,
               PERMISSION_RULE_ID,
               PUNISHMENT_RULE_ID,
               TEMPLATE_CODE,
               TEMPLATE_AR_NAME,
               TEMPLATE_EN_NAME,
               STATUS,
               VACATION_RULE_ID,
               DELAYING_RULE_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM OLDHR_ATT_RULE_TEMPLATE
   WHERE TEMPLATE_ID = :TEMPLATE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  