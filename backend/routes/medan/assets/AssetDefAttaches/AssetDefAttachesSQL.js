let statements = {
    getAllAssetDefAttaches: {
            statement :`
            SELECT ATTACH_ID,
                   ASSET_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM ASSET_DEF_ATTACHES   
            `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneAssetDefAttachesByID:{
        statement:`SELECT ATTACH_ID,
        ASSET_ID,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        SUBSIDIARY_ID
   FROM ASSET_DEF_ATTACHES
   WHERE  ATTACH_ID = :ATTACH_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  