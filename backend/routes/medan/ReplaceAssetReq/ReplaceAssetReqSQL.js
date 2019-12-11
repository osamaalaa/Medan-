
let statements = {
    getAllReplaceAssetReq: {
            statement :`
            SELECT REQ_ID,
                   ASSET_ID,
                   LOCATION_ID,
                   REQUEST_OWNER,
                   NOTES,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM REPLACE_ASSET_REQUEST `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneReplaceAssetReqByID:{
        statement:`SELECT REQ_ID,
        ASSET_ID,
        LOCATION_ID,
        REQUEST_OWNER,
        NOTES,
        DELETED,
        DELETED_BY,
        DELETED_DATE
   FROM REPLACE_ASSET_REQUEST
   WHERE REQ_ID = :REQ_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  