require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./getMeetingsSQL");
let servicePool = require('@lib/servicePool');


router.get('/getMeetings/:CREATED_BY/:EMPLOYEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.getMeetings.statement,
              {CREATED_BY : req.params.CREATED_BY,
                EMPLOYEE_ID : req.params.EMPLOYEE_ID}
            );
});

router.get('/activeMeetingsByEmpId/:EMPLOYEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.activeMeetingsByEmpId.statement,
              {
                EMPLOYEE_ID : req.params.EMPLOYEE_ID}
            );
});

router.get('/oldMeetingsByEmpId/:EMPLOYEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.oldMeetingsByEmpId.statement,
              {
                EMPLOYEE_ID : req.params.EMPLOYEE_ID}
            );
});

router.get('/activeMeetingsMembersByCommitteeId/:COMMITTEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.activeMeetingsMembersByCommitteeId.statement,
              {
                COMMITTEE_ID : req.params.COMMITTEE_ID}
            );
});

router.get('/closedMeetingsMembersByCommitteeId/:COMMITTEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.closedMeetingsMembersByCommitteeId.statement,
              {
                COMMITTEE_ID : req.params.COMMITTEE_ID}
            );
});

router.get('/finishedMeetingsMembersByCommitteeId/:COMMITTEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.finishedMeetingsMembersByCommitteeId.statement,
              {
                COMMITTEE_ID : req.params.COMMITTEE_ID}
            );
});

module.exports = router ;
