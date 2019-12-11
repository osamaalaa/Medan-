require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ProjectGroupsSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");


router.get('/getAllProjectGroups', (req, res) =>{
  servicePool(req, res,
              statements.getAllProjectGroups.statement,
              []
            );
});


router.get('/getOneProjectGroupsByID/:PROJECT_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneProjectGroupsByID.statement,
        {'PROJECT_ID' :req.params.PROJECT_ID}
      );
});

router.post('/insertProjectGroup', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertProjectGroup.returns).then(convertedbody => {
    servicePool(req, res, statements.insertProjectGroup.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

module.exports = router ;
