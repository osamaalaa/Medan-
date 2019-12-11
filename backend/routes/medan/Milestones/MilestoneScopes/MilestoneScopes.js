require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./MilestoneScopesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllMilestoneScopes', (req, res) =>{
  servicePool(req, res,
              statements.getAllMilestoneScopes.statement,
              []
            );
});


router.get('/getOneMilestoneScopesByID/:SCOPE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneMilestoneScopesByID.statement,
        {'SCOPE_ID' :req.params.SCOPE_ID}
      );
});


module.exports = router ;
