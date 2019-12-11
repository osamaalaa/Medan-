require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./issueDetailsSQL");
let servicePool = require('@lib/servicePool');


router.get('/issueDetails/:INC_REP_REQUEST_ID', (req, res) =>{
  servicePool(req, res,
              statements.issueDetails.statement,
              { INC_REP_REQUEST_ID : req.params.INC_REP_REQUEST_ID }
            );
});




module.exports = router ;
