require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./PositionsPrerequistsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllPositionsPrerequists', (req, res) =>{
  servicePool(req, res,
              statements.getAllPositionsPrerequists.statement,
              []
            );
});


router.get('/getOnePositionsPrerequistsByID/:PREREQUISITS_SERIAL', (req, res) =>{
  servicePool(req,
          res,
          statements.getOnePositionsPrerequistsByID.statement,
        {'PREREQUISITS_SERIAL' :req.params.PREREQUISITS_SERIAL}
      );
});


module.exports = router ;
