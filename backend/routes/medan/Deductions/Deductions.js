require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./DeductionsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllDeductions', (req, res) =>{
  servicePool(req, res,
              statements.getAllDeductions.statement,
              []
            );
});


router.get('/getOneDeductionsByID/:DEDUCTION_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneDeductionsByID.statement,
        {'DEDUCTION_ID' :req.params.DEDUCTION_ID}
      );
});


module.exports = router ;
