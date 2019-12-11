
let statements = {
    getAllNotificationTmpPrms: {
            statement :`
            SELECT TEMP_PARAM_ID,
                   TEMPLATE_ID,
                   PARAM_ORDER,
                   PARAM_NAME_IN_VIEW,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM NOTIFICATION_TEMPLATE_PARAMS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneNotificationTmpPrmsByID:{
        statement:`
        SELECT TEMP_PARAM_ID,
               TEMPLATE_ID,
               PARAM_ORDER,
               PARAM_NAME_IN_VIEW,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM NOTIFICATION_TEMPLATE_PARAMS
   WHERE  TEMP_PARAM_ID = :TEMP_PARAM_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  