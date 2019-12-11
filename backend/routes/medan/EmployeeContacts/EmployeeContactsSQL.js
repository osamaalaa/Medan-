
let statements = {
    getAllEmployeeContacts: {
            statement :`
            SELECT CONTACT_ID,
                   EMPLOYEE_ID,
                   CONTACT_TYPE,
                   CONTACT_VALUE,
                   CONTACT_DESCRIPTION,
                   CONTACT_STATUS,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM EMPLOYEE_CONTACTS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneEmployeeContactsByID:{
        statement:`
        SELECT CONTACT_ID,
               EMPLOYEE_ID,
               CONTACT_TYPE,
               CONTACT_VALUE,
               CONTACT_DESCRIPTION,
               CONTACT_STATUS,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM EMPLOYEE_CONTACTS
   WHERE  CONTACT_ID = :CONTACT_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  