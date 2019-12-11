
let statements = {
    getAllOLDHROvertimeRules: {
            statement :`
            SELECT OVERTIME_RULE_ID,
                   OVERTIME_RULE_CODE,
                   RULE_AR_NAME,
                   RULE_EN_NAME,
                   WORKINGDAY_RATE,
                   DAYOFF_RATE,
                   OFFICIAL_HOLIDAY_RATE,
                   MAXIMUM_OVERTIME_PERDAY,
                   MINIMUM_OVERTIME_PERDAY,
                   MIN_OVERTIME_BEFORE_WORK,
                   MIN_OVERTIME_AFTERWORK,
                   MAX_OVERTIME_PERMONTH,
                   CALC_OVERTIME_BEFORE_WORK,
                   CALC_OVERTIME_AFTER_WORK,
                   SUBSIDIARY_ID,
                   STATUS,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM OLDHR_OVERTIME_RULES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneOLDHROvertimeRulesByID:{
        statement:`
        SELECT OVERTIME_RULE_ID,
               OVERTIME_RULE_CODE,
               RULE_AR_NAME,
               RULE_EN_NAME,
               WORKINGDAY_RATE,
               DAYOFF_RATE,
               OFFICIAL_HOLIDAY_RATE,
               MAXIMUM_OVERTIME_PERDAY,
               MINIMUM_OVERTIME_PERDAY,
               MIN_OVERTIME_BEFORE_WORK,
               MIN_OVERTIME_AFTERWORK,
               MAX_OVERTIME_PERMONTH,
               CALC_OVERTIME_BEFORE_WORK,
               CALC_OVERTIME_AFTER_WORK,
               SUBSIDIARY_ID,
               STATUS,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM OLDHR_OVERTIME_RULES
   WHERE OVERTIME_RULE_ID = :OVERTIME_RULE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  