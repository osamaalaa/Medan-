
let statements = {
    getAllPortTransactions: {
            statement :` 
            SELECT TRANS_ID,
                   PORTFOLIO_ID,
                   TRANS_TYPE_ID,
                   PREVIOUS_BUDGET,
                   CURRENT_BUDGET,
                   CREATION_DATE,
                   DESCRIPTION,
                   DELETED,
                   DELETED_DATE,
                   DELETED_BY,
                   REFERENCE_NO,
                   LAST_MODIFY_DATE,
                   LAST_MODIFY_BY,
                   NOTES,
                   OPERATION_TYPE,
                   VALUE
              FROM PORT_TRANSACTIONS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOnePortTransactionsByID:{
        statement:`
        SELECT TRANS_ID,
               PORTFOLIO_ID,
               TRANS_TYPE_ID,
               PREVIOUS_BUDGET,
               CURRENT_BUDGET,
               CREATION_DATE,
               DESCRIPTION,
               DELETED,
               DELETED_DATE,
               DELETED_BY,
               REFERENCE_NO,
               LAST_MODIFY_DATE,
               LAST_MODIFY_BY,
               NOTES,
               OPERATION_TYPE,
               VALUE
          FROM PORT_TRANSACTIONS
   WHERE TRANS_ID = :TRANS_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  