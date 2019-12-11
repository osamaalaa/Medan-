require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ServicesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllServices', (req, res) =>{
  servicePool(req, res,
              statements.getAllServices.statement,
              []
            );
});


router.get('/getOneServicesByID/:SERVICE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneServicesByID.statement,
        {'SERVICE_ID' :req.params.SERVICE_ID}
      );
});


module.exports = router ;
