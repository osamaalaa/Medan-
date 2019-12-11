let statements = {
  getAllJobOrderLaborsDummy: {
          statement :`SELECT
                              id,
                              code,
                              milestone_id,
                              detail_plan_id,
                              position_id,
                              emp_id,
                              dispatched,
                              created_by,
                              creation_date,
                              asset_action_id,
                              activity_id,
                              dispatch_date
                          FROM
                              job_order_labors_dummy
                                                          `,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
  },

  getOneJobOrderLaborDummyById:{
        statement:`SELECT
                            id,
                            code,
                            milestone_id,
                            detail_plan_id,
                            position_id,
                            emp_id,
                            dispatched,
                            created_by,
                            creation_date,
                            asset_action_id,
                            activity_id,
                            dispatch_date
                        FROM
                            job_order_labors_dummy
                    WHERE id = :ID`,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
  }
}

module.exports = statements ;
