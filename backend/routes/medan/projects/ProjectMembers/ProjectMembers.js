require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ProjectMembersSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let businessPool = require("@lib/businessPool");


router.get('/getAllProjectMembers', (req, res) =>{
  servicePool(req, res,
              statements.getAllProjectMembers.statement,
              []
            );
});


router.get('/getOneProjectMembersByID/:MEMBER_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneProjectMembersByID.statement,
        {'MEMBER_ID' :req.params.MEMBER_ID}
      );
});

router.post('/insertProjectMembers', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertProjectMembers.returns).then(convertedbody => {
    servicePool(req, res, statements.insertProjectMembers.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

router.post('/updateProjectMembers', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.updateProjectMembers.returns).then(convertedbody => {
    servicePool(req, res, statements.updateProjectMembers.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

router.get('/projectSponser/:project_id', (req, res) =>{
  servicePool(req,
          res,
          statements.projectSponser.statement,
        {'project_id' :req.params.project_id}
      );
});


router.get('/RolesAndResponsable/:project_id', (req, res) =>{
  // businessPool(req, res, statements.RolesAndResponsable.statement, {'project_id' :req.params.project_id}).then(get =>{
  //   console.log(get.rows[0].STATUS)
    
  // })
  
  servicePool(req,
          res,
          statements.RolesAndResponsable.statement,
        {'project_id' :req.params.project_id}
      );
});



module.exports = router ;
