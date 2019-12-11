let statements ={
     getAllissuesassignments : {
         statment :`SELECT
                      assignment_id,
                      issue_id,
                      assignment_status,
                      assignment_open,
                      assignment_date,
                      assignment_comments,
                      employee_id,
                      deleted,
                      deleted_by,
                      deleted_date,
                      subsidiary_id
                  FROM
                      issue_assignments
                      `,

         returns: [],
         bindings: [],
         qstring: "",
         requireCommit: false
     },

     getAllissuesassignmentsByID : {
         statment :`SELECT
            assignment_id,
            issue_id,
            assignment_status,
            assignment_open,
            assignment_date,
            assignment_comments,
            employee_id,
            deleted,
            deleted_by,
            deleted_date,
            subsidiary_id
        FROM
            issue_assignments
        WHERE assignment_id = :ASSIGNMENT_ID
  `,

         returns: [],
         bindings: [],
         qstring: "",
         requireCommit: false
     }


}


module.exports = statements ;
