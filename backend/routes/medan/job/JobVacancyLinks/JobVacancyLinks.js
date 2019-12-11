require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./JobVacancyLinksSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllJobVacancyLinks', (req, res) =>{
  servicePool(req, res,
              statements.getAllJobVacancyLinks.statement,
              []
            );
});


router.get('/getOneJobVacancyLinksByID/:ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneJobVacancyLinksByID.statement,
        {'ID' :req.params.ID}
      );
});


module.exports = router ;
