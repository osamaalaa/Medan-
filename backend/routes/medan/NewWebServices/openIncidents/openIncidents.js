require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./openIncidentsSQL");
let servicePool = require('@lib/servicePool');
let checkdataexists = require("@vals/dataexists");
let bodyconverter = require("@conv/bodyConverter");


router.get('/openIncidents/:WORK_ORDER_OWNER', (req, res) =>{
  servicePool(req, res,
              statements.openIncidents.statement,
              {WORK_ORDER_OWNER : req.params.WORK_ORDER_OWNER}
            );
});

router.get('/openIncident/:INC_REP_REQUEST_ID', (req, res) =>{
  servicePool(req, res,
              statements.openIncident.statement,
              {INC_REP_REQUEST_ID : req.params.INC_REP_REQUEST_ID}
            );
});

router.get('/getIncidentsReports', (req, res) =>{
  servicePool(req, res,
              statements.getIncidentsReports.statement,
              []
            );
});

router.get('/getIncidentByEmployeeId/:EMPLOYEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.getIncidentByEmployeeId.statement,
              {EMPLOYEE_ID : req.params.EMPLOYEE_ID }
            );
});

// router.post('/insertIncidentReport', (req, res) => {
//   bodyconverter.bodyconverter(req, res, req.body, statements.insertIncidentReport.returns).then(convertedbody => {
//     servicePool(req, res, statements.insertIncidentReport.statement, convertedbody);
//   }).catch(error => {
//     res.status(400).json(error);
//   });
// });


router.get('/getOpenIncidentById/:RELATED_REQUEST_ID', (req, res) =>{
  servicePool(req, res,
              statements.getOpenIncidentById.statement,
              {RELATED_REQUEST_ID : req.params.RELATED_REQUEST_ID}
            );
});


module.exports = router ;
