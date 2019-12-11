require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ProjectBoqSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");


router.get('/getAllProjectBoq', (req, res) =>{
  servicePool(req, res,
              statements.getAllProjectBoq.statement,
              []
            );
});

router.get('/getBoqLocations', (req, res) =>{
  servicePool(req, res,
              statements.getBoqLocations.statement,
              []
            );
});


router.get('/Scope/:PROJECT_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneProjectBoqByProjectID.statement,
        {'PROJECT_ID' :req.params.PROJECT_ID}
      );
});

router.get('/getProjectMilestoneByProId/:PROJECT_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getProjectMilestoneByProId.statement,
        {'PROJECT_ID' :req.params.PROJECT_ID}
      );
});

router.get('/getOneProjectBoqByID/:BOQ_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneProjectBoqByID.statement,
        {'BOQ_ID' :req.params.BOQ_ID}
      );
});

router.post('/insertProjectBoq', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertProjectBoq.returns).then(convertedbody => {
    servicePool(req, res, statements.insertProjectBoq.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

router.get('/getBoqCalssification', (req, res) =>{
  servicePool(req, res,
              statements.getBoqCalssification.statement,
              []
            );
});

router.get('/getBoqType', (req, res) =>{
  servicePool(req, res,
              statements.getBoqType.statement,
              []
            );
});

router.get('/getUnitsOfMeasure', (req, res) =>{
  servicePool(req, res,
              statements.getUnitsOfMeasure.statement,
              []
            );
});

router.post('/deleteProjectBoq', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.deleteProjectBoq.returns).then(convertedbody => {
    servicePool(req, res, statements.deleteProjectBoq.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

router.post('/updateProjectBoq', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.updateProjectBoq.returns).then(convertedbody => {
    servicePool(req, res, statements.updateProjectBoq.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});


router.get('/boqChild/:BOQ_PARENT', (req, res) =>{
  servicePool(req,
          res,
          statements.boqChild.statement,
        {'BOQ_PARENT' :req.params.BOQ_PARENT}
      );
});


module.exports = router ;
