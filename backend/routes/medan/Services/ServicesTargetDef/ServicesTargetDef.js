require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ServicesTargetDefSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllServicesTargetDef', (req, res) =>{
  servicePool(req, res,
              statements.getAllServicesTargetDef.statement,
              []
            );
});


router.get('/getOneServicesTargetDefByID/:DEF_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneServicesTargetDefByID.statement,
        {'DEF_ID' :req.params.DEF_ID}
      );
});


module.exports = router ;
