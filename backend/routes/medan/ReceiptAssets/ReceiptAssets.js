require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ReceiptAssetsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllReceiptAssets', (req, res) =>{
  servicePool(req, res,
              statements.getAllReceiptAssets.statement,
              []
            );
});


router.get('/getOneReceiptAssetsByID/:RECEIPT_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneReceiptAssetsByID.statement,
        {'RECEIPT_ID' :req.params.RECEIPT_ID}
      );
});


module.exports = router ;
