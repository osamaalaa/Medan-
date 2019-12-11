let statements = {
  getAllJobOrderLabor: {
          statement :`SELECT
                          job_order_labor_id,
                          code,
                          job_order_id,
                          request_id,
                          asset_action_id,
                          position_id,
                          emp_id,
                          created_by,
                          creation_date,
                          deleted,
                          deleted_by,
                          deleted_date,
                          milestone_id,
                          detail_plan_id
                      FROM
                          job_order_labors
                                `,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
  },

  getOneJobOrderLaborById:{
        statement:`SELECT
                        job_order_labor_id,
                        code,
                        job_order_id,
                        request_id,
                        asset_action_id,
                        position_id,
                        emp_id,
                        created_by,
                        creation_date,
                        deleted,
                        deleted_by,
                        deleted_date,
                        milestone_id,
                        detail_plan_id
                    FROM
                        job_order_labors
                    WHERE job_order_id = :JOB_ORDER_ID`,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
  }
}

module.exports = statements ;
