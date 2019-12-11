
let statements = {
    getAllDelegation: {
            statement :`
SELECT DELEGATION_ID,
       DESTINATION_ID,
       REPLACEMENT_DEST_ID,
       STATUS,
       EXPIRE_DATE
  FROM DELEGATION `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneDelegationByID:{
        statement:`SELECT DELEGATION_ID,
        DESTINATION_ID,
        REPLACEMENT_DEST_ID,
        STATUS,
        EXPIRE_DATE
   FROM DELEGATION
   WHERE  DELEGATION_ID = :DELEGATION_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  