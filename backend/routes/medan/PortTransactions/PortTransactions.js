require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./PortTransactionsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllPortTransactions', (req, res) =>{
  servicePool(req, res,
              statements.getAllPortTransactions.statement,
              []
            );
});


router.get('/getOnePortTransactionsByID/:TRANS_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOnePortTransactionsByID.statement,
        {'TRANS_ID' :req.params.TRANS_ID}
      );
});


module.exports = router ;
