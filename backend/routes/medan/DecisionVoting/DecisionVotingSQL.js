
let statements = {
    getAllDecisionVoting: {
            statement :`
SELECT VOTING_ID,
       MEETING_MINUTE_ID,
       MEMBER_ID,
       VOTING_RESULT,
       CREATION_DATE,
       COMMENTS,
       DELETED,
       DELETED_BY,
       DELETED_DATE
  FROM DECISION_VOTINGS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneDecisionVotingByID:{
        statement:`SELECT VOTING_ID,
        MEETING_MINUTE_ID,
        MEMBER_ID,
        VOTING_RESULT,
        CREATION_DATE,
        COMMENTS,
        DELETED,
        DELETED_BY,
        DELETED_DATE
   FROM DECISION_VOTINGS
   WHERE  VOTING_ID = :VOTING_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  