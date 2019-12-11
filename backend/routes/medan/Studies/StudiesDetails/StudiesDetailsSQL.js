
let statements = {
    getAllStudiesDetails: {
            statement :`
            SELECT DETAIL_ID,
                   STUDY_ID,
                   TYPE,
                   DESCRIPTION,
                   QUANTITY,
                   UNIT_ID,
                   TOTAL_PRICE,
                   CREATION_DATE,
                   CREATED_BY,
                   LAST_MODIFY_DATE,
                   MODIFIED_BY,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   UNIT_COST,
                   IS_MAIN_BENEFIT,
                   BENEFIT_DETAIL_ID,
                   TERM_ID,
                   LAST_UNIT_OF_M,
                   BOQ_CLASSIFICATION,
                   DURATION
              FROM STUDIES_DETAILS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneStudiesDetailsByID:{
        statement:`
        SELECT DETAIL_ID,
               STUDY_ID,
               TYPE,
               DESCRIPTION,
               QUANTITY,
               UNIT_ID,
               TOTAL_PRICE,
               CREATION_DATE,
               CREATED_BY,
               LAST_MODIFY_DATE,
               MODIFIED_BY,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               UNIT_COST,
               IS_MAIN_BENEFIT,
               BENEFIT_DETAIL_ID,
               TERM_ID,
               LAST_UNIT_OF_M,
               BOQ_CLASSIFICATION,
               DURATION
          FROM STUDIES_DETAILS
   WHERE DETAIL_ID = :DETAIL_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  