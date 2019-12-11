require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./AssetActionSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllAssetAction', (req, res) =>{
  servicePool(req, res,
              statements.getAllAssetAction.statement,
              []
            );
});


router.get('/getOneAssetActionByID/:ASSET_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneAssetActionByID.statement,
        {'ASSET_ID' :req.params.ASSET_ID}
      );
});


module.exports = router ;
