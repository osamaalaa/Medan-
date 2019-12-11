require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("@lookUp/lookUpDetails/lookUpDetailsSQL");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validatelookUpDetailsSt = require('@joi/validateSt');
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

//---------------
// get one with LookUp_id
router.get('/getOnelookUpDetailsWithLookUpID/:LOOKUP_ID',checkdataexists ,function (req, res) {
    servicePool(req, res, statements.getOnelookUpDetailsWithLookUpID.statment, {'LOOKUP_ID':req.params.LOOKUP_ID});
});

//---------------------
router.get('/getOnelookUpDetails/:LOOKUP_DETAIL_ID' ,function (req, res) {
    servicePool(req, res, statements.getOnelookUpDetails.statment, {'LOOKUP_DETAIL_ID':req.params.LOOKUP_DETAIL_ID});
});


router.get('/getAlllookUpDetails', function (req, res) {
  // console.log("suc");

    // serviceConn(req, res, statements.getAlllookUpDetails.statment, [], statements.getAlllookUpDetails.requireCommit);
    servicePool(req, res,
                statements.getAlllookUpDetails.statement,
                []
              );
});

module.exports = router ;
