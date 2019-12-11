
let statements = {
    updateDailyWorkingHours: {
        statement: `
        UPDATE DAILY_WORKING_HOURS
      SET DAILY_HOURS_ID = :DAILY_HOURS_ID,
       WORK_ORDER_ID  = :WORK_ORDER_ID,
       WORK_DATE  = :WORK_DATE,
       WORKING_HOURS  = :WORKING_HOURS,
       COMMENTS  = :COMMENTS
       WHERE DAILY_HOURS_ID = :DAILY_HOURS_ID
        `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: true
    }   
}
  module.exports = statements ;
  