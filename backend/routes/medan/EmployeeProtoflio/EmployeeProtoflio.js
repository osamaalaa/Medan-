require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./EmployeeProtoflioSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllEmployeeProtoflio', (req, res) =>{
  servicePool(req, res,
              statements.getAllEmployeeProtoflio.statement,
              []
            );
});


router.get('/getOneEmployeeProtoflioByID/:SERIAL_NO', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneEmployeeProtoflioByID.statement,
        {'SERIAL_NO' :req.params.SERIAL_NO}
      );
});


module.exports = router ;
