
let statements = {
    getAllPlanHeaderWeeks: {
            statement :`
            SELECT SERIAL_NO,
                   PLAN_ID,
                   WEEK_NO,
                   WEEK_DATE,
                   MONTH_NO,
                   START_WEEK_DATE,
                   END_WEEK_DATE
              FROM PLAN_HEADER_WEEKS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOnePlanHeaderWeeksByID:{
        statement:`
        SELECT SERIAL_NO,
               PLAN_ID,
               WEEK_NO,
               WEEK_DATE,
               MONTH_NO,
               START_WEEK_DATE,
               END_WEEK_DATE
          FROM PLAN_HEADER_WEEKS
   WHERE  SERIAL_NO = :SERIAL_NO `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  