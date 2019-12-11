require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ProjectMilestoneSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");


router.get('/getAllProjectMilestone', (req, res) =>{
  servicePool(req, res,
              statements.getAllProjectMilestone.statement,
              []
            );
});


router.get('/Risks/:project_id', (req, res) =>{
  servicePool(req, res,
              statements.getProjectMilestone.statement,
              { project_id : req.params.project_id}
            );
});

router.get('/getOneProjectMilestoneByID/:MILESTONE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneProjectMilestoneByID.statement,
        {'MILESTONE_ID' :req.params.MILESTONE_ID}
      );
});

router.get('/getOneProjectMilestoneByBoqId/:BOQ_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneProjectMilestoneByBoqId.statement,
        {'BOQ_ID' :req.params.BOQ_ID}
      );
});

router.get('/getOneProjectMilestoneByProjectID/:PROJECT_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneProjectMilestoneByProjectID.statement,
        {'PROJECT_ID' :req.params.PROJECT_ID}
      );
});

router.get('/HighLevelPlan/:PROJECT_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getProjectMilestoneByProId.statement,
        {'PROJECT_ID' :req.params.PROJECT_ID}
      );
});


router.get('/deliverables/:project_id', (req, res) =>{
  servicePool(req,
          res,
          statements.deliverables.statement,
          { 
            project_id : req.params.project_id
          }
     );
});


router.post('/insertProjectMilestone', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertProjectMilestone.returns).then(convertedbody => {
    servicePool(req, res, statements.insertProjectMilestone.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

router.post('/deleteProjectMilestone', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.deleteProjectMilestone.returns).then(convertedbody => {
    servicePool(req, res, statements.deleteProjectMilestone.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

router.post('/updateProjectMilestone/:MILESTONE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.updateProjectMilestone.statement,
        { MILESTONE_ID :req.params.MILESTONE_ID,
          MILESTONE_NAME :req.body.MILESTONE_NAME,
          MILESTONE_DESCRIPTION :req.body.MILESTONE_DESCRIPTION,
          EXPECTED_DILIVERY_DATE :req.body.EXPECTED_DILIVERY_DATE,
          BOQ_ID :req.body.BOQ_ID,
          PROJECT_ID :req.body.PROJECT_ID,
          VALUE :req.body.VALUE,
          PROMISED_DATE :req.body.PROMISED_DATE,
          CRITICAL :req.body.CRITICAL,
          DURATION :req.body.DURATION,
          MILESTONE_DELIVERER :req.body.MILESTONE_DELIVERER,
          MILESTONE_RECEIVER :req.body.MILESTONE_RECEIVER,
          WO_CLASS_REQUIRED :req.body.WO_CLASS_REQUIRED,
          WO_PASS_VALUE :req.body.WO_PASS_VALUE
        }
      );
});

module.exports = router ;
