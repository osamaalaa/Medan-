require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./getAllMembersSQL");
let servicePool = require('@lib/servicePool');
let checkdataexists = require("@vals/dataexists");
let bodyconverter = require("@conv/bodyConverter");


router.get('/getAllMembers', (req, res) =>{
  servicePool(req, res,
              statements.getAllMembers.statement,
              []
            );
});

router.get('/getEmpData/:employee_id', (req, res) =>{
  servicePool(req, res,
              statements.getEmpData.statement,
              {employee_id : req.params.employee_id}
            );
});


module.exports = router ;
