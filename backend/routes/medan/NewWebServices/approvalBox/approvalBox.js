require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./approvalBoxSQL");
let servicePool = require('@lib/servicePool');


router.get('/approvalBox/:spEmployeeId/:p_reqClassification', (req, res) =>{
  servicePool(req, res,
              statements.approvalBox.statement,
              {spEmployeeId : req.params.spEmployeeId,
                p_reqClassification : req.params.p_reqClassification}
            );
});




module.exports = router ;
