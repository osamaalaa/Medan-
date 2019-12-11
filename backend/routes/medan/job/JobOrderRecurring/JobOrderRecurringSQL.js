
let statements = {
    getAllJobOrderRecurring: {
            statement :`
            SELECT RECURRING_ID,
                   JOB_ORDER_DEF_ID,
                   START_DATE,
                   END_DATE,
                   REPETITION_ID,
                   JOB_ORDER_HOURS,
                   JOB_ORDER_MINUTES,
                   SUPERVISOR_ID,
                   CREATION_DATE,
                   CREATED_BY,
                   RECURSIVE_STATUS,
                   NEXT_START_DATE,
                   REPEATING_HOURS,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM JOB_ORDERS_RECURRING `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneJobOrderRecurringByID:{
        statement:`SELECT RECURRING_ID,
        JOB_ORDER_DEF_ID,
        START_DATE,
        END_DATE,
        REPETITION_ID,
        JOB_ORDER_HOURS,
        JOB_ORDER_MINUTES,
        SUPERVISOR_ID,
        CREATION_DATE,
        CREATED_BY,
        RECURSIVE_STATUS,
        NEXT_START_DATE,
        REPEATING_HOURS,
        DELETED,
        DELETED_BY,
        DELETED_DATE
   FROM JOB_ORDERS_RECURRING
   WHERE  RECURRING_ID = :RECURRING_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  