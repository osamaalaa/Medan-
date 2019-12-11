require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./wishListSQL");
let servicePool = require('@lib/servicePool');


router.get('/wishList/:EMPLOYEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.wishList.statement,
              { EMPLOYEE_ID : req.params.EMPLOYEE_ID}
            );
});




module.exports = router ;
