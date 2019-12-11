require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./notAssignedTasksSQL");
let servicePool = require('@lib/servicePool');


router.get('/notAssignedTasks/:EMPLOYEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.notAssignedTasks.statement,
              {EMPLOYEE_ID : req.params.EMPLOYEE_ID}
            );
});




module.exports = router ;
