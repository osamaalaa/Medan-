require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./CommuntiqueFieldsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllCommuntiqueFields', (req, res) =>{
  servicePool(req, res,
              statements.getAllCommuntiqueFields.statement,
              []
            );
});


router.get('/getOneCommuntiqueFieldsByID/:CF_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneCommuntiqueFieldsByID.statement,
        {'CF_ID' :req.params.CF_ID}
      );
});


module.exports = router ;
