let statements = {
  getAllJobOrderAssets: {
          statement :`SELECT
                              id,
                              code,
                              milestone_id,
                              detail_plan_id,
                              asset_id,
                              rule_setting_id,
                              dispatched,
                              asset_action_id,
                              activity_id,
                              dispatch_date,
                              created_by,
                              creation_date
                          FROM
                              job_order_assets_dummy
          `,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
  },

  getJobOrderAsset :{
      statement :`select * from job_order_assets`,
      bindings: [],
      qstring: "",
      requireCommit: false

  },

  
  getOneJobOrderAssetsById:{
        statement:`SELECT
                            id,
                            code,
                            milestone_id,
                            detail_plan_id,
                            asset_id,
                            rule_setting_id,
                            dispatched,
                            asset_action_id,
                            activity_id,
                            dispatch_date,
                            created_by,
                            creation_date
                        FROM
                            job_order_assets_dummy
                        WHERE id = :ID`,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
  }
}

module.exports = statements ;
