require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./JobVacancySQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllJobVacancy', (req, res) =>{
  servicePool(req, res,
              statements.getAllJobVacancy.statement,
              []
            );
});


router.get('/getOneJobVacancyByID/:ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneJobVacancyByID.statement,
        {'ID' :req.params.ID}
      );
});


module.exports = router ;
