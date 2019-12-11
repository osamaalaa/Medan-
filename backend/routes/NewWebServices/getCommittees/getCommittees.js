require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./getCommitteesSQL");
let servicePool = require('@lib/servicePool');


router.get('/getCommittees/:project_id', (req, res) =>{
  servicePool(req, res,
              statements.getCommittees.statement,
              {project_id : req.params.project_id}
            );
});




module.exports = router ;
