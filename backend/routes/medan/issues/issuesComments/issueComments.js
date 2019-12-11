require('module-alias/register');
let express = require('express');
let router = express.Router();
let bodyconverter = require("@conv/bodyConverter");
let statements = require("@issues/issuesComments/issueCommentsSQL");
let checkdataexists = require("@vals/dataexists");
let issuescommentsStructure = require('@joi/validateSt');
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');


router.get('/getAllIssuesComments', (req, res) =>{
  servicePool(req, res,
              statements.getAllIssuesComments.statement,
              []
            );
});
//----------------------
router.get('/getIssuesCommentsByID/:issue_id', (req, res) =>{
  servicePool(req,
          res,
          statements.getIssuesCommentsByID.statement,
        {'issue_id' :req.params.issue_id}
      );
});

// get Comments by ISSUE_ID

//----------------------
router.post('/insertNewIssueComments' , (req,res)=>{
    // console.log(req.body);
    bodyconverter.bodyconverter(req,res,req.body,statements.insertNewIssueComments.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertNewIssueComments.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

module.exports = router;
