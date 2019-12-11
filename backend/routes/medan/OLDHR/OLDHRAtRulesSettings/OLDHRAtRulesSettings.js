require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./OLDHRAtRulesSettingsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllOLDHRAtRulesSettings', (req, res) =>{
  servicePool(req, res,
              statements.getAllOLDHRAtRulesSettings.statement,
              []
            );
});


router.get('/getOneOLDHRAtRulesSettingsByID/:RULE_SETTING_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneOLDHRAtRulesSettingsByID.statement,
        {'RULE_SETTING_ID' :req.params.RULE_SETTING_ID}
      );
});


module.exports = router ;
