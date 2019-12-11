require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./getBoqByProjectSQL");
let servicePool = require('@lib/servicePool');


router.get('/getBoqByProject/:project_Id/:EMPLOYEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.getBoqByProject.statement,
              { project_Id : req.params.project_Id,
                EMPLOYEE_ID : req.params.EMPLOYEE_ID }
            );
});




module.exports = router ;
