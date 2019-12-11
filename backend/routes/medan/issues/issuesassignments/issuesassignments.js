require("module-alias/register");
let express = require('express');
let router = express.Router();
let statements = require('@issues/issuesassignments/issuesassignmentsSQL');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');
let issuesassignmentsStructure = require('@joi/validateSt');


router.get('/getAllissuesassignments', (req, res) =>{
  servicePool(req,
              res,
              statements.getAllissuesassignments.statment,
              []
            );
});

router.get('/getAllissuesassignmentsByID/:ASSIGNMENT_ID', (req, res) =>{
  servicePool(req,
              res,
              statements.getAllissuesassignmentsByID.statment,
              {'ASSIGNMENT_ID' :req.params.ASSIGNMENT_ID}
            );
});




module.exports = router;
