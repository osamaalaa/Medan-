let statements = {
    getAllAssetAction: {
            statement :`
            SELECT ASSET_ID,
                   ACTION_ID,
                   CREATION_DATE,
                   CREATED_BY,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID,
                   ASSET_ACTION_STATUS,
                   RECURRING,
                   ASSET_ACTION_ID,
                   JOB_ORDER_ACTION_TYPE,
                   SUPERVISOR_ID,
                   CODE,
                   START_DATE,
                   OPER_TYPE,
                   PRIORITY_ID,
                   STARTING_WEEK_NO
              FROM ASSET_ACTIONS  
            `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneAssetActionByID:{
        statement:`SELECT ASSET_ID,
        ACTION_ID,
        CREATION_DATE,
        CREATED_BY,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        SUBSIDIARY_ID,
        ASSET_ACTION_STATUS,
        RECURRING,
        ASSET_ACTION_ID,
        JOB_ORDER_ACTION_TYPE,
        SUPERVISOR_ID,
        CODE,
        START_DATE,
        OPER_TYPE,
        PRIORITY_ID,
        STARTING_WEEK_NO
   FROM ASSET_ACTIONS
   WHERE  ASSET_ID = :ASSET_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  