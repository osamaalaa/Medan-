require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./travelOrderSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");



router.get('/getTravelOrder', (req, res) =>{
  servicePool(req,
          res,
          statements.getTravelOrder.statement,
        []
      );
});



module.exports = router ;
