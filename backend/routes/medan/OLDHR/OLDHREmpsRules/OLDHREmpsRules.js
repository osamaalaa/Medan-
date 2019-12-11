require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./OLDHREmpsRulesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllOLDHREmpsRules', (req, res) =>{
  servicePool(req, res,
              statements.getAllOLDHREmpsRules.statement,
              []
            );
});


router.get('/getOneOLDHREmpsRulesByID/:EMPLOYEE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneOLDHREmpsRulesByID.statement,
        {'EMPLOYEE_ID' :req.params.EMPLOYEE_ID}
      );
});


module.exports = router ;
