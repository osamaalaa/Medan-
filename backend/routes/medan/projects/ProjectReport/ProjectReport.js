require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ProjectReportSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");


router.get('/getAllProjectReport', (req, res) =>{
  servicePool(req, res,
              statements.getAllProjectReport.statement,
              []
            );
});


router.get('/getOneProjectReportByID/:PROJECT_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneProjectReportByID.statement,
        {'PROJECT_ID' :req.params.PROJECT_ID}
      );
});

router.post('/insertProjectReport', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertProjectReport.returns).then(convertedbody => {
    servicePool(req, res, statements.insertProjectReport.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});
module.exports = router ;
