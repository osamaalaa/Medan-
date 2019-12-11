
let statements = {
    getAllCounters: {
            statement :`
SELECT COUNTER_ID,
       COUNTER_NAME,
       DESCRPTION,
       COUNTER_TYPE,
       VALUE_CHANGE,
       MEASURE_UNIT,
       INITIAL_READING,
       CREATED_BY,
       CREATION_DATE,
       DELETED,
       DELETED_BY,
       DELETED_DATE
  FROM COUNTERS  `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneCountersByID:{
        statement:`SELECT COUNTER_ID,
        COUNTER_NAME,
        DESCRPTION,
        COUNTER_TYPE,
        VALUE_CHANGE,
        MEASURE_UNIT,
        INITIAL_READING,
        CREATED_BY,
        CREATION_DATE,
        DELETED,
        DELETED_BY,
        DELETED_DATE
   FROM COUNTERS
   WHERE  COUNTER_ID = :COUNTER_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  