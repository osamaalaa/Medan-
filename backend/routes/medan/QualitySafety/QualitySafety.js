require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./QualitySafetySQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllQualitySafety', (req, res) =>{
  servicePool(req, res,
              statements.getAllQualitySafety.statement,
              []
            );
});


router.get('/getOneQualitySafetyByID/:QS_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneQualitySafetyByID.statement,
        {'QS_ID' :req.params.QS_ID}
      );
});


module.exports = router ;
