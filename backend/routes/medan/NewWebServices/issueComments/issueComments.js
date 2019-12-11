require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./issueCommentsSQL");
let servicePool = require('@lib/servicePool');
let checkdataexists = require("@vals/dataexists");
let bodyconverter = require("@conv/bodyConverter");


router.get('/getIssueComments/:ISSUE_ID', (req, res) =>{
  servicePool(req, res,
              statements.getIssueComments.statement,
              {ISSUE_ID : req.params.ISSUE_ID}
            );
});




module.exports = router ;
