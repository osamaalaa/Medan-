require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./PositionsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllPositions', (req, res) =>{
  servicePool(req, res,
              statements.getAllPositions.statement,
              []
            );
});


router.get('/getOnePositionsByID/:POSITION_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOnePositionsByID.statement,
        {'POSITION_ID' :req.params.POSITION_ID}
      );
});


module.exports = router ;
