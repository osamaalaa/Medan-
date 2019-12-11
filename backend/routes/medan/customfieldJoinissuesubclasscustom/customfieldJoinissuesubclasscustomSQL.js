let statements ={
     getCustomfieldsJoinIssuesCustom :{
          statement :`SELECT
          f.issues_sub_class_c_f_id,
          f.issues_sub_class_id,
          f.custom_field_id,
          f.field_label_ar,
          f.field_label_en,
          f.field_widh,
          f.active,
          c.FIELD_NAME,
          C.FIELD_TYPE
       FROM
          issues_sub_class_custom_fields f ,
          custom_fields c
          WHERE f.issues_sub_class_id = :ISSUES_SUB_CLASS_ID
          AND c.field_id = f.custom_field_id
          and f.active = 1 `,
          bindings :[],
          qstring : "",
          requireCommit : false
          
          
     }

}

module.exports = statements ;