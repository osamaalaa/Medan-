let statements={
    getAllissuesattachments :{
       statement:`SELECT
    attach_id,
    attach_title,
    created_by,
    creation_date,
    file_name,
    comment_id,
    issue_id,
    deleted,
    deleted_by,
    deleted_date,
    file_id,
    subsidiary_id,
    FULL_PATH
FROM
    issue_attachments
       `,
       bindings :[],
       qstring : "",
       requireCommit : false
    },

    getOneissuesattachmentsByID :{
        statement :`SELECT
    attach_id,
    attach_title,
    created_by,
    creation_date,
    file_name,
    comment_id,
    issue_id,
    deleted,
    deleted_by,
    deleted_date,
    file_id,
    subsidiary_id,
    FULL_PATH
FROM
    issue_attachments
    WHERE attach_id = :ATTACH_ID
        `,
        bindings :[],
        qstring : "",
        requireCommit : false
    },

    getOneissuesattachmentsByIssueID :{
        statement :`SELECT
    attach_id,
    attach_title,
    created_by,
    creation_date,
    file_name,
    comment_id,
    issue_id,
    deleted,
    deleted_by,
    deleted_date,
    file_id,
    subsidiary_id,
    FULL_PATH
FROM
    issue_attachments
    WHERE issue_id = :ISSUE_ID
        `,
        bindings :[],
        qstring : "",
        requireCommit : false
    },

    getOneissuesattachmentsByCommentID :{
        statement :`SELECT
    attach_id,
    attach_title,
    created_by,
    creation_date,
    file_name,
    comment_id,
    issue_id,
    deleted,
    deleted_by,
    deleted_date,
    file_id,
    subsidiary_id,
    FULL_PATH
FROM
    issue_attachments
    WHERE comment_id = :COMMENT_ID
        `,
        bindings :[],
        qstring : "",
        requireCommit : false
    }


}


module.exports = statements ;
