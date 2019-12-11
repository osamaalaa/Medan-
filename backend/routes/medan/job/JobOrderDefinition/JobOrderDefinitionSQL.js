
let statements = {
    getAllJobOrderDefinition: {
            statement :`
            SELECT JOB_ORDER_DEF_ID,
                   DESCRIPTION,
                   CREATED_BY,
                   CREATION_DATE,
                   JOB_ORDER_DEF_STATUS,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUPERVISOR2_ID,
                   SUPERVISOR1_ID,
                   NOTES,
                   SERVICE_TYPE_ID,
                   PROJECT_ID,
                   BOQ_ID,
                   EXP_START_DATE,
                   EXP_END_DATE,
                   CODE,
                   MAINTENANCE_TYPE_ID,
                   ORDER_TITLE_EN,
                   ASSET_ID,
                   ORDER_TITLE_AR
              FROM JOB_ORDERS_DEFINITION `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneJobOrderDefinitionByID:{
        statement:`
        SELECT JOB_ORDER_DEF_ID,
               DESCRIPTION,
               CREATED_BY,
               CREATION_DATE,
               JOB_ORDER_DEF_STATUS,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUPERVISOR2_ID,
               SUPERVISOR1_ID,
               NOTES,
               SERVICE_TYPE_ID,
               PROJECT_ID,
               BOQ_ID,
               EXP_START_DATE,
               EXP_END_DATE,
               CODE,
               MAINTENANCE_TYPE_ID,
               ORDER_TITLE_EN,
               ASSET_ID,
               ORDER_TITLE_AR
          FROM JOB_ORDERS_DEFINITION
   WHERE  JOB_ORDER_DEF_ID = :JOB_ORDER_DEF_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  