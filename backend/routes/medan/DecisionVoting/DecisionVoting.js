require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./DecisionVotingSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllDecisionVoting', (req, res) =>{
  servicePool(req, res,
              statements.getAllDecisionVoting.statement,
              []
            );
});


router.get('/getOneDecisionVotingByID/:VOTING_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneDecisionVotingByID.statement,
        {'VOTING_ID' :req.params.VOTING_ID}
      );
});


module.exports = router ;
