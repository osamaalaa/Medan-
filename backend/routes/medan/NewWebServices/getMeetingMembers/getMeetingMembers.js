require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./getMeetingMembersSQL");
let servicePool = require('@lib/servicePool');


router.get('/getMeetingMembers/:MEETING_ID', (req, res) =>{
  servicePool(req, res,
              statements.getMeetingMembers.statement,
              {MEETING_ID : req.params.MEETING_ID}
            );
});





module.exports = router ;
