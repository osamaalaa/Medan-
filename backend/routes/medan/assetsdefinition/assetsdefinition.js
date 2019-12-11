require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("@asst/assetsdefinition/assetsdefinitionSQL");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let assetsdefinitionStructure = require('@joi/validateSt');
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAllAssetsDefinition', (req, res) =>{
  servicePool(req, res,
              statements.getAllAssetsDefinition.statement,
              []
            );
});

router.get('/getOneAssetsDefinition/:ASSET_ID', (req, res)=>{
   servicePool(req,
               res,
              statements.getOneAssetsDefinition.statement,
              {'ASSET_ID' :req.params.ASSET_ID}
            );
});

router.get('/getAssetsBYGROUP/:ASSET_GROUP', (req, res)=>{
   servicePool(req,
               res,
              statements.getAssetsBYGROUP.statement,
              {'ASSET_GROUP' :req.params.ASSET_GROUP}
            );
});
//------------------



module.exports = router;
