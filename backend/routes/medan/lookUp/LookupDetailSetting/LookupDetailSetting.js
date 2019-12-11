require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./LookupDetailSettingSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllLookupDetailSetting', (req, res) =>{
  servicePool(req, res,
              statements.getAllLookupDetailSetting.statement,
              []
            );
});


router.get('/getOneLookupDetailSettingByID/:SETTING_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneLookupDetailSettingByID.statement,
        {'SETTING_ID' :req.params.SETTING_ID}
      );
});


module.exports = router ;
