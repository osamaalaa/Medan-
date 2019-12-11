
let statements = {
    getAllStudiesRequests: {
            statement :`
            SELECT REQUEST_ID,
                   STUDY_ID,
                   DUE_DATE,
                   ASSIGN_TO,
                   DELETED,
                   DELETED_DATE,
                   DELETED_BY
              FROM STUDIES_REQUESTS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneStudiesRequestsByID:{
        statement:`
        SELECT REQUEST_ID,
               STUDY_ID,
               DUE_DATE,
               ASSIGN_TO,
               DELETED,
               DELETED_DATE,
               DELETED_BY
          FROM STUDIES_REQUESTS
   WHERE REQUEST_ID = :REQUEST_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  