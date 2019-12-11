require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./StudiesRequestsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllStudiesRequests', (req, res) =>{
  servicePool(req, res,
              statements.getAllStudiesRequests.statement,
              []
            );
});


router.get('/getOneStudiesRequestsByID/:REQUEST_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneStudiesRequestsByID.statement,
        {'REQUEST_ID' :req.params.REQUEST_ID}
      );
});


module.exports = router ;
