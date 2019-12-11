
let statements = {
    getAllProjectDataDelta: {
            statement :`
            SELECT SERIAL_NO,
                   PROJECT_ID,
                   MEETING_ID,
                   DELTA_DATA_DATE,
                   RISK,
                   OPENED_ISSUES,
                   DELAYED,
                   VIOLATIONS,
                   REAL_PROGRESS,
                   PASSED_PROGRESS,
                   CREATED_DARE,
                   CREATED_BY,
                   COMMITTEE_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM PROJECT_DATA_DELTA `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneProjectDataDeltaByID:{
        statement:`
        SELECT SERIAL_NO,
               PROJECT_ID,
               MEETING_ID,
               DELTA_DATA_DATE,
               RISK,
               OPENED_ISSUES,
               DELAYED,
               VIOLATIONS,
               REAL_PROGRESS,
               PASSED_PROGRESS,
               CREATED_DARE,
               CREATED_BY,
               COMMITTEE_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM PROJECT_DATA_DELTA
   WHERE SERIAL_NO = :SERIAL_NO `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    insertProjectDataDelta: {
     statement: `
     INSERT INTO PROJECT_DATA_DELTA (SERIAL_NO,
          PROJECT_ID,
          MEETING_ID,
          DELTA_DATA_DATE,
          RISK,
          OPENED_ISSUES,
          DELAYED,
          VIOLATIONS,
          REAL_PROGRESS,
          PASSED_PROGRESS,
          CREATED_DARE,
          CREATED_BY,
          COMMITTEE_ID,
          SUBSIDIARY_ID)
  VALUES (PROJECT_DATA_DELTA_SEQ.NEXTVAL,
     :PROJECT_ID,
     :MEETING_ID,
     :DELTA_DATA_DATE,
     :RISK,
     :OPENED_ISSUES,
     :DELAYED,
     :VIOLATIONS,
     :REAL_PROGRESS,
     :PASSED_PROGRESS,
     sysdate,
     :CREATED_BY,
     :COMMITTEE_ID,
     :SUBSIDIARY_ID)
     RETURN MEETING_ID, PROJECT_ID INTO :R_MEETING_ID, :R_PROJECT_ID`,
     returns: ["R_MEETING_ID","R_PROJECT_ID"],
     bindings: [],
     qstring: "",
     requireCommit: true
 }
  }
  
  module.exports = statements ;
  