require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("@assetgroupviolations/assetgroupviolations/assetgroupviolationsSQL");
let servicePool = require('@lib/servicePool');
let checkData = require('@vals/dataexists');
let validate = require('@lib/validatestructure');

router.get('/getAllassetGroupViolations', (req, res) =>{
  servicePool(req, res,
              statements.getAllassetGroupViolations.statement,
              []
            );
});


router.get('/getOneassetGroupViolationsByID/:ASSET_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneassetGroupViolationsByID.statement,
        {'ASSET_ID' :req.params.ASSET_ID}
      );
});






module.exports = router ;
