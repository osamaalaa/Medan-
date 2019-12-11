require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./EmailsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllEmails', (req, res) =>{
  servicePool(req, res,
              statements.getAllEmails.statement,
              []
            );
});


router.get('/getOneEmailsByID/:EMAIL_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneEmailsByID.statement,
        {'EMAIL_ID' :req.params.EMAIL_ID}
      );
});


module.exports = router ;
