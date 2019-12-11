let statements = {
    userPrivileges: {
            statement :`
            select SEC_PRIVILEGE_ID from SECURITY_PRIVILEGES  SS where SS.SEC_PRIVILEGE_ID in 
            (select US.SEC_PRIVILEGE_ID from USER_PRIVILEGES us where us.USER_ID = :USER_ID) and SS.DELETED = 0 and SS.APPLICATION_ID =1
             union
             select SEC_PRIVILEGE_ID from SECURITY_PRIVILEGES  SS2 where SS2.SEC_PRIVILEGE_ID in (
             select DISTINCT SEC_PRIVILEGE_ID from ROLE_PRIVILEGES where  ROLE_ID in (
             select ROLE_ID from USER_ROLES where USER_ID = :USER_ID ) and SS2.DELETED = 0 and SS2.APPLICATION_ID =1)
              `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
