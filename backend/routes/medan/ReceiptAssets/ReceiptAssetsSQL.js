
let statements = {
    getAllReceiptAssets: {
            statement :`
            SELECT RECEIPT_ID,
                   ASSET_ID,
                   RECEIPT_DATE,
                   NOTES,
                   QUANTITY,
                   CREATION_DATE,
                   CREATED_BY,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM RECEIPT_ASSETS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneReceiptAssetsByID:{
        statement:`
        SELECT RECEIPT_ID,
               ASSET_ID,
               RECEIPT_DATE,
               NOTES,
               QUANTITY,
               CREATION_DATE,
               CREATED_BY,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM RECEIPT_ASSETS
   WHERE RECEIPT_ID = :RECEIPT_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  