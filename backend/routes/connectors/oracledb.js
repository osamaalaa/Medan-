module.exports = function(pool) {
    var oracledb = require("oracledb");

    let doConnect = function(callback) {
      pool.getConnection(function(err, connection) {
        if (err) {
          return callback(err);
        }
        if (typeof pool !== "undefined") {
        }
        doExecute(connection, "SELECT SYS_CONTEXT('userenv', 'sid') AS session_id FROM DUAL", {}, function(err, result) {

          if (err) {
            releaseConnection(connection);
            return callback(err);
          }
          return callback(err, connection);
        });

      });

    };

    var doExecute = function(connection, sql, params, callback) {

      connection.execute(sql, params, { autoCommit: true, outFormat: oracledb.OBJECT, extendedMetaData: false}, function(err, result) {

        if (err) {
          return callback(err);
        }
        return callback(err, result.rows, result.outBinds, result.rowsAffected);

      });

    };

    var doCommit = function(connection, callback) {
      connection.commit(function(err) {
        if (err) {
          console.log("ERROR: Unable to COMMIT transaction: ", err);
        }
        return callback(err, connection);
      });
    };

    var doRollback = function(connection, callback) {
      connection.rollback(function(err) {
        if (err) {
          console.log("ERROR: Unable to ROLLBACK transaction: ", err);
        }
        return callback(err, connection);
      });
    };

    var doRelease = function(connection) {

      connection.release(function(err) {
        if (err) {
          console.log("ERROR: Unable to RELEASE the connection: ", err);
        }
        return;
      });

    };

    module.exports.doConnect  = doConnect;
    module.exports.doExecute  = doExecute;
    module.exports.doCommit   = doCommit;
    module.exports.doRollback = doRollback;
    module.exports.doRelease  = doRelease;

  };
