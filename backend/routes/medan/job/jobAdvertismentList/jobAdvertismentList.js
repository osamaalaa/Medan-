require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./jobAdvertismentListSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllJobAdvertisments', (req, res) =>{
  servicePool(req, res,
              statements.getAllJobAdvertisments.statement,
              []
            );
});


router.get('/getOneJobAdvertismentsByJobId/:JOB_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneJobAdvertismentsByJobId.statement,
        {'JOB_ID' :req.params.JOB_ID}
      );
});


module.exports = router ;
