require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ProjectDataDeltaSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");


router.get('/getAllProjectDataDelta', (req, res) =>{
  servicePool(req, res,
              statements.getAllProjectDataDelta.statement,
              []
            );
});


router.get('/getOneProjectDataDeltaByID/:SERIAL_NO', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneProjectDataDeltaByID.statement,
        {'SERIAL_NO' :req.params.SERIAL_NO}
      );
});


router.post('/insertProjectDataDelta', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertProjectDataDelta.returns).then(convertedbody => {
    servicePool(req, res, statements.insertProjectDataDelta.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

module.exports = router ;
