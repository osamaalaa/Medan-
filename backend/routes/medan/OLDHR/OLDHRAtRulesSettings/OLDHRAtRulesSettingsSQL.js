
let statements = {
    getAllOLDHRAtRulesSettings: {
            statement :`
            SELECT RULE_SETTING_ID,
                   SUBSIDIARY_ID,
                   RULE_SETTING_CODE,
                   RULE_AR_NAME,
                   RULE_EN_NAME,
                   SHIFT_TYPE,
                   DAILY_WORKING_HOURS,
                   DAYOFF_WORKING_HOURS,
                   MAX_LATE_TIME,
                   MAX_DEPARTURE_EARLY_TIME,
                   CALC_ONLY_LATE_TIME,
                   MONTHLY_WORKING_HOURS,
                   ROTATE_TIME_TABLE,
                   WORKING_DAYS_NUMBER,
                   STATUS,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM OLDHR_AT_RULES_SETTINGS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneOLDHRAtRulesSettingsByID:{
        statement:`
        SELECT RULE_SETTING_ID,
               SUBSIDIARY_ID,
               RULE_SETTING_CODE,
               RULE_AR_NAME,
               RULE_EN_NAME,
               SHIFT_TYPE,
               DAILY_WORKING_HOURS,
               DAYOFF_WORKING_HOURS,
               MAX_LATE_TIME,
               MAX_DEPARTURE_EARLY_TIME,
               CALC_ONLY_LATE_TIME,
               MONTHLY_WORKING_HOURS,
               ROTATE_TIME_TABLE,
               WORKING_DAYS_NUMBER,
               STATUS,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM OLDHR_AT_RULES_SETTINGS
   WHERE RULE_SETTING_ID = :RULE_SETTING_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  