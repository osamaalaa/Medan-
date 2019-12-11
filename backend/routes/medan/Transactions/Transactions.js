require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./TransactionsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getTransactions/:p_request_id', (req, res) =>{
  servicePool(req, res,
              statements.getTransactions.statement,
              { p_request_id : req.params.p_request_id}
            );
});



module.exports = router ;
