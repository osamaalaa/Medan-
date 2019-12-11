require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./RecommendationsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllRecommendations', (req, res) =>{
  servicePool(req, res,
              statements.getAllRecommendations.statement,
              []
            );
});


router.get('/getOneRecommendationsByID/:RECO_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneRecommendationsByID.statement,
        {'RECO_ID' :req.params.RECO_ID}
      );
});


module.exports = router ;
