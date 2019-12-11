require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./projectsSQL");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validateprojectsSt = require('@joi/validateSt');
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

router.get('/getAllProjects', (req, res) =>{
  servicePool(req,
              res,
              statements.getAllProjects.statment,
              []
            );
});

router.get('/getOneProjectByID/:PROJECT_ID',(req, res)=>{
  servicePool(req,
              res,
              statements.getOneProjectByID.statment,
             {'PROJECT_ID' :req.params.PROJECT_ID}
            );
});

router.post('/insertProjects', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertProjects.returns).then(convertedbody => {
    servicePool(req, res, statements.insertProjects.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

router.post('/updateProject', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.updateProject.returns).then(convertedbody => {
    servicePool(req, res, statements.updateProject.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

router.get('/getClients/:project_id', (req, res) =>{
  servicePool(req,
              res,
              statements.getClients.statment,
              { project_id : req.params.project_id}
            );
});

router.get('/getProjectTypes', (req, res) =>{
  servicePool(req,
              res,
              statements.getProjectTypes.statment,
              []
            );
});

router.get('/getAssetBasedOnProject/:PROJECT_ID', (req, res) =>{
  servicePool(req,
              res,
              statements.getAssetBasedOnProject.statment,
              { PROJECT_ID : req.params.PROJECT_ID}
            );
});


router.get('/getAssetBasedOnProjectCompliance/:PROJECT_ID', (req, res) =>{
  servicePool(req,
              res,
              statements.getAssetBasedOnProjectCompliance.statment,
              { PROJECT_ID : req.params.PROJECT_ID}
            );
});


router.get('/getLocations/:project_id', (req, res) =>{
  servicePool(req,
              res,
              statements.getLocations.statment,
             { project_id : req.params.project_id }
            );
});

router.post('/insertProjectTree', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertProjectTree.returns).then(convertedbody => {
    servicePool(req, res, statements.insertProjectTree.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});


router.get('/getProjectsTree/:project_id', (req, res) =>{
  businessPool(req,
              res,
              statements.getProjectsTree.statment,
             { project_id : req.params.project_id }
            ).then(get1=>{
            // console.log(get1.rows)
              businessPool(req, res, statements.getProjectsTreeWithNoParent.statment,
                { project_id : req.params.project_id }).then(get2=>{
                 // console.log(get2.rows)
                  businessPool(req, res, statements.getChildTree.statement, {project_id : req.params.project_id }).then(parent=>{
                    res.status(200).json({
                      parent : parent.rows,
                      child : get1.rows,
                      rows : get2.rows
                  })
                  })
                })
            })
});


router.post('/deleteProjectTree', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.deleteProjectTree.returns).then(convertedbody => {
    servicePool(req, res, statements.deleteProjectTree.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

router.post('/updateProjectTree', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.updateProjectTree.returns).then(convertedbody => {
    servicePool(req, res, statements.updateProjectTree.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});


router.get('/getPinTree/:project_Id', (req, res) => {
  servicePool(req, res, statements.getPinTree.statement, { project_Id : req.params.project_Id})
})

module.exports = router;
