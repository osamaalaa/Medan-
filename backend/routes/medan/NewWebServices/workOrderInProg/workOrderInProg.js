require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./workOrderInProgSQL");
let servicePool = require('@lib/servicePool');


router.get('/workOrderInProg/:EMPLOYEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.workOrderInProg.statement,
              { EMPLOYEE_ID : req.params.EMPLOYEE_ID}
            );
});

router.get('/rejectedWorkOrder/:EMPLOYEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.rejectedWorkOrder.statement,
              { EMPLOYEE_ID : req.params.EMPLOYEE_ID}
            );
});

router.get('/closedWorkOrder/:EMPLOYEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.closedWorkOrder.statement,
              { EMPLOYEE_ID : req.params.EMPLOYEE_ID}
            );
});




module.exports = router ;
