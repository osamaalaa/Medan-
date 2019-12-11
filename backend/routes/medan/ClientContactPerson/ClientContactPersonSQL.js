
let statements = {
    getAllClientContactPerson: {
            statement :`
SELECT CONTACT_PERSON_ID,
       CLIENT_ID,
       CONTACT_PERSON_NAME,
       ADDRESS,
       PHONE_NO,
       MOBILE_NO,
       STATUS,
       DELETED,
       DELETED_BY,
       DELETED_DATE,
       SUBSIDIARY_ID
  FROM CLIENT_CONTACT_PERSON 
            `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneClientContactPersonByID:{
        statement:`
        SELECT CONTACT_PERSON_ID,
       CLIENT_ID,
       CONTACT_PERSON_NAME,
       ADDRESS,
       PHONE_NO,
       MOBILE_NO,
       STATUS,
       DELETED,
       DELETED_BY,
       DELETED_DATE,
       SUBSIDIARY_ID
  FROM CLIENT_CONTACT_PERSON
   WHERE  CONTACT_PERSON_ID = :CONTACT_PERSON_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  