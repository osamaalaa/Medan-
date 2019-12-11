require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./IssuesManySitesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllIssuesManySites', (req, res) =>{
  servicePool(req, res,
              statements.getAllIssuesManySites.statement,
              []
            );
});


router.get('/getOneIssuesManySitesByID/:ISSUE_MANY_SITES_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneIssuesManySitesByID.statement,
        {'ISSUE_MANY_SITES_ID' :req.params.ISSUE_MANY_SITES_ID}
      );
});


module.exports = router ;
