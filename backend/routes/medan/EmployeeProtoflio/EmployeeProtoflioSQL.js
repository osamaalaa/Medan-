
let statements = {
    getAllEmployeeProtoflio: {
            statement :`
            SELECT SERIAL_NO,
                   EMPLOYEE_ID,
                   PORTFOLIO_ID,
                   CREATED_BY,
                   CREATION_DATE,
                   UPDATED_BY,
                   UPDATED_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM EMPLOYEE_PORTFOLIO  `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneEmployeeProtoflioByID:{
        statement:`
        SELECT SERIAL_NO,
               EMPLOYEE_ID,
               PORTFOLIO_ID,
               CREATED_BY,
               CREATION_DATE,
               UPDATED_BY,
               UPDATED_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM EMPLOYEE_PORTFOLIO
   WHERE  SERIAL_NO = :SERIAL_NO `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  