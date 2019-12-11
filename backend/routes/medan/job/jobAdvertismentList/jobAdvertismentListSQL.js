let statements = {
  getAllJobAdvertisments: {
          statement :`SELECT
                              id,
                              job_id,
                              is_public,
                              open_position_number,
                              status,
                              created_by,
                              creation_date,
                              start_date,
                              end_date,
                              is_urgent,
                              comments_to_hr,
                              sent_flag,
                              deleted,
                              deleted_by,
                              deleted_date
                          FROM
                              job_advertisement_list
          `,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
  },

  getOneJobAdvertismentsByJobId:{
      statement:`SELECT
                      id,
                      job_id,
                      is_public,
                      open_position_number,
                      status,
                      created_by,
                      creation_date,
                      start_date,
                      end_date,
                      is_urgent,
                      comments_to_hr,
                      sent_flag,
                      deleted,
                      deleted_by,
                      deleted_date
                  FROM
                      job_advertisement_list
                    WHERE job_id = :JOB_ID`,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
  }
}

module.exports = statements ;
