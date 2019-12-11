require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./CountriesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllCountries', (req, res) =>{
  servicePool(req, res,
              statements.getAllCountries.statement,
              []
            );
});


router.get('/getOneCountriesByID/:COUNTRY_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneCountriesByID.statement,
        {'COUNTRY_ID' :req.params.COUNTRY_ID}
      );
});


module.exports = router ;
