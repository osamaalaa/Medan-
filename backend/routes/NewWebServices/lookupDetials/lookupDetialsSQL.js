
let statements = {
    lookupDetials : {
            statement :`SELECT * FROM LookUp_Details t WHERE t.lookup_id = :lookup_id`,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  