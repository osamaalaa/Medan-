
let statements = {
    getAllDetailPlan: {
            statement :`
            SELECT DETAIL_PLAN_ID,
                   PLAN_ID,
                   ASSET_ACTION_ID,
                   RECURRING_ID,
                   WEEK_NO,
                   WEEK_DATE,
                   CREATED_BY,
                   CREATION_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   MONTHLY_PLAN_STATUS,
                   ASSET_ACTION_DISPATCHED,
                   MILE_ASSET_ACTION_ID,
                   REQUEST_NO,
                   DISPATCH_DATE
              FROM DETAIL_PLAN `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneDetailPlanByID:{
        statement:`SELECT DETAIL_PLAN_ID,
        PLAN_ID,
        ASSET_ACTION_ID,
        RECURRING_ID,
        WEEK_NO,
        WEEK_DATE,
        CREATED_BY,
        CREATION_DATE,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        MONTHLY_PLAN_STATUS,
        ASSET_ACTION_DISPATCHED,
        MILE_ASSET_ACTION_ID,
        REQUEST_NO,
        DISPATCH_DATE
   FROM DETAIL_PLAN
   WHERE  DETAIL_PLAN_ID = :DETAIL_PLAN_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  