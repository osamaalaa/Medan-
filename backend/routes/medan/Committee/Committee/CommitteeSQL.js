
let statements = {
    getAllcommittes: {
            statement :`
            SELECT COMMITTEE_ID,
                   COMMITTEE_CODE,
                   COMMITTEE_NAME_EN,
                   COMMITTEE_NAME_AR,
                   SUBSIDARY_ID,
                   STATUS,
                   CREATED_BY,
                   CREATION_DATE,
                   MODIFIED_BY,
                   MODIFICATION_DATE,
                   PROJECT_ID,
                   BOQ_ID,
                   COMMITTEE_TYPE,
                   COMMITTEE_PARENT_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   ROLES_RESP,
                   DEPT_ID,
                   DESCRIPTION,
                   REPORTING_TO
              FROM COMMITTEE `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOnecommitteByID:{
        statement:`
        SELECT COMMITTEE_ID,
               COMMITTEE_CODE,
               COMMITTEE_NAME_EN,
               COMMITTEE_NAME_AR,
               SUBSIDARY_ID,
               STATUS,
               CREATED_BY,
               CREATION_DATE,
               MODIFIED_BY,
               MODIFICATION_DATE,
               PROJECT_ID,
               BOQ_ID,
               COMMITTEE_TYPE,
               COMMITTEE_PARENT_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               ROLES_RESP,
               DEPT_ID,
               DESCRIPTION,
               REPORTING_TO
          FROM COMMITTEE
   WHERE  COMMITTEE_ID = :COMMITTEE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },


    getCommittesOfOneProject:{
      statement:`
      SELECT COMMITTEE_ID,
             COMMITTEE_CODE,
             COMMITTEE_NAME_EN,
             COMMITTEE_NAME_AR,
             SUBSIDARY_ID,
             STATUS,
             CREATED_BY,
             CREATION_DATE,
             MODIFIED_BY,
             MODIFICATION_DATE,
             PROJECT_ID,
             BOQ_ID,
             COMMITTEE_TYPE,
             COMMITTEE_PARENT_ID,
             DELETED,
             DELETED_BY,
             DELETED_DATE,
             ROLES_RESP,
             DEPT_ID,
             DESCRIPTION,
             REPORTING_TO
        FROM COMMITTEE
 WHERE  PROJECT_ID = :PROJECT_ID `,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
  },


  updateCommittee : {
       statement :`UPDATE COMMITTEE
       SET   COMMITTEE_NAME_EN = :COMMITTEE_NAME_EN,
             COMMITTEE_NAME_AR	= :COMMITTEE_NAME_AR,
             COMMITTEE_TYPE	= :COMMITTEE_TYPE,
             STATUS = :STATUS
       WHERE  COMMITTEE_ID = :COMMITTEE_ID`,
       bindings: [],
       qstring: "",
       requireCommit: true
  },

  getCommitteesType : {
       statement : ` select lookup_detail_id , primary_name from lookup_details where lookup_id = 124`,
       bindings: [],
       qstring: "",
       requireCommit: false
  },

  insertCommittee : {
     statement :`INSERT INTO COMMITTEE (COMMITTEE_ID,
          COMMITTEE_CODE,
          COMMITTEE_NAME_EN,
          COMMITTEE_NAME_AR,
          COMMITTEE_TYPE,
          STATUS,
          CREATION_DATE,
          PROJECT_ID,
          COMMITTEE_PARENT_ID)
VALUES (COMMITTEE_SEQ.NEXTVAL,
     COMMITTEE_SEQ.NEXTVAL,
     :COMMITTEE_NAME_EN,
     :COMMITTEE_NAME_AR,
     :COMMITTEE_TYPE,
     :STATUS,
     sysdate,
     :PROJECT_ID,
     :COMMITTEE_PARENT_ID)
RETURN COMMITTEE_ID INTO :R_COMMITTEE_ID`,
returns: ["R_COMMITTEE_ID"],
     bindings: [],
     qstring: "",
     requireCommit: true
  },

  updateCommitteeParent :{
  statement : `UPDATE COMMITTEE
  SET    COMMITTEE_PARENT_ID   = :COMMITTEE_PARENT_ID
  WHERE  COMMITTEE_ID        = :COMMITTEE_ID `,
bindings: [],
qstring: "",
requireCommit: true
},

addRole :{
    statement : `UPDATE COMMITTEE
    SET    ROLES_RESP   = :ROLES_RESP
    WHERE  COMMITTEE_ID        = :COMMITTEE_ID
`,
  bindings: [],
  qstring: "",
  requireCommit: true
}

  }
  
  module.exports = statements ;
  