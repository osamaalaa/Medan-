let statements={
    getUserPass:{
        statement:`select t.user_name, t.user_password from AOT_SECURITY.USERS_ACCOUNTS t where t.deleted = 0 and t.user_name = :USER_NAME`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getUserData:{
        statement:`select t.USER_NAME, t.USER_ID  , t.EMPLOYEE_ID , t.LAST_LOGIN_DATE , t.SUBSIDIARY_ID , t.POSITION ,t.USER_EMAIL ,
        (select c.first_name ||' '|| c.last_name from AOT_GEN.employees c where c.EMPLOYEE_ID = t.EMPLOYEE_ID ) arabic_name ,
        (select c.first_name2 ||' '|| c.s_last_name from AOT_GEN.employees c where c.EMPLOYEE_ID = t.EMPLOYEE_ID) en_name,
        t.USER_MOBILE ,t.APP_EMAIL, t.ADDRESS_BOX_ID, 
        ( select max(secondary_name) from lookup_details where lookup_id in (select lookup_id from lookup_details where lookup_detail_id in (select distinct (member_role) from meeting_members where employee_id = t.EMPLOYEE_ID))) role
           from AOT_SECURITY.USERS_ACCOUNTS t
         where t.deleted = 0  and t.user_name = :USER_NAME`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    updateUserPass:{
       statement:`update AOT_SECURITY.USERS_ACCOUNTS t set user_password = :USER_PASSWORD where user_name = :USER_NAME `,
       returns: [],
       bindings: [],
       qstring: "",
       requireCommit: true
   },
     getPriv:{
       statement: `
       SELECT

               a.employee_id,
               a.user_name,
               a.login_ip,
               a.user_email,
               a.user_mobile,
               a.app_email
           FROM
               aot_security.users_accounts    a
           WHERE
               a.user_name = :USER_NAME
                 `,

       returns: [],
       bindings: [],
       qstring: "",
       requireCommit: false
     }


};

module.exports = statements;


//---------------

// SELECT
//         b.mobile_app,
//         b.auto_disable,
//         b.privilege_status,
//         b.deleted,
//         b.creation_date,
//         b.created_by,
//         b.end_date,
//         b.start_date,
//         b.delete_flag,
//         b.update_flag,
//         b.insert_flag,
//         b.select_flag,
//         b.user_id,
//         b.sec_privilege_id,
//         b.search_flag,
//         b.user_priv_id,
//         a.user_id,
//         a.employee_id,
//         a.subsidiary_id,
//         a.user_name,
//         a.user_password,
//         a.color_patern,
//         a.status,
//         a.change_pass_flag,
//         a.user_type,
//         a.default_lang,
//         a.position,
//         a.login_ip,
//         a.last_login_date,
//         a.creation_date,
//         a.created_by,
//         a.deleted,
//         a.deleted_by,
//         a.deleted_date,
//         a.application_id,
//         a.user_email,
//         a.user_mobile,
//         a.app_email,
//         a.address_box_id
//     FROM
//         aot_security.user_privileges   b,
//         aot_security.users_accounts    a
//     WHERE
//         a.user_id = b.user_id
