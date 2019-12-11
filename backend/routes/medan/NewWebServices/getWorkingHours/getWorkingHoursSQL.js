
let statements = {
    getWorkingHours: {
            statement :`SELECT * FROM Daily_Working_Hours m WHERE m.WORK_ORDER_ID = :WORK_ORDER_ID and m.DELETED = 0
              `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  