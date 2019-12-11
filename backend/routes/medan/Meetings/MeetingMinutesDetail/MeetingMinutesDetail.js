require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./MeetingMinutesDetailSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllMeetingMinutesDetail', (req, res) =>{
  servicePool(req, res,
              statements.getAllMeetingMinutesDetail.statement,
              []
            );
});


router.get('/getOneMeetingMinutesDetailByID/:ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneMeetingMinutesDetailByID.statement,
        {'ID' :req.params.ID}
      );
});


module.exports = router ;
