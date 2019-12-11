require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./JobOrderSparePartsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllJobOrderSpareParts', (req, res) =>{
  servicePool(req, res,
              statements.getAllJobOrderSpareParts.statement,
              []
            );
});


router.get('/getOneJobOrderSparePartsByID/:JOB_ORDER_SPAREPARTS_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneJobOrderSparePartsByID.statement,
        {'JOB_ORDER_SPAREPARTS_ID' :req.params.JOB_ORDER_SPAREPARTS_ID}
      );
});

router.get('/getSpareParts', (req, res) =>{
  servicePool(req, res,
              statements.getSpareParts.statement,
              []
            );
});

router.get('/getAllSpareParts/:p_job_order_id', (req, res) =>{
  servicePool(req, res,
              statements.getAllSpareParts.statement,
              {p_job_order_id : req.params.p_job_order_id}
            );
});


module.exports = router ;
