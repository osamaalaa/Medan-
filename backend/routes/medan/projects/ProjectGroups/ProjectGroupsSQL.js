
let statements = {
    getAllProjectGroups: {
            statement :`
            SELECT PROJECT_ID,
                   GROUP_ID,
                   CREATION_DATE,
                   CREATED_BY
              FROM PROJECT_GROUPS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneProjectGroupsByID:{
        statement:`
        SELECT PROJECT_ID,
               GROUP_ID,
               CREATION_DATE,
               CREATED_BY
          FROM PROJECT_GROUPS
   WHERE PROJECT_ID = :PROJECT_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    insertProjectGroup: {
     statement: `
     INSERT INTO PROJECT_GROUPS (PROJECT_ID,
          GROUP_ID,
          CREATION_DATE,
          CREATED_BY)
  VALUES (:PROJECT_ID,
     :GROUP_ID,
     sysdate,
     :CREATED_BY)
     RETURN GROUP_ID, PROJECT_ID INTO :R_GROUP_ID, :R_PROJECT_ID`,
     returns: ["R_GROUP_ID","R_PROJECT_ID"],
     bindings: [],
     qstring: "",
     requireCommit: true
 }
  }
  
  module.exports = statements ;
  