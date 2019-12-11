require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./MilestonePaymentDetailsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllMilestonePaymentDetails', (req, res) =>{
  servicePool(req, res,
              statements.getAllMilestonePaymentDetails.statement,
              []
            );
});


router.get('/getOneMilestonePaymentDetailsByID/:PAYMENT_DETAIL_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneMilestonePaymentDetailsByID.statement,
        {'PAYMENT_DETAIL_ID' :req.params.PAYMENT_DETAIL_ID}
      );
});


module.exports = router ;
