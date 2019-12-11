require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./getCommitteeMembersSQL");
let servicePool = require('@lib/servicePool');


router.get('/getCommitteeMembers/:COMMITTEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.getCommitteeMembers.statement,
              {COMMITTEE_ID : req.params.COMMITTEE_ID}
            );
});
router.get('/getCommitteeMembersByMemberId/:COMMITTEE_MEMBERS_ID', (req, res) =>{
  servicePool(req, res,
              statements.getCommitteeMembersByMemberId.statement,
              {COMMITTEE_MEMBERS_ID : req.params.COMMITTEE_MEMBERS_ID}
            );
});




module.exports = router ;
