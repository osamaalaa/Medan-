require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./SystemFunSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllSystemFun', (req, res) =>{
  servicePool(req, res,
              statements.getAllSystemFun.statement,
              []
            );
});


router.get('/getOneSystemFunByID/:FUNCTIONS_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneSystemFunByID.statement,
        {'FUNCTIONS_ID' :req.params.FUNCTIONS_ID}
      );
});


module.exports = router ;
