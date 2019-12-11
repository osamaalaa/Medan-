require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./myInboxSQL");
let servicePool = require('@lib/servicePool');


router.get('/myInbox/:EMPLOYEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.myInbox.statement,
              {EMPLOYEE_ID : req.params.EMPLOYEE_ID}
            );
});




module.exports = router ;
