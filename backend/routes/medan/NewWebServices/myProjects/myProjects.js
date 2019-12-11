require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./myProjectsSQL");
let servicePool = require('@lib/servicePool');


router.get('/myProjects/:EMPLOYEE_ID/:PROJECT_MANAGER_ID', (req, res) =>{
  servicePool(req, res,
              statements.myProjects.statement,
              {EMPLOYEE_ID : req.params.EMPLOYEE_ID,
                PROJECT_MANAGER_ID : req.param.PROJECT_MANAGER_ID}
            );
});




module.exports = router ;
