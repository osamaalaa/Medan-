require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ProjectKPISQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");


router.get('/getAllProjectKPI', (req, res) =>{
  servicePool(req, res,
              statements.getAllProjectKPI.statement,
              []
            );
});


router.get('/getOneProjectKPIByID/:KBI_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneProjectKPIByID.statement,
        {'KBI_ID' :req.params.KBI_ID}
      );
});


router.post('/insertProjectKPI', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertProjectKPI.returns).then(convertedbody => {
    servicePool(req, res, statements.insertProjectKPI.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

module.exports = router ;
