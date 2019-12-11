
let statements = {
    getProjectMembersByProjectId: {
            statement :`sELECT * FROM Project_Members m WHERE m.PROJECT_ID = :PROJECT_ID and m.DELETED = 0`,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  