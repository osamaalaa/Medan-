
let statements = {
    getAllMeetings: {
            statement :`
            SELECT MEETING_ID,
                   MEETING_CODE,
                   MEETING_DESCRIPTION,
                   MEETING_DATE,
                   START_TIME,
                   END_TIME,
                   LOCATION,
                   PROJECT_ID,
                   STATUS,
                   START_TIME_STR,
                   END_TIME_STR,
                   TYPE,
                   COMMITTEE_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   MEETING_HELD_FLAG,
                   SEND_MOM_FLAG,
                   SAVE_DELTA_DATA,
                   CREATED_BY,
                   SUBSIDIARY_ID,
                   OLD_DATE,
                   SCHEDULE_ID,
                   SCHEDULE_ALERT_SENT
              FROM MEETINGS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneMeetingsByID:{
        statement:`
        SELECT MEETING_ID,
               MEETING_CODE,
               MEETING_DESCRIPTION,
               MEETING_DATE,
               START_TIME,
               END_TIME,
               LOCATION,
               PROJECT_ID,
               STATUS,
               START_TIME_STR,
               END_TIME_STR,
               TYPE,
               COMMITTEE_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               MEETING_HELD_FLAG,
               SEND_MOM_FLAG,
               SAVE_DELTA_DATA,
               CREATED_BY,
               SUBSIDIARY_ID,
               OLD_DATE,
               SCHEDULE_ID,
               SCHEDULE_ALERT_SENT,
               active_sharing
          FROM MEETINGS
   WHERE  MEETING_ID = :MEETING_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    updateSharing: {
     statement: `UPDATE HR.MEETINGS
     SET     ACTIVE_SHARING  = :ACTIVE_SHARING
     WHERE  MEETING_ID   = :MEETING_ID`,
     bindings: [],
     qstring: "",
     requireCommit: true
 },

 activeSharing: {
     statement: `UPDATE HR.MEETINGS
     SET     ACTIVE_SHARING  = 1
     WHERE  MEETING_ID   = :MEETING_ID`,
     bindings: [],
     qstring: "",
     requireCommit: true
 },

 notActiveSharing: {
     statement: `UPDATE HR.MEETINGS
     SET     ACTIVE_SHARING  = 0
     WHERE  MEETING_ID   = :MEETING_ID`,
     bindings: [],
     qstring: "",
     requireCommit: true
 },

 getActiveSharing: {
     statement: `select * from MEETINGS
                 where ACTIVE_SHARING  = 1`,
     bindings: [],
     qstring: "",
     requireCommit: true
 }




  }
  
  module.exports = statements ;
  