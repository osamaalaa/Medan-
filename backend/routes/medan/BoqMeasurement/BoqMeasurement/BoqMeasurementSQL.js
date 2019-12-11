let statements = {
    getAllBoqMeasurement: {
            statement :`
SELECT MEASURE_ID,
       MEASURE_NAME_AR,
       MEASURE_NAME_EN,
       CREATION_DATE,
       CREATED_BY,
       HAS_WORKLOAD,
       WORKLOAD,
       STATUS,
       DEFAULT_WORKLOAD,
       MEASUREMENT_TYPE,
       DELETED,
       DELETED_BY,
       DELETED_DATE,
       SUBSIDIARY_ID
  FROM BOQ_MEASUREMENTS  
            `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneBoqMeasurementByID:{
        statement:`SELECT MEASURE_ID,
        MEASURE_NAME_AR,
        MEASURE_NAME_EN,
        CREATION_DATE,
        CREATED_BY,
        HAS_WORKLOAD,
        WORKLOAD,
        STATUS,
        DEFAULT_WORKLOAD,
        MEASUREMENT_TYPE,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        SUBSIDIARY_ID
   FROM BOQ_MEASUREMENTS
   WHERE  MEASURE_ID = :MEASURE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  