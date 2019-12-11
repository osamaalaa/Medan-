
let statements = {
    getAllProjectBenefit: {
            statement :`
            SELECT BENEFIT_ID,
                   PROJECT_ID,
                   DESCRIPTION_AR,
                   DESCRIPTION_EN,
                   CREATED_BY,
                   CREATED_DATE,
                   UPDATED_BY,
                   UPDATED_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   VALUE_TYPE,
                   THE_VALUE,
                   UP_DOWN,
                   MIN_VALUE,
                   MAX_VALUE
              FROM PROJECT_BENEFITS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneProjectBenefitByID:{
        statement:`
        SELECT BENEFIT_ID,
               PROJECT_ID,
               DESCRIPTION_AR,
               DESCRIPTION_EN,
               CREATED_BY,
               CREATED_DATE,
               UPDATED_BY,
               UPDATED_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               VALUE_TYPE,
               THE_VALUE,
               UP_DOWN,
               MIN_VALUE,
               MAX_VALUE
          FROM PROJECT_BENEFITS
   WHERE BENEFIT_ID = :BENEFIT_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    insertProjectBenefit: {
     statement: `
     INSERT INTO PROJECT_BENEFITS (BENEFIT_ID,
          PROJECT_ID,
          DESCRIPTION_AR,
          DESCRIPTION_EN,
          CREATED_BY,
          CREATED_DATE,
          VALUE_TYPE,
          THE_VALUE,
          UP_DOWN,
          MIN_VALUE,
          MAX_VALUE)
  VALUES (PROJECT_BENEFIT_SEQ.NEXTVAL ,
     :PROJECT_ID,
     :DESCRIPTION_AR,
     :DESCRIPTION_EN,
     :CREATED_BY,
     sysdate,
     :VALUE_TYPE,
     :THE_VALUE,
     :UP_DOWN,
     :MIN_VALUE,
     :MAX_VALUE)
     RETURN PROJECT_ID, DESCRIPTION_AR, DESCRIPTION_EN INTO :R_PROJECT_ID, :R_DESCRIPTION_AR, :R_DESCRIPTION_EN`,
     returns: ["R_PROJECT_ID", "R_DESCRIPTION_AR" ,"R_DESCRIPTION_EN"],
     bindings: [],
     qstring: "",
     requireCommit: true
 }
  }
  
  module.exports = statements ;
  