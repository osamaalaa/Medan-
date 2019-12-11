require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./MilestonesDetailsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllMilestonesDetails', (req, res) =>{
  servicePool(req, res,
              statements.getAllMilestonesDetails.statement,
              []
            );
});


router.get('/getOneMilestonesDetailsByID/:MILESTONE_DETAIL_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneMilestonesDetailsByID.statement,
        {'MILESTONE_DETAIL_ID' :req.params.MILESTONE_DETAIL_ID}
      );
});


module.exports = router ;
