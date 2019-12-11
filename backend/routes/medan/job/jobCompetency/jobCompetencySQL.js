let statements = {
  getAllJobCompetency: {
          statement :`SELECT
                            id,
                            job_id,
                            status,
                            competence_group,
                            deleted,
                            deleted_by,
                            deleted_date
                        FROM
                            job_competency
          `,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
  },

  getOneJobComptencyByJobId:{
        statement:`SELECT
                        id,
                        job_id,
                        status,
                        competence_group,
                        deleted,
                        deleted_by,
                        deleted_date
                    FROM
                        job_competency
                    WHERE job_id = :JOB_ID`,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
  }
}

module.exports = statements ;
