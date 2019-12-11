
let statements = {
    getAllJobOrderServices: {
            statement :`
            SELECT JOB_ORDER_SERVICE_ID,
                   JOB_ORDER_DEF_ID,
                   ACTIVITY_ID,
                   SUPERVISOR_ID,
                   ACT_HOURS,
                   ACT_MINUTES,
                   ACT_START_DATE,
                   ACT_END_DATE,
                   ASSET_ID,
                   ACTION_ID,
                   SERVICE_DESCRIPTION,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM JOB_ORDER_SERVICES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneJobOrderServicesByID:{
        statement:` 
        SELECT JOB_ORDER_SERVICE_ID,
               JOB_ORDER_DEF_ID,
               ACTIVITY_ID,
               SUPERVISOR_ID,
               ACT_HOURS,
               ACT_MINUTES,
               ACT_START_DATE,
               ACT_END_DATE,
               ASSET_ID,
               ACTION_ID,
               SERVICE_DESCRIPTION,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM JOB_ORDER_SERVICES
   WHERE  JOB_ORDER_SERVICE_ID = :JOB_ORDER_SERVICE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

getJobCateg:{
      statement:` 
      SELECT JOD.MINUTE_OR_EQUIB_CATEGORY,
      GET_LOOKUP_NAME (JOD.MINUTE_OR_EQUIB_CATEGORY, 2),
      SUM (JOD.HOUR_MATER_ASSET_COUNT) AS item_count
 FROM job_order_details jod
WHERE     NVL (JOD.DELETED, 0) = 0
      AND JOD.ACTION_TAKEN_TYPE = 24044
      AND JOD.JOB_ORDER_ID IN (SELECT JO.JOB_ORDER_ID
                                 FROM job_orders jo
                                WHERE     NVL (JO.DELETED, 0) = 0
                                      AND JO.ACTION_DEF_ID IN (SELECT AD.ACTION_ID
                                                                 FROM ACTIONS_DEFINITION ad
                                                                WHERE     NVL (
                                                                             AD.DELETED,
                                                                             0) =
                                                                             0
                                                                      AND AD.SERVICE_ID IN (SELECT S.SERVICE_ID
                                                                                              FROM SERVICES s
                                                                                             WHERE     NVL (
                                                                                                          S.DELETED,
                                                                                                          0) =
                                                                                                          0
                                                                                                   AND S.TYPE =
                                                                                                          :p_service_type)))
                                                                                                    GROUP BY JOD.MINUTE_OR_EQUIB_CATEGORY `,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
  },
  getLaborNo:{
    statement:` 
    SELECT COUNT (*) AS labor_no
  FROM job_order_details jod
 WHERE     NVL (JOD.DELETED, 0) = 0
       AND JOD.ACTION_TAKEN_TYPE = 24042
       AND JOD.JOB_ORDER_ID IN (SELECT JO.JOB_ORDER_ID
                                  FROM job_orders jo
                                 WHERE     NVL (JO.DELETED, 0) = 0
                                       AND JO.ACTION_DEF_ID IN (SELECT AD.ACTION_ID
                                                                  FROM ACTIONS_DEFINITION ad
                                                                 WHERE     NVL (
                                                                              AD.DELETED,
                                                                              0) =
                                                                              0
                                                                       AND AD.SERVICE_ID IN (SELECT S.SERVICE_ID
                                                                                               FROM SERVICES s
                                                                                              WHERE     NVL (
                                                                                                           S.DELETED,
                                                                                                           0) =
                                                                                                           0
                                                                                                    AND S.TYPE =
                                                                                                           :p_service_type))) `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
},
getEquibCount:{
  statement:` 
  SELECT COUNT (*) equib_count
  FROM job_order_details jod
 WHERE     NVL (JOD.DELETED, 0) = 0
       AND JOD.ACTION_TAKEN_TYPE = 24043
       AND JOD.JOB_ORDER_ID IN (SELECT JO.JOB_ORDER_ID
                                  FROM job_orders jo
                                 WHERE     NVL (JO.DELETED, 0) = 0
                                       AND JO.ACTION_DEF_ID IN (SELECT AD.ACTION_ID
                                                                  FROM ACTIONS_DEFINITION ad
                                                                 WHERE     NVL (
                                                                              AD.DELETED,
                                                                              0) =
                                                                              0
                                                                       AND AD.SERVICE_ID IN (SELECT S.SERVICE_ID
                                                                                               FROM SERVICES s
                                                                                              WHERE     NVL (
                                                                                                           S.DELETED,
                                                                                                           0) =
                                                                                                           0
                                                                                                    AND S.TYPE =
                                                                                                           :p_service_type))) `,
  returns: [],
  bindings: [],
  qstring: "",
  requireCommit: false
}




  }
  
  module.exports = statements ;
  