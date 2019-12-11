require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./EmployeeContactsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllEmployeeContacts', (req, res) =>{
  servicePool(req, res,
              statements.getAllEmployeeContacts.statement,
              []
            );
});


router.get('/getOneEmployeeContactsByID/:CONTACT_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneEmployeeContactsByID.statement,
        {'CONTACT_ID' :req.params.CONTACT_ID}
      );
});


module.exports = router ;
