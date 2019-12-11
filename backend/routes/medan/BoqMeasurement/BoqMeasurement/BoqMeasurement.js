require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./BoqMeasurementSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllBoqMeasurement', (req, res) =>{
  servicePool(req, res,
              statements.getAllBoqMeasurement.statement,
              []
            );
});


router.get('/getOneBoqMeasurementByID/:MEASURE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneBoqMeasurementByID.statement,
        {'MEASURE_ID' :req.params.MEASURE_ID}
      );
});


module.exports = router ;
