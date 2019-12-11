require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ProjectTracksSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllProjectTracks', (req, res) =>{
  servicePool(req, res,
              statements.getAllProjectTracks.statement,
              []
            );
});


router.get('/getOneProjectTracksByID/:PROJCT_TRACK_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneProjectTracksByID.statement,
        {'PROJCT_TRACK_ID' :req.params.PROJCT_TRACK_ID}
      );
});


module.exports = router ;
