require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./MeetingMembersSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllMeetingMembers', (req, res) =>{
  servicePool(req, res,
              statements.getAllMeetingMembers.statement,
              []
            );
});


router.get('/getOneMeetingMembersByID/:MEETING_MEMBER_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneMeetingMembersByID.statement,
        {'MEETING_MEMBER_ID' :req.params.MEETING_MEMBER_ID}
      );
});


module.exports = router ;
