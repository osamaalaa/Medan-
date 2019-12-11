let statements = {
  getAllJobName: {
          statement :`SELECT
                            id,
                            position_id,
                            job_name_en,
                            job_name_ar,
                            experience_years,
                            religion,
                            salary_max,
                            created_by,
                            creation_date,
                            status,
                            job_skills,
                            responsibility,
                            job_code,
                            technical_id,
                            deleted,
                            deleted_by,
                            deleted_date
                        FROM
                            job_name
          `,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
  },

  getOneJobNameById:{
        statement:`SELECT
                          id,
                          position_id,
                          job_name_en,
                          job_name_ar,
                          experience_years,
                          religion,
                          salary_max,
                          created_by,
                          creation_date,
                          status,
                          job_skills,
                          responsibility,
                          job_code,
                          technical_id,
                          deleted,
                          deleted_by,
                          deleted_date
                      FROM
                          job_name
                    WHERE id = :ID`,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
  }
}

module.exports = statements ;
