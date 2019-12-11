
let statements = {
    getAllPositions: {
            statement :`
            SELECT POSITION_ID,
                   SUBSIDIARY_ID,
                   USER_CODE,
                   PRIMARY_NAME,
                   SECONDARY_NAME,
                   STATUS,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   CREATION_DATE,
                   CREATED_BY
              FROM POSITIONS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOnePositionsByID:{
        statement:`
        SELECT POSITION_ID,
               SUBSIDIARY_ID,
               USER_CODE,
               PRIMARY_NAME,
               SECONDARY_NAME,
               STATUS,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               CREATION_DATE,
               CREATED_BY
          FROM POSITIONS
   WHERE POSITION_ID = :POSITION_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  