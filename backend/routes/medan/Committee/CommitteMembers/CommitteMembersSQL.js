
let statements = {
    getAllCommitteMembers: {
            statement :`
            SELECT COMMITTEE_MEMBERS_ID,
                   COMMITTEE_ID,
                   MEMBER_ROLE,
                   STATUS,
                   CREATED_BY,
                   CREATION_DATE,
                   MODIFIED_BY,
                   MODIFICATION_DATE,
                   EMPLOYEE_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM COMMITTEE_MEMBERS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneCommitteMembersByID:{
        statement:`
        SELECT COMMITTEE_MEMBERS_ID,
               COMMITTEE_ID,
               MEMBER_ROLE,
               STATUS,
               CREATED_BY,
               CREATION_DATE,
               MODIFIED_BY,
               MODIFICATION_DATE,
               EMPLOYEE_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM COMMITTEE_MEMBERS 
   WHERE  COMMITTEE_MEMBERS_ID = :COMMITTEE_MEMBERS_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },


    getOneCommitteMembersByProjectId:{
      statement:`
      SELECT COMMITTEE_MEMBERS_ID,
             COMMITTEE_ID,
             MEMBER_ROLE,
             (select secondary_name from lookup_details d where d.lookup_detail_id = c.MEMBER_ROLE) member_role_name,
             STATUS,
             CREATED_BY,
             CREATION_DATE,
             MODIFIED_BY,
             MODIFICATION_DATE,
             EMPLOYEE_ID,
             (select first_name2 || ' ' || s_second_name from aot_gen.employees g where g.employee_id = c.EMPLOYEE_ID ) member_name,
            (select employee_email from aot_gen.employees g where g.employee_id = c.EMPLOYEE_ID ) email,
            (select mobile from aot_gen.employees g where g.employee_id = c.EMPLOYEE_ID ) mobile,
             DELETED,
             DELETED_BY,
             DELETED_DATE,
             SUBSIDIARY_ID
        FROM COMMITTEE_MEMBERS c
 WHERE  COMMITTEE_ID in ( select COMMITTEE_ID from COMMITTEE where project_id = :project_id ) `,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
  },

  getOneCommitteMembersByCommitteeId:{
     statement:`
     SELECT COMMITTEE_MEMBERS_ID,
            COMMITTEE_ID,
            MEMBER_ROLE,
            (select secondary_name from lookup_details d where d.lookup_detail_id = c.MEMBER_ROLE) member_role_name,
            STATUS,
            CREATED_BY,
            CREATION_DATE,
            MODIFIED_BY,
            MODIFICATION_DATE,
            EMPLOYEE_ID,
            (select first_name2 || ' ' || s_second_name from aot_gen.employees g where g.employee_id = c.EMPLOYEE_ID ) member_name,
            (select employee_email from aot_gen.employees g where g.employee_id = c.EMPLOYEE_ID ) email,
            (select mobile from aot_gen.employees g where g.employee_id = c.EMPLOYEE_ID ) mobile,
            DELETED,
            DELETED_BY,
            DELETED_DATE,
            SUBSIDIARY_ID
       FROM COMMITTEE_MEMBERS c
WHERE  COMMITTEE_ID = :COMMITTEE_ID `,
     returns: [],
     bindings: [],
     qstring: "",
     requireCommit: false
 },

 getMemberRoles : {
      statement : `
      (select lookup_detail_id, secondary_name from lookup_details d where d.lookup_id = 50)
      `,
      bindings: [],
     qstring: "",
     requireCommit: false
 },

 insertCommitteeMembers:{
      statement :`INSERT INTO COMMITTEE_MEMBERS (COMMITTEE_MEMBERS_ID,
          COMMITTEE_ID,
          employee_id,
          MEMBER_ROLE,
          STATUS)
VALUES (
     COMMITTEE_MEMBERS_SEQ.NEXTVAL,
     :COMMITTEE_ID,
     :employee_id,
     :MEMBER_ROLE,
     :STATUS)
     RETURN  COMMITTEE_MEMBERS_ID INTO :R_COMMITTEE_MEMBERS_ID
`,
returns : ["R_COMMITTEE_MEMBERS_ID"],
bindings: [],
qstring: "",
requireCommit: true
 }
   
 }
  


  
  
  module.exports = statements ;
  