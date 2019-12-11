require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ServicesTargetDetailsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllServicesTargetDetails', (req, res) =>{
  servicePool(req, res,
              statements.getAllServicesTargetDetails.statement,
              []
            );
});


router.get('/getOneServicesTargetDetailsByID/:DETAIL_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneServicesTargetDetailsByID.statement,
        {'DETAIL_ID' :req.params.DETAIL_ID}
      );
});


module.exports = router ;
