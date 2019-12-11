require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ReassignTasksSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllReassignTasks', (req, res) =>{
  servicePool(req, res,
              statements.getAllReassignTasks.statement,
              []
            );
});


router.get('/getOneReassignTasksByID/:TASK_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneReassignTasksByID.statement,
        {'TASK_ID' :req.params.TASK_ID}
      );
});


module.exports = router ;
