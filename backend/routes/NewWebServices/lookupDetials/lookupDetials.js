require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./lookupDetialsSQL");
let servicePool = require('@lib/servicePool');


router.get('/lookupDetials/:lookup_id', (req, res) =>{
  servicePool(req, res,
              statements.lookupDetials.statement,
              { lookup_id : req.params.lookup_id }
            );
});




module.exports = router ;
