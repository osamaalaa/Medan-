require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./PlanHeaderWeeksSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllPlanHeaderWeeks', (req, res) =>{
  servicePool(req, res,
              statements.getAllPlanHeaderWeeks.statement,
              []
            );
});


router.get('/getOnePlanHeaderWeeksByID/:SERIAL_NO', (req, res) =>{
  servicePool(req,
          res,
          statements.getOnePlanHeaderWeeksByID.statement,
        {'SERIAL_NO' :req.params.SERIAL_NO}
      );
});


module.exports = router ;
