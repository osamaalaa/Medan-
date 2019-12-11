require("module-alias/register");
let express = require("express");
let router = express.Router();
//let serviceConn = require("@lib/serviceConn");
let statements = require("./AssetActionSparePartsSQL");
//let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAllAssetActionSpareParts', (req, res) =>{
  servicePool(req, res,
              statements.getAllAssetActionSpareParts.statement,
              []
            );
});


router.get('/getOneAssetActionSparePartsByID/:ASSET_ACTION_SPAREPART_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneAssetActionSparePartsByID.statement,
        {'ASSET_ACTION_SPAREPART_ID' :req.params.ASSET_ACTION_SPAREPART_ID}
      );
});


module.exports = router ;
