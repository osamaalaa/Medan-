let statements = {
    getAllAssetCounters: {
            statement :`
     SELECT ASSET_COUNTER_ID,
       ASSET_ID,
       COUNTERS_ID,
       DESCRPTION,
       CREATED_BY,
       CREATION_DATE,
       DELETED,
       DELETED_BY,
       DELETED_DATE
  FROM ASSET_COUNTERS   
            `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneAssetCountersByID:{
        statement:`SELECT ASSET_COUNTER_ID,
        ASSET_ID,
        COUNTERS_ID,
        DESCRPTION,
        CREATED_BY,
        CREATION_DATE,
        DELETED,
        DELETED_BY,
        DELETED_DATE
   FROM ASSET_COUNTERS
   WHERE  ASSET_COUNTER_ID = :ASSET_COUNTER_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  