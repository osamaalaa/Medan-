
let statements = {
    getAllMilestonesDetails: {
            statement :`
            SELECT MILESTONE_DETAIL_ID,
                   ACTION_DATE,
                   ACTIONS_DESCRIPTION,
                   SOULUTIONS,
                   RESULTS,
                   COMMENTS,
                   MILESTONE_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM MILESTONE_DETAILS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneMilestonesDetailsByID:{
        statement:`
        SELECT MILESTONE_DETAIL_ID,
               ACTION_DATE,
               ACTIONS_DESCRIPTION,
               SOULUTIONS,
               RESULTS,
               COMMENTS,
               MILESTONE_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM MILESTONE_DETAILS
   WHERE  MILESTONE_DETAIL_ID = :MILESTONE_DETAIL_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  