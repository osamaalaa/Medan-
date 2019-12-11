require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./DailyWorkingHoursSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllDailyWorkingHours', (req, res) =>{
  servicePool(req, res,
              statements.getAllDailyWorkingHours.statement,
              []
            );
});


router.get('/getOneDailyWorkingHoursByID/:DAILY_HOURS_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneDailyWorkingHoursByID.statement,
        {'DAILY_HOURS_ID' :req.params.DAILY_HOURS_ID}
      );
});


module.exports = router ;
