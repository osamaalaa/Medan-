require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./CountersSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllCounters', (req, res) =>{
  servicePool(req, res,
              statements.getAllCounters.statement,
              []
            );
});


router.get('/getOneCountersByID/:COUNTER_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneCountersByID.statement,
        {'COUNTER_ID' :req.params.COUNTER_ID}
      );
});


module.exports = router ;
