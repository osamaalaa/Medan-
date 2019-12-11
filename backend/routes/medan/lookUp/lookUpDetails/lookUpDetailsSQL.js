let statements = {
    getAlllookUpDetails: {
            statement: `SELECT
            lookup_detail_id,
            lookup_id,
            user_code,
            primary_name,
            secondary_name,
            status,
            deleted,
            deleted_by,
            deleted_date,
            subsidiary_id,
            creation_date,
            system_field
        FROM
            LOOKUP_DETAILS
            `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
          },
          getOnelookUpDetails:{
        statment:`
        SELECT
            lookup_detail_id,
            lookup_id,
            user_code,
            primary_name,
            secondary_name,
            status,
            deleted,
            deleted_by,
            deleted_date,
            subsidiary_id,
            creation_date,
            system_field
        FROM
            lookup_details
    WHERE lookup_detail_id =:LOOKUP_DETAIL_ID`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        getOnelookUpDetailsWithLookUpID:{
      statment:`
      SELECT
          lookup_detail_id,
          lookup_id,
          user_code,
          primary_name,
          secondary_name,
          status,
          deleted,
          deleted_by,
          deleted_date,
          subsidiary_id,
          creation_date,
          system_field
      FROM
          lookup_details
  WHERE lookup_id =:LOOKUP_ID`,
          bindings: [],
          qstring: "",
          requireCommit: false
      }
}

module.exports = statements;
