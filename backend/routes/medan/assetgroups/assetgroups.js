require('module-alias/register');
let express = require('express');
let router = express.Router();
let bodyconverter = require("@conv/bodyConverter");
let statements = require("@asstgro/assetgroups/assetgroupsSQL");
let checkData = require('@vals/dataexists');
let validate = require('@lib/validatestructure');
let servicePool = require('@lib/servicePool');

router.get('/getAllAssetGroups', (req, res) =>{
  servicePool(req, res,
              statements.getAllAssetGroups.statement,
              []
            );
});

router.get('/getOneAssetGroupByID/:ID', (req, res)=>{
   servicePool(req,
                res,
               statements.getOneAssetGroupByID.statement,
               {'ID' :req.params.ID}
             );
});

router.post('/insertAssetGroup', checkData, validate.validateAssetGroupstructure,  (req, res)=>{

  bodyconverter.bodyconverter(req,res,req.body,statements.insertAssetGroup.returns).then(convertedbody=>{
      servicePool(req,res,statements.insertAssetGroup.statement,convertedbody);
  }).catch(error => { res.status(400).json(error); });

});




module.exports= router ;
