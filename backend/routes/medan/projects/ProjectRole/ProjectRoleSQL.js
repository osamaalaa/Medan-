
let statements = {
    getAllProjectRole: {
            statement :`
            SELECT PROJECT_ROLES_ID,
                   PROJECT_ID,
                   ROLE_ID,
                   STATUS,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID,
                   CREATED_BY,
                   CREATION_DATE
              FROM PROJECT_ROLES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneProjectRoleByID:{
        statement:`
        SELECT PROJECT_ROLES_ID,
               PROJECT_ID,
               ROLE_ID,
               STATUS,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID,
               CREATED_BY,
               CREATION_DATE
          FROM PROJECT_ROLES
   WHERE PROJECT_ROLES_ID = :PROJECT_ROLES_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    insertProjectRole: {
     statement: `
     INSERT INTO PROJECT_ROLES (PROJECT_ROLES_ID,
          PROJECT_ID,
          ROLE_ID,
          STATUS,
          SUBSIDIARY_ID,
          CREATED_BY,
          CREATION_DATE)
  VALUES (PROJECT_ROLES_SEQ.NEXTVAL,
     :PROJECT_ID,
     :ROLE_ID,
     :STATUS,
     :SUBSIDIARY_ID,
     :CREATED_BY,
     sysdate)
     RETURN PROJECT_ROLES_ID, PROJECT_ID INTO :R_PROJECT_ROLES_ID, :R_PROJECT_ID`,
     returns: ["R_PROJECT_ROLES_ID","R_PROJECT_ID"],
     bindings: [],
     qstring: "",
     requireCommit: true
 }
  }
  
  module.exports = statements ;
  