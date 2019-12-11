
let statements = {
    getAllMeetingSchedules: {
            statement :`
            SELECT SCHEDULE_ID,
                   INITIATION_DATE,
                   EXPIRED_DATE,
                   ROTATION,
                   SEND_INVITATION,
                   STATUS,
                   CREATION_DATE,
                   MODIFICATION_DATE,
                   MODIFIED_BY,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   START_TIME_STR,
                   END_TIME_STR,
                   SA_DAY_ON,
                   SU_DAY_ON,
                   MO_DAY_ON,
                   TU_DAY_ON,
                   WE_DAY_ON,
                   TH_DAY_ON,
                   FR_DAY_ON,
                   RECUR_EVERY,
                   MONTH_DAY,
                   YEAR_MONTH,
                   ALERT_BEFORE_DAYS,
                   COMMITTEE_ID,
                   ESC_SA,
                   ESC_FR
              FROM MEETING_SCHEDULES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneMeetingSchedulesByID:{
        statement:`
        SELECT SCHEDULE_ID,
               INITIATION_DATE,
               EXPIRED_DATE,
               ROTATION,
               SEND_INVITATION,
               STATUS,
               CREATION_DATE,
               MODIFICATION_DATE,
               MODIFIED_BY,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               START_TIME_STR,
               END_TIME_STR,
               SA_DAY_ON,
               SU_DAY_ON,
               MO_DAY_ON,
               TU_DAY_ON,
               WE_DAY_ON,
               TH_DAY_ON,
               FR_DAY_ON,
               RECUR_EVERY,
               MONTH_DAY,
               YEAR_MONTH,
               ALERT_BEFORE_DAYS,
               COMMITTEE_ID,
               ESC_SA,
               ESC_FR
          FROM MEETING_SCHEDULES
   WHERE  SCHEDULE_ID = :SCHEDULE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  