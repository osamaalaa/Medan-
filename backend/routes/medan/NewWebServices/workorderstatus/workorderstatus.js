require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./workorderstatusSQL");
let servicePool = require('@lib/servicePool');


router.get('/workorderstatus', (req, res) =>{
  servicePool(req, res,
              statements.workorderstatus.statement,
              []
            );
});




module.exports = router ;
