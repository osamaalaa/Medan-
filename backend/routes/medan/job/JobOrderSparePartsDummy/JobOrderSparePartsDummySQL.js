
let statements = {
    getAllJobOrderSparePartsDummy: {
            statement :`
            SELECT ID,
                   CODE,
                   MILESTONE_ID,
                   DETAIL_PLAN_ID,
                   ASSET_ACTION_ID,
                   ITEM_ID,
                   ITEM_COUNT,
                   DISPATCHED,
                   ACTIVITY_ID,
                   DISPATCH_DATE
              FROM JOB_ORDER_SPAREPARTS_DUMMY `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneJobOrderSparePartsDummyByID:{
        statement:`
        SELECT ID,
               CODE,
               MILESTONE_ID,
               DETAIL_PLAN_ID,
               ASSET_ACTION_ID,
               ITEM_ID,
               ITEM_COUNT,
               DISPATCHED,
               ACTIVITY_ID,
               DISPATCH_DATE
          FROM JOB_ORDER_SPAREPARTS_DUMMY
   WHERE  ID = :ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  