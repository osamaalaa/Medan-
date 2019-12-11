
let statements = {
    getAllRecommendations: {
            statement :`
            SELECT RECO_ID,
                   STUDY_ID,
                   GENERAL_REQUIREMENTS,
                   RESULT,
                   RECOMMENDATION,
                   CREATION_DATE,
                   CREATED_BY,
                   LAST_MODIFY_DATE,
                   MODIFIED_BY,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM RECOMMENDATIONS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneRecommendationsByID:{
        statement:`
        SELECT RECO_ID,
               STUDY_ID,
               GENERAL_REQUIREMENTS,
               RESULT,
               RECOMMENDATION,
               CREATION_DATE,
               CREATED_BY,
               LAST_MODIFY_DATE,
               MODIFIED_BY,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM RECOMMENDATIONS
   WHERE RECO_ID = :RECO_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  