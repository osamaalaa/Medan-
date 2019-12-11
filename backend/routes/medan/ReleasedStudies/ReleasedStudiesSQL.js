
let statements = {
    getAllReleasedStudies: {
            statement :` SELECT RELEASED_ID,
                   STUDY_ID,
                   STUDY_BUDGET,
                   COLLECTED,
                   CREATION_DATE,
                   CREATED_BY,
                   LAST_MODIFY_DATE,
                   MODIFIED_BY,
                   DELETED,
                   DELETED_DATE,
                   DELETED_BY,
                   PORTFOLIO_ID
              FROM RELEASED_STUDIES  `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneReleasedStudiesByID:{
        statement:`SELECT RELEASED_ID,
        STUDY_ID,
        STUDY_BUDGET,
        COLLECTED,
        CREATION_DATE,
        CREATED_BY,
        LAST_MODIFY_DATE,
        MODIFIED_BY,
        DELETED,
        DELETED_DATE,
        DELETED_BY,
        PORTFOLIO_ID
   FROM RELEASED_STUDIES
   WHERE RELEASED_ID = :RELEASED_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  