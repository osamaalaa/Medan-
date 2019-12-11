require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./MaterialsSQL");
let servicePool = require('@lib/servicePool');


router.get('/getMaterials/:p_activity_id', (req, res) =>{
  servicePool(req, res,
              statements.getMaterials.statement,
              {p_activity_id : req.params.p_activity_id}
            );
});




module.exports = router ;
