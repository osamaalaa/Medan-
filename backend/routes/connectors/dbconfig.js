module.exports = {
    user          : process.env.NODE_ORACLEDB_USER || "HR",
    password      : process.env.NODE_ORACLEDB_PASSWORD || "aothr",
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "Dev",
    externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
  };
