let statements = {
    getAllAssetActionStarting: {
            statement :`
          SELECT ASSET_ACTION_ID, PLAN_ID, STARTING_WEEK_NO
  FROM ASSET_ACTION_STARTING  
            `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneAssetActionStartingByID:{
        statement:`SELECT ASSET_ACTION_ID, PLAN_ID, STARTING_WEEK_NO
        FROM ASSET_ACTION_STARTING
   WHERE ASSET_ACTION_ID = :ASSET_ACTION_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  