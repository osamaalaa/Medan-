require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./MeetingAgendaSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllMeetingAgenda', (req, res) =>{
  servicePool(req, res,
              statements.getAllMeetingAgenda.statement,
              []
            );
});


router.get('/getOneMeetingAgendaByID/:MEETING_AGENDA_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneMeetingAgendaByID.statement,
        {'MEETING_AGENDA_ID' :req.params.MEETING_AGENDA_ID}
      );
});
router.get('/getPresentationByMeetingID/:MEETING_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOnePresentationByMeetingID.statement,
        {'MEETING_ID' :req.params.MEETING_ID}
      );
});
router.get('/getMeetingPresentationComments/:MEETING_AGENDA_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getCommentsOfPresentation.statement,
        {'MEETING_AGENDA_ID' :req.params.MEETING_AGENDA_ID}
      );
});


module.exports = router ;
