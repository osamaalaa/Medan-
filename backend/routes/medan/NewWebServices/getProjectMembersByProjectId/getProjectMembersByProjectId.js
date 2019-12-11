require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./getProjectMembersByProjectIdSQL");
let servicePool = require('@lib/servicePool');


router.get('/getProjectMembersByProjectId/:PROJECT_ID', (req, res) =>{
  servicePool(req, res,
              statements.getProjectMembersByProjectId.statement,
              {PROJECT_ID : req.params.PROJECT_ID}
            );
});




module.exports = router ;
