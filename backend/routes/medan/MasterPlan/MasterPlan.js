require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./MasterPlanSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllMasterPlan', (req, res) =>{
  servicePool(req, res,
              statements.getAllMasterPlan.statement,
              []
            );
});


router.get('/getOneMasterPlanByID/:PLAN_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneMasterPlanByID.statement,
        {'PLAN_ID' :req.params.PLAN_ID}
      );
});


module.exports = router ;
