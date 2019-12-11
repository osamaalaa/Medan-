require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./updateOrCreateMeetingMinutesSQL");
let servicePool = require('@lib/servicePool');
let businessPool = require("@lib/businessPool");
let checkdataexists = require("@vals/dataexists");
let bodyconverter = require("@conv/bodyConverter");


   
router.post('/updateOrCreateMeetingMinutes/:MOM_ID', (req, res) =>{
    businessPool(req,
        res, 
        statements.updateOrCreateMeetingMinutes.statement,
        { 
                MOM_ID   : req.params.MOM_ID       
              }
        ).then(rMomId => {
            // console.log(rMomId.rows );
            let momId = rMomId.rows;
            let bodys = req.params.MOM_ID
            // console.log(bodys);
           // console.log(req.body.MOM_ID);
             console.log(rMomId.rows)
             
             if(rMomId.rows !=0)
             {
                //  console.log("update");
                //  servicePool(req,res,
                //     statements.updateMeetingMinutes.statement,
                //     {
                //                             req.b             
                //                         }
                //     )

                servicePool(req,
                    res,
                    statements.updateMeetingMinutes.statement,
                  req.body);

                
             }
             else{console.log("insert");
            }
          
            // businessPool(req,res,statements.insertMeetingMinutes.statement,)
            // console.log(momId);
       //   let monId = req.body.MOM_ID;
        //      for(let i =0; i< rMomId.rows.length; i++)
        //      {
        //          if(rMomId.rows[i].MOM_ID.equals(monId))
        //          {
        //              servicePool(req,res,checkdataexists,
        //                 statements.updateMeetingMinutes.statement,
        //                 {
        //                     MOM_ID   : req.body.MOM_ID ,          
        //                     MEETING_ID  : req.body.MEETING_ID ,       
        //                     DESCRIPTION   : req.body.DESCRIPTION ,     
        //                     RESPONSABLE_MEMBER : req.body.RESPONSABLE_MEMBER ,
        //                     STATUS    : req.body.STATUS ,
        //                     TYPE      :req.body.TYPE ,
        //                     MOM_DATE   :req.body.MOM_DATE ,
        //                     DELETED    :req.body.DELETED ,
        //                     DELETED_BY   :req.body.DELETED_BY ,
        //                     DELETED_DATE :req.body.DELETED_DATE                   
        //                 });
        //          }
        //          else{
        //              bodyconverter.bodyconverter(req, res,
        //                 req.body,req.body, statements.insertMeetingMinutes.returns).then(convertedbody =>
        //                 {
        //                     servicePool(req, res, statements.insertMeetingMinutes.statement, convertedbody);
        //                 }   
        //                 ) 
        //             return ;
        //          }
        //      }
         }).catch(error => {console.log("error");})
});



module.exports = router ;
