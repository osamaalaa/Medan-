let statements = {
    getAllAssetChecking: {
            statement :`
            SELECT CHECK_ID,
                   ASSET_ID,
                   CHECK_DATE,
                   CHECK_BY,
                   NEXT_CHECK_DATE,
                   CHECK_RESULT,
                   UPDATED_BY,
                   UPDATED_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   CREATION_DATE
              FROM ASSET_CHECKING  
            `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneAssetCheckingByID:{
        statement:`SELECT CHECK_ID,
        ASSET_ID,
        CHECK_DATE,
        CHECK_BY,
        NEXT_CHECK_DATE,
        CHECK_RESULT,
        UPDATED_BY,
        UPDATED_DATE,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        CREATION_DATE
   FROM ASSET_CHECKING
   WHERE  CHECK_ID = :CHECK_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  