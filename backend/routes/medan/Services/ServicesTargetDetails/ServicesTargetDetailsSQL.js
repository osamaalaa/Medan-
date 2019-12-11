
let statements = {
    getAllServicesTargetDetails: {
            statement :`
            SELECT DETAIL_ID,
                   SERV_TARGET_ID,
                   DETAIL_OPERATION,
                   PENALTY_VALUE,
                   NOTES,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   COMPARED_VALUE,
                   SERV_ORDER,
                   TARGET_VALUE_TYPE
              FROM SERVICE_TARGETS_DETAILS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneServicesTargetDetailsByID:{
        statement:`
        SELECT DETAIL_ID,
               SERV_TARGET_ID,
               DETAIL_OPERATION,
               PENALTY_VALUE,
               NOTES,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               COMPARED_VALUE,
               SERV_ORDER,
               TARGET_VALUE_TYPE
          FROM SERVICE_TARGETS_DETAILS
   WHERE DETAIL_ID = :DETAIL_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  