require('module-alias/register');
let express = require('express');
let router = express.Router();
// let bodyconverter = require("@conv/bodyconverter");
let statements = require("@issues/issuesattachments/issuesattachmentsSQL");
let checkdataexists = require("@vals/dataexists");
let issuesattachmentsStructure = require('@joi/validateSt');
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAllissuesattachments', (req, res) =>{
  servicePool(req,
     res,
     statements.getAllissuesattachments.statement,
    []
   );
});

//  get one with attach_id

router.get('/getOneissuesattachmentsByID/:ATTACH_ID',(req, res) =>{
    servicePool(req,
       res,
        statements.getOneissuesattachmentsByID.statement,
        {'ATTACH_ID' :req.params.ATTACH_ID}
      );
});

//  get one by issue_id
router.get('/getOneissuesattachmentsByIssueID/:ISSUE_ID',(req, res) =>{
  servicePool(req,
     res,
      statements.getOneissuesattachmentsByIssueID.statement,
      {'ISSUE_ID' :req.params.ISSUE_ID}
    );
});

//  get one by comment_id
router.get('/getOneissuesattachmentsByCommentID/:COMMENT_ID',(req, res) =>{
servicePool(req,
   res,
    statements.getOneissuesattachmentsByCommentID.statement,
    {'COMMENT_ID' :req.params.COMMENT_ID}
  );
});






module.exports = router;
