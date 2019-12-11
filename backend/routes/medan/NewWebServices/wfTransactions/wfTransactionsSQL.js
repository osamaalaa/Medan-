
let statements = {
    getAllTranasction: {
    statement :`select * from wf_transactions`,
             bindings: [],
             qstring: "",
             requireCommit: false
     },
     
     getAllTranasctionByStatus: {
        statement :`select * from wf_transactions where status = :status`,
                 bindings: [],
                 qstring: "",
                 requireCommit: false
         },  

         getAllTranasctionByTransId: {
            statement :`select * from wf_transactions where tranaction_id = :tranaction_id`,
                     bindings: [],
                     qstring: "",
                     requireCommit: false
             } 
 }
   module.exports = statements ;
 
   
   