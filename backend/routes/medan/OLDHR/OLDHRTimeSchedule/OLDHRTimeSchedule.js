require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./OLDHRTimeScheduleSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllOLDHRTimeSchedule', (req, res) =>{
  servicePool(req, res,
              statements.getAllOLDHRTimeSchedule.statement,
              []
            );
});


router.get('/getOneOLDHRTimeScheduleByID/:SCHEDULE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneOLDHRTimeScheduleByID.statement,
        {'SCHEDULE_ID' :req.params.SCHEDULE_ID}
      );
});


module.exports = router ;
