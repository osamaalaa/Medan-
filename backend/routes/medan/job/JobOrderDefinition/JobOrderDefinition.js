require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./JobOrderDefinitionSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllJobOrderDefinition', (req, res) =>{
  servicePool(req, res,
              statements.getAllJobOrderDefinition.statement,
              []
            );
});


router.get('/getOneJobOrderDefinitionByID/:JOB_ORDER_DEF_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneJobOrderDefinitionByID.statement,
        {'JOB_ORDER_DEF_ID' :req.params.JOB_ORDER_DEF_ID}
      );
});


module.exports = router ;
