require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./jobOrderLaborsDummySQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllJobOrderLaborsDummy', (req, res) =>{
  servicePool(req, res,
              statements.getAllJobOrderLaborsDummy.statement,
              []
            );
});


router.get('/getOneJobOrderLaborDummyById/:ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneJobOrderLaborDummyById.statement,
        {'ID' :req.params.ID}
      );
});


module.exports = router ;
