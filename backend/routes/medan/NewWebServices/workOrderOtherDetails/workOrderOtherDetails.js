require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./workOrderOtherDetailsSQL");
let servicePool = require('@lib/servicePool');


router.get('/workOrderOtherDetails/:STATUS_ID/:PHASE_TASK_ID/:WORK_ORDER_ID/:MILESTONE_ID', (req, res) =>{
  servicePool(req, res,
              statements.workOrderOtherDetails.statement,
              {STATUS_ID : req.params.STATUS_ID,
                PHASE_TASK_ID : req.params.PHASE_TASK_ID,
                MILESTONE_ID : req.params.MILESTONE_ID,
                WORK_ORDER_ID : req.params.WORK_ORDER_ID}
            );
});




module.exports = router ;
