
let statements = {
    getAllLookupDetailDetails: {
            statement :`
            SELECT LOOKUP_DETAILS_DETAILS_ID,
                   LOOKUP_DETAIL_ID,
                   USER_CODE,
                   PRIMARY_NAME,
                   SECONDARY_NAME,
                   STATUS,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID,
                   CREATION_DATE
              FROM LOOKUP_DETAILS_DETAILS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneLookupDetailDetailsByID:{
        statement:`
        SELECT LOOKUP_DETAILS_DETAILS_ID,
               LOOKUP_DETAIL_ID,
               USER_CODE,
               PRIMARY_NAME,
               SECONDARY_NAME,
               STATUS,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID,
               CREATION_DATE
          FROM LOOKUP_DETAILS_DETAILS
   WHERE  LOOKUP_DETAILS_DETAILS_ID = :LOOKUP_DETAILS_DETAILS_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  