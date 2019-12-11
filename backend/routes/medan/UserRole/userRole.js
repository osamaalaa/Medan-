require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./userRoleSQL');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
// let validateInvPeriod = require('@lib/validatestructure');
let businessPool = require('@lib/businessPool');
let fs = require('fs');

const publicIp = require('public-ip')

router.get('/getAllUserRolesByUserId/:USER_ID', (req, res)=>{
    servicePool(req, res,
      statements.getAllUserRolesByUserId.statement,
     {
        'USER_ID' :req.params.USER_ID
      }
                );

});

router.get('/getallScreensUserId/:USER_ID', (req, res)=>{
    servicePool(req, res,
               statements.getallScreensUserId.statement,
               {
                 'USER_ID' :req.params.USER_ID
               }
               );
});


//-------------------------
// router.get('/getAllScreensByUserName',checkData, (req, res)=>{
//     servicePool(req, res,
//                statements.getAllScreensByUserName.statement,
//                {
//                  'USER_NAME' :req.body.USER_NAME
//                }
//                );
// });
router.get('/getUserPic/:USER_ID/:EXT',
  (req, res) => {
    businessPool(req, res, statements.getUserPic.statement, {
        "USER_ID": req.params.USER_ID
      }, 'IMG').then(async pic => {
        if (pic.rows.length > 0) {

          let ipAddress = await publicIp.v4()
          fs.createWriteStream('assets/profiles/pic-' + req.params.USER_ID + '.' + req.params.EXT).write(pic.rows[0][0]);
          res.status(200).json({
            "status": 200,
            "url": "http://" + ipAddress + ":" + process.env.INVPORT + "/profiles/pic-" + req.params.USER_ID + '.' + req.params.EXT
          });
        } else {
          res.status(200).json({
            "status": 200,
            "url": "http://" + ipAddress + ":" + process.env.INVPORT + "/img/unknown.png"
          });
        }
      })
      .catch(async(error) => {
        let ipAddress = await publicIp.v4()
        console.log(ipAddress)
        res.status(200).json({
          status: 400,
          message: "error while getting user image .."
        });
      });
  });

//-------------------------------------


// router.get('/getUserRoleByUserRoleId/:USER_ROLE_ID',checkData, (req, res)=>{
//     servicePool(req, res,
//                statements.getUserRoleByUserRoleId.statement,
//                {
//                  'USER_ROLE_ID' :req.params.USER_ROLE_ID
//                }
//                );
// });



module.exports = router;
