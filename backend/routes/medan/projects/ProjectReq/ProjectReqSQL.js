
let statements = {
    getAllProjectReq: {
            statement :`
            SELECT PJ_REQUEST,
                   PROJECT_ID,
                   REQUEST_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   CREATED_BY,
                   CREATION_DATE
              FROM PROJECT_REQUESTS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneProjectReqByID:{
        statement:`
        SELECT PJ_REQUEST,
               PROJECT_ID,
               REQUEST_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               CREATED_BY,
               CREATION_DATE
          FROM PROJECT_REQUESTS
   WHERE PJ_REQUEST = :PJ_REQUEST `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    insertProjectRequests: {
     statement: `
     INSERT INTO PROJECT_REQUESTS (PJ_REQUEST,
          PROJECT_ID,
          REQUEST_ID,
          CREATED_BY,
          CREATION_DATE)
  VALUES (:PJ_REQUEST,
     :PROJECT_ID,
     :REQUEST_ID,
     :CREATED_BY,
     sysdate)
     RETURN PJ_REQUEST, PROJECT_ID INTO :R_PJ_REQUEST, :R_PROJECT_ID`,
     returns: ["R_PJ_REQUEST","R_PROJECT_ID"],
     bindings: [],
     qstring: "",
     requireCommit: true
 }
  }
  
  module.exports = statements ;
  