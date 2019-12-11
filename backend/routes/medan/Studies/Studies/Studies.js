require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./StudiesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllStudies', (req, res) =>{
  servicePool(req, res,
              statements.getAllStudies.statement,
              []
            );
});


router.get('/getOneStudiesByID/:STUDY_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneStudiesByID.statement,
        {'STUDY_ID' :req.params.STUDY_ID}
      );
});


module.exports = router ;
