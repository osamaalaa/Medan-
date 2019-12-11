require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./wfTransactionsSQL");
let servicePool = require('@lib/servicePool');


router.get('/getAllTranasction', (req, res) =>{
  servicePool(req, res,
              statements.getAllTranasction.statement,
            []
            );
});

router.get('/getAllTranasctionByStatus/:status', (req, res) =>{
    servicePool(req, res,
                statements.getAllTranasctionByStatus.statement,
              {status : req.params.status}
              );
  });

  router.get('/getAllTranasctionByTransId/:tranaction_id', (req, res) =>{
    servicePool(req, res,
                statements.getAllTranasctionByTransId.statement,
              {tranaction_id : req.params.tranaction_id}
              );
  });




module.exports = router ;
