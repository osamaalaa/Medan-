require('module-alias/register');
let express = require('express');
let router = express.Router();
let statements = require("@customfieldJoinissuesubclasscustom/customfieldJoinissuesubclasscustom/customfieldJoinissuesubclasscustomSQL");
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');


router.get('/getCustomfieldsJoinIssuesCustom/:ISSUES_SUB_CLASS_ID', (req, res) =>{
    servicePool(req,
            res,
            statements.getCustomfieldsJoinIssuesCustom.statement,
          {'ISSUES_SUB_CLASS_ID' :req.params.ISSUES_SUB_CLASS_ID}
        );
  });

  module.exports = router ;
