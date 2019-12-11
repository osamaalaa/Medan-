require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./MeetingSchedulesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllMeetingSchedules', (req, res) =>{
  servicePool(req, res,
              statements.getAllMeetingSchedules.statement,
              []
            );
});


router.get('/getOneMeetingSchedulesByID/:SCHEDULE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneMeetingSchedulesByID.statement,
        {'SCHEDULE_ID' :req.params.SCHEDULE_ID}
      );
});


module.exports = router ;
