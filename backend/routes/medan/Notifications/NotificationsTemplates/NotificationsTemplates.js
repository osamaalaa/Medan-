require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./NotificationsTemplatesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllNotificationsTmp', (req, res) =>{
  servicePool(req, res,
              statements.getAllNotificationsTmp.statement,
              []
            );
});


router.get('/getOneNotificationsTmpByID/:TEMPLATE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneNotificationsTmpByID.statement,
        {'TEMPLATE_ID' :req.params.TEMPLATE_ID}
      );
});


module.exports = router ;
