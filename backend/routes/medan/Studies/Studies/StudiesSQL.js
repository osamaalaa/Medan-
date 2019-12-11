
let statements = {
    getAllStudies: {
            statement :`
            SELECT STUDY_ID,
                   SUBJECT_AR,
                   OBJECTIVE_AR,
                   REQUESTER_TYPE_ID,
                   STUDY_TYPE_ID,
                   REQUESTER_ID,
                   COMPETENT_EMP_ID,
                   STUDY_SOURCE_ID,
                   CONTRACT_ID,
                   TERM_ID,
                   STUDY_WEIGH,
                   MAIN_CATEGORY_ID,
                   SUB_CATEGORY_ID,
                   PRIORITY_ID,
                   STATUS,
                   CREATION_DATE,
                   CREATED_BY,
                   LAST_MODIFY_DATE,
                   MODIFIED_BY,
                   DELETED,
                   DELETED_DATE,
                   DELETED_BY,
                   APPROVED_BY,
                   APPROVAL_DATE,
                   SUBJECT_EN,
                   OBJECTIVE_EN,
                   COMPETENT_DEPT_ID,
                   DUEDATE,
                   NOTES,
                   STUDY_SOURCE_TYPE,
                   MULTI_BENEFIT
              FROM STUDIES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneStudiesByID:{
        statement:`
        SELECT STUDY_ID,
               SUBJECT_AR,
               OBJECTIVE_AR,
               REQUESTER_TYPE_ID,
               STUDY_TYPE_ID,
               REQUESTER_ID,
               COMPETENT_EMP_ID,
               STUDY_SOURCE_ID,
               CONTRACT_ID,
               TERM_ID,
               STUDY_WEIGH,
               MAIN_CATEGORY_ID,
               SUB_CATEGORY_ID,
               PRIORITY_ID,
               STATUS,
               CREATION_DATE,
               CREATED_BY,
               LAST_MODIFY_DATE,
               MODIFIED_BY,
               DELETED,
               DELETED_DATE,
               DELETED_BY,
               APPROVED_BY,
               APPROVAL_DATE,
               SUBJECT_EN,
               OBJECTIVE_EN,
               COMPETENT_DEPT_ID,
               DUEDATE,
               NOTES,
               STUDY_SOURCE_TYPE,
               MULTI_BENEFIT
          FROM STUDIES
   WHERE STUDY_ID = :STUDY_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  