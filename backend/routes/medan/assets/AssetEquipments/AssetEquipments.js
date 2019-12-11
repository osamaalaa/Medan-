require("module-alias/register");
let express = require("express");
let router = express.Router();
//let serviceConn = require("@lib/serviceConn");
let statements = require("./AssetEquipmentsSQL");
//let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAllAssetEquipments', (req, res) =>{
  servicePool(req, res,
              statements.getAllAssetEquipments.statement,
              []
            );
});


router.get('/getOneAssetEquipmentsID/:ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneAssetEquipmentsID.statement,
        {'ID' :req.params.ID}
      );
});


module.exports = router ;
