require("module-alias/register");
let express = require("express");
let router = express.Router();
//let serviceConn = require("@lib/serviceConn");
let statements = require("./AssetCheckingSQL");
//let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAllAssetChecking', (req, res) =>{
  servicePool(req, res,
              statements.getAllAssetChecking.statement,
              []
            );
});


router.get('/getOneAssetCheckingByID/:CHECK_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneAssetCheckingByID.statement,
        {'CHECK_ID' :req.params.CHECK_ID}
      );
});


module.exports = router ;
