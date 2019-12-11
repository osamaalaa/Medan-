require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./CommitteMembersSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");


router.get('/getAllCommitteMembers', (req, res) =>{
  servicePool(req, res,
              statements.getAllCommitteMembers.statement,
              []
            );
});


router.get('/getOneCommitteMembersByID/:COMMITTEE_MEMBERS_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneCommitteMembersByID.statement,
        {'COMMITTEE_MEMBERS_ID' :req.params.COMMITTEE_MEMBERS_ID}
      );
});

router.get('/getOneCommitteMembersByProjectId/:project_id', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneCommitteMembersByProjectId.statement,
        {'project_id' :req.params.project_id}
      );
});

router.get('/getOneCommitteMembersByCommitteeId/:COMMITTEE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneCommitteMembersByCommitteeId.statement,
        {'COMMITTEE_ID' :req.params.COMMITTEE_ID}
      );
});



router.get('/getMemberRoles', (req, res) =>{
  servicePool(req,
          res,
          statements.getMemberRoles.statement,
        []
      );
});

router.post('/insertCommitteeMembers', (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertCommitteeMembers.returns).then(convertedbody => {
    servicePool(req, res, statements.insertCommitteeMembers.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});



module.exports = router ;
