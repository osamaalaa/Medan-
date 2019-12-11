
let statements = {
    getAllClients: {
            statement :`
SELECT CLIENT_ID,
       SUBSIDIARY_ID,
       CLIENT_CODE,
       AR_NAME,
       EN_NAME,
       CUSTOMER_TYPE,
       NATIONAL_ID,
       NATIONAL_ID_EXPIRATION,
       NATIONAL_ID_ISSUER,
       CUSTOMER_EMAIL,
       STATUS,
       DELETED,
       DELETED_BY,
       DELETED_DATE
  FROM CLIENTS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneClientByID:{
        statement:`
        SELECT CLIENT_ID,
       SUBSIDIARY_ID,
       CLIENT_CODE,
       AR_NAME,
       EN_NAME,
       CUSTOMER_TYPE,
       NATIONAL_ID,
       NATIONAL_ID_EXPIRATION,
       NATIONAL_ID_ISSUER,
       CUSTOMER_EMAIL,
       STATUS,
       DELETED,
       DELETED_BY,
       DELETED_DATE
  FROM CLIENTS
   WHERE  CLIENT_ID = :CLIENT_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  