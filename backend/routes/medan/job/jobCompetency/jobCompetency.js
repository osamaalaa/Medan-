require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./jobCompetencySQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllJobCompetency', (req, res) =>{
  servicePool(req, res,
              statements.getAllJobCompetency.statement,
              []
            );
});


router.get('/getOneJobComptencyByJobId/:JOB_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneJobComptencyByJobId.statement,
        {'JOB_ID' :req.params.JOB_ID}
      );
});


module.exports = router ;
