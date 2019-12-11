require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./ExpensesSQL");
let servicePool = require('@lib/servicePool');

router.get('/getAllExpenses', (req, res) =>{
  servicePool(req, res,
              statements.getAllExpenses.statement,
              []
            );
});


router.get('/getOneExpensesByID/:EXPENSES_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneExpensesByID.statement,
        {'EXPENSES_ID' :req.params.EXPENSES_ID}
      );
});


module.exports = router ;
