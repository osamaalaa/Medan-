
let statements = {
    getAllOLDHRScheduleDays: {
            statement :`
            SELECT DAY_ID,
                   DAY_CODE,
                   SCHEDULE_ID,
                   DAY_TYPE,
                   STATUS,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM OLDHR_SCHEDULE_DAYS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneOLDHRScheduleDaysByID:{
        statement:`
        SELECT DAY_ID,
               DAY_CODE,
               SCHEDULE_ID,
               DAY_TYPE,
               STATUS,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM OLDHR_SCHEDULE_DAYS
   WHERE DAY_ID = :DAY_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  