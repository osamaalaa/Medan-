require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ReleasedStudiesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllReleasedStudies', (req, res) =>{
  servicePool(req, res,
              statements.getAllReleasedStudies.statement,
              []
            );
});


router.get('/getOneReleasedStudiesByID/:RELEASED_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneReleasedStudiesByID.statement,
        {'RELEASED_ID' :req.params.RELEASED_ID}
      );
});


module.exports = router ;
