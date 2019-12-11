require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ProjectCMSSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");


router.get('/getAllProjectCMS', (req, res) =>{
  servicePool(req, res,
              statements.getAllProjectCMS.statement,
              []
            );
});


router.get('/getOneProjectCMSByID/:PROJECT_CMS_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneProjectCMSByID.statement,
        {'PROJECT_CMS_ID' :req.params.PROJECT_CMS_ID}
      );
});

router.post('/insertProjectCMS', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertProjectCMS.returns).then(convertedbody => {
    servicePool(req, res, statements.insertProjectCMS.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});


module.exports = router ;
