require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./getMeetingAgendaSQL");
let servicePool = require('@lib/servicePool');


router.get('/getMeetingAgenda/:MEETING_ID', (req, res) =>{
  servicePool(req, res,
              statements.getMeetingAgenda.statement,
              {MEETING_ID : req.params.MEETING_ID}
            );
});




module.exports = router ;
