let statements={
  getAlllookUps :{
    statement : `SELECT
                lookup_app_id,
                lookup_master_id,
                application_id,
                creation_daete
            FROM
                lookup_apps
                          `,
    bindings :[],
    qstring : "",
    requireCommit : false
  },
  getOneLookUpAppsByID :{
         statement :`SELECT
                    lookup_app_id,
                    lookup_master_id,
                    application_id,
                    creation_daete
                FROM
                    lookup_apps
          WHERE lookup_app_id = :LOOKUP_APP_ID
         `,
         bindings :[],
         qstring : "",
         requireCommit : false
  }
}

module.exports = statements;
