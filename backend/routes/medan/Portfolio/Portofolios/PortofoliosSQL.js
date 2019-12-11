
let statements = {
    getAllPortofolios: {
            statement :`
            SELECT PORTFOLIO_ID,
                   PORTFOLIO_NAME_AR,
                   PORTFOLIO_NAME_EN,
                   CREATED_BY,
                   CREATION_DATE,
                   MODIFIED_BY,
                   MODIFICATION_DATE,
                   PORTFOLIO_STATUS,
                   SUBSIDARY_ID,
                   APPLICATION_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   MANAGER_ID,
                   BOOKED_BUDGET,
                   ACTUAL_BUDGET,
                   COMMITTEE_ID,
                   PARENT_ID,
                   SOURCE_ID,
                   INITIATIVE_ID
              FROM PORTFOLIOS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOnePortofoliosByID:{
        statement:`
        SELECT PORTFOLIO_ID,
               PORTFOLIO_NAME_AR,
               PORTFOLIO_NAME_EN,
               CREATED_BY,
               CREATION_DATE,
               MODIFIED_BY,
               MODIFICATION_DATE,
               PORTFOLIO_STATUS,
               SUBSIDARY_ID,
               APPLICATION_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               MANAGER_ID,
               BOOKED_BUDGET,
               ACTUAL_BUDGET,
               COMMITTEE_ID,
               PARENT_ID,
               SOURCE_ID,
               INITIATIVE_ID
          FROM PORTFOLIOS
   WHERE PORTFOLIO_ID = :PORTFOLIO_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  