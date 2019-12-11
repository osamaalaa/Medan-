
let statements = {
    getAllEmails: {
            statement :`
            SELECT EMAIL_ID,
                   EMAIL_FROM,
                   EMAIL_TO,
                   EMAIL_SUBJECT,
                   EMAIL_BODY_OLD,
                   CREATION_DATE,
                   CREATED_BY,
                   TRY_SEND_NUMBER,
                   SEND_DATE,
                   SEND_STATUS,
                   SEND_ERROR_MESSAGE,
                   APPLICATION_ID,
                   EMAIL_BODY,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM EMAILS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneEmailsByID:{
        statement:`SELECT EMAIL_ID,
        EMAIL_FROM,
        EMAIL_TO,
        EMAIL_SUBJECT,
        EMAIL_BODY_OLD,
        CREATION_DATE,
        CREATED_BY,
        TRY_SEND_NUMBER,
        SEND_DATE,
        SEND_STATUS,
        SEND_ERROR_MESSAGE,
        APPLICATION_ID,
        EMAIL_BODY,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        SUBSIDIARY_ID
   FROM EMAILS
   WHERE  EMAIL_ID = :EMAIL_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  