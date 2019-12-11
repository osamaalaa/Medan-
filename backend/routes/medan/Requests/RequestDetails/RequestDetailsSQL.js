
let statements = {
    getAllRequestDetails: {
            statement :`
            SELECT ID,
                   REQUEST_ID,
                   REQUEST_RELATED_DETAIL_ID,
                   CREATED_BY,
                   CREATION_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   REQUEST_RELATED_DETAIL_TYPE,
                   REQUEST_KIND,
                   NOTES,
                   USER_CODE,
                   ACTION_CODE,
                   ACTION_DATE,
                   REPORT_CODE,
                   REPORT_DATE,
                   LOCATION_ID,
                   REQUEST_DATE
              FROM REQUEST_DETAILS  `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneRequestDetailsByID:{
        statement:`
        SELECT ID,
               REQUEST_ID,
               REQUEST_RELATED_DETAIL_ID,
               CREATED_BY,
               CREATION_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               REQUEST_RELATED_DETAIL_TYPE,
               REQUEST_KIND,
               NOTES,
               USER_CODE,
               ACTION_CODE,
               ACTION_DATE,
               REPORT_CODE,
               REPORT_DATE,
               LOCATION_ID,
               REQUEST_DATE
          FROM REQUEST_DETAILS
   WHERE ID = :ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  