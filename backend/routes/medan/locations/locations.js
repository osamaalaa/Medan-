require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("@locations/locations/locationsSQL");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validatelocationSt = require('@joi/validateSt');
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAllLocations', (req, res)=>{
  servicePool(req, res,
              statements.getAllLocations.statement,
              []
            );
});


router.get('/getOneLocationByID/:LOCATION_ID' , (req, res)=>{
  servicePool(req,
          res,
          statements.getOneLocationByID.statement,
        {'LOCATION_ID' :req.params.LOCATION_ID}
      );
});

module.exports = router;
