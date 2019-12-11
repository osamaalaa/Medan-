require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./PortofoliosSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllPortofolios', (req, res) =>{
  servicePool(req, res,
              statements.getAllPortofolios.statement,
              []
            );
});


router.get('/getOnePortofoliosByID/:PORTFOLIO_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOnePortofoliosByID.statement,
        {'PORTFOLIO_ID' :req.params.PORTFOLIO_ID}
      );
});


module.exports = router ;
