let statements = {
    getAllViolationDetailsGroups: {
            statement: `
                    SELECT
               VIOLATION_ID,
               CODE,
               TITLE_EN,
               TITLE_AR,
               NOTES,
               VIOLATION_GROUP_ID,
               CREATED_BY,
               CREATION_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               VALUE,
               CLASSIFICATION_ID
          FROM
          VIOLATION_GROUP_DETAILS
            `,
            bindings: [],
            qstring: "",
            requireCommit: false
          },
          getOneViolationDetailsGroups:{
        statment:`  SELECT
                  violation_id,
                  code,
                  title_en,
                  title_ar,
                  notes,
                  violation_group_id,
                  created_by,
                  creation_date,
                  deleted,
                  deleted_by,
                  deleted_date,
                  value,
                  classification_id
              FROM
                  violation_group_details
    WHERE violation_group_id =:VIOLATION_GROUP_ID`,
            bindings: [],
            qstring: "",
            requireCommit: false
        }
}

module.exports = statements;
