let statements = {
    getAllBoqMeasurementSub: {
            statement :`
            SELECT SUB_MEASURE_ID,
                   MEASURE_NAME_AR,
                   MEASURE_NAME_EN,
                   CREATION_DATE,
                   CREATED_BY,
                   MEASURE_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   WEIGHT
              FROM BOQ_MEASUREMENTS_SUB  
            `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneBoqMeasurementSubByID:{
        statement:`
        SELECT SUB_MEASURE_ID,
               MEASURE_NAME_AR,
               MEASURE_NAME_EN,
               CREATION_DATE,
               CREATED_BY,
               MEASURE_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               WEIGHT
          FROM BOQ_MEASUREMENTS_SUB
   WHERE  SUB_MEASURE_ID = :SUB_MEASURE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  