require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./MilestonePaymentSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllMilestonePayment', (req, res) =>{
  servicePool(req, res,
              statements.getAllMilestonePayment.statement,
              []
            );
});


router.get('/getOneMilestonePaymentByID/:MILESTONE_PAY_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneMilestonePaymentByID.statement,
        {'MILESTONE_PAY_ID' :req.params.MILESTONE_PAY_ID}
      );
});


module.exports = router ;
