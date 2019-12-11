
let statements = {
    getAllDailyWorkingHours: {
            statement :`
            SELECT DAILY_HOURS_ID,
                   WORK_ORDER_ID,
                   WORK_DATE,
                   WORKING_HOURS,
                   START_TIME,
                   END_TIME,
                   COMMENTS,
                   STATUS,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID,
                   MEASURE_VALUE,
                   TIME_UNIT,
                   MEASURE_UNIT
              FROM DAILY_WORKING_HOURS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneDailyWorkingHoursByID:{
        statement:`SELECT DAILY_HOURS_ID,
        WORK_ORDER_ID,
        WORK_DATE,
        WORKING_HOURS,
        START_TIME,
        END_TIME,
        COMMENTS,
        STATUS,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        SUBSIDIARY_ID,
        MEASURE_VALUE,
        TIME_UNIT,
        MEASURE_UNIT
   FROM DAILY_WORKING_HOURS
   WHERE  DAILY_HOURS_ID = :DAILY_HOURS_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  