require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./CalenderSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllDates', (req, res) =>{
  servicePool(req, res,
              statements.getAllDates.statement,
              []
            );
});




module.exports = router ;
