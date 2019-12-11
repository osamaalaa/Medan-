require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./userPrivilegesSQL");
let servicePool = require('@lib/servicePool');


router.get('/userPrivileges/:USER_ID', (req, res) =>{
  servicePool(req, res,
              statements.userPrivileges.statement,
              {USER_ID : req.params.USER_ID}
            );
});




module.exports = router ;
