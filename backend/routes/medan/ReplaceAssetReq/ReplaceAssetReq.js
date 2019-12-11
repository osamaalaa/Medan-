require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ReplaceAssetReqSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllReplaceAssetReq', (req, res) =>{
  servicePool(req, res,
              statements.getAllReplaceAssetReq.statement,
              []
            );
});


router.get('/getOneReplaceAssetReqByID/:REQ_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneReplaceAssetReqByID.statement,
        {'REQ_ID' :req.params.REQ_ID}
      );
});


module.exports = router ;
