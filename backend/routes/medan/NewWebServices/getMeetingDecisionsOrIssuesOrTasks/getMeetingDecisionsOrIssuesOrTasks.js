require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./getMeetingDecisionsOrIssuesOrTasksSQL");
let servicePool = require('@lib/servicePool');




router.get('/getMeetingDecisionsOrIssuesOrTasks/:MEETING_ID/:TYPE' , (req,res) => {
  servicePool(
  req,
  res,
  statements.getMeetingDecisionsOrIssuesOrTasks.statement,
  { 
    MEETING_ID : req.params.MEETING_ID,
    TYPE : req.params.TYPE  });
});



module.exports = router ;
