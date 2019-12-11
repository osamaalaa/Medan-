
let statements = {
    getAllIssuesManySitesLocation: {
            statement :`
            SELECT ISSUE_MANY_SITES_LOCATIONS_ID,
                   ISSUE_ID,
                   ISSUE_LOCATION,
                   SUB_LOCATION
              FROM ISSUE_MANY_SITES_LOCATIONS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneIssuesManySitesLocationByID:{
        statement:`
        SELECT ISSUE_MANY_SITES_LOCATIONS_ID,
               ISSUE_ID,
               ISSUE_LOCATION,
               SUB_LOCATION
          FROM ISSUE_MANY_SITES_LOCATIONS
   WHERE  ISSUE_MANY_SITES_LOCATIONS_ID = :ISSUE_MANY_SITES_LOCATIONS_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  