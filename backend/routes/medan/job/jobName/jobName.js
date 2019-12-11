require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./jobNameSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllJobName', (req, res) =>{
  servicePool(req, res,
              statements.getAllJobName.statement,
              []
            );
});


router.get('/getOneJobNameById/:ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneJobNameById.statement,
        {'ID' :req.params.ID}
      );
});


module.exports = router ;
