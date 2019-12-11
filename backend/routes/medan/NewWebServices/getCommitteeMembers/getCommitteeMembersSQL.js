
let statements = {
    getCommitteeMembersByMemberId: {
            statement :`SELECT
            COM_MEM.COMMITTEE_MEMBERS_ID,
            COM_MEM.COMMITTEE_ID,
            COM_MEM.Member_role,
            (select primary_name from lookup_details where lookup_detail_id = COM_MEM.Member_role) role_name_ar,
            (select secondary_name from lookup_details where lookup_detail_id = COM_MEM.Member_role) role_name_en,
            (SELECT CC.COMMITTEE_NAME_AR FROM COMMITTEE CC WHERE CC.COMMITTEE_ID= COM_MEM.COMMITTEE_ID) COMM_AR,
            (SELECT CC.COMMITTEE_NAME_EN FROM COMMITTEE CC WHERE CC.COMMITTEE_ID= COM_MEM.COMMITTEE_ID) COMM_EN,
            COM_MEM.EMPLOYEE_ID,
            GETEMPNAME_LANG(COM_MEM.EMPLOYEE_ID,1,1) EMPLOYEE_NAME_AR,
            GETEMPNAME_LANG(COM_MEM.EMPLOYEE_ID,1,2) EMPLOYEE_NAME_EN,
            GET_LOOKUP_NAME(COm_mem.MEMBER_ROLE,1) Memebr_rol_ar,
            GET_LOOKUP_NAME(COm_mem.MEMBER_ROLE,2) Memebr_rol_en,
            (select phone from aot_gen.employees emp where emp.EMPLOYEE_ID = COM_MEM.EMPLOYEE_ID) phone,
            (select employee_email from aot_gen.employees emp where emp.EMPLOYEE_ID = COM_MEM.EMPLOYEE_ID) employee_email
            FROM COMMITTEE_MEMBERS COM_MEM
            WHERE
            NVL(COM_MEM.DELETED,0) =0
            AND COM_MEM.COMMITTEE_MEMBERS_ID  = :COMMITTEE_MEMBERS_ID
              `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },    
    getCommitteeMembers: {
            statement :`SELECT
            COM_MEM.COMMITTEE_MEMBERS_ID,
            COM_MEM.COMMITTEE_ID,
            COM_MEM.Member_role,
            (select primary_name from lookup_details where lookup_detail_id = COM_MEM.Member_role) role_name_ar,
            (select secondary_name from lookup_details where lookup_detail_id = COM_MEM.Member_role) role_name_en,
            (SELECT CC.COMMITTEE_NAME_AR FROM COMMITTEE CC WHERE CC.COMMITTEE_ID= COM_MEM.COMMITTEE_ID) COMM_AR,
            (SELECT CC.COMMITTEE_NAME_EN FROM COMMITTEE CC WHERE CC.COMMITTEE_ID= COM_MEM.COMMITTEE_ID) COMM_EN,
            COM_MEM.EMPLOYEE_ID,
            GETEMPNAME_LANG(COM_MEM.EMPLOYEE_ID,1,1) EMPLOYEE_NAME_AR,
            GETEMPNAME_LANG(COM_MEM.EMPLOYEE_ID,1,2) EMPLOYEE_NAME_EN,
            GET_LOOKUP_NAME(COm_mem.MEMBER_ROLE,1) Memebr_rol_ar,
            GET_LOOKUP_NAME(COm_mem.MEMBER_ROLE,2) Memebr_rol_en,
            (select phone from aot_gen.employees emp where emp.EMPLOYEE_ID = COM_MEM.EMPLOYEE_ID) phone,
            (select employee_email from aot_gen.employees emp where emp.EMPLOYEE_ID = COM_MEM.EMPLOYEE_ID) employee_email
            FROM COMMITTEE_MEMBERS COM_MEM
            WHERE
            NVL(COM_MEM.DELETED,0) =0
            AND COM_MEM.COMMITTEE_ID  = :COMMITTEE_ID
              `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  