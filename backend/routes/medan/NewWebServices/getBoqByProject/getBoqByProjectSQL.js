
let statements = {
    getBoqByProject : {
            statement :`SELECT * FROM Project_Boq p where  nvl(p.deleted,0)=0 and p.project_Id = :project_Id
            AND EXISTS(SELECT 1 FROM COMMITTEE_MEMBERS cm, COMMITTEE boqNQ1 WHERE cm.EMPLOYEE_ID = :EMPLOYEE_ID
            AND boqNQ1.COMMITTEE_ID = cm.COMMITTEE_ID and BOQNQ1.BOQ_ID=p.BOQ_ID and nvl(CM.DELETED,0)=0 )`,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  