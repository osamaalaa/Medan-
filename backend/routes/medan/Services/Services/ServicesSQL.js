
let statements = {
    getAllServices: {
            statement :`
            SELECT SERVICE_ID,
                   CODE,
                   TITLE_EN,
                   TITLE_AR,
                   NOTES,
                   CREATED_BY,
                   CREATION_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   TYPE,
                   OPERATION_TYPE
              FROM SERVICES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneServicesByID:{
        statement:`
        SELECT SERVICE_ID,
               CODE,
               TITLE_EN,
               TITLE_AR,
               NOTES,
               CREATED_BY,
               CREATION_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               TYPE,
               OPERATION_TYPE
          FROM SERVICES
   WHERE SERVICE_ID = :SERVICE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  