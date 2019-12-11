let statements = {
    getAllAssetPenelities: {
            statement :`
SELECT PENALTY_ID,
       ASSET_ID,
       PENALTY_COST,
       PENALTY_CAUSE,
       CREATED_BY,
       CREATION_DATE,
       PENALTY_STATUS,
       SETTLEMENT_BY,
       SETTLEMENT_DATE,
       SETTLEMENT_NOTES,
       DELETED,
       DELETED_BY,
       DELETED_DATE
  FROM ASSET_PENALTIES 
            `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneAssetPenelitiesByID:{
        statement:`SELECT PENALTY_ID,
        ASSET_ID,
        PENALTY_COST,
        PENALTY_CAUSE,
        CREATED_BY,
        CREATION_DATE,
        PENALTY_STATUS,
        SETTLEMENT_BY,
        SETTLEMENT_DATE,
        SETTLEMENT_NOTES,
        DELETED,
        DELETED_BY,
        DELETED_DATE
   FROM ASSET_PENALTIES
   WHERE  PENALTY_ID = :PENALTY_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  