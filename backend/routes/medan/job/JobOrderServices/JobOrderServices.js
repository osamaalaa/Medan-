require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./JobOrderServicesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllJobOrderServices', (req, res) =>{
  servicePool(req, res,
              statements.getAllJobOrderServices.statement,
              []
            );
});


router.get('/getOneJobOrderServicesByID/:JOB_ORDER_SERVICE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneJobOrderServicesByID.statement,
        {'JOB_ORDER_SERVICE_ID' :req.params.JOB_ORDER_SERVICE_ID}
      );
});
//=========================================================================
router.get('/getJobCateg/:p_service_type', (req, res) =>{
  servicePool(req,
          res,
          statements.getJobCateg.statement,
        {'p_service_type' :req.params.p_service_type}
      );
});

//=====================================================================
router.get('/getLaborNo/:p_service_type', (req, res) =>{
  servicePool(req,
          res,
          statements.getLaborNo.statement,
        {'p_service_type' :req.params.p_service_type}
      );
});
//==================================================================

router.get('/getEquibCount/:p_service_type', (req, res) =>{
  servicePool(req,
          res,
          statements.getEquibCount.statement,
        {'p_service_type' :req.params.p_service_type}
      );
});





module.exports = router ;
