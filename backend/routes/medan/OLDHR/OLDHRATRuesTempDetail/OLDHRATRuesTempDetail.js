require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./OLDHRATRuesTempDetailSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllOLDHRATRuesTempDetail', (req, res) =>{
  servicePool(req, res,
              statements.getAllOLDHRATRuesTempDetail.statement,
              []
            );
});


router.get('/getOneOLDHRATRuesTempDetailByID/:ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneOLDHRATRuesTempDetailByID.statement,
        {'ID' :req.params.ID}
      );
});


module.exports = router ;
