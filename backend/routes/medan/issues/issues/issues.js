require('module-alias/register');
let express = require('express');
let router = express.Router();
let bodyconverter = require("@conv/bodyConverter");
let statements = require("@issues/issues/issuesSQL");
let checkdataexists = require("@vals/dataexists");
let issuesStructure = require('@joi/validateSt');
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAllIssues', (req, res) =>{
  servicePool(req, res,
              statements.getAllIssues.statement,
              []
            );
});

router.get('/getIssues', (req, res) =>{
  servicePool(req, res,
              statements.getIssues.statement,
              []
            );
});

router.post('/insertIssue' , checkdataexists ,  (req,res)=>{
  bodyconverter.bodyconverter(req,res,req.body,statements.insertIssue.returns).then(convertedbody=>{
      servicePool(req,res,statements.insertIssue.statement,convertedbody);
  }).catch(error => { res.status(400).json(error); });
});


router.post('/insertNIssue' , checkdataexists ,  (req,res)=>{
  bodyconverter.bodyconverter(req,res,req.body,statements.insertNIssue.returns).then(convertedbody=>{
      servicePool(req,res,statements.insertNIssue.statement,convertedbody);
  }).catch(error => { res.status(400).json(error); });
});


//----------------------------------------
router.post('/insertNewIssue' , checkdataexists ,  (req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertNewIssue.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertNewIssue.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

//----------------------------
router.get('/getAllIssuesByID/:ISSUE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getAllIssuesByID.statement,
        {'ISSUE_ID' :req.params.ISSUE_ID}
      );
});

router.get('/getMaxissuesAssignment/:p_employeeId', (req, res) =>{
  servicePool(req,
              res,
              statements.getMaxissuesAssignment.statement,
              {'p_employeeId' :req.params.p_employeeId}
            );
});

router.get('/getIssuesByEmpID/:EMPLOYEE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getIssuesByEmpID.statement,
        {'EMPLOYEE_ID' :req.params.EMPLOYEE_ID}
      );
});

router.post('/insertNewIssueAssignments' , checkdataexists ,  (req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertNewIssueAssignments.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertNewIssueAssignments.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

//-----------------




module.exports = router;
