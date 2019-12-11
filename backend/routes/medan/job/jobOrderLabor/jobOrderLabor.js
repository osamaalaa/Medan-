require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./jobOrderLaborSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllJobOrderLabor', (req, res) =>{
  servicePool(req, res,
              statements.getAllJobOrderLabor.statement,
              []
            );
});


router.get('/getOneJobOrderLaborById/:JOB_ORDER_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneJobOrderLaborById.statement,
        {'JOB_ORDER_ID' :req.params.JOB_ORDER_ID}
      );
});


module.exports = router ;
