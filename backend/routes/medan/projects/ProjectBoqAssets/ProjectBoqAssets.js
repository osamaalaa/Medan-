require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ProjectBoqAssetsSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");



router.get('/getAllProjectBoqAssets', (req, res) =>{
  servicePool(req, res,
              statements.getAllProjectBoqAssets.statement,
              []
            );
});


router.get('/getOneProjectBoqAssetsByID/:BOQ_ASSET_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneProjectBoqAssetsByID.statement,
        {'BOQ_ASSET_ID' :req.params.BOQ_ASSET_ID}
      );
});

router.post('/insertProjectBoqAseets', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertProjectBoqAseets.returns).then(convertedbody => {
    servicePool(req, res, statements.insertProjectBoqAseets.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});


module.exports = router ;
