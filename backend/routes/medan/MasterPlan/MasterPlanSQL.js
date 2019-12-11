
let statements = {
    getAllMasterPlan: {
            statement :`
            SELECT PLAN_ID,
                   PROJECT_ID,
                   START_DATE,
                   END_DATE,
                   CREATED_BY,
                   CREATION_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   DESCRIPTION,
                   PLAN_STATUS,
                   STATUS,
                   PLAN_PEIODS_IN_WEEKS,
                   VERSION_NO,
                   PLAN_YEAR,
                   REQUEST_NO,
                   ENTERRED_START_DATE,
                   OPERATION_TYPE,
                   WEEK_NO_SERIAL,
                   SERVICE_TYPE
              FROM MASTER_PLAN `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneMasterPlanByID:{
        statement:`
        SELECT PLAN_ID,
               PROJECT_ID,
               START_DATE,
               END_DATE,
               CREATED_BY,
               CREATION_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               DESCRIPTION,
               PLAN_STATUS,
               STATUS,
               PLAN_PEIODS_IN_WEEKS,
               VERSION_NO,
               PLAN_YEAR,
               REQUEST_NO,
               ENTERRED_START_DATE,
               OPERATION_TYPE,
               WEEK_NO_SERIAL,
               SERVICE_TYPE
          FROM MASTER_PLAN
   WHERE  PLAN_ID = :PLAN_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  