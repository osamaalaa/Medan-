require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./SocialMediaSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllSocialMedia', (req, res) =>{
  servicePool(req, res,
              statements.getAllSocialMedia.statement,
              []
            );
});


router.get('/getOneSocialMediaByID/:ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneSocialMediaByID.statement,
        {'ID' :req.params.ID}
      );
});


module.exports = router ;
