require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./IssuesManySitesTypesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllIssuesManySitesTypes', (req, res) =>{
  servicePool(req, res,
              statements.getAllIssuesManySitesTypes.statement,
              []
            );
});


router.get('/getOneIssuesManySitesTypesByID/:CONTRACT_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneIssuesManySitesTypesByID.statement,
        {'CONTRACT_ID' :req.params.CONTRACT_ID}
      );
});


module.exports = router ;
