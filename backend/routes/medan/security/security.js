require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("@sec/securitySQL");
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');
let encrypt = require('@lib/encrypt');
let decrypt = require('@lib/decrypt');
let validateloginStructure = require('@lib/validatestructure');

router.post('/resetPassword',validateloginStructure.validateloginStructure, (req, res) => {
  servicePool(req, res, statements.updateUserPass.statement, {

    USER_NAME: req.body.USER_NAME,
    USER_PASSWORD: encrypt(req.body.USER_PASSWORD)

  });
});

router.post('/LoginAuth',validateloginStructure.validateloginStructure, (req, res) => {
  businessPool(req, res, statements.getUserPass.statement, {
      USER_NAME: req.body.USER_NAME
    }).then(login => {
      if (decrypt(login.rows[0].USER_PASSWORD) === req.body.USER_PASSWORD) {
        businessPool(req, res, statements.getUserData.statement, {
            USER_NAME: req.body.USER_NAME
          }).then(userData => {
            res.status(200).json({
              status: 200,
              valid: "Y",
              rows: userData.rows,
              message: "Valid User Password"
            });
          })
          .catch(error => {
            console.log(error)
            res.status(200).json({
              status: 200,
              valid: "N",
              message: "error while getting user Data .."
            });
          });

      } else {
        res.status(200).json({
          status: 200,
          valid: "N",
          message: "Invalid User Name or Password .."
        });
      }
    })
    .catch(error => {
      res.status(200).json({
        status: 200,
        valid: "N",
        message: "Invalid User Name or Password .."
      });
    });
});

module.exports = router;
