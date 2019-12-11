require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./MilestonesDeleviablesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllMilestonesDeleviables', (req, res) =>{
  servicePool(req, res,
              statements.getAllMilestonesDeleviables.statement,
              []
            );
});


router.get('/getOneMilestonesDeleviablesByID/:DELEVRABLE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneMilestonesDeleviablesByID.statement,
        {'DELEVRABLE_ID' :req.params.DELEVRABLE_ID}
      );
});

router.get('/getMilestonesDeleviablesByMilestoneID/:MILESTONE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getMilestonesDeleviablesByMilestoneID.statement,
        {'MILESTONE_ID' :req.params.MILESTONE_ID}
      );
});

router.get('/getDeliverablesStatus', (req, res) =>{
  servicePool(req, res,
              statements.getDeliverablesStatus.statement,
              []
            );
});

router.post('/deleteMilestoneDeliverable/:DELEVRABLE_ID' , (req, res)=>{
  servicePool(req, res, statements.deleteMilestoneDeliverable.statement,
    {DELEVRABLE_ID : req.params.DELEVRABLE_ID})
})


module.exports = router ;
