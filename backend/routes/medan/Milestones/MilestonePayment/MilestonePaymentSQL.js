
let statements = {
    getAllMilestonePayment: {
            statement :`
            SELECT MILESTONE_PAY_ID,
                   MILESTONE_ID,
                   INVOICE_NUMBER,
                   INVOICE_AMOUNT,
                   COLLECTED_AMOUNT,
                   COLLECTED_DATE,
                   DEDUCTION_AMOUNT,
                   DEDUCTION_PERCENTAGE,
                   DOWENPAYMENT_AMOUNT,
                   DOWENPAMENT_PERCENTAGE,
                   COLLECTION_STATUS,
                   ATTACHMENTS,
                   CONTENT_TYPE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID,
                   INVOICE_DESC
              FROM MILESTONE_PAYMENTS  `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneMilestonePaymentByID:{
        statement:`
        SELECT MILESTONE_PAY_ID,
               MILESTONE_ID,
               INVOICE_NUMBER,
               INVOICE_AMOUNT,
               COLLECTED_AMOUNT,
               COLLECTED_DATE,
               DEDUCTION_AMOUNT,
               DEDUCTION_PERCENTAGE,
               DOWENPAYMENT_AMOUNT,
               DOWENPAMENT_PERCENTAGE,
               COLLECTION_STATUS,
               ATTACHMENTS,
               CONTENT_TYPE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID,
               INVOICE_DESC
          FROM MILESTONE_PAYMENTS
   WHERE  MILESTONE_PAY_ID = :MILESTONE_PAY_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  