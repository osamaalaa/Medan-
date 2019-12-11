require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./RiskResponsesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllRiskResponses', (req, res) =>{
  servicePool(req, res,
              statements.getAllRiskResponses.statement,
              []
            );
});


router.get('/getOneRiskResponsesByID/:RESPONSE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneRiskResponsesByID.statement,
        {'RESPONSE_ID' :req.params.RESPONSE_ID}
      );
});


module.exports = router ;
