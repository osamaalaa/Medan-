let statements = {
    getAllAssetEquipments: {
            statement :`
SELECT ID,
       CODE,
       TITLE,
       DESC_EN,
       DESC_AR,
       ASSET_ID,
       QUANTITY,
       CREATED_BY,
       CREATION_DATE,
       DELETED,
       DELETED_BY,
       DELETED_DATE,
       DETAIL_ASSET_ID
  FROM ASSET_EQUIBMENTS  
            `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneAssetEquipmentsID:{
        statement:`SELECT ID,
        CODE,
        TITLE,
        DESC_EN,
        DESC_AR,
        ASSET_ID,
        QUANTITY,
        CREATED_BY,
        CREATION_DATE,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        DETAIL_ASSET_ID
   FROM ASSET_EQUIBMENTS
   WHERE  ID = :ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  