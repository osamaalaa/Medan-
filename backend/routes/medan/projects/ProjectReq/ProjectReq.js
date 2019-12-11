require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ProjectReqSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");

router.get('/getAllProjectReq', (req, res) =>{
  servicePool(req, res,
              statements.getAllProjectReq.statement,
              []
            );
});


router.get('/getOneProjectReqByID/:PJ_REQUEST', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneProjectReqByID.statement,
        {'PJ_REQUEST' :req.params.PJ_REQUEST}
      );
});

router.post('/insertProjectRequests', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertProjectRequests.returns).then(convertedbody => {
    servicePool(req, res, statements.insertProjectRequests.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

module.exports = router ;
