require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./SystemSettingSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllSystemSetting', (req, res) =>{
  servicePool(req, res,
              statements.getAllSystemSetting.statement,
              []
            );
});


router.get('/getOneSystemSettingByID/:SETTING_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneSystemSettingByID.statement,
        {'SETTING_ID' :req.params.SETTING_ID}
      );
});


module.exports = router ;
