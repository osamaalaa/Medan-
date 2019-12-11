require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./pendingMeetingIssuesSQL");
let servicePool = require('@lib/servicePool');


router.get('/pendingMeetingIssues/:RESPONSABLE_MEMBER', (req, res) =>{
  servicePool(req, res,
              statements.pendingMeetingIssues.statement,
              {RESPONSABLE_MEMBER : req.params.RESPONSABLE_MEMBER}
            );
});




module.exports = router ;
