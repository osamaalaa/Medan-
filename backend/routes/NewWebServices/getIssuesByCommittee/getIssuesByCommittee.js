require("module-alias/register");
require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./getIssuesByCommitteeSQL");
let servicePool = require('@lib/servicePool');


//////////////// issues
router.get('/getIssuesByCommittee/:commitee_id' , (req,res) => {
    servicePool(
    req,
    res,
    statements.getIssuesByCommittee.statement,
    { 
        commitee_id : req.params.commitee_id 
    });
  });




module.exports = router ;
