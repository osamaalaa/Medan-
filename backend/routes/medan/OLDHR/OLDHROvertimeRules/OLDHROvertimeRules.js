require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./OLDHROvertimeRulesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllOLDHROvertimeRules', (req, res) =>{
  servicePool(req, res,
              statements.getAllOLDHROvertimeRules.statement,
              []
            );
});


router.get('/getOneOLDHROvertimeRulesByID/:OVERTIME_RULE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneOLDHROvertimeRulesByID.statement,
        {'OVERTIME_RULE_ID' :req.params.OVERTIME_RULE_ID}
      );
});


module.exports = router ;
