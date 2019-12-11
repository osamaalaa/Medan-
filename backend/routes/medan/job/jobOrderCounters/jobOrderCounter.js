require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./jobOrderCounterSQL");
let servicePool = require('@lib/servicePool');


router.get('/getJobOrderCounter/:P_Job_Order_id', (req, res) =>{
  servicePool(req,
          res,
          statements.getJobOrderCounter.statement,
        {'P_Job_Order_id' :req.params.P_Job_Order_id}
      );
});

router.get('/getCounterLov/:ASSET_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getCounterLov.statement,
        {'ASSET_ID' :req.params.ASSET_ID}
      );
});


router.get('/getAllJobCounter', (req, res) =>{
  servicePool(req,
          res,
          statements.getAllJobCounter.statement,
        []
      );
});

router.get('/getJobOrderCounterHistory/:ASSET_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getJobOrderCounterHistory.statement,
        {'ASSET_ID' :req.params.ASSET_ID}
      );
});

module.exports = router ;
