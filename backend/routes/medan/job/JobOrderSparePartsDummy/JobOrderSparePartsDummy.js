require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./JobOrderSparePartsDummySQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllJobOrderSparePartsDummy', (req, res) =>{
  servicePool(req, res,
              statements.getAllJobOrderSparePartsDummy.statement,
              []
            );
});


router.get('/getOneJobOrderSparePartsDummyByID/:ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneJobOrderSparePartsDummyByID.statement,
        {'ID' :req.params.ID}
      );
});


module.exports = router ;
