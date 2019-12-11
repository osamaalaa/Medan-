require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./OLDHRATRulesTempSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllOLDHRATRulesTemp', (req, res) =>{
  servicePool(req, res,
              statements.getAllOLDHRATRulesTemp.statement,
              []
            );
});


router.get('/getOneOLDHRATRulesTempByID/:TEMPLATE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneOLDHRATRulesTempByID.statement,
        {'TEMPLATE_ID' :req.params.TEMPLATE_ID}
      );
});


module.exports = router ;
