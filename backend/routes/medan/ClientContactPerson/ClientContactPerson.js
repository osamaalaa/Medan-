require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ClientContactPersonSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllClientContactPerson', (req, res) =>{
  servicePool(req, res,
              statements.getAllClientContactPerson.statement,
              []
            );
});


router.get('/getOneClientContactPersonByID/:CONTACT_PERSON_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneClientContactPersonByID.statement,
        {'CONTACT_PERSON_ID' :req.params.CONTACT_PERSON_ID}
      );
});


module.exports = router ;
