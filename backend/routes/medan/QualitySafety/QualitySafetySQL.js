
let statements = {
    getAllQualitySafety: {
            statement :`
            SELECT QS_ID,
                   QS_TYPE_ID,
                   QS_NAME_AR,
                   QS_NAME_EN,
                   DESCRIPTION_AR,
                   DESCRIPTION_EN,
                   CLASSIFICATION_ID,
                   CREATION_DATE,
                   CREATED_BY,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   NOTES,
                   TEMPLATE_ID
              FROM QUALITY_SAFETY `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneQualitySafetyByID:{
        statement:`
        SELECT QS_ID,
               QS_TYPE_ID,
               QS_NAME_AR,
               QS_NAME_EN,
               DESCRIPTION_AR,
               DESCRIPTION_EN,
               CLASSIFICATION_ID,
               CREATION_DATE,
               CREATED_BY,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               NOTES,
               TEMPLATE_ID
          FROM QUALITY_SAFETY
   WHERE QS_ID = :QS_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  