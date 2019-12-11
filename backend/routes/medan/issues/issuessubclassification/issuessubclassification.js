require('module-alias/register');
let express = require('express');
let router = express.Router();
let statements = require('@issues/issuessubclassification/issuessubclassificationSQL');
let bodyConvertor = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let issuessubclassificationStructure = require('@joi/validateSt');
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');
router.get('/getAllissuessubclassification', (req, res) =>{
  servicePool(req,
            res,
          statements.getAllissuessubclassification.statement,
        []
        );
});

router.get('/getAllissuessubclassificationByID/:CLASSIFICATION_ID' , (req, res) =>{
  servicePool(req,
  res,
  statements.getAllissuessubclassificationByID.statement,
   {'CLASSIFICATION_ID' :req.params.CLASSIFICATION_ID}
);
});


module.exports = router ;
