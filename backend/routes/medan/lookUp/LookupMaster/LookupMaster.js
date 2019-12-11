require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./LookupMasterSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllLookupMaster', (req, res) =>{
  servicePool(req, res,
              statements.getAllLookupMaster.statement,
              []
            );
});


router.get('/getOneLookupMasterByID/:LOOKUP_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneLookupMasterByID.statement,
        {'LOOKUP_ID' :req.params.LOOKUP_ID}
      );
});


module.exports = router ;
