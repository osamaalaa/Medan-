require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./MilestonePromisedDateSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllMilestonePromisedDate', (req, res) =>{
  servicePool(req, res,
              statements.getAllMilestonePromisedDate.statement,
              []
            );
});


router.get('/getOneMilestonePromisedDateByID/:ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneMilestonePromisedDateByID.statement,
        {'ID' :req.params.ID}
      );
});


module.exports = router ;
