let statements = require("@att/attachementSQL");

function dataFilter(req, res, next){
    let where = statements.getfile.statement;

    if (Object.keys(req.query).length == 2) {
        Object.keys(req.query).forEach(function (key) {
          if (key == 'ISSUE_ID') {
            where += statements.whereConditions.issueWhere;
          }
          if (key == 'COMMENT_ID') {
            where += 'and ' + statements.whereConditions.commentWhere;
          }
        });
      } else {
        Object.keys(req.query).forEach(function (key) {
          if (key == 'ISSUE_ID') {
            where += statements.whereConditions.issueWhere;
          }
          if (key == 'COMMENT_ID') {
            where += statements.whereConditions.commentWhere;
          }
        });
      }

      return {select: where};
}

module.exports = dataFilter;