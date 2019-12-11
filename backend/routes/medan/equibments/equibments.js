require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./equibmentsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getEquibments/:p_job_order_id', (req, res) =>{
  servicePool(req, res,
              statements.getEquibments.statement,
              {p_job_order_id : req.params.p_job_order_id}
            );
});





module.exports = router ;
