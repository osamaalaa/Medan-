require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./DelegationSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllDelegation', (req, res) =>{
  servicePool(req, res,
              statements.getAllDelegation.statement,
              []
            );
});


router.get('/getOneDelegationByID/:DELEGATION_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneDelegationByID.statement,
        {'DELEGATION_ID' :req.params.DELEGATION_ID}
      );
});


module.exports = router ;
