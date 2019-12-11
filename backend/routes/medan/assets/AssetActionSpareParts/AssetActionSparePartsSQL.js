let statements = {
    getAllAssetActionSpareParts: {
            statement :`
            SELECT ASSET_ACTION_SPAREPART_ID,
       CODE,
       ASSET_ACTION_ID,
       INV_ITEM_ID,
       NOTES,
       CREATED_BY,
       CREATION_DATE,
       DELETED,
       DELETED_BY,
       DELETED_DATE,
       ITEMS_COUNT
  FROM ASSET_ACTION_SPAREPARTS  
            `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneAssetActionSparePartsByID:{
        statement:`SELECT ASSET_ACTION_SPAREPART_ID,
        CODE,
        ASSET_ACTION_ID,
        INV_ITEM_ID,
        NOTES,
        CREATED_BY,
        CREATION_DATE,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        ITEMS_COUNT
   FROM ASSET_ACTION_SPAREPARTS
   WHERE ASSET_ACTION_SPAREPART_ID = :ASSET_ACTION_SPAREPART_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  