require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./RisksSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllRisks', (req, res) =>{
  servicePool(req, res,
              statements.getAllRisks.statement,
              []
            );
});


router.get('/getOneRisksByID/:RISK_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneRisksByID.statement,
        {'RISK_ID' :req.params.RISK_ID}
      );
});


module.exports = router ;
