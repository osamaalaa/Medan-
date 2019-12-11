require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./jobOrderDetailsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllJobOrderDetails', (req, res) =>{
  servicePool(req, res,
              statements.getAllJobOrderDetails.statement,
              []
            );
});


router.get('/getOneJobOrderDetailsById/:JOB_ORDER_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneJobOrderDetailsById.statement,
        {'JOB_ORDER_ID' :req.params.JOB_ORDER_ID}
      );
});

router.get('/getJobOrderDetails/:job_order_id', (req, res) =>{
  servicePool(req, res,
              statements.getJobOrderDetails.statement,
              {job_order_id : req.params.job_order_id}
            );
});


module.exports = router ;
