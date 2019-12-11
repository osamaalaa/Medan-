let statements = {
    getAllViolationGroups: {
                    statement: `  SELECT
                          violation_group_id,
                          code,
                          title_en,
                          title_ar,
                          notes,
                          created_by,
                          creation_date,
                          deleted,
                          deleted_by,
                          deleted_date,
                          classification
                      FROM
                          VIOLATION_GROUP
            `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
          },
          getoneViolationGroup:{
        statment:`
        SELECT
            violation_group_id,
            code,
            title_en,
            title_ar,
            notes,
            created_by,
            creation_date,
            deleted,
            deleted_by,
            deleted_date,
            classification
        FROM
            VIOLATION_GROUP
    WHERE violation_group_id =:VIOLATION_GROUP_ID`,
            bindings: [],
            qstring: "",
            requireCommit: false
        }
}

module.exports = statements;
