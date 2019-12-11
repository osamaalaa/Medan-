require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./inboxViewSQL");
let servicePool = require('@lib/servicePool');


router.get('/getinboxView', (req, res) =>{
  servicePool(req, res,
              statements.getinboxView.statement,
            []
            );
});

router.get('/getInboxViewByReqId/:request_id', (req, res) =>{
    servicePool(req, res,
                statements.getInboxViewByReqId.statement,
              {request_id : req.params.request_id}
              );
  });




module.exports = router ;
