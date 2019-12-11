
let statements = {
    getAllDeductions: {
            statement :`
            SELECT DEDUCTION_ID,
                   AR_DESCRIPTION,
                   DEDUCTION_VALUE,
                   CREATED_BY,
                   CREATION_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   EN_DESCRIPTION
              FROM DEDUCTIONS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneDeductionsByID:{
        statement:`SELECT DEDUCTION_ID,
        AR_DESCRIPTION,
        DEDUCTION_VALUE,
        CREATED_BY,
        CREATION_DATE,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        EN_DESCRIPTION
   FROM DEDUCTIONS
   WHERE  DEDUCTION_ID = :DEDUCTION_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  