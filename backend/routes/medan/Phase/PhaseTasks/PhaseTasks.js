require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./PhaseTasksSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllPhaseTasks', (req, res) =>{
  servicePool(req, res,
              statements.getAllPhaseTasks.statement,
              []
            );
});


router.get('/getOnePhaseTasksByID/:PHASE_TASK_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOnePhaseTasksByID.statement,
        {'PHASE_TASK_ID' :req.params.PHASE_TASK_ID}
      );
});

router.get('/getPhaseTasksByProjectId/:PROJECT_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getPhaseTasksByProjectId.statement,
        {'PROJECT_ID' :req.params.PROJECT_ID}
      );
});

module.exports = router ;
