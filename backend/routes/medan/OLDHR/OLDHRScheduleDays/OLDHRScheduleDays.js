require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./OLDHRScheduleDaysSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllOLDHRScheduleDays', (req, res) =>{
  servicePool(req, res,
              statements.getAllOLDHRScheduleDays.statement,
              []
            );
});


router.get('/getOneOLDHRScheduleDaysByID/:DAY_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneOLDHRScheduleDaysByID.statement,
        {'DAY_ID' :req.params.DAY_ID}
      );
});


module.exports = router ;
