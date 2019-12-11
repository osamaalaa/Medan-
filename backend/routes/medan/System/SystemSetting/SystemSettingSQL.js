
let statements = {
    getAllSystemSetting: {
            statement :` SELECT SETTING_ID,
                   SETTING_NAME,
                   SETTING_DESCRIPTION,
                   CREATED_BY,
                   CREATION_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID,
                   SETTING_VALUE,
                   VALUE_TYPE
              FROM SYSTEM_SETTING  `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneSystemSettingByID:{
        statement:` SELECT SETTING_ID,
        SETTING_NAME,
        SETTING_DESCRIPTION,
        CREATED_BY,
        CREATION_DATE,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        SUBSIDIARY_ID,
        SETTING_VALUE,
        VALUE_TYPE
   FROM SYSTEM_SETTING
   WHERE SETTING_ID = :SETTING_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  