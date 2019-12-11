
let statements = {
    getAllCommuntiqeuTypes: {
            statement :`
            SELECT COMM_ID,
                   COMMUNIQUE_NAME_A,
                   COMMUNIQUE_NAME_E,
                   REQUEST_TYPE_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   CREATION_DATE,
                   ATTACHMENT
              FROM COMMUNIQUE_TYPES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneCommuntiqeuTypesByID:{
        statement:`
        SELECT COMM_ID,
        COMMUNIQUE_NAME_A,
        COMMUNIQUE_NAME_E,
        REQUEST_TYPE_ID,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        CREATION_DATE,
        ATTACHMENT
   FROM COMMUNIQUE_TYPES
   WHERE  COMM_ID = :COMM_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  