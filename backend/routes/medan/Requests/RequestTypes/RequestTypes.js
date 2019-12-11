require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./RequestTypesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllRequestTypes', (req, res) =>{
  servicePool(req, res,
              statements.getAllRequestTypes.statement,
              []
            );
});


router.get('/getOneRequestTypesByID/:TYPE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneRequestTypesByID.statement,
        {'TYPE_ID' :req.params.TYPE_ID}
      );
});


module.exports = router ;
