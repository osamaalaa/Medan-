require('module-alias/register');
let express = require('express');
let router = express.Router();
let bodyconverter = require("@conv/bodyConverter");
let statements = require("@att/attachementSQL");
let dataFilter = require("@att/dataFilter");
let checkdataexists = require("@vals/dataexists");
let joi = require("@joi/validateSt");
let settings = require("@lib/settings");
let ip = require('ip');
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');
let multer = require('multer');
let path = require('path');
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/uploads/')
  },
  filename: function (req, file, cb) {
    // let extArray = file.mimetype.split("/");
    // let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    // cb(null, Date.now() + path.extname(file.originalname))
  }
});

// cb(null, 'assets/images/')
const upload = multer({ storage: storage });
let accessRules = require('./AccessRules');


// Validation !
router.use(accessRules);

//router.use(validatetoken); // temp until going to PROD ..

const publicIp = require('public-ip');

router.post('/insertnewfile',
  upload.single(settings.genericfilename),
     async(req, res)=> {

    let ipAddress = await publicIp.v4()
    let fileDetails = {
      "issue_id": req.body.issue_id,
      "comment_id": req.body.comment_id,
      "attach_title": req.file.filename,
      "file_name": req.file.originalname,
      "full_path": "http://" + ipAddress + ':' + process.env.MEDPORT+ '/uploads/' + req.file.filename ,
      "file_id": req.file.path
    };
    if(req.body.issue_id != undefined || req.body.comment_id != undefined) {
      
    bodyconverter.bodyconverter(req, res, fileDetails, statements.insertnewfile.returns).then(upload => {
      
      servicePool(req, res, statements.insertnewfile.statement, upload ) ;
        })
  }
  else{
    
    res.status(400).json({
      status: 400,
      message: "Invalid payload, You should pass issue_id or comment_id"

  });
  }
  });

// router.get('/getimageFile/:ISSUE_ID?/:COMMENT_ID?', function (req, res) {

//   if (Object.keys(req.query).length <= 0) {
//     res.status(400).json({
//       result: "please provide at least ISSUE ID or COMMENT ID !"
//     });
//   } else {
//     servicePool(req, res, dataFilter(req, res).select, req.query);
//   }
// });

router.get('/getfile/:issue_id', function (req, res) {
  servicePool(req, res, statements.getfile.statement, {issue_id: req.params.issue_id });
  });

module.exports = router;
