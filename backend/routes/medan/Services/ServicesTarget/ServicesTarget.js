require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ServicesTargetSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllServicesTarget', (req, res) =>{
  servicePool(req, res,
              statements.getAllServicesTarget.statement,
              []
            );
});


router.get('/getOneServicesTargetByID/:LIST_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneServicesTargetByID.statement,
        {'LIST_ID' :req.params.LIST_ID}
      );
});


module.exports = router ;
