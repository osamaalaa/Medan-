require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./getWorkingHoursSQL");
let servicePool = require('@lib/servicePool');


router.get('/getWorkingHours/:WORK_ORDER_ID', (req, res) =>{
  servicePool(req, res,
              statements.getWorkingHours.statement,
              {WORK_ORDER_ID : req.params.WORK_ORDER_ID}
            );
});




module.exports = router ;
