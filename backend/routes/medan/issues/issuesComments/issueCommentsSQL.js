let statements={
  getAllIssuesComments :{
    statement : `SELECT
            comment_id,
            issue_id,
            comments,
            comments_by,
            creation_date,
            modified_on,
            modified_by,
            deleted,
            deleted_by,
            deleted_date,
            subsidiary_id
        FROM
            issue_comments
            `,
    bindings :[],
    qstring : "",
    requireCommit : false
  },
  insertNewIssueComments: {
        statement: `
        INSERT INTO issue_comments (
                      comment_id,
                      issue_id,
                      comments,
                      comments_by,
                      creation_date

                  ) VALUES (
                      ISSUE_COMMENT_SEQ.NEXTVAL,
                      :ISSUE_ID,
                      :COMMENTS,
                      :COMMENTS_BY,
                      sysdate
                  )
                RETURN comment_id, ISSUE_ID, COMMENTS  INTO :R_comment_id, :R_ISSUE_ID, :R_COMMENTS`,
        returns: ["R_comment_id", "R_ISSUE_ID", "R_COMMENTS"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
  getIssuesCommentsByID :{
         statement :`SELECT
                comment_id,
                issue_id,
                comments,
                comments_by,
                creation_date,
                modified_on,
                modified_by,
                deleted,
                deleted_by,
                deleted_date,
                subsidiary_id
            FROM
                issue_comments
          WHERE issue_id = :issue_id
         `,
         bindings :[],
         qstring : "",
         requireCommit : false
  }
}

module.exports = statements;
