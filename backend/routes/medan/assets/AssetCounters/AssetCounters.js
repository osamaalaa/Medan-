require("module-alias/register");
let express = require("express");
let router = express.Router();
//let serviceConn = require("@lib/serviceConn");
let statements = require("./AssetCountersSQL");
//let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAllAssetCounters', (req, res) =>{
  servicePool(req, res,
              statements.getAllAssetCounters.statement,
              []
            );
});


router.get('/getOneAssetCountersByID/:ASSET_COUNTER_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneAssetCountersByID.statement,
        {'ASSET_COUNTER_ID' :req.params.ASSET_COUNTER_ID}
      );
});


module.exports = router ;
