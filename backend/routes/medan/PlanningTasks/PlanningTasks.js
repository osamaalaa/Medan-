require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./PlanningTasksSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllPlanningTasks', (req, res) =>{
  servicePool(req, res,
              statements.getAllPlanningTasks.statement,
              []
            );
});


router.get('/getOnePlanningTasksByID/:PHASE_TASK_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOnePlanningTasksByID.statement,
        {'PHASE_TASK_ID' :req.params.PHASE_TASK_ID}
      );
});


module.exports = router ;
