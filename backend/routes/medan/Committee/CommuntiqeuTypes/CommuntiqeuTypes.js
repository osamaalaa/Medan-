require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./CommuntiqeuTypesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllCommuntiqeuTypes', (req, res) =>{
  servicePool(req, res,
              statements.getAllCommuntiqeuTypes.statement,
              []
            );
});


router.get('/getOneCommuntiqeuTypesByID/:COMM_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneCommuntiqeuTypesByID.statement,
        {'COMM_ID' :req.params.COMM_ID}
      );
});


module.exports = router ;
