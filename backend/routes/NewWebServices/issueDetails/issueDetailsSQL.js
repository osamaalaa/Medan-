
let statements = {
    issueDetails : {
            statement :`SELECT * FROM Incident_Report_Requests i WHERE i.INC_REP_REQUEST_ID = :INC_REP_REQUEST_ID`,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  