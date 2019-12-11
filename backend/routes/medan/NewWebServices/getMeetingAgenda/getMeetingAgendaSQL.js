
let statements = {
    getMeetingAgenda: {
            statement :`select * from MEETING_AGENDA where MEETING_ID = :MEETING_ID and DELETED = 0 and agenda_or_presentaion = 0`,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  