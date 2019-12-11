
let statements = {
    getAllLookupMaster: {
            statement :`
            SELECT LOOKUP_ID,
                   USER_CODE,
                   PRIMARY_NAME,
                   SECONDARY_NAME,
                   STAUS,
                   LOOKUP_TYPE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID,
                   ENABLE_ADD_DELETE,
                   SYSTEM_FIELD
              FROM LOOKUP_MASTER  `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneLookupMasterByID:{
        statement:`
        SELECT LOOKUP_ID,
               USER_CODE,
               PRIMARY_NAME,
               SECONDARY_NAME,
               STAUS,
               LOOKUP_TYPE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID,
               ENABLE_ADD_DELETE,
               SYSTEM_FIELD
          FROM LOOKUP_MASTER
   WHERE  LOOKUP_ID = :LOOKUP_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  