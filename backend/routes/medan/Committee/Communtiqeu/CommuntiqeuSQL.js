
let statements = {
    getAllCommuntiqeu: {
            statement :`
            SELECT COM_ID,
                   DESCRIPTION,
                   COM_TYPE,
                   COM_CLASSIFICATION,
                   PRIORITY_ID,
                   CONTRACT_ID,
                   BOQ_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   CREATION_DATE,
                   CREATED_BY
              FROM COMMUNIQUES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneCommuntiqeuByID:{
        statement:`SELECT COM_ID,
        DESCRIPTION,
        COM_TYPE,
        COM_CLASSIFICATION,
        PRIORITY_ID,
        CONTRACT_ID,
        BOQ_ID,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        CREATION_DATE,
        CREATED_BY
   FROM COMMUNIQUES
   WHERE  COM_ID = :COM_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  