require("module-alias/register");
let express = require("express");
let router = express.Router();
//let serviceConn = require("@lib/serviceConn");
let statements = require("./AssetPenelitiesSQL");
//let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAllAssetPenelities', (req, res) =>{
  servicePool(req, res,
              statements.getAllAssetPenelities.statement,
              []
            );
});


router.get('/getOneAssetPenelitiesByID/:PENALTY_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneAssetPenelitiesByID.statement,
        {'PENALTY_ID' :req.params.PENALTY_ID}
      );
});


module.exports = router ;
