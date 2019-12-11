
let statements = {
    getAllMeetingMembers: {
            statement :`
            SELECT MEETING_MEMBER_ID,
                   MEETING_ID,
                   MEMBER_ROLE,
                   STATUS,
                   MAIL_SENT_FLAG,
                   MEMBER_TYPE,
                   ATTENDANCE_FLAG,
                   INVITATION_MAIL_FLAG,
                   EMPLOYEE_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID,
                   INVITED_FLAG
              FROM MEETING_MEMBERS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneMeetingMembersByID:{
        statement:`
        SELECT MEETING_MEMBER_ID,
               MEETING_ID,
               MEMBER_ROLE,
               STATUS,
               MAIL_SENT_FLAG,
               MEMBER_TYPE,
               ATTENDANCE_FLAG,
               INVITATION_MAIL_FLAG,
               EMPLOYEE_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID,
               INVITED_FLAG
          FROM MEETING_MEMBERS
   WHERE  MEETING_MEMBER_ID = :MEETING_MEMBER_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  