require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./workOrderDetailsSQL");
let servicePool = require('@lib/servicePool');


router.get('/workOrderDetails/:work_order_id', (req, res) =>{
  servicePool(req, res,
              statements.workOrderDetails.statement,
              {work_order_id : req.params.work_order_id}
            );
});




module.exports = router ;
