require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("@emp/employees/employeesSQL");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validateemployessSt = require('@joi/validateSt');
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAllEmployees', (req, res)=>{
  servicePool(req,
              res,
              statements.getAllEmployees.statement,
              []
            );
});

router.get('/getEmpsNames', (req, res)=>{
  servicePool(req,
              res,
              statements.getEmpsNames.statement,
              []
            );
});

router.get('/getOneEmployeeByID/:EMPLOYEE_ID', (req, res)=>{
  servicePool(req,
              res,
              statements.getOneEmployeeByID.statement,
              {'EMPLOYEE_ID' :req.params.EMPLOYEE_ID}
            );
});
module.exports = router ;
