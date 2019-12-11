require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./JobRequestCheckSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllJobRequestCheck', (req, res) =>{
  servicePool(req, res,
              statements.getAllJobRequestCheck.statement,
              []
            );
});


router.get('/getOneJobRequestCheckByID/:JOB_REQUEST_CHECK_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneJobRequestCheckByID.statement,
        {'JOB_REQUEST_CHECK_ID' :req.params.JOB_REQUEST_CHECK_ID}
      );
});


module.exports = router ;
