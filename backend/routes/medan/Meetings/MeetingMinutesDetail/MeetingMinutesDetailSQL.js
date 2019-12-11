
let statements = {
    getAllMeetingMinutesDetail: {
            statement :`
            SELECT ID,
                   MEETING_MINUTES_ID,
                   DESCRIPTION,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM MEETING_MINUTES_DETAILS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneMeetingMinutesDetailByID:{
        statement:`
        SELECT ID,
               MEETING_MINUTES_ID,
               DESCRIPTION,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM MEETING_MINUTES_DETAILS
   WHERE  ID = :ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  