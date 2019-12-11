require("module-alias/register");
let express = require("express");
let router = express.Router();
//let serviceConn = require("@lib/serviceConn");
let statements = require("./AssetLaborsSQL");
//let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAllAssetLabors', (req, res) =>{
  servicePool(req, res,
              statements.getAllAssetLabors.statement,
              []
            );
});


router.get('/getOneAssetLaborsByID/:ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneAssetLaborsByID.statement,
        {'ID' :req.params.ID}
      );
});


module.exports = router ;
