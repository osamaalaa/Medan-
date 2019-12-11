require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./RequestTypeStepsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllRequestTypeSteps', (req, res) =>{
  servicePool(req, res,
              statements.getAllRequestTypeSteps.statement,
              []
            );
});


router.get('/getOneRequestTypeStepsByID/:STEP_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneRequestTypeStepsByID.statement,
        {'STEP_ID' :req.params.STEP_ID}
      );
});


module.exports = router ;
