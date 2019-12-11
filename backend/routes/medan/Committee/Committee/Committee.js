require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./CommitteeSQL");
let servicePool = require('@lib/servicePool');
let businessPool = require("@lib/businessPool");
let bodyconverter = require("@conv/bodyConverter");


router.get('/getAllcommittes', (req, res) =>{
  servicePool(req, res,
              statements.getAllcommittes.statement,
              []
            );
});


router.get('/getOnecommitteByID/:COMMITTEE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOnecommitteByID.statement,
        {'COMMITTEE_ID' :req.params.COMMITTEE_ID}
      );
});


router.get('/getCommittesOfOneProject/:PROJECT_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getCommittesOfOneProject.statement,
        {'PROJECT_ID' :req.params.PROJECT_ID}
      );
});


router.post('/updateCommittee/:COMMITTEE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.updateCommittee.statement,
        {
        'COMMITTEE_ID' :req.params.COMMITTEE_ID,
        'COMMITTEE_NAME_EN' :req.body.COMMITTEE_NAME_EN,
        'COMMITTEE_NAME_AR' :req.body.COMMITTEE_NAME_AR,
        'COMMITTEE_TYPE' :req.body.COMMITTEE_TYPE,
        'STATUS' :req.body.STATUS}
      );
});

router.get('/getCommitteesType', (req, res) =>{
  servicePool(req,
          res,
          statements.getCommitteesType.statement,
        []
      );
});


router.post('/insertCommittee', (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertCommittee.returns).then(convertedbody => {
    servicePool(req, res, statements.insertCommittee.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});


router.post('/updateCommitteeParent', (req, res) =>{
  servicePool(req,
          res,
          statements.updateCommitteeParent.statement,
        {
          COMMITTEE_ID : req.body.COMMITTEE_ID,
          COMMITTEE_PARENT_ID : req.body.COMMITTEE_PARENT_ID
                }
      );
});

router.post('/addRole', (req, res) =>{
  servicePool(req,
          res,
          statements.addRole.statement,
        {
          COMMITTEE_ID : req.body.COMMITTEE_ID,
          ROLES_RESP : req.body.ROLES_RESP
                }
      );
});


module.exports = router ;
