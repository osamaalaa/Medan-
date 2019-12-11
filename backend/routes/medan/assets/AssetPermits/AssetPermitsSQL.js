let statements = {
    getAllAssetPermits: {
            statement :`select ID,
            CODE,
            DESC_EN,
            DESC_AR,
            CREATED_BY,
            CREATION_DATE,
            PERMIT_TYPE,
            ASSET_ID,
            DELETED,
            DELETED_BY,
            DELETED_DATE
       FROM ASSET_PERMITS  `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneAssetPermitsByID:{
        statement:`
        SELECT ID,
               CODE,
               DESC_EN,
               DESC_AR,
               CREATED_BY,
               CREATION_DATE,
               PERMIT_TYPE,
               ASSET_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM ASSET_PERMITS
          WHERE ID = :ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  