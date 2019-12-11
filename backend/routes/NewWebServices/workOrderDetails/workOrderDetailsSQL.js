
let statements = {
    workOrderDetails: {
            statement :`SELECT *
            FROM WORK_ORDERS 
            where work_order_id = :work_order_id
              `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  