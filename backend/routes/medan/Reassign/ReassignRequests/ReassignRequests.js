require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ReassignRequestsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllReassignRequests', (req, res) =>{
  servicePool(req, res,
              statements.getAllReassignRequests.statement,
              []
            );
});


router.get('/getOneReassignRequestsByID/:RE_REQUEST_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneReassignRequestsByID.statement,
        {'RE_REQUEST_ID' :req.params.RE_REQUEST_ID}
      );
});


module.exports = router ;
