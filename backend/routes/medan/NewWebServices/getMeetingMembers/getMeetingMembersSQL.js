
let statements = {
    getMeetingMembers: {
            statement :`SELECT 
            M.MEETING_MEMBER_ID,
             M.MEETING_ID,
              M.MEMBER_ROLE, 
               M.STATUS, M.MAIL_SENT_FLAG, M.MEMBER_TYPE, 
               M.ATTENDANCE_FLAG, M.INVITATION_MAIL_FLAG, M.EMPLOYEE_ID, 
               M.DELETED, M.DELETED_BY, M.DELETED_DATE, 
               M.SUBSIDIARY_ID, M.INVITED_FLAG,
               (select E.first_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) FIRST_NAME,
               (select E.second_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) second_NAME,
               (select E.first_name2 from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) FIRST_NAME_E,
               (select E.s_second_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) second_NAME_E,
               (select E.employee_email from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) Email,
               (select E.mobile from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) mobile,
               (select l.primary_name from HR.lookup_details l where l.lookup_detail_id = M.member_role) ROLE_NAME_AR,
               (select l.SECONDARY_NAME from HR.lookup_details l where l.lookup_detail_id = M.member_role) ROLE_NAME_EN
            FROM MEETING_MEMBERS M
             where M.MEETING_ID = :MEETING_ID  and M.DELETED = 0`,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  