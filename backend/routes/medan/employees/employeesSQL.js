let statements={
     getAllEmployees:{
         statement:`SELECT
    employee_id,
    user_code,
    subsidiary_id,
    department_id,
    position_id,
    sex_detail,
    religion_l_detail_id,
    marital_l_detail_id,
    nationality_l_detail_id,
    manager_id,
    first_name,
    second_name,
    third_name,
    last_name,
    first_name2,
    s_second_name,
    s_third_name,
    s_last_name,
    date_of_birth,
    hire_date,
    actual_hire_date,
    termenation_date,
    employee_email,
    national_id,
    passport_no,
    visa_no,
    border_no,
    phone,
    mobile,
    national_id_expiration,
    formal_code,
    status,
    image,
    visa_expire_date,
    employee_type,
    deleted,
    deleted_date,
    deleted_by,
    date_of_birth_h,
    hire_date_h,
    actual_hire_date_h,
    termenation_date_h,
    visa_expire_date_h,
    employee_contractor_type,
    internal_contractor_id,
    is_there_disability,
    leaving_reason,
    job_in_identification,
    national_id_place,
    national_id_issue_date,
    national_id_issue_date_hg,
    iqama_issue_date,
    iqama_issue_date_hg,
    iqama_expire_date,
    iqama_expire_date_hg,
    insurance_policy_no,
    insurancepolicy_expire_date
FROM
    employees
    `,

         returns: [],
         bindings: [],
         qstring: "",
         requireCommit: false


     },
  getEmpsNames : {
      statement :`select first_name, second_name, third_name, last_name from employees e where nvl(e.deleted,0)=0`,
      bindings: [],
      qstring: "",
      requireCommit: false
  },


     getOneEmployeeByID:{
           statement:`SELECT
    employee_id,
    user_code,
    subsidiary_id,
    department_id,
    position_id,
    sex_detail,
    religion_l_detail_id,
    marital_l_detail_id,
    nationality_l_detail_id,
    manager_id,
    first_name,
    second_name,
    third_name,
    last_name,
    first_name2,
    s_second_name,
    s_third_name,
    s_last_name,
    date_of_birth,
    hire_date,
    actual_hire_date,
    termenation_date,
    employee_email,
    national_id,
    passport_no,
    visa_no,
    border_no,
    phone,
    mobile,
    national_id_expiration,
    formal_code,
    status,
    image,
    visa_expire_date,
    employee_type,
    deleted,
    deleted_date,
    deleted_by,
    date_of_birth_h,
    hire_date_h,
    actual_hire_date_h,
    termenation_date_h,
    visa_expire_date_h,
    employee_contractor_type,
    internal_contractor_id,
    is_there_disability,
    leaving_reason,
    job_in_identification,
    national_id_place,
    national_id_issue_date,
    national_id_issue_date_hg,
    iqama_issue_date,
    iqama_issue_date_hg,
    iqama_expire_date,
    iqama_expire_date_hg,
    insurance_policy_no,
    insurancepolicy_expire_date
FROM
    employees
WHERE employee_id = :EMPLOYEE_ID
  `,
           returns: [],
           bindings: [],
           qstring: "",
           requireCommit: false


     }

}


module.exports = statements;
