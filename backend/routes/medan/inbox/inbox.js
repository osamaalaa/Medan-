require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./inboxSQL");
let servicePool = require('@lib/servicePool');

router.get('/getInbox/:spEmployeeId', (req, res) => {
  let statement = statements.getInbox.statement;
  let binding = { spEmployeeId: req.params.spEmployeeId };
  if (req.query.REQUEST_TYPE) {
    statement = `${statement} and req_type_id = :REQUEST_TYPE`;
    binding = { ...binding, 'REQUEST_TYPE': Number(req.query.REQUEST_TYPE) }
  }

  statement = `${statement} ORDER  BY request_id DESC`;
  servicePool(req, res,
    statement,
    binding
  );
});





module.exports = router;
