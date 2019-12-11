require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./RequestsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllRequests', (req, res) =>{
  servicePool(req, res,
              statements.getAllRequests.statement,
              []
            );
});


router.get('/getOneRequestsByID/:REQUEST_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneRequestsByID.statement,
        {'REQUEST_ID' :req.params.REQUEST_ID}
      );
});


module.exports = router ;
