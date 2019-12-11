require('module-alias/register');
let express = require('express');
let router = express.Router();
let bodyconverter =require ("@conv/bodyConverter");
let statements = require("@lookUp/lookUpApps/lookUpSQL");
let checkdataexists = require("@vals/dataexists");
let validatelookUpAppsSt = require('@joi/validateSt');
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAlllookUps', (req, res) =>{
  servicePool(req, res,
              statements.getAlllookUps.statement,
              []
            );
});
//-------------
router.get('/getOneLookUpAppsByID/:LOOKUP_APP_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneLookUpAppsByID.statement,
        {'LOOKUP_APP_ID' :req.params.LOOKUP_APP_ID}
      );
});
//----------------------


module.exports = router;
