require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./PortfolioBoqSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllPortfolioBoq', (req, res) =>{
  servicePool(req, res,
              statements.getAllPortfolioBoq.statement,
              []
            );
});


router.get('/getOnePortfolioBoqByID/:BOQ_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOnePortfolioBoqByID.statement,
        {'BOQ_ID' :req.params.BOQ_ID}
      );
});


module.exports = router ;
