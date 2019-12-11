require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./toolBoxNumbersSQL");
let servicePool = require('@lib/servicePool');


router.get('/toolBoxNumbers/:EMPLOYEE_ID/:PROJECT_MANAGER_ID/:CREATED_BY/:PROJECT_ID/:to_mailbox/:ASSIGN_TO/:WORK_ORDER_OWNER', (req, res) =>{
  servicePool(req, res,
              statements.toolBoxNumbers.statement,
              {EMPLOYEE_ID : req.params.EMPLOYEE_ID,
                PROJECT_MANAGER_ID : req.params.PROJECT_MANAGER_ID,
                CREATED_BY : req.params.CREATED_BY,
                PROJECT_ID : req.params.PROJECT_ID,
                to_mailbox : req.params.to_mailbox,
                ASSIGN_TO : req.params.ASSIGN_TO,
                WORK_ORDER_OWNER : req.params.WORK_ORDER_OWNER}
            );
});




module.exports = router ;
