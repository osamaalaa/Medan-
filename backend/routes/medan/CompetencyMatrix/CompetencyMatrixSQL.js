
let statements = {
    getAllCompetencyMatrix: {
            statement :`
            SELECT COMPETENCY_ID,
                   COMPETENCY_AR,
                   COMPETENCY_EN,
                   STATUS,
                   CREATED_BY,
                   CREATION_DATE,
                   COMPETENCY_TYPE,
                   COMPETENCY_LEVEL,
                   GROUP_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM COMPETENCY_MATRIX `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneCompetencyMatrixByID:{
        statement:`
        SELECT COMPETENCY_ID,
               COMPETENCY_AR,
               COMPETENCY_EN,
               STATUS,
               CREATED_BY,
               CREATION_DATE,
               COMPETENCY_TYPE,
               COMPETENCY_LEVEL,
               GROUP_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM COMPETENCY_MATRIX
   WHERE  COMPETENCY_ID = :COMPETENCY_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  