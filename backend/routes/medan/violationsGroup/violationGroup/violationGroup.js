require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("@violationGroup/violationGroup/violationGroupSQL");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validateviolationGroupSt = require('@joi/validateSt');
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');


router.get('/getoneViolationGroup/:VIOLATION_GROUP_ID',function (req, res) {
    servicePool(req, res, statements.getoneViolationGroup.statment, {'VIOLATION_GROUP_ID':req.params.VIOLATION_GROUP_ID});
});

router.get('/getAllViolationGroups', function (req, res)
{
     servicePool(req, res, statements.getAllViolationGroups.statement, []);
});
module.exports = router ;
