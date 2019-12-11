
let statements = {
    getAllProjectKPI: {
            statement :`
            SELECT KBI_ID,
                   PROJECT_ID,
                   DESCRIPTION_AR,
                   CREATED_BY,
                   CREATED_DATE,
                   UPDATED_BY,
                   UPDATED_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID,
                   VALUE_TYPE,
                   THE_VALUE,
                   UP_DOWN,
                   MIN_VALUE,
                   MAX_VALUE,
                   DESCRIPTION_EN
              FROM PROJECT_KBI `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneProjectKPIByID:{
        statement:`
        SELECT KBI_ID,
               PROJECT_ID,
               DESCRIPTION_AR,
               CREATED_BY,
               CREATED_DATE,
               UPDATED_BY,
               UPDATED_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID,
               VALUE_TYPE,
               THE_VALUE,
               UP_DOWN,
               MIN_VALUE,
               MAX_VALUE,
               DESCRIPTION_EN
          FROM PROJECT_KBI
   WHERE KBI_ID = :KBI_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    insertProjectKPI: {
     statement: `
     INSERT INTO PROJECT_KBI (KBI_ID,
          PROJECT_ID,
          DESCRIPTION_AR,
          CREATED_BY,
          CREATED_DATE,
          SUBSIDIARY_ID,
          VALUE_TYPE,
          THE_VALUE,
          UP_DOWN,
          MIN_VALUE,
          MAX_VALUE,
          DESCRIPTION_EN)
  VALUES (PROJECT_KPI_SEQ.NEXTVAL,
     :PROJECT_ID,
     :DESCRIPTION_AR,
     :CREATED_BY,
     sysdate,
     :SUBSIDIARY_ID,
     :VALUE_TYPE,
     :THE_VALUE,
     :UP_DOWN,
     :MIN_VALUE,
     :MAX_VALUE,
     :DESCRIPTION_EN)
     RETURN KBI_ID, PROJECT_ID INTO :R_KBI_ID, :R_PROJECT_ID`,
     returns: ["R_KBI_ID","R_PROJECT_ID"],
     bindings: [],
     qstring: "",
     requireCommit: true
 }
  }
  
  module.exports = statements ;
  