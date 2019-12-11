
let statements = {
    getAllMilestonePaymentDetails: {
            statement :`
            SELECT PAYMENT_DETAIL_ID,
                   MILESTONE_PAY_ID,
                   PAYMENT_DATE,
                   PAYMENT_AMOUNT,
                   STATUS,
                   PAYMENT_DEDUCTION,
                   PAYMENT_COLLECTED,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM MILESTONE_PAYMENTS_DETAILS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneMilestonePaymentDetailsByID:{
        statement:`
        SELECT PAYMENT_DETAIL_ID,
               MILESTONE_PAY_ID,
               PAYMENT_DATE,
               PAYMENT_AMOUNT,
               STATUS,
               PAYMENT_DEDUCTION,
               PAYMENT_COLLECTED,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM MILESTONE_PAYMENTS_DETAILS
   WHERE  PAYMENT_DETAIL_ID = :PAYMENT_DETAIL_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  