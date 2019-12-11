require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./contractsSQL");
let servicePool = require('@lib/servicePool');
let checkdataexists = require("@vals/dataexists");
let bodyconverter = require("@conv/bodyConverter");
let businessPool = require("@lib/businessPool");


router.get('/getAllContracts', (req, res) =>{
  servicePool(req, res,
              statements.getAllContracts.statement,
              []
            );
});


router.get('/getOneContractByID/:RULE_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneContractByID.statement,
        {'RULE_ID' :req.params.RULE_ID}
      );
});


router.get('/getOneContractByProId/:PROJECT_ID', (req, res) =>{
    servicePool(req,
            res,
            statements.getOneContractByProId.statement,
          {'PROJECT_ID' :req.params.PROJECT_ID}
        );
  });


  
router.get('/getNameByRuleType', (req, res) =>{
    servicePool(req,
            res,
            statements.getNameByRuleType.statement,
          []
        );
  });

router.post('/createContract', checkdataexists, (req, res) => {
    bodyconverter.bodyconverter(req, res, req.body, statements.createContract.returns).then(convertedbody => {
      servicePool(req, res, statements.createContract.statement, convertedbody);
    }).catch(error => {
      res.status(400).json(error);
    });
  });


  router.get('/getAllContractsDetails', (req, res) =>{
    servicePool(req, res,
                statements.getAllContractsDetails.statement,
                []
              );
  });


  router.get('/getOneContractDetailsByID/:CONTRACT_RULES_DETAILS_ID', (req, res) =>{
    servicePool(req,
            res,
            statements.getOneContractDetailsByID.statement,
          {'CONTRACT_RULES_DETAILS_ID' :req.params.CONTRACT_RULES_DETAILS_ID}
        );
  });

  router.get('/getOneContractDetailsByRULeID/:RULE_ID', (req, res) =>{
    servicePool(req,
            res,
            statements.getOneContractDetailsByRULeID.statement,
          {'RULE_ID' :req.params.RULE_ID}
        );
  });



  router.post('/createContractDetails', checkdataexists, (req, res) => {
    bodyconverter.bodyconverter(req, res, req.body, statements.createContractDetails.returns).then(convertedbody => {
      servicePool(req, res, statements.createContractDetails.statement, convertedbody);
    }).catch(error => {
      res.status(400).json(error);
    });
  });


  router.get('/getContractTermsSEQ', (req, res) =>{
    servicePool(req, res,
                statements.getContractTermsSEQ.statement,
                []
              );
  });


 router.post('/insertContractTerms',(req, res)=>{
   businessPool(req, res, statements.getContractTermsSEQ.statement,[]).then(get =>{
     console.log(get.rows[0].NEXTVAL);
     bodyconverter.bodyconverter(req, res, {
      CONTRACT_ID : get.rows[0].NEXTVAL,
      TYPE_ID : req.body.TYPE_ID,
      DESCRIPTION : req.body.DESCRIPTION,
      NOTES : req.body.NOTES,
      PROJECT_ID : req.body.PROJECT_ID
     }, statements.createContractTerms.returns).then(convertedbody => {
      servicePool(req, res, statements.createContractTerms.statement, convertedbody);
    }).catch(error => {
      res.status(400).json(error);
    });   })
 })


 router.get("/getContractTypes",(req, res)=>{
   servicePool(req, res, statements.getContractTypes.statement, [])
 })


 router.get("/getContractsTerms/:PROJECT_ID",(req, res)=>{
  servicePool(req, res, statements.getContractsTerms.statement, {PROJECT_ID : req.params.PROJECT_ID})
})


router.post("/deleteContractTerms/:CONTRACT_ID",(req, res)=>{
  servicePool(req, res, statements.deleteContractTerms.statement, {CONTRACT_ID : req.params.CONTRACT_ID})
})



router.post("/deleteContractRule/:RULE_ID",(req, res)=>{
  servicePool(req, res, statements.deleteContractRule.statement, {RULE_ID : req.params.RULE_ID})
})


router.post("/updateContractTerms/:CONTRACT_ID",(req, res)=>{
  servicePool(req, res, statements.updateContractTerms.statement, 
    { TYPE_ID : req.body.TYPE_ID ,
      DESCRIPTION : req.body.DESCRIPTION ,
      NOTES : req.body.NOTES ,
      CONTRACT_ID : req.params.CONTRACT_ID,
      PROJECT_ID : req.body.PROJECT_ID })
})


router.post("/deleteContractRuleDetails/:CONTRACT_RULES_DETAILS_ID",(req, res)=>{
  servicePool(req, res, statements.deleteContractRuleDetails.statement, {CONTRACT_RULES_DETAILS_ID : req.params.CONTRACT_RULES_DETAILS_ID})
})


module.exports = router ;
