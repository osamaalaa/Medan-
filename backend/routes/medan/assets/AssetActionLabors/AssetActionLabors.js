require("module-alias/register");
let express = require("express");
let router = express.Router();
//let serviceConn = require("@lib/serviceConn");
let statements = require("./AssetActionLaborsSQL");
//let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAllAssetActionLabors', (req, res) =>{
  servicePool(req, res,
              statements.getAllAssetActionLabors.statement,
              []
            );
});


router.get('/getOneAssetActionLaborsByID/:ASSET_ACTION_LABOR_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneAssetActionLaborsByID.statement,
        {'ASSET_ACTION_LABOR_ID' :req.params.ASSET_ACTION_LABOR_ID}
      );
});


module.exports = router ;
