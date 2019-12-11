
let statements = {
    getAllNodeUploads: {
            statement :`
            SELECT SEQ,
                   FIELD_NAME,
                   ORIGNAL_NAME,
                   ENCODING,
                   MIME_TYPE,
                   DESTINATION,
                   FILE_NAME,
                   PATH,
                   FILE_SIZE,
                   CREATED_BY,
                   LAST_UPDATE_BY,
                   CREATED_DATE,
                   LAST_UPDATED_DATE,
                   APP_ID,
                   EMP_ID
              FROM NODE_UPLOADS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneNodeUploadsByID:{
        statement:`
        SELECT SEQ,
               FIELD_NAME,
               ORIGNAL_NAME,
               ENCODING,
               MIME_TYPE,
               DESTINATION,
               FILE_NAME,
               PATH,
               FILE_SIZE,
               CREATED_BY,
               LAST_UPDATE_BY,
               CREATED_DATE,
               LAST_UPDATED_DATE,
               APP_ID,
               EMP_ID
          FROM NODE_UPLOADS
   WHERE  SEQ = :SEQ `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  