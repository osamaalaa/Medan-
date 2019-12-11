
let statements = {
    getByProjectId: {
            statement :`SELECT * FROM Project_MileStone m WHERE m.PROJECT_ID = :PROJECT_ID`,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  