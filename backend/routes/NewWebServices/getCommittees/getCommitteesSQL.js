
let statements = {
    getCommittees: {
            statement :`SELECT *
            FROM committee
            where project_id = :project_id
              `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  