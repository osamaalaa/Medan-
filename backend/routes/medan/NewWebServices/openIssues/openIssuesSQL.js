
let statements = {
    openIssues: {
            statement :`SELECT SI.ISSUE_ID,RQ.REQUEST_STATUS,          
            SI.REQUEST_ID,RQ.CREATED_BY,SI.ASSIGN_TO,  
            (select max(IA.ASSIGNMENT_ID) from ISSUE_ASSIGNMENTS ia where IA.ISSUE_ID=SI.ISSUE_ID and IA.ASSIGNMENT_STATUS=1 and IA.EMPLOYEE_ID= :EMPLOYEE_ID)ASSIGNMENT_ID,          
            SI.ISSUE_TITLE, SI.ISSUE_SUMMARY,          
            SI.ISSUE_PRIORITY,SI.TARGET_RESOLUTION_DATE,          
            SI.READ_STATUS, SI.ISSUE_TRACK_ID,           
           SI.ISSUE_TYPE,SI.FINAL_RESOLUTION,           
            PJ.PRIMARY_NAME projectNameAr,           
            PJ.SECONDARY_NAME projectNameEr,              
            CS.AR_NAME clientNameAR,CS.EN_NAME clientNameEn,          
            CASE SI.REFERENCE_TYPE WHEN 2 THEN (SELECT COMMITTEE_NAME_AR from COMMITTEE WHERE COMMITTEE_ID = SI.REFERENCE_ID )  END COMMITTEE_NAME_AR ,         
            CASE SI.REFERENCE_TYPE WHEN 2 THEN (SELECT COMMITTEE_NAME_EN from COMMITTEE WHERE COMMITTEE_ID = SI.REFERENCE_ID  )  END COMMITTEE_NAME_EN,
          PJ.PROJECT_ID           
          FROM ISSUES SI,projects pj ,requests rq,clients cs           
          WHERE CS.CLIENT_ID =PJ.CLIENT_ID AND SI.PROJECT_ID = PJ.PROJECT_ID           
          AND SI.REQUEST_ID  =RQ.REQUEST_ID           
          AND ((RQ.CREATED_BY= :EMPLOYEE_ID and RQ.REQUEST_STATUS <>8) OR (SI.ASSIGN_TO= :EMPLOYEE_ID and RQ.REQUEST_STATUS=1) )  
          AND NVL(CS.DELETED,0)=0 AND NVL(PJ.DELETED,0)=0 AND NVL(SI.DELETED,0)=0 order by RQ.CREATION_DATE DESC
              `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  