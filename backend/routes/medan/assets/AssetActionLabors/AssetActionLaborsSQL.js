let statements = {
    getAllAssetActionLabors: {
            statement :`
            SELECT ASSET_ACTION_LABOR_ID,
                   CODE,
                   ASSET_ACTION_ID,
                   POSITION_ID,
                   NOTES,
                   CREATED_BY,
                   CREATION_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   ACTIVITY_ID
              FROM ASSET_ACTION_LABORS 
            `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneAssetActionLaborsByID:{
        statement:`SELECT ASSET_ACTION_LABOR_ID,
        CODE,
        ASSET_ACTION_ID,
        POSITION_ID,
        NOTES,
        CREATED_BY,
        CREATION_DATE,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        ACTIVITY_ID
   FROM ASSET_ACTION_LABORS
   WHERE ASSET_ACTION_LABOR_ID = :ASSET_ACTION_LABOR_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  