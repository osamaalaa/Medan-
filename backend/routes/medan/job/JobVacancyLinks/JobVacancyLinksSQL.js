
let statements = {
    getAllJobVacancyLinks: {
            statement :`
            SELECT ID,
                   JOB_VACANCY_ID,
                   SOCIAL_MEDIA_ID,
                   STATUS,
                   JOB_LINK,
                   CREATED_BY,
                   CREATED_ON,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM JOB_VACANCY_LINKS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneJobVacancyLinksByID:{
        statement:`
        SELECT ID,
               JOB_VACANCY_ID,
               SOCIAL_MEDIA_ID,
               STATUS,
               JOB_LINK,
               CREATED_BY,
               CREATED_ON,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM JOB_VACANCY_LINKS
   WHERE  ID = :ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  