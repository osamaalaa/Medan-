require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ProjectMileAssetDetSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");

router.get('/getAllProjectMileAssetDet', (req, res) =>{
  servicePool(req, res,
              statements.getAllProjectMileAssetDet.statement,
              []
            );
});


router.get('/getOneProjectMileAssetDetByID/:MILE_ASSET_ACTION_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneProjectMileAssetDetByID.statement,
        {'MILE_ASSET_ACTION_ID' :req.params.MILE_ASSET_ACTION_ID}
      );
});

router.post('/insertProjectMileAssetDet', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertProjectMileAssetDet.returns).then(convertedbody => {
    servicePool(req, res, statements.insertProjectMileAssetDet.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

module.exports = router ;
