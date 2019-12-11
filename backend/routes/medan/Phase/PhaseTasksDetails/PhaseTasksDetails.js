require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./PhaseTasksDetailsSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllPhaseTaskDetail', (req, res) =>{
  servicePool(req, res,
              statements.getAllPhaseTaskDetail.statement,
              []
            );
});


router.get('/getOnePhaseTaskDetailByID/:DETAIL_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOnePhaseTaskDetailByID.statement,
        {'DETAIL_ID' :req.params.DETAIL_ID}
      );
});


module.exports = router ;
