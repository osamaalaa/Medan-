require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ClientsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllClients', (req, res) =>{
  servicePool(req, res,
              statements.getAllClients.statement,
              []
            );
});


router.get('/getOneClientByID/:CLIENT_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneClientByID.statement,
        {'CLIENT_ID' :req.params.CLIENT_ID}
      );
});


module.exports = router ;
