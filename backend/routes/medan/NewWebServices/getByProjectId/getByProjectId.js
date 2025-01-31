require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./getByProjectIdSQL");
let servicePool = require('@lib/servicePool');


router.get('/getByProjectId/:PROJECT_ID', (req, res) =>{
  servicePool(req, res,
              statements.getByProjectId.statement,
              {PROJECT_ID : req.params.PROJECT_ID}
            );
});




module.exports = router ;
