
let statements = {
    getAllReassignRequests: {
            statement :`
            SELECT RE_REQUEST_ID,
                   REQUEST_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   CREATION_DATE,
                   CREATED_BY
              FROM REASSIGN_REQUESTS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneReassignRequestsByID:{
        statement:`
        SELECT RE_REQUEST_ID,
               REQUEST_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               CREATION_DATE,
               CREATED_BY
          FROM REASSIGN_REQUESTS
   WHERE RE_REQUEST_ID = :RE_REQUEST_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  