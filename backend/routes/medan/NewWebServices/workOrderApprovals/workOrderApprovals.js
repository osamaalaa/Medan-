require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./workOrderApprovalsSQL");
let servicePool = require('@lib/servicePool');


router.get('/workOrderApprovals/:EMPLOYEE_ID/:proj_id', (req, res) =>{
  servicePool(req, res,
              statements.workOrderApprovals.statement,
              { EMPLOYEE_ID : req.params.EMPLOYEE_ID,
                proj_id : req.params.proj_id}
                          );
});




module.exports = router ;
