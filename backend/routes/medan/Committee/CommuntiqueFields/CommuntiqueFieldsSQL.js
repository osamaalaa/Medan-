
let statements = {
    getAllCommuntiqueFields: {
            statement :`
SELECT CF_ID,
       COMMUNIQUE_ID,
       FIELD_ID,
       FIELD_VALUE
  FROM COMMUNIQUE_FIELDS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneCommuntiqueFieldsByID:{
        statement:`
        SELECT CF_ID,
       COMMUNIQUE_ID,
       FIELD_ID,
       FIELD_VALUE
  FROM COMMUNIQUE_FIELDS
   WHERE  CF_ID = :CF_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  