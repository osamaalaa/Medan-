require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./LookupDetailDetailsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllLookupDetailDetails', (req, res) =>{
  servicePool(req, res,
              statements.getAllLookupDetailDetails.statement,
              []
            );
});


router.get('/getOneLookupDetailDetailsByID/:LOOKUP_DETAILS_DETAILS_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneLookupDetailDetailsByID.statement,
        {'LOOKUP_DETAILS_DETAILS_ID' :req.params.LOOKUP_DETAILS_DETAILS_ID}
      );
});


module.exports = router ;
