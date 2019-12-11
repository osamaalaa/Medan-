
let statements = {
    getAllSocialMedia: {
            statement :`
            SELECT ID,
                   SM_EN_NAME,
                   SM_AR_NAME,
                   STATUS,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM SOCIAL_MEDIA `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneSocialMediaByID:{
        statement:`
        SELECT ID,
               SM_EN_NAME,
               SM_AR_NAME,
               STATUS,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM SOCIAL_MEDIA
   WHERE ID = :ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  