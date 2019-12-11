let statements ={
    getAllissuessubclassification :{
             statement :`SELECT
    classification_id,
    look_up_id,
    created_by,
    deleted,
    deleted_by,
    en_name,
    ar_name,
    notes,
    creation_date
FROM
    issues_sub_classification 
    WHERE NVL( DELETED , 0 ) = 0 
               `,
               bindings: [],
               qstring :"",
               requireCommit: false
    },
    getAllissuessubclassificationByID :{
      statement : `SELECT
            classification_id,
            look_up_id,
            created_by,
            deleted,
            deleted_by,
            en_name,
            ar_name,
            notes,
            creation_date
            FROM
                issues_sub_classification
            WHERE classification_id = :CLASSIFICATION_ID AND NVL( DELETED , 0 ) = 0 `,
 bindings: [],
 qstring :"",
 requireCommit: false
    }
}

module.exports = statements;
