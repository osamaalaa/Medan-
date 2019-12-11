require("module-alias/register");
let express = require("express");
let router = express.Router();
//let serviceConn = require("@lib/serviceConn");
let statements = require("./AssetActionStartingSQL");
//let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAllAssetActionStarting', (req, res) =>{
  servicePool(req, res,
              statements.getAllAssetActionStarting.statement,
              []
            );
});


router.get('/getOneAssetActionStartingByID/:ASSET_ACTION_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneAssetActionStartingByID.statement,
        {'ASSET_ACTION_ID' :req.params.ASSET_ACTION_ID}
      );
});


module.exports = router ;
