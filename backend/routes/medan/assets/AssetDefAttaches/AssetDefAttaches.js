require("module-alias/register");
let express = require("express");
let router = express.Router();
//let serviceConn = require("@lib/serviceConn");
let statements = require("./AssetDefAttachesSQL");
//let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAllAssetDefAttaches', (req, res) =>{
  servicePool(req, res,
              statements.getAllAssetDefAttaches.statement,
              []
            );
});


router.get('/getOneAssetDefAttachesByID/:ATTACH_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneAssetDefAttachesByID.statement,
        {'ATTACH_ID' :req.params.ATTACH_ID}
      );
});


module.exports = router ;
