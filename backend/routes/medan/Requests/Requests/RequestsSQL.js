
let statements = {
    getAllRequests: {
            statement :`
            SELECT REQUEST_ID,
                   REQUEST_STATUS,
                   REQUEST_TYPE,
                   CREATED_BY,
                   CREATION_DATE,
                   MODIFIED_BY,
                   MODIFICATION_DATE,
                   DESCRIPTION,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID,
                   CLASSIFICATION_ID
              FROM REQUESTS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneRequestsByID:{
        statement:`
        SELECT REQUEST_ID,
               REQUEST_STATUS,
               REQUEST_TYPE,
               CREATED_BY,
               CREATION_DATE,
               MODIFIED_BY,
               MODIFICATION_DATE,
               DESCRIPTION,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID,
               CLASSIFICATION_ID
          FROM REQUESTS
   WHERE REQUEST_ID = :REQUEST_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  