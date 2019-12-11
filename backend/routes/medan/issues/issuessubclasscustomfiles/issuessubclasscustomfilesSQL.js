let statements ={
   getAllIssuesSubClassFiles :{
       statement :`SELECT
    issues_sub_class_c_f_id,
    issues_sub_class_id,
    custom_field_id,
    field_label_ar,
    field_label_en,
    field_widh,
    active
FROM
    issues_sub_class_custom_fields
       `,
       bindings :[],
       qstring : "",
       requireCommit : false
   },
   getAllIssuesSubClassFilesByID :{
           statement : `SELECT
                issues_sub_class_c_f_id,
                issues_sub_class_id,
                custom_field_id,
                field_label_ar,
                field_label_en,
                field_widh,
                active
            FROM
                issues_sub_class_custom_fields

                WHERE issues_sub_class_id = :ISSUES_SUB_CLASS_ID
           `,
           bindings :[],
           qstring : "",
           requireCommit : false

   },

}

module.exports = statements ;
