let statements = {
  getAllJobOrderDetails: {
          statement :`SELECT
                              job_order_detail_id,
                              job_order_id,
                              activity_action_id,
                              activity_value,
                              created_by,
                              creation_date,
                              deleted,
                              deleted_by,
                              deleted_date,
                              duration,
                              emp_id,
                              done,
                              position_id,
                              replacement_emp_id,
                              not_attend
                          FROM
                              job_order_details
          `,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
  },

  getOneJobOrderDetailsById:{
        statement:`SELECT
                            job_order_detail_id,
                            job_order_id,
                            activity_action_id,
                            activity_value,
                            created_by,
                            creation_date,
                            deleted,
                            deleted_by,
                            deleted_date,
                            duration,
                            emp_id,
                            done,
                            position_id,
                            replacement_emp_id,
                            not_attend
                        FROM
                            job_order_details
                        WHERE job_order_id = :JOB_ORDER_ID`,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
  },

  getJobOrderDetails:{
    statement:`/* Formatted on 09/04/2019 01:02:50 م (QP5 v5.256.13226.35538) */
    SELECT JobOrderDetailsEO.JOB_ORDER_DETAIL_ID,
           JobOrderDetailsEO.ACTIVITY_ACTION_ID,
           JobOrderDetailsEO.ACTIVITY_TYPE_ID,
           JobOrderDetailsEO.ACTION_TAKEN_TYPE,
           JobOrderDetailsEO.ACTIVITY_VALUE,
           JobOrderDetailsEO.JOB_ORDER_ID,
           (SELECT ACTDEF.ACTIVITY_TITLE_EN
              FROM ACTIVITY_ACTIONS actdef
             WHERE     ACTDEF.ACTIVITY_ACTION_ID =
                          JobOrderDetailsEO.ACTIVITY_ACTION_ID
                   AND NVL (ACTDEF.DELETED, 0) = 0)
              AS ACTIVITY_TITLE_EN,
           (SELECT ACTDEF.ACTIVITY_TITLE_AR
              FROM ACTIVITY_ACTIONS actdef
             WHERE     ACTDEF.ACTIVITY_ACTION_ID =
                          JobOrderDetailsEO.ACTIVITY_ACTION_ID
                   AND NVL (ACTDEF.DELETED, 0) = 0)
              AS ACTIVITY_TITLE_AR,
           JobOrderDetailsEO.HOUR_MATER_ASSET_COUNT,
           JobOrderDetailsEO.MINUTE_OR_EQUIB_CATEGORY,
           JobOrderDetailsEO.POSITION_ITEM_ASSET,
           JobOrderDetailsEO.POSITION_ITEM_ASSET_VAL,
           JobOrderDetailsEO.ATT_TEMPLATE_ID,
           JobOrderDetailsEO.DURATION,
           JobOrderDetailsEO.DONE,
           JobOrderDetailsEO.NOT_ATTEND,
           JobOrderDetailsEO.REPLACEMENT_EMP_ID,
           JobOrderDetailsEO.CREATED_BY,
           JobOrderDetailsEO.CREATION_DATE,
           JobOrderDetailsEO.DELETED,
           JobOrderDetailsEO.DELETED_BY,
           JobOrderDetailsEO.DELETED_DATE,
           JobOrderDetailsEO.EVALUATE_PERC,
           JobOrderDetailsEO.S_TARGET_VALUE,
           (SELECT LD.PRIMARY_NAME
              FROM LOOKUP_DETAILS ld
             WHERE     NVL (LD.DELETED, 0) = 0
                   AND LD.LOOKUP_DETAIL_ID =
                          (SELECT ACTDEF.ACTIVITY_TYPE_ID
                             FROM ACTIVITY_ACTIONS actdef
                            WHERE ACTDEF.ACTIVITY_ACTION_ID =
                                     JobOrderDetailsEO.ACTIVITY_ACTION_ID))
              AS ACTIVITY_TYPE_AR,
           (SELECT LD.SECONDARY_NAME
              FROM LOOKUP_DETAILS ld
             WHERE     NVL (LD.DELETED, 0) = 0
                   AND LD.LOOKUP_DETAIL_ID =
                          (SELECT ACTDEF.ACTIVITY_TYPE_ID
                             FROM ACTIVITY_ACTIONS actdef
                            WHERE ACTDEF.ACTIVITY_ACTION_ID =
                                     JobOrderDetailsEO.ACTIVITY_ACTION_ID))
              AS ACTIVITY_TYPE_EN,
           (SELECT LD.SECONDARY_NAME
              FROM LOOKUP_DETAILS ld
             WHERE     NVL (LD.DELETED, 0) = 0
                   AND LD.LOOKUP_DETAIL_ID =
                          (SELECT ACTDEF.ACTION_TAKEN_TYPE
                             FROM ACTIVITY_ACTIONS actdef
                            WHERE ACTDEF.ACTIVITY_ACTION_ID =
                                     JobOrderDetailsEO.ACTIVITY_ACTION_ID))
              AS ACTION_TAKEN_TYPE_EN,
           (SELECT LD.PRIMARY_NAME
              FROM LOOKUP_DETAILS ld
             WHERE     NVL (LD.DELETED, 0) = 0
                   AND LD.LOOKUP_DETAIL_ID =
                          (SELECT ACTDEF.ACTION_TAKEN_TYPE
                             FROM ACTIVITY_ACTIONS actdef
                            WHERE ACTDEF.ACTIVITY_ACTION_ID =
                                     JobOrderDetailsEO.ACTIVITY_ACTION_ID))
              AS ACTION_TAKEN_TYPE_AR,
           (SELECT CASE
                      WHEN JobOrderDetailsEO.ACTION_TAKEN_TYPE <> 24044
                      THEN
                         (SELECT ACTDEF.HOUR_MATER_ASSET_COUNT
                            FROM ACTIVITY_ACTIONS actdef
                           WHERE     NVL (ACTDEF.DELETED, 0) = 0
                                 AND ACTDEF.ACTIVITY_ACTION_ID =
                                        JobOrderDetailsEO.ACTIVITY_ACTION_ID)
                      ELSE
                         NULL
                   END
              FROM DUAL)
              EXPECTED_HOUR,
           (SELECT CASE
                      WHEN JobOrderDetailsEO.ACTION_TAKEN_TYPE = 24044
                      THEN
                         (SELECT ACTDEF.HOUR_MATER_ASSET_COUNT
                            FROM ACTIVITY_ACTIONS actdef
                           WHERE     NVL (ACTDEF.DELETED, 0) = 0
                                 AND ACTDEF.ACTIVITY_ACTION_ID =
                                        JobOrderDetailsEO.ACTIVITY_ACTION_ID)
                      ELSE
                         NULL
                   END
              FROM DUAL)
              ITEM_COUNT,
           (SELECT CASE
                      WHEN JobOrderDetailsEO.ACTION_TAKEN_TYPE = 24042
                      THEN
                         (SELECT POS.SECONDARY_NAME
                            FROM POSITIONS POS
                           WHERE     NVL (POS.DELETED, 0) = 0
                                 AND POS.POSITION_ID =
                                        JobOrderDetailsEO.POSITION_ITEM_ASSET)
                      WHEN JobOrderDetailsEO.ACTION_TAKEN_TYPE = 24043
                      THEN
                         (SELECT AD.ASSET_NAME
                            FROM ASSETS_DEFINITION ad
                           WHERE     NVL (AD.DELETED, 0) = 0
                                 AND AD.ASSET_ID =
                                        JobOrderDetailsEO.POSITION_ITEM_ASSET)
                      WHEN JobOrderDetailsEO.ACTION_TAKEN_TYPE = 24044
                      THEN
                         (SELECT T.EN_NAME
                            FROM items t
                           WHERE     NVL (T.DELETED, 0) = 0
                                 AND T.ITEMS_ID =
                                        JobOrderDetailsEO.POSITION_ITEM_ASSET)
                      ELSE
                         NULL
                   END
              FROM DUAL)
              AS Pos_Item_Asset_Name_En,
           (SELECT CASE
                      WHEN JobOrderDetailsEO.ACTION_TAKEN_TYPE = 24042
                      THEN
                         (SELECT POS.PRIMARY_NAME
                            FROM POSITIONS POS
                           WHERE     NVL (POS.DELETED, 0) = 0
                                 AND POS.POSITION_ID =
                                        JobOrderDetailsEO.POSITION_ITEM_ASSET)
                      WHEN JobOrderDetailsEO.ACTION_TAKEN_TYPE = 24043
                      THEN
                         (SELECT AD.ASSET_NAME
                            FROM ASSETS_DEFINITION ad
                           WHERE     NVL (AD.DELETED, 0) = 0
                                 AND AD.ASSET_ID =
                                        JobOrderDetailsEO.POSITION_ITEM_ASSET)
                      WHEN JobOrderDetailsEO.ACTION_TAKEN_TYPE = 24044
                      THEN
                         (SELECT T.AR_NAME
                            FROM items t
                           WHERE     NVL (T.DELETED, 0) = 0
                                 AND T.ITEMS_ID =
                                        JobOrderDetailsEO.POSITION_ITEM_ASSET)
                      ELSE
                         NULL
                   END
              FROM DUAL)
              AS Pos_Item_Asset_Name_En,
           (SELECT GET_LOOKUP_NAME (JOBORDERDETAILSEO.MINUTE_OR_EQUIB_CATEGORY,
                                    1)
              FROM DUAL)
              measure_unit_name_ar,
           (SELECT GET_LOOKUP_NAME (JOBORDERDETAILSEO.MINUTE_OR_EQUIB_CATEGORY,
                                    2)
              FROM DUAL)
              measure_unit_name_en
      FROM JOB_ORDER_DETAILS JobOrderDetailsEO
     WHERE ( (   ( (JobOrderDetailsEO.DELETED = 0))
              OR ( (JobOrderDetailsEO.DELETED IS NULL))))
    
       and job_order_id = :job_order_id`,
  returns: [],
  bindings: [],
  qstring: "",
  requireCommit: false
}

}

module.exports = statements ;
