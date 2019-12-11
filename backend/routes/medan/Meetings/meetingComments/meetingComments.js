require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./meetingCommentsSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");


router.post('/insertComment', checkdataexists, (req, res) => {
    bodyconverter.bodyconverter(req, res, req.body, statements.insertComment.returns).then(convertedbody => {
      servicePool(req, res, statements.insertComment.statement, convertedbody);
    }).catch(error => {
      res.status(400).json(error);
    });
  });


  router.get('/getCommentsOfMinutes/:meeting_id', (req,res)=>{
    servicePool(req, res, statements.getCommentsOfMinutes.statement, {meeting_id : req.params.meeting_id})
  })

module.exports = router ;
