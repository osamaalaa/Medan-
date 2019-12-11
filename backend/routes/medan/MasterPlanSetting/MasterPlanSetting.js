require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./MasterPlanSettingSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllMasterPlanSetting', (req, res) =>{
  servicePool(req, res,
              statements.getAllMasterPlanSetting.statement,
              []
            );
});


router.get('/getOneMasterPlanSettingByID/:SETTING_NO', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneMasterPlanSettingByID.statement,
        {'SETTING_NO' :req.params.SETTING_NO}
      );
});


module.exports = router ;
