require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./MilestoneRisksSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");

router.get('/getAllMilestoneRisks', (req, res) =>{
  servicePool(req, res,
              statements.getAllMilestoneRisks.statement,
              []
            );
});


router.get('/getOneMilestoneRisksByID/:MILE_RISK_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneMilestoneRisksByID.statement,
        {'MILE_RISK_ID' :req.params.MILE_RISK_ID}
      );
});


router.get('/getRisksType', (req, res) =>{
  servicePool(req,
          res,
          statements.getRisksType.statement,
        []
      );
});

router.get('/getRisksClassification', (req, res) =>{
  servicePool(req,
          res,
          statements.getRisksClassification.statement,
        []
      );
});

router.get('/getRisks/:milestone_id', (req, res) =>{
  servicePool(req,
          res,
          statements.getRisks.statement,
        {milestone_id : req.params.milestone_id}
      );
});

router.post('/deleteMilestoneRisk/:risk_id' , (req, res)=>{
  servicePool(req, res, statements.deleteMilestoneRisk.statement,
    {risk_id : req.params.risk_id})
})
module.exports = router ;
