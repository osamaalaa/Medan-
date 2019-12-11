require("module-alias/register");
let express = require("express");
let router = express.Router();
//let serviceConn = require("@lib/serviceConn");
let statements = require("./AssetSparepartsSQL");
//let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAllAssetSpareparts', (req, res) =>{
  servicePool(req, res,
              statements.getAllAssetSpareparts.statement,
              []
            );
});


router.get('/getOneAssetSparepartsByID/:AP_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneAssetSparepartsByID.statement,
        {'AP_ID' :req.params.AP_ID}
      );
});


module.exports = router ;
