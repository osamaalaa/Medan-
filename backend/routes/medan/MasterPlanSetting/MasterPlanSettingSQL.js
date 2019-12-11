
let statements = {
    getAllMasterPlanSetting: {
            statement :`
            SELECT SETTING_NO,
                   NAME_AR,
                   NAME_EN,
                   START_DATE,
                   END_DATE,
                   CREATED_BY,
                   CREATION_DATE,
                   DELETED,
                   DELETED_DATE,
                   DELETED_BY,
                   PLAN_ID
              FROM MASTER_PLAN_SETTING `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneMasterPlanSettingByID:{
        statement:`
        SELECT SETTING_NO,
               NAME_AR,
               NAME_EN,
               START_DATE,
               END_DATE,
               CREATED_BY,
               CREATION_DATE,
               DELETED,
               DELETED_DATE,
               DELETED_BY,
               PLAN_ID
          FROM MASTER_PLAN_SETTING
   WHERE  SETTING_NO = :SETTING_NO `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  