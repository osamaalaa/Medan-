require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./MaintanceTypesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllMaintanceTypes', (req, res) =>{
  servicePool(req, res,
              statements.getAllMaintanceTypes.statement,
              []
            );
});


router.get('/getOneMaintanceTypesByID/:TYPE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneMaintanceTypesByID.statement,
        {'TYPE_ID' :req.params.TYPE_ID}
      );
});


module.exports = router ;
