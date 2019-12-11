require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./getUsersSQL");
let servicePool = require('@lib/servicePool');


router.get('/getUsers', (req, res) =>{
  servicePool(req, res,
              statements.getUsers.statement,
            []
            );
});




module.exports = router ;
