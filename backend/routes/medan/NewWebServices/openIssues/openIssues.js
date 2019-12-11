require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./openIssuesSQL");
let servicePool = require('@lib/servicePool');


router.get('/openIssues/:EMPLOYEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.openIssues.statement,
              {EMPLOYEE_ID : req.params.EMPLOYEE_ID}
            );
});




module.exports = router ;
