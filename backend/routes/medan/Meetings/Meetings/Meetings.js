require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./MeetingsSQL");
let servicePool = require('@lib/servicePool');



router.get('/getAllMeetings', (req, res) =>{
  servicePool(req, res,
              statements.getAllMeetings.statement,
              []
            );
});


router.get('/getOneMeetingsByID/:MEETING_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneMeetingsByID.statement,
        {'MEETING_ID' :req.params.MEETING_ID}
      );
});

router.post('/updateSharing/:MEETING_ID/:ACTIVE_SHARING', (req, res) =>{

  if(req.params.ACTIVE_SHARING != "active")
  {
    servicePool(req,
      res,
      statements.notActiveSharing.statement,
    {'MEETING_ID' : req.params.MEETING_ID}
  ); 
 }
  else{
    servicePool(req,
      res,
      statements.activeSharing.statement,
    {'MEETING_ID' : req.params.MEETING_ID}
  );
  }
});

router.get('/getActiveSharing', (req, res) =>{
  servicePool(req, res,
              statements.getActiveSharing.statement,
              []
            );
});

module.exports = router ;
