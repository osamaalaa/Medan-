
let statements = {
    getAllCompetencyGroup: {
            statement :`
            SELECT GROUP_ID,
                   GROUP_NAME,
                   STATUS,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM COMPETENCY_GROUP `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneCompetencyGroupByID:{
        statement:`
        SELECT GROUP_ID,
               GROUP_NAME,
               STATUS,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM COMPETENCY_GROUP
   WHERE  GROUP_ID = :GROUP_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  