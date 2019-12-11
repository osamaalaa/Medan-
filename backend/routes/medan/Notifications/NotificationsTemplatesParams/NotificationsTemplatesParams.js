require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./NotificationsTemplatesParamsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllNotificationTmpPrms', (req, res) =>{
  servicePool(req, res,
              statements.getAllNotificationTmpPrms.statement,
              []
            );
});


router.get('/getOneNotificationTmpPrmsByID/:TEMP_PARAM_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneNotificationTmpPrmsByID.statement,
        {'TEMP_PARAM_ID' :req.params.TEMP_PARAM_ID}
      );
});


module.exports = router ;
