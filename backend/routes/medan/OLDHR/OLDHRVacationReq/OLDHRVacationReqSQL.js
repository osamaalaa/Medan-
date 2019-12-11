
let statements = {
    getAllOLDHRVacationReq: {
            statement :`
            SELECT VACATION_REQUEST_ID,
                   VACATION_TYPE,
                   VACATION_DAYS,
                   START_DATE,
                   END_DATE,
                   START_DATE_H,
                   END_DATE_H,
                   STATUS,
                   EMPLOYEE_ID,
                   VACATION_DESCRIPTION,
                   VACATION_SUBTRACTED,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM OLDHR_VACATION_REQUEST `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneOLDHRVacationReqByID:{
        statement:`
        SELECT VACATION_REQUEST_ID,
               VACATION_TYPE,
               VACATION_DAYS,
               START_DATE,
               END_DATE,
               START_DATE_H,
               END_DATE_H,
               STATUS,
               EMPLOYEE_ID,
               VACATION_DESCRIPTION,
               VACATION_SUBTRACTED,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM OLDHR_VACATION_REQUEST
   WHERE VACATION_REQUEST_ID = :VACATION_REQUEST_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  