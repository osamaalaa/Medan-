require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./complianceSQL");
let servicePool = require('@lib/servicePool');
let businessPool = require("@lib/businessPool");


//-------------
router.get('/getcompliance/:VIOLATION_ID/:ASSEET_ID/:PROJECT_ID', (req, res) =>{
  businessPool(req,
          res,
          statements.getNewCompliance.statement,
        {VIOLATION_ID :req.params.VIOLATION_ID ,
        ASSEET_ID: req.params.ASSEET_ID ,
    PROJECT_ID: req.params.PROJECT_ID}
  ).then(violationId => {
    businessPool(req,
            res,
            statements.violationHasMatrix.statement,
          {VIOLATION_ID :req.params.VIOLATION_ID }).then(violationMatrix => {
            // console.log("violation id matrix " + violationMatrix.rows[0].VIOLATION_ID);
            // console.log("violation id issue" + violationId.rows[0].VIOLATION_ID);
            let violationIssue = violationId.rows[0].VIOLATION_ID ;
            let violationMatrixx = violationMatrix.rows[0].VIOLATION_ID;
            if(violationIssue = violationMatrixx){
              // console.log("Succeded ! ") ;

              // for(let i = 0; i < violationIDMat.rows.length; i++)
              businessPool(req,
                      res,
                      statements.getMAtrix.statement,
                    {VIOLATION_ID :req.params.VIOLATION_ID }).then(matrix => {
                      businessPool(req,
                            res,
                            statements.getRssCounter.statement,
                            {VIOLATION_ID :req.params.VIOLATION_ID , ASSEET_ID :req.params.ASSEET_ID, PROJECT_ID :req.params.PROJECT_ID }).then(vCount => {
                             let violationCount = vCount.rows[0].RES_COUNTER ;
                               // console.log(violationCount);
                               for(let i = 0 ; i < matrix.rows.length ; i++)
                               {
                                 let violationMatrixCount = vCount.rows[i].VIOLATION_COUNT;
                                 // console.log(violationMatrixCount);
                                 let finalValue = vCount.rows[i].VALUE;
                                 if(violationCount <= violationMatrixCount ){
                                   // console.log(finalValue); // Final Value
                                   res.status(200).json({
                                     status: 200,
                                     value: finalValue
                                   });
                                   return ;

                                 }else {
                                   businessPool(req,
                                         res,
                                         statements.getRssCounter.statement,
                                         {VIOLATION_ID :req.params.VIOLATION_ID , ASSEET_ID :req.params.ASSEET_ID, PROJECT_ID :req.params.PROJECT_ID })
                                          .then(issueValue => {
                                            res.status(200).json({
                                              status: 200,
                                              value: issueValue
                                            });

                                          }).catch(error => {
                                              res.status(200).json({
                                                status: 200,
                                                message: "ERROR While Connecting Please Try Again .. "
                                            });

                                          })

                                 }

                               }





                            }).catch(error => {  res.status(200).json({
                                status: 200,
                                message: "ERROR While Connecting Please Try Again .. "
                              });
                            })




                    }).catch(error => {
                      res.status(200).json({
                        status: 200,
                        message: "ERROR While Connecting Please Try Again .. "
                      });
                    })






            }

            else
             {
              // console.log("Failure !") ;
              servicePool(req,
                      res,
                      statements.getViolationGroupValue.statement,
                    {'VIOLATION_ID' :req.params.VIOLATION_ID}
                  );
            }
          }
        ).catch(error => {  res.status(200).json({
            status: 200,
            message: "ERROR While Connecting Please Try Again .. "
          });
        })

      }).catch(error => {  res.status(200).json({
          status: 200,
          message: "ERROR While Connecting Please Try Again .. "
        });
      })


});



router.get('/getHistoryViolationsById/:ASSEET_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getHistoryViolationsById.statement,
        {'ASSEET_ID' :req.params.ASSEET_ID}
      );
});

router.get('/getoneViolationIssue/:VIOLATION_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getoneViolationIssue.statement,
        {'VIOLATION_ID' :req.params.VIOLATION_ID}
      );
});

module.exports = router ;
