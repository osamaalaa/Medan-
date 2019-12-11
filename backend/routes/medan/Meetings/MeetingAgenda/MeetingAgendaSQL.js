
let statements = {
    getAllMeetingAgenda: {
            statement :`
            SELECT MEETING_AGENDA_ID,
                   MEETING_ID,
                   DESCRIPTION,
                   STATUS,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM MEETING_AGENDA `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneMeetingAgendaByID:{
        statement:`
        SELECT MEETING_AGENDA_ID,
               MEETING_ID,
               DESCRIPTION,
               STATUS,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM MEETING_AGENDA
   WHERE  MEETING_AGENDA_ID = :MEETING_AGENDA_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getOnePresentationByMeetingID:{
        statement:`
        SELECT MEETING_AGENDA_ID,
               MEETING_ID,
               DESCRIPTION,
               STATUS,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM MEETING_AGENDA
   WHERE  MEETING_ID = :MEETING_ID 
   and deleted = 0 
   and AGENDA_OR_PRESENTAION = 1`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getCommentsOfPresentation: {
     statement: `
     select user_comments,employee_id,(select E.first_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) FIRST_NAME,
               (select E.second_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) second_NAME,
               (select E.first_name2 from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) FIRST_NAME_EN,
               (select E.S_second_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) second_NAME_EN,
                minutes_id , creation_date
                 from meeting_comments M
               where  AGENDA_ID in (select MEETING_AGENDA_ID from meeting_agenda M where M.MEETING_AGENDA_ID = :MEETING_AGENDA_ID and AGENDA_OR_PRESENTAION = 1 and deleted=0 )
               and deleted = 0 
               order by creation_date desc
     `,
     returns: [],
     bindings: [],
     qstring: "",
     requireCommit: true
 }
  }
  
  module.exports = statements ;
  