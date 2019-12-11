
let statements = {
    getinboxView: {
    statement :`select * from inbox_view`,
             bindings: [],
             qstring: "",
             requireCommit: false
     },
     
     getInboxViewByReqId: {
        statement :`select * from inbox_view where request_id = :request_id `,
                 bindings: [],
                 qstring: "",
                 requireCommit: false
         }  
 }
   module.exports = statements ;
 
   
   