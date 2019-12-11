require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./CompetencyMatrixSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllCompetencyMatrix', (req, res) =>{
  servicePool(req, res,
              statements.getAllCompetencyMatrix.statement,
              []
            );
});


router.get('/getOneCompetencyMatrixByID/:COMPETENCY_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneCompetencyMatrixByID.statement,
        {'COMPETENCY_ID' :req.params.COMPETENCY_ID}
      );
});


module.exports = router ;
