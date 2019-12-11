require('module-alias/register');
let express = require('express');
let router = express.Router();
let statements = require('@issues/issuessubclasscustomfiles/issuessubclasscustomfilesSQL');
let bodyConvertor = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let issuessubclasscustomfilesStructure = require('@joi/validateSt');
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAllIssuesSubClassFiles', (req, res) =>{
  servicePool(req,
  res,
    statements.getAllIssuesSubClassFiles.statement,
    []
      );
});
router.get('/getAllIssuesSubClassFilesByID/:ISSUES_SUB_CLASS_ID', (req, res) =>{
  servicePool(req,
  res,
statements.getAllIssuesSubClassFilesByID.statement,
{'ISSUES_SUB_CLASS_ID' :req.params.ISSUES_SUB_CLASS_ID}
     );
});




module.exports = router;
