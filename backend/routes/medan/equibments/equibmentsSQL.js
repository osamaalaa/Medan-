
let statements = {
    getEquibments: {
        statement: `
SELECT JobOrderAssetsEO.ACTIVITY_ID,
       JobOrderAssetsEO.ASSET_ACTION_ID,
       JobOrderAssetsEO.ASSET_CATEGORY,
       JobOrderAssetsEO.ASSET_COUNT,
       JobOrderAssetsEO.ASSET_ID,
       (SELECT AD.ASSET_NAME
          FROM ASSETS_DEFINITION ad
         WHERE     NVL (AD.DELETED, 0) = 0
               AND AD.CATEGORY IN (SELECT LD.LOOKUP_DETAIL_ID
                                     FROM LOOKUP_DETAILS ld
                                    WHERE     LD.LOOKUP_ID = 199
                                          AND NVL (LD.DELETED, 0) = 0)
               AND AD.ASSET_ID = JobOrderAssetsEO.ASSET_ID)
          asset_name,
       (SELECT LD.PRIMARY_NAME
          FROM LOOKUP_DETAILS ld
         WHERE     LD.LOOKUP_DETAIL_ID = JobOrderAssetsEO.ASSET_CATEGORY
               AND NVL (LD.DELETED, 0) = 0)
          asset_category_name_ar,
       (SELECT d.SECONDARY_NAME
          FROM LOOKUP_DETAILS d
         WHERE     d.LOOKUP_DETAIL_ID = JobOrderAssetsEO.ASSET_CATEGORY
               AND NVL (d.DELETED, 0) = 0)
          asset_category_name_en,
       JobOrderAssetsEO.CODE,
       JobOrderAssetsEO.CREATED_BY,
       JobOrderAssetsEO.CREATION_DATE,
       JobOrderAssetsEO.DELETED,
       JobOrderAssetsEO.DELETED_BY,
       JobOrderAssetsEO.DELETED_DATE,
       JobOrderAssetsEO.DETAIL_PLAN_ID,
       JobOrderAssetsEO.JOB_ORDER_ASSET_ID,
       JobOrderAssetsEO.JOB_ORDER_ID,
       JobOrderAssetsEO.MILESTONE_ID,
       JobOrderAssetsEO.REQUEST_ID
  FROM JOB_ORDER_ASSETS JobOrderAssetsEO
 WHERE ( JobOrderAssetsEO.DELETED = 0 OR JobOrderAssetsEO.DELETED IS NULL )
 and JOBORDERASSETSEO.JOB_ORDER_ID=:p_job_order_id `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
}

module.exports = statements;
