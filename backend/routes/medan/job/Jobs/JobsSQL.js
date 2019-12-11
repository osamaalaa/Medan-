
let statements = {
    getAllJobs: {
            statement :`
            SELECT JOB_ID,
                   JOB_NAME,
                   STATUS,
                   JOB_DESC,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM JOBS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneJobsByID:{
        statement:`
        SELECT JOB_ID,
               JOB_NAME,
               STATUS,
               JOB_DESC,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM JOBS
   WHERE  JOB_ID = :JOB_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  