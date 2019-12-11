
let statements = {
    getAllServicesTargetDef: {
            statement :`
            SELECT DEF_ID,
                   DESCRIPTION,
                   TARGET_VALUE,
                   TARGET_VALUE_TYPE,
                   TARGET_UNIT,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM SERVICE_TARGET_DEF `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneServicesTargetDefByID:{
        statement:`
        SELECT DEF_ID,
               DESCRIPTION,
               TARGET_VALUE,
               TARGET_VALUE_TYPE,
               TARGET_UNIT,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM SERVICE_TARGET_DEF
   WHERE DEF_ID = :DEF_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  