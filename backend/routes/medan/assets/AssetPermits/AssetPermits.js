require("module-alias/register");
let express = require("express");
let router = express.Router();
//let serviceConn = require("@lib/serviceConn");
let statements = require("./AssetPermitsSQL");
//let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAllAssetPermits', (req, res) =>{
  servicePool(req, res,
              statements.getAllAssetPermits.statement,
              []
            );
});


router.get('/getOneAssetPermitsByID/:ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneAssetPermitsByID.statement,
        {'ID' :req.params.ID}
      );
});


module.exports = router ;
