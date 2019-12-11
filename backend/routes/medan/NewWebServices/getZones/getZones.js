require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./getZonesSQL");
let servicePool = require('@lib/servicePool');



router.get('/getZonesById/:ZONE_ID', (req, res) =>{
  servicePool(req, res,
              statements.getZonesById.statement,
              {ZONE_ID : req.params.ZONE_ID}
            );
});

router.get('/getAllZones', (req, res) =>{
  servicePool(req, res,
              statements.getAllZones.statement,
              []
            );
});




module.exports = router ;
