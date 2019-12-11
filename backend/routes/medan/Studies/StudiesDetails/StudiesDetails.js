require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./StudiesDetailsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllStudiesDetails', (req, res) =>{
  servicePool(req, res,
              statements.getAllStudiesDetails.statement,
              []
            );
});


router.get('/getOneStudiesDetailsByID/:DETAIL_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneStudiesDetailsByID.statement,
        {'DETAIL_ID' :req.params.DETAIL_ID}
      );
});


module.exports = router ;
