
let statements = {
    getMeetingDecisionsOrIssuesOrTasks: {
        statement: `select * from MEETING_MINUTES where MEETING_ID = :MEETING_ID and DELETED = 0 and TYPE = :TYPE
           `,
        bindings: [],
        qstring: "",
        requireCommit: true
    }

}


module.exports = statements ;
  