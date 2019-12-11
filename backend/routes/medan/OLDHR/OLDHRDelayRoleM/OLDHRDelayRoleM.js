require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./OLDHRDelayRoleMSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllOLDHRDelayRoleM', (req, res) =>{
  servicePool(req, res,
              statements.getAllOLDHRDelayRoleM.statement,
              []
            );
});


router.get('/getOneOLDHRDelayRoleMByID/:ID_PK', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneOLDHRDelayRoleMByID.statement,
        {'ID_PK' :req.params.ID_PK}
      );
});


module.exports = router ;
