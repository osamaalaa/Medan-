require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./BoqMeasurementSubSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllBoqMeasurementSub', (req, res) =>{
  servicePool(req, res,
              statements.getAllBoqMeasurementSub.statement,
              []
            );
});


router.get('/getOneBoqMeasurementSubByID/:SUB_MEASURE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneBoqMeasurementSubByID.statement,
        {'SUB_MEASURE_ID' :req.params.SUB_MEASURE_ID}
      );
});


module.exports = router ;
