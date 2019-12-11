
let statements = {
    getAllProjectMembers: {
            statement :`
            SELECT MEMBER_ID,
                   MEMBER_ROLE,
                   STATUS,
                   MEMBER_MANAGER,
                   PROJECT_ID,
                   EMPLOYEE_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID,
                   CREATED_BY,
                   CREATION_DATE
              FROM PROJECT_MEMBERS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneProjectMembersByID:{
        statement:`
        SELECT MEMBER_ID,
               MEMBER_ROLE,
               STATUS,
               MEMBER_MANAGER,
               PROJECT_ID,
               EMPLOYEE_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID,
               CREATED_BY,
               CREATION_DATE
          FROM PROJECT_MEMBERS
   WHERE MEMBER_ID = :MEMBER_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    insertProjectMembers: {
     statement: `
     INSERT INTO PROJECT_MEMBERS (MEMBER_ID,
          MEMBER_ROLE,
          STATUS,
          MEMBER_MANAGER,
          PROJECT_ID,
          EMPLOYEE_ID,
          SUBSIDIARY_ID,
          CREATED_BY,
          CREATION_DATE)
  VALUES (PROJECT_MEMBERS_SEQ.NEXTVAL,
     :MEMBER_ROLE,
     :STATUS,
     :MEMBER_MANAGER,
     :PROJECT_ID,
     :EMPLOYEE_ID,
     :SUBSIDIARY_ID,
     :CREATED_BY,
     sysdate)
     RETURN MEMBER_ROLE, PROJECT_ID INTO :R_MEMBER_ROLE, :R_PROJECT_ID`,
     returns: ["R_MEMBER_ROLE","R_PROJECT_ID"],
     bindings: [],
     qstring: "",
     requireCommit: true
 },

 updateProjectMembers: {
     statement: `
     UPDATE PROJECT_MEMBERS
SET    MEMBER_ID      = :MEMBER_ID,
       MEMBER_ROLE    = :MEMBER_ROLE,
       MEMBER_MANAGER = :MEMBER_MANAGER,
       PROJECT_ID     = :PROJECT_ID,
       EMPLOYEE_ID    = :EMPLOYEE_ID
WHERE  MEMBER_ID      = :MEMBER_ID
       `,
     bindings: [],
     qstring: "",
     requireCommit: true
 },

 projectSponser:{
    statement:`
    select distinct m.employee_id, (select first_name2 from employees e where e.employee_id = m.employee_id ) emp_name from project_members m  where project_id = :project_id `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
},


status : {
    statement:`
    select distinct m.employee_id, (select first_name2 from employees e where e.employee_id = m.employee_id ) emp_name from project_members m  where project_id = :project_id `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
},


RolesAndResponsable:{
    statement:`
    select member_id,
  (select first_name2 ||' '|| s_second_name from employees e where e.employee_id = m.employee_id ) emp_name,
  (select mobile from employees e where e.employee_id = m.employee_id ) mobile,
  (select employee_email from employees e where e.employee_id = m.employee_id ) employee_email,
  (select role_name_en from AOT_SECURITY.ROLES where role_id = member_role) member_role,
  status
 from project_members m  where project_id = :project_id `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
}
   

  }
  
  module.exports = statements ;
  