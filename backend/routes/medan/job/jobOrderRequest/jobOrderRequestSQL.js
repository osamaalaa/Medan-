let statements = {
  getAllJobOrderRequest: {
          statement :`SELECT
                              job_order_request_id,
                              job_order_id,
                              request_id,
                              asset_action_id,
                              created_by,
                              creation_date,
                              deleted,
                              deleted_by,
                              deleted_date
                          FROM
                              job_order_request
                                                          `,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
  },

  getOneJobOrderRequestById:{
        statement:`SELECT
                          job_order_request_id,
                          job_order_id,
                          request_id,
                          asset_action_id,
                          created_by,
                          creation_date,
                          deleted,
                          deleted_by,
                          deleted_date
                      FROM
                          job_order_request
                    WHERE job_order_id = :JOB_ORDER_ID`,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
  }
}

module.exports = statements ;
