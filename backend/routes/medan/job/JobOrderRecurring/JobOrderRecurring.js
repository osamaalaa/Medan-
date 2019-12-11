require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./JobOrderRecurringSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllJobOrderRecurring', (req, res) =>{
  servicePool(req, res,
              statements.getAllJobOrderRecurring.statement,
              []
            );
});


router.get('/getOneJobOrderRecurringByID/:RECURRING_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneJobOrderRecurringByID.statement,
        {'RECURRING_ID' :req.params.RECURRING_ID}
      );
});


module.exports = router ;
