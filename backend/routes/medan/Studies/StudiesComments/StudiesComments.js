require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./StudiesCommentsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllStudiesComments', (req, res) =>{
  servicePool(req, res,
              statements.getAllStudiesComments.statement,
              []
            );
});


router.get('/getOneStudiesCommentsByID/:COMMENT_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneStudiesCommentsByID.statement,
        {'COMMENT_ID' :req.params.COMMENT_ID}
      );
});


module.exports = router ;
