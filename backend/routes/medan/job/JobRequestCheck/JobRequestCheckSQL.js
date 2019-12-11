
let statements = {
    getAllJobRequestCheck: {
            statement :`
            SELECT JOB_REQUEST_CHECK_ID,
                   ASSET_ACTION_ID,
                   REQUEST_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   JOB_ORDER_SERVICE_ID
              FROM JOB_REQUEST_CHECKS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneJobRequestCheckByID:{
        statement:`
        SELECT JOB_REQUEST_CHECK_ID,
               ASSET_ACTION_ID,
               REQUEST_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               JOB_ORDER_SERVICE_ID
          FROM JOB_REQUEST_CHECKS
   WHERE  JOB_REQUEST_CHECK_ID = :JOB_REQUEST_CHECK_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  