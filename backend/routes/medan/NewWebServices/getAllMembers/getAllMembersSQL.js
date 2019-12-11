
let statements = {
    getAllMembers: {
            statement :`
            SELECT * FROM Employees  `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },

    getEmpData: {
      statement :`
      SELECT * FROM Employees where employee_id = :employee_id  `,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
}
}
  module.exports = statements ;
  