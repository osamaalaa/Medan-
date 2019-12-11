require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("@violationGroup/violationGroupDetails/violationGroupDetailsSQL");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validateviolationGroupDetailsSts = require('@joi/validateSt');
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getOneViolationDetailsGroups/:VIOLATION_GROUP_ID' ,function (req, res) {
    servicePool(req, res, statements.getOneViolationDetailsGroups.statment, {'VIOLATION_GROUP_ID':req.params.VIOLATION_GROUP_ID});
});

//-------------
router.get('/getAllViolationDetailsGroups', function (req, res)
{
    servicePool(req, res, statements.getAllViolationDetailsGroups.statement, []);
});


//--------
module.exports = router ;
