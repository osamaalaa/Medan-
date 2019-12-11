require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./actionDefinationSQL");
let servicePool = require('@lib/servicePool');



router.get('/getACtionDefination', (req, res) =>{
  servicePool(req, res,
              statements.getACtionDefination.statement,
              []
            );
});

router.get('/getACtionDefinationByActionId/:ACTION_ID', (req, res) =>{
    servicePool(req, res,
                statements.getACtionDefinationByActionId.statement,
                {ACTION_ID : req.params.ACTION_ID}
              );
  });
  




module.exports = router ;
