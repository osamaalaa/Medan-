require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./CompetencyGroupSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllCompetencyGroup', (req, res) =>{
  servicePool(req, res,
              statements.getAllCompetencyGroup.statement,
              []
            );
});


router.get('/getOneCompetencyGroupByID/:GROUP_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneCompetencyGroupByID.statement,
        {'GROUP_ID' :req.params.GROUP_ID}
      );
});


module.exports = router ;
