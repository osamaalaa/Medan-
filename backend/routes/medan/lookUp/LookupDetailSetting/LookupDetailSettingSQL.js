
let statements = {
    getAllLookupDetailSetting: {
            statement :`
            SELECT SETTING_ID,
                   LOOKUP_DETAIL_ID,
                   SETTING_TITLE_AR,
                   SETTING_VALUE,
                   SETTING_CODE,
                   SETTING_VALUE_TYPE,
                   SETTING_TITLE_EN
              FROM LKUP_DETAIL_SETTINGS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneLookupDetailSettingByID:{
        statement:`
        SELECT SETTING_ID,
               LOOKUP_DETAIL_ID,
               SETTING_TITLE_AR,
               SETTING_VALUE,
               SETTING_CODE,
               SETTING_VALUE_TYPE,
               SETTING_TITLE_EN
          FROM LKUP_DETAIL_SETTINGS
   WHERE  SETTING_ID = :SETTING_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  