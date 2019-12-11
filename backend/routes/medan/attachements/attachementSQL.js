let statements ={
  insertnewfile: {
    statement: `
    INSERT INTO issue_attachments (
        attach_id,
        attach_title,
        creation_date,
        file_name,
        file_id,
        full_path,
        issue_id,
        comment_id
        )
    VALUES (
        ISSUE_ATTACMENTS_SEQ.NEXTVAL,
        :attach_title,
        sysdate,
        :file_name,
        :file_id,
        :full_path,
        NVL(:issue_id, (select issue_id from issue_comments where comment_id = :comment_id) ),
        NVL(:comment_id, NULL)
    )
    RETURN attach_title , file_name , file_id , full_path, issue_id , comment_id INTO  :R_attach_title , :R_file_name , :R_file_id , :R_full_path, :R_issue_id, :R_comment_id
    `,
    returns: ["R_attach_title" , "R_file_name", "R_file_id" , "R_full_path", "R_issue_id", "R_comment_id"],
    bindings: [],
    qstring: "",
    requireCommit: true
    },
  getfile:{
    statement:`SELECT attach_id, attach_title, creation_date, file_name, file_id, full_path, issue_id, comment_id FROM issue_attachments where issue_id = :issue_id `,
   bindings :[],
   qstring : "",
   requireCommit : false
 }
};


//,
//  whereConditions: {
//   issueWhere: 'issue_id = :ISSUE_ID ',
//   commentWhere: 'comment_id = :COMMENT_ID '
// }
module.exports = statements ;
