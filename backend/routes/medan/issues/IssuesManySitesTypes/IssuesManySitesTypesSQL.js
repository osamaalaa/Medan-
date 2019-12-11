
let statements = {
    getAllIssuesManySitesTypes: {
            statement :`
SELECT CONTRACT_ID,
       ITEM_ID,
       EMPOYEE_ID,
       ISSUE_MANY_SITES_TYPE_ID,
       ISSUE_MANY_SITES_ID
  FROM ISSUE_MANY_SITES_TYPE `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneIssuesManySitesTypesByID:{
        statement:` 
        SELECT CONTRACT_ID,
               ITEM_ID,
               EMPOYEE_ID,
               ISSUE_MANY_SITES_TYPE_ID,
               ISSUE_MANY_SITES_ID
          FROM ISSUE_MANY_SITES_TYPE
   WHERE  CONTRACT_ID = :CONTRACT_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  