
  let statements = {
      getViolationMatrixById:{
          statement:`
          SELECT VM.VIOLATION_ID,
            VM.VIOLATION_MATRIX_ID,
            VM.PERIOD_START,
            VM.PERIOD_END,
            VM.VIOLATION_COUNT,
            VM.VALUE,
            (select MAX(VMM.VALUE) FROM VIOLATION_MATRIX VMM WHERE VMM.VIOLATION_ID= :VIOLATION_ID)  MAX_VAL
             FROM VIOLATION_MATRIX VM
            where VM.VIOLATION_ID =:p_violation_id
            AND NVL(VM.DELETED,0) =0
            ORDER BY VM.PERIOD_END ASC  `,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
      },
      getViolationGroupValue:{
          statement:`
          select  VGD.VALUE
           FROM  VIOLATION_GROUP_DETAILS
           WHERE VIOLATION_ID=:VIOLATION_ID `,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
      },
      getMaxViolationMatrix:{
          statement:`
          select MAX(VMM.VALUE ) value FROM VIOLATION_MATRIX VMM WHERE VMM.VIOLATION_ID= :VIOLATION_ID`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
      },
      getViolationCount:{
          statement:`
          select count(*) v_count from ISSUES  A , VIOLATION_MATRIX B Where
                                                                   A.VIOLATION_ID=:p_violation_id
                                                                  AND A.TYPE_ID=12274
                                                                  AND A.CREATION_DATE BETWEEN SYSDATE AND (SYSDATE - B.PERIOD_END)
                                                                  AND NVL(DELETED ,0) = 0`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
      },
      getNewCompliance:{
          statement:`
          SELECT
    distinct
        VIOLATION_ID ,
       (select MAX(VIOLATION_VALUE) FROM ISSUES  WHERE VIOLATION_ID = :VIOLATION_ID) VAL_ISSUE
           FROM ISSUES
           WHERE VIOLATION_ID = :VIOLATION_ID AND ASSEET_ID = :ASSEET_ID AND PROJECT_ID = :PROJECT_ID
            AND NVL(DELETED,0) = 0
            AND TYPE_ID=12274`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
      },
      getViolationValueFromMAtrix:{
          statement:`
          SELECT
        VIOLATION_MATRIX_ID,
        VIOLATION_ID,
        PERIOD_TITLE,
           PERIOD_START,
            PERIOD_END,
            VIOLATION_COUNT,
            VIOLATION_VALUE
        FROM VIOLATION_MATRIX
        WHERE VIOLATION_ID = :VIOLATION_ID
        AND NVL(DELETED,0)=0
        ORDER BY PERIOD_END ASC`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
      },
      getViolationValuefromMAt:{
          statement:`
          SELECT
                 VALUE ,
                 VIOLATION_ID
                FROM VIOLATION_MATRIX
                WHERE DELETED = 0
                AND VIOLATION_ID = :VIOLATION_ID`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
      },
      getViolationValuefromISSUE:{
          statement:`
          SELECT
     distinct (select MAX(VIOLATION_VALUE ) value FROM ISSUES) VIOLATION_FINAL_VALUE
     FROM ISSUES
     WHERE ASSEET_ID = :ASSEET_ID
     AND TYPE_ID=12274
      AND VIOLATION_ID = :VIOLATION_ID
      AND PROJECT_ID = :PROJECT_ID
       AND NVL(DELETED,0)=0`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
      },
      violationHasMatrix:{
          statement:`
                SELECT
        VIOLATION_ID
      FROM HR.VIOLATION_MATRIX
      WHERE VIOLATION_ID = :VIOLATION_ID
      AND NVL (DELETED , 0 ) = 0`,
                returns: [],
                bindings: [],
                qstring: "",
                requireCommit: false
            },
            getMAtrix:{
                statement:`
                SELECT
                    VIOLATION_MATRIX_ID,
                    VIOLATION_ID,
                    PERIOD_TITLE,
                       PERIOD_START,
                        PERIOD_END,
                        VIOLATION_COUNT,
                        VALUE
                    FROM VIOLATION_MATRIX
                    WHERE VIOLATION_ID = :VIOLATION_ID
                    AND NVL(DELETED,0)=0
                    ORDER BY PERIOD_END ASC`,
                returns: [],
                bindings: [],
                qstring: "",
                requireCommit: false
            },
            getVCount:{
                statement:
                `
                SELECT count(*) vCount
                    FROM
                        issues I ,
                        violation_matrix VM
                      WHERE I.ASSEET_ID= :ASSEET_ID
                    AND I.VIOLATION_ID= :VIOLATION_ID
                   AND I.TYPE_ID= 12274
                   AND I.DELETED = 0 AND VM.DELETED = 0

                    ORDER BY VM.PERIOD_END ASC `,

                returns: [],
                bindings: [],
                qstring: "",
                requireCommit: false
            },
            getRssCounter:{
                statement:
                `
                    SELECT
                            VM.VALUE AS VALUE,
                            VM.VIOLATION_COUNT AS VIOLATION_COUNT,
                            (SELECT COUNT(*) FROM ISSUES ISS WHERE ISS.VIOLATION_ID= :VIOLATION_ID AND ISS.ASSEET_ID= :ASSEET_ID AND ISS.PROJECT_ID= :PROJECT_ID AND NVL(ISS.DELETED,0)=0
                            AND ISS.TYPE_ID =12274
                            AND ISS.CREATION_DATE BETWEEN SYSDATE - VM.PERIOD_END AND SYSDATE
                            ) RES_COUNTER
                            FROM
                             VIOLATION_MATRIX  VM
                            ORDER by VM.PERIOD_END ASC `,

                returns: [],
                bindings: [],
                qstring: "",
                requireCommit: false
            },

            getHistoryViolationsById:{
                statement:
                `
                SELECT
                   PROJECT_ID,
                    CREATION_DATE, TYPE_ID, ASSEET_ID,
                    VIOLATION_ID, VIOLATION_GROUP_ID, VIOLATION_VALUE,
                    ASSET_GROUP_ID
                    FROM HR.ISSUES
                    WHERE DELETED = 0 AND ASSEET_ID = :ASSEET_ID `,

                returns: [],
                bindings: [],
                qstring: "",
                requireCommit: false
            },
            getoneViolationIssue:{
                statement:`
                SELECT
                  VIOLATION_ISSUES_ID, VIOLATION_ID, ISSU_TITLE,
                     ISSU_SUMMARY, ASSIGN_TO, WO_ID, TYPE_ID
                  FROM HR.VIOLATION_ISSUES
                  WHERE DELETED  = 0 AND VIOLATION_ID = :VIOLATION_ID`,
                    bindings: [],
                    qstring: "",
                    requireCommit: false
                }








  }

    module.exports = statements ;
