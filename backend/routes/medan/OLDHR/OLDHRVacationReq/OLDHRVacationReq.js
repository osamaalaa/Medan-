require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./OLDHRVacationReqSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllOLDHRVacationReq', (req, res) =>{
  servicePool(req, res,
              statements.getAllOLDHRVacationReq.statement,
              []
            );
});


router.get('/getOneOLDHRVacationReqByID/:VACATION_REQUEST_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneOLDHRVacationReqByID.statement,
        {'VACATION_REQUEST_ID' :req.params.VACATION_REQUEST_ID}
      );
});


module.exports = router ;
