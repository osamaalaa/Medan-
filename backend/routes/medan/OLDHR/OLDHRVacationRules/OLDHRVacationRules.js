require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./OLDHRVacationRulesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllOLDHRVacationRules', (req, res) =>{
  servicePool(req, res,
              statements.getAllOLDHRVacationRules.statement,
              []
            );
});


router.get('/getOneOLDHRVacationRulesByID/:VACATION_RULE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneOLDHRVacationRulesByID.statement,
        {'VACATION_RULE_ID' :req.params.VACATION_RULE_ID}
      );
});


module.exports = router ;
