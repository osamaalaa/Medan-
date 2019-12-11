
let statements = {
    getAllMilestonePromisedDate: {
            statement :`
            SELECT ID,
                   PROMISED_DATE,
                   DESCRIPTION,
                   MILESTONE_ID,
                   STATUS,
                   CREATED_BY,
                   CREATION_DATE,
                   MODIFIED_BY,
                   MODIFICATION_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM MILESTONE_PROMISED_DATE `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneMilestonePromisedDateByID:{
        statement:`
        SELECT ID,
               PROMISED_DATE,
               DESCRIPTION,
               MILESTONE_ID,
               STATUS,
               CREATED_BY,
               CREATION_DATE,
               MODIFIED_BY,
               MODIFICATION_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM MILESTONE_PROMISED_DATE
   WHERE  ID = :ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  