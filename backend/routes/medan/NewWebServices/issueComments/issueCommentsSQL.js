
let statements = {
    getIssueComments: {
            statement :`SELECT 
            I.COMMENT_ID,
            (select full_path from issue_attachments S where S.comment_id = I.COMMENT_ID ) Path,  I.ISSUE_ID, I.COMMENTS, 
               I.COMMENTS_BY, I.CREATION_DATE, I.MODIFIED_ON, 
               I.MODIFIED_BY, I.DELETED, I.DELETED_BY, 
               I.DELETED_DATE, I.SUBSIDIARY_ID,
               (select full_path from issue_attachments A where A.comment_id  = I.COMMENT_ID) Attach
            FROM HR.ISSUE_COMMENTS I
            where ISSUE_ID = :ISSUE_ID  `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }
}
  module.exports = statements ;
  