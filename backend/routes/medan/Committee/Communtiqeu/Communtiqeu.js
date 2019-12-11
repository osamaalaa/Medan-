require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./CommuntiqeuSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllCommuntiqeu', (req, res) =>{
  servicePool(req, res,
              statements.getAllCommuntiqeu.statement,
              []
            );
});


router.get('/getOneCommuntiqeuByID/:COM_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneCommuntiqeuByID.statement,
        {'COM_ID' :req.params.COM_ID}
      );
});


module.exports = router ;
