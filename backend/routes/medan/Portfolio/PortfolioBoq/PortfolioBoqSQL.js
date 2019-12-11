
let statements = {
    getAllPortfolioBoq: {
            statement :` 
            SELECT BOQ_ID,
                   PORTFOLIO_ID,
                   BOQ_DESCRIPTION,
                   BOQ_AMOUNT,
                   BOQ_QUANTITY,
                   BOQ_TOTAL_AMOUNT,
                   STATUS,
                   BOQ_PARENT,
                   BOQ_DEPENDENT,
                   UNITE_OF_MEASURE,
                   INVOICEING_METHOD,
                   BOQ_CLASSIFICATION,
                   CREATED_BY,
                   CREATED_DATE,
                   UPDATED_BY,
                   UPDATED_DATE,
                   START_DATE,
                   DURATION,
                   BOQ_CLIENT,
                   BOQ_OWNER,
                   PROMISED_DATE,
                   WORKING_HOURS_PER_DAY,
                   MEASURE_IN_HOURS,
                   DELETED,
                   LAST_UNIT_OF_M,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM PORTFOLIO_BOQ `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOnePortfolioBoqByID:{
        statement:`
        SELECT BOQ_ID,
               PORTFOLIO_ID,
               BOQ_DESCRIPTION,
               BOQ_AMOUNT,
               BOQ_QUANTITY,
               BOQ_TOTAL_AMOUNT,
               STATUS,
               BOQ_PARENT,
               BOQ_DEPENDENT,
               UNITE_OF_MEASURE,
               INVOICEING_METHOD,
               BOQ_CLASSIFICATION,
               CREATED_BY,
               CREATED_DATE,
               UPDATED_BY,
               UPDATED_DATE,
               START_DATE,
               DURATION,
               BOQ_CLIENT,
               BOQ_OWNER,
               PROMISED_DATE,
               WORKING_HOURS_PER_DAY,
               MEASURE_IN_HOURS,
               DELETED,
               LAST_UNIT_OF_M,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM PORTFOLIO_BOQ
   WHERE BOQ_ID = :BOQ_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  