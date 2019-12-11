
let statements = {
    getAllOLDHRTimeSchedule: {
            statement :`
            SELECT SCHEDULE_ID,
                   SCHEDULE_CODE,
                   AR_NAME,
                   EN_NAME,
                   STATUS,
                   SUBSIDIARY_ID,
                   FIXED_SCHEDULE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM OLDHR_TIME_SCHEDULE `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneOLDHRTimeScheduleByID:{
        statement:`
        SELECT SCHEDULE_ID,
               SCHEDULE_CODE,
               AR_NAME,
               EN_NAME,
               STATUS,
               SUBSIDIARY_ID,
               FIXED_SCHEDULE,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM OLDHR_TIME_SCHEDULE
   WHERE SCHEDULE_ID = :SCHEDULE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  