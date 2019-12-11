
let statements = {
    getAllNotificationsTmp: {
            statement :`SELECT TEMPLATE_ID,
                   TYPE_ID,
                   ACTION_ID,
                   TEMPLATE_DESCRIPTION,
                   TEMPLATE_AR,
                   TEMPLATE_EN,
                   TEMPLATE_TYPE,
                   DESCRIPTION_EN,
                   LAST_UPDATE_DATE,
                   LAST_UPDATE_BY,
                   NO_OF_PARAMS,
                   ACTIVE,
                   DAY_IN_WEEK,
                   SEND_BEFORE,
                   SEND_AFTER,
                   STEP_ID,
                   NOTIFY_OWNER,
                   OWNER_TEMPLATE_EN,
                   OWNER_TEMPLATE_AR,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID,
                   TEMPLATE_SUBJECT_EN,
                   TEMPLATE_SUBJECT_AR
              FROM NOTIFICATION_TEMPLATES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneNotificationsTmpByID:{
        statement:`SELECT TEMPLATE_ID,
        TYPE_ID,
        ACTION_ID,
        TEMPLATE_DESCRIPTION,
        TEMPLATE_AR,
        TEMPLATE_EN,
        TEMPLATE_TYPE,
        DESCRIPTION_EN,
        LAST_UPDATE_DATE,
        LAST_UPDATE_BY,
        NO_OF_PARAMS,
        ACTIVE,
        DAY_IN_WEEK,
        SEND_BEFORE,
        SEND_AFTER,
        STEP_ID,
        NOTIFY_OWNER,
        OWNER_TEMPLATE_EN,
        OWNER_TEMPLATE_AR,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        SUBSIDIARY_ID,
        TEMPLATE_SUBJECT_EN,
        TEMPLATE_SUBJECT_AR
   FROM NOTIFICATION_TEMPLATES
   WHERE  TEMPLATE_ID = :TEMPLATE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  