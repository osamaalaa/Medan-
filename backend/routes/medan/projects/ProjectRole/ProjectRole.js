require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ProjectRoleSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");


router.get('/getAllProjectRole', (req, res) =>{
  servicePool(req, res,
              statements.getAllProjectRole.statement,
              []
            );
});


router.get('/getOneProjectRoleByID/:PROJECT_ROLES_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneProjectRoleByID.statement,
        {'PROJECT_ROLES_ID' :req.params.PROJECT_ROLES_ID}
      );
});

router.post('/insertProjectRole', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertProjectRole.returns).then(convertedbody => {
    servicePool(req, res, statements.insertProjectRole.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

module.exports = router ;
