
let statements = {
    getAllIssuesManySites: {
            statement :`
SELECT ISSUE_MANY_SITES_ID, SITE_TYPE, NOTES
  FROM ISSUE_MANY_SITES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneIssuesManySitesByID:{
        statement:`
        SELECT ISSUE_MANY_SITES_ID, SITE_TYPE, NOTES
  FROM ISSUE_MANY_SITES
   WHERE  ISSUE_MANY_SITES_ID = :ISSUE_MANY_SITES_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  