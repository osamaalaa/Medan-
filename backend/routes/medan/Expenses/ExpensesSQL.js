
let statements = {
    getAllExpenses: {
            statement :`
            SELECT EXPENSES_ID,
                   EXPENSES_CODE,
                   EXPENSES_AR_NAME,
                   EXPENSES_EN_NAME,
                   STATUS,
                   EXPENSES_TYPE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM EXPENSES  `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneExpensesByID:{
        statement:`
        SELECT EXPENSES_ID,
               EXPENSES_CODE,
               EXPENSES_AR_NAME,
               EXPENSES_EN_NAME,
               STATUS,
               EXPENSES_TYPE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM EXPENSES
   WHERE  EXPENSES_ID = :EXPENSES_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  