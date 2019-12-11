require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./NodeUploadsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllNodeUploads', (req, res) =>{
  servicePool(req, res,
              statements.getAllNodeUploads.statement,
              []
            );
});


router.get('/getOneNodeUploadsByID/:SEQ', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneNodeUploadsByID.statement,
        {'SEQ' :req.params.SEQ}
      );
});


module.exports = router ;
