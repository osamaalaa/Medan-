require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./IssuesManySitesLocationSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllIssuesManySitesLocation', (req, res) =>{
  servicePool(req, res,
              statements.getAllIssuesManySitesLocation.statement,
              []
            );
});


router.get('/getOneIssuesManySitesLocationByID/:ISSUE_MANY_SITES_LOCATIONS_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneIssuesManySitesLocationByID.statement,
        {'ISSUE_MANY_SITES_LOCATIONS_ID' :req.params.ISSUE_MANY_SITES_LOCATIONS_ID}
      );
});


module.exports = router ;
