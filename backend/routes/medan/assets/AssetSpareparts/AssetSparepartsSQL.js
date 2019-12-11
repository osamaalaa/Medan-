let statements = {
    getAllAssetSpareparts: {
            statement :`
            SELECT AP_ID,
                   ASSET_ID,
                   ITEM_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   CREATION_DATE,
                   CREATED_BY,
                   QUANTITY
              FROM ASSET_SPAREPARTS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneAssetSparepartsByID:{
        statement:`
        SELECT AP_ID,
                   ASSET_ID,
                   ITEM_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   CREATION_DATE,
                   CREATED_BY,
                   QUANTITY
              FROM ASSET_SPAREPARTS
          WHERE AP_ID = :AP_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  