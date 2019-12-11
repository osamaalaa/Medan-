require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./jobOrderAssetsDummySQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllJobOrderAssets', (req, res) =>{
  servicePool(req, res,
              statements.getAllJobOrderAssets.statement,
              []
            );
});

router.get('/getJobOrderAsset', (req, res) =>{
  servicePool(req, res,
              statements.getJobOrderAsset.statement,
              []
            );
});
router.get('/getOneJobOrderAssetsById/:ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneJobOrderAssetsById.statement,
        {'ID' :req.params.ID}
      );
});


module.exports = router ;
