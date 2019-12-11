require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ProjectBenefitSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");

router.get('/getAllProjectBenefit', (req, res) =>{
  servicePool(req, res,
              statements.getAllProjectBenefit.statement,
              []
            );
});


router.get('/getOneProjectBenefitByID/:BENEFIT_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneProjectBenefitByID.statement,
        {'BENEFIT_ID' :req.params.BENEFIT_ID}
      );
});


router.post('/insertProjectBenefit', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertProjectBenefit.returns).then(convertedbody => {
    servicePool(req, res, statements.insertProjectBenefit.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});


module.exports = router ;
