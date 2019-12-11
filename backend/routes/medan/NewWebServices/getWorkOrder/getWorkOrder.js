require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./getWorkOrderSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");

router.get('/getWorkOrder/:PROJECT_ID', (req, res) =>{
  servicePool(req, res,
              statements.getWorkOrder.statement,
              {PROJECT_ID : req.params.PROJECT_ID}
            );
});


router.get('/getWorkOrderClassification', (req, res) =>{
  servicePool(req, res,
              statements.getWorkOrderClassification.statement,
              []
            );
});

router.get('/getPhaseTasks', (req, res) =>{
  servicePool(req, res,
              statements.getPhaseTasks.statement,
              []
            );
});

router.get('/getWorkorderMilestone', (req, res) =>{
  servicePool(req, res,
              statements.getWorkorderMilestone.statement,
              []
            );
});

router.get('/getMeasurements', (req, res) =>{
  servicePool(req, res,
              statements.getMeasurements.statement,
              []
            );
});

router.get('/getWorkorderbyEmpId/:EMPLOYEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.getWorkorderbyEmpId.statement,
              {EMPLOYEE_ID : req.params.EMPLOYEE_ID}
            );
});

router.get('/getWorkOrderStatus', (req, res) =>{
  servicePool(req, res,
              statements.getWorkOrderStatus.statement,
              []
            );
});


module.exports = router ;
