require("module-alias/register");
require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./updateDailyWorkingHoursSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validateCloseJobOrder = require('@lib/validatestructure');


router.post('/updateDailyWorkingHours/:DAILY_HOURS_ID' , (req,res) => {
    servicePool(
    req,
    res,
    statements.updateDailyWorkingHours.statement,
    { 
        DAILY_HOURS_ID : req.params.DAILY_HOURS_ID ,
        WORK_ORDER_ID : req.body.WORK_ORDER_ID,
        WORK_DATE : req.body.WORK_DATE,
        WORKING_HOURS : req.body.WORKING_HOURS,
        COMMENTS : req.body.COMMENTS
    });
  });




module.exports = router ;
