require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./RequestDetailsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllRequestDetails', (req, res) =>{
  servicePool(req, res,
              statements.getAllRequestDetails.statement,
              []
            );
});


router.get('/getOneRequestDetailsByID/:ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneRequestDetailsByID.statement,
        {'ID' :req.params.ID}
      );
});


module.exports = router ;
