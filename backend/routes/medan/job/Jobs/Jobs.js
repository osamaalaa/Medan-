require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./JobsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllJobs', (req, res) =>{
  servicePool(req, res,
              statements.getAllJobs.statement,
              []
            );
});


router.get('/getOneJobsByID/:JOB_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneJobsByID.statement,
        {'JOB_ID' :req.params.JOB_ID}
      );
});


module.exports = router ;
