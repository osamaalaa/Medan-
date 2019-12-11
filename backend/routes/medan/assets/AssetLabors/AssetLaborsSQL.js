let statements = {
    getAllAssetLabors: {
            statement :`
            SELECT ID,
                   CODE,
                   SERIAL,
                   POSITION_ID,
                   ASSET_ID,
                   REQUIRED_LABOR,
                   AVAILABLE_LABOR,
                   NOTES,
                   CREATED_BY,
                   CREATION_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   REQUIRED_LABOR_EXPERIENCE
              FROM ASSET_LABORS
            `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneAssetLaborsByID:{
        statement:`SELECT ID,
        CODE,
        SERIAL,
        POSITION_ID,
        ASSET_ID,
        REQUIRED_LABOR,
        AVAILABLE_LABOR,
        NOTES,
        CREATED_BY,
        CREATION_DATE,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        REQUIRED_LABOR_EXPERIENCE
   FROM ASSET_LABORS
   WHERE  ID = :ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  