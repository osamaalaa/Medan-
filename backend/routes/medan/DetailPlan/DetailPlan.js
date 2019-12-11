require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./DetailPlanSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllDetailPlan', (req, res) =>{
  servicePool(req, res,
              statements.getAllDetailPlan.statement,
              []
            );
});


router.get('/getOneDetailPlanByID/:DETAIL_PLAN_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneDetailPlanByID.statement,
        {'DETAIL_PLAN_ID' :req.params.DETAIL_PLAN_ID}
      );
});


module.exports = router ;
