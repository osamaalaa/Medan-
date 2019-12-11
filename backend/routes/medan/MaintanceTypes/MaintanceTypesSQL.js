
let statements = {
    getAllMaintanceTypes: {
            statement :`
            SELECT TYPE_ID,
                   MAINTENANCE_CODE,
                   DESCRIPTION,
                   DURATION,
                   CREATION_DATE,
                   CREATED_BY,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   PROJECT_ID
              FROM MAINTENANCE_TYPES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneMaintanceTypesByID:{
        statement:`
        SELECT TYPE_ID,
               MAINTENANCE_CODE,
               DESCRIPTION,
               DURATION,
               CREATION_DATE,
               CREATED_BY,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               PROJECT_ID
          FROM MAINTENANCE_TYPES
   WHERE  TYPE_ID = :TYPE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  