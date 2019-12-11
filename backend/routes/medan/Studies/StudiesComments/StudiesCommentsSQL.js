
let statements = {
    getAllStudiesComments: {
            statement :`
            SELECT COMMENT_ID,
                   STUDY_ID,
                   COMMENTS,
                   CREATED_BY,
                   CREATION_DATE,
                   STATUS,
                   DELETED_BY,
                   DELETED_DATE,
                   DELETED
              FROM STUDIES_COMMENTS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneStudiesCommentsByID:{
        statement:`
        SELECT COMMENT_ID,
               STUDY_ID,
               COMMENTS,
               CREATED_BY,
               CREATION_DATE,
               STATUS,
               DELETED_BY,
               DELETED_DATE,
               DELETED
          FROM STUDIES_COMMENTS
   WHERE COMMENT_ID = :COMMENT_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  