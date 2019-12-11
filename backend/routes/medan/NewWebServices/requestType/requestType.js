require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./requestTypeSQL");
let servicePool = require('@lib/servicePool');


router.get('/requestType', (req, res) =>{
  servicePool(req, res,
              statements.requestType.statement,
              []
            );
});




module.exports = router ;
