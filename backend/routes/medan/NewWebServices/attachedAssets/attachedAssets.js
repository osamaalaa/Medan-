require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./attachedAssetsSQL");
let servicePool = require('@lib/servicePool');



router.get('/getAssetAttachedToCommittee/:COMMITTEE_ID', (req, res) =>{
  servicePool(req, res,
              statements.getAssetAttachedToCommittee.statement,
              {COMMITTEE_ID : req.params.COMMITTEE_ID}
            );
});




module.exports = router ;
