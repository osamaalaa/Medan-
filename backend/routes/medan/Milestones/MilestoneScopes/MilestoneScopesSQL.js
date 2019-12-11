
let statements = {
    getAllMilestoneScopes: {
            statement :`
            SELECT SCOPE_ID,
                   MILESTONE_ID,
                   DESCRIPTION,
                   LOCATION_ID,
                   SUB_LOCATION_ID,
                   COUNT,
                   DELETED,
                   DELETED_DATE,
                   DELETED_BY
              FROM MILESTONE_SCOPES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneMilestoneScopesByID:{
        statement:`
        SELECT SCOPE_ID,
               MILESTONE_ID,
               DESCRIPTION,
               LOCATION_ID,
               SUB_LOCATION_ID,
               COUNT,
               DELETED,
               DELETED_DATE,
               DELETED_BY
          FROM MILESTONE_SCOPES
   WHERE  SCOPE_ID = :SCOPE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  