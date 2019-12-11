
let statements = {
    myProjects: {
            statement :`select
            PROJECT_ID, PRIMARY_NAME, SECONDARY_NAME, CREATION_DATE,START_DATE, END_DATE, STATUS, ADDRESS, COLOR from PROJECTS where PROJECT_ID in 
            (select PROJECT_ID from PROJECT_MEMBERS where EMPLOYEE_ID = :EMPLOYEE_ID and DELETED = 0
            UNION
            select PROJECT_ID from PROJECTS where PROJECT_MANAGER_ID = :PROJECT_MANAGER_ID and DELETED = 0 and project_type = 702)
             order by  PROJECT_ID
              `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  