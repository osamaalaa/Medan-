
let statements = {
    getAllProjectCMS: {
            statement :`
            SELECT PROJECT_CMS_ID,
                   PROJECT_ID,
                   CMS_MAIL_ID,
                   CREATION_DATE,
                   CREATED_BY,
                   DELETED,
                   DELETED_BY
              FROM PROJECT_CMS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneProjectCMSByID:{
        statement:`
        SELECT PROJECT_CMS_ID,
               PROJECT_ID,
               CMS_MAIL_ID,
               CREATION_DATE,
               CREATED_BY,
               DELETED,
               DELETED_BY
          FROM PROJECT_CMS
   WHERE PROJECT_CMS_ID = :PROJECT_CMS_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },


    insertProjectCMS: {
     statement: `
     INSERT INTO PROJECT_CMS (PROJECT_CMS_ID,
          PROJECT_ID,
          CMS_MAIL_ID,
          CREATION_DATE,
          CREATED_BY)
  VALUES (PROJECT_CMS_SEQ.NEXTVAL,
     :PROJECT_ID,
     :CMS_MAIL_ID,
     sysdate,
     :CREATED_BY)
     RETURN PROJECT_CMS_ID, PROJECT_ID INTO :R_PROJECT_CMS_ID, :R_PROJECT_ID`,
     returns: ["R_PROJECT_CMS_ID","R_PROJECT_ID"],
     bindings: [],
     qstring: "",
     requireCommit: true
 }
  }
  
  module.exports = statements ;
  