require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./assetNameListSQL");
let servicePool = require('@lib/servicePool');



router.get('/getAssetsName', (req, res) =>{
  servicePool(req, res,
              statements.getAssetsName.statement,
              []
            );
});


module.exports = router ;
