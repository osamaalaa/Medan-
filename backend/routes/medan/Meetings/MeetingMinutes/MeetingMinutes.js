require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./MeetingMinutesSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");

router.get('/getAllMeetingMinutes', (req, res) =>{
  servicePool(req, res,
              statements.getAllMeetingMinutes.statement,
              []
            );
});


router.get('/getOneMeetingMinutesID/:MEETING_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneMeetingMinutesID.statement,
        {'MEETING_ID' :req.params.MEETING_ID}
      );
});


router.post('/insertAttachment', (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertAttachment.returns).then(convertedbody => {
    servicePool(req, res, statements.insertAttachment.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

router.post('/deleteMeetingMinutes/:MOM_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.deleteMeetingMinutes.statement,
        {'MOM_ID' :req.params.MOM_ID}
      );
});

module.exports = router ;
