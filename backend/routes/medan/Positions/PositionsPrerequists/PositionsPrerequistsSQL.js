
let statements = {
    getAllPositionsPrerequists: {
            statement :`
            SELECT PREREQUISITS_SERIAL,
                   POSITION_ID,
                   NOTES,
                   PREREQUISITS_ID,
                   DELETED,
                   CREATION_DATE,
                   CREATED_BY,
                   DELETED_DATE,
                   DELETED_BY
              FROM POSITION_PREREQUISITS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOnePositionsPrerequistsByID:{
        statement:`
        SELECT PREREQUISITS_SERIAL,
               POSITION_ID,
               NOTES,
               PREREQUISITS_ID,
               DELETED,
               CREATION_DATE,
               CREATED_BY,
               DELETED_DATE,
               DELETED_BY
          FROM POSITION_PREREQUISITS
   WHERE PREREQUISITS_SERIAL = :PREREQUISITS_SERIAL `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  