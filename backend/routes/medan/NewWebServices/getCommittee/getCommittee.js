require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./getCommitteeSQL");
let servicePool = require('@lib/servicePool');


router.get('/getCommittee/:p_emp_id', (req, res) =>{
  servicePool(req, res,
              statements.getCommittee.statement,
              {p_emp_id : req.params.p_emp_id}
            );
});

router.get('/loggedUserCommittee/:EMPLOYEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.loggedUserCommittee.statement,
              {EMPLOYEE_ID : req.params.EMPLOYEE_ID}
            );
});



module.exports = router ;
