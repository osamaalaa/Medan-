
let statements = {
    getAllJobOrderSpareParts: {
            statement :`
            SELECT JOB_ORDER_SPAREPARTS_ID,
                   CODE,
                   JOB_ORDER_ID,
                   REQUEST_ID,
                   ASSET_ACTION_ID,
                   INV_ITEM_ID,
                   ITEM_COUNT,
                   CREATED_BY,
                   CREATION_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   DETAIL_PLAN_ID,
                   MILESTONE_ID
              FROM JOB_ORDER_SPAREPARTS  `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneJobOrderSparePartsByID:{
        statement:`
        SELECT JOB_ORDER_SPAREPARTS_ID,
               CODE,
               JOB_ORDER_ID,
               REQUEST_ID,
               ASSET_ACTION_ID,
               INV_ITEM_ID,
               ITEM_COUNT,
               CREATED_BY,
               CREATION_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               DETAIL_PLAN_ID,
               MILESTONE_ID
          FROM JOB_ORDER_SPAREPARTS
   WHERE  JOB_ORDER_SPAREPARTS_ID = :JOB_ORDER_SPAREPARTS_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getSpareParts: {
     statement :`
     SELECT JobOrderSparepartsEO.ASSET_ACTION_ID, 
       JobOrderSparepartsEO.CODE, 
       JobOrderSparepartsEO.CREATED_BY, 
       JobOrderSparepartsEO.CREATION_DATE, 
       JobOrderSparepartsEO.DELETED, 
       JobOrderSparepartsEO.DELETED_BY, 
       JobOrderSparepartsEO.DELETED_DATE, 
       JobOrderSparepartsEO.DETAIL_PLAN_ID, 
       JobOrderSparepartsEO.INV_ITEM_ID, 
       JobOrderSparepartsEO.ITEM_COUNT, 
       JobOrderSparepartsEO.JOB_ORDER_ID, 
       JobOrderSparepartsEO.JOB_ORDER_SPAREPARTS_ID, 
       JobOrderSparepartsEO.MILESTONE_ID, 
       JobOrderSparepartsEO.REQUEST_ID, 
       (select T.EN_NAME from INVENTORY.ITEMS t where T.ITEMS_ID=JobOrderSparepartsEO.INV_ITEM_ID and nvl(T.DELETED,0)=0) AS item_name_en, 
       (select T.AR_NAME from INVENTORY.ITEMS t where T.ITEMS_ID=JobOrderSparepartsEO.INV_ITEM_ID and nvl(T.DELETED,0)=0) AS item_name_ar,
       JobOrderSparepartsEO.ACTIVITY_ID
FROM  JOB_ORDER_SPAREPARTS JobOrderSparepartsEO
where JobOrderSparepartsEO.DELETED = 0 OR JobOrderSparepartsEO.DELETED IS NULL  `,
     returns: [],
     bindings: [],
     qstring: "",
     requireCommit: false
},

getAllSpareParts: {
     statement :`SELECT JobOrderSparepartsEO.ASSET_ACTION_ID, 
     JobOrderSparepartsEO.CODE, 
     JobOrderSparepartsEO.CREATED_BY, 
     JobOrderSparepartsEO.CREATION_DATE, 
     JobOrderSparepartsEO.DELETED, 
     JobOrderSparepartsEO.DELETED_BY, 
     JobOrderSparepartsEO.DELETED_DATE, 
     JobOrderSparepartsEO.DETAIL_PLAN_ID, 
     JobOrderSparepartsEO.INV_ITEM_ID, 
     JobOrderSparepartsEO.ITEM_COUNT, 
     JobOrderSparepartsEO.JOB_ORDER_ID, 
     JobOrderSparepartsEO.JOB_ORDER_SPAREPARTS_ID, 
     JobOrderSparepartsEO.MILESTONE_ID, 
     JobOrderSparepartsEO.REQUEST_ID, 
     (select T.EN_NAME from INVENTORY.ITEMS t where T.ITEMS_ID=JobOrderSparepartsEO.INV_ITEM_ID and nvl(T.DELETED,0)=0) AS item_name_en, 
     (select T.AR_NAME from INVENTORY.ITEMS t where T.ITEMS_ID=JobOrderSparepartsEO.INV_ITEM_ID and nvl(T.DELETED,0)=0) AS item_name_ar,
     JobOrderSparepartsEO.ACTIVITY_ID
FROM  JOB_ORDER_SPAREPARTS JobOrderSparepartsEO
where (JobOrderSparepartsEO.DELETED = 0 OR JobOrderSparepartsEO.DELETED IS NULL)
and  JOBORDERSPAREPARTSEO.JOB_ORDER_ID=:p_job_order_id  `,
     returns: [],
     bindings: [],
     qstring: "",
     requireCommit: false
}
  }
  
  module.exports = statements ;
  