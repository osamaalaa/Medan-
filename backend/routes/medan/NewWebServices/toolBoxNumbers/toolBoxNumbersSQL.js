
let statements = {
    toolBoxNumbers: {
            statement :`select (select count(*) from MEETINGS mt,MEETING_MEMBERS mm,PROJECTS pj            
            where MT.MEETING_ID=MM.MEETING_ID and PJ.PROJECT_ID(+)=MT.PROJECT_ID          
            and nvl(PJ.DELETED,0)=0 and nvl(MM.DELETED,0)=0 and nvl(MT.DELETED,0)=0 and MT.STATUS=1       
                             and ((to_char(to_date (MT.MEETING_DATE || ' '|| MT.START_TIME_STR, 'dd/mm/yy hh24:mi'),'YYYY-MM-DD HH24:MI')           
            >= to_char(systimestamp,'YYYY-MM-DD HH24:MI')) or MT.CREATED_BY= :CREATED_BY)           
            and MM.EMPLOYEE_ID = :EMPLOYEE_ID and PJ.PROJECT_ID =:PROJECT_ID)MEETING_CNT ,
(SELECT count(*) FROM INBOX_VIEW                     
where TO_DESTINATION_ID = (SELECT DESTINATION_ID FROM TRANSACTION_DESTINATIONS       
 WHERE EMPLOYEE_ID = :EMPLOYEE_ID and  nvl(DELETED,0)=0 ) and application_id=1 and PROJECT_ID = :PROJECT_ID)APPROVAL_CNT,         
(SELECT count(*)  FROM INBOX_VIEW                    
where TO_DESTINATION_ID = (SELECT DESTINATION_ID FROM TRANSACTION_DESTINATIONS                                          
WHERE EMPLOYEE_ID = :EMPLOYEE_ID and  nvl(DELETED,0)=0 ) and application_id=1 and PROJECT_ID = :PROJECT_ID and WO_STATUS_ID != 8)COLSSING_CNT,
(SELECT count(*) FROM PHASE_TASKS pt,PROJECTS pj              
WHERE PT.TASK_TYPE =211 AND PT.PROJECT_ID=PJ.PROJECT_ID(+)              
AND PJ.STATUS in(1,2,3) AND PT.STATUS=1 AND NVL(PJ.DELETED,0) =0 AND NVL(pt.DELETED,0)=0              
AND PJ.PROJECT_MANAGER_ID= :PROJECT_MANAGER_ID and PJ.PROJECT_ID = :PROJECT_ID)NOT_ASSIGN_CNT,
(select count(*) from mails , transitions trans                   
where mails.mail_id = trans.mail_id and mails.mail_status = 31                     
and trans.to_mailbox = :to_mailbox and trans.STATUS = 414)MAILS_CNT,
(SELECT count(*) FROM PHASE_TASKS PT           
where nvl(PT.DELETED,0)=0 AND PT.EMPLOYEE_ID = :EMPLOYEE_ID    
AND PT.STATUS = 1  AND PT.TASK_TYPE = 211 and PT.PROJECT_ID = :PROJECT_ID)WISHLIST_CNT,
(select count(*) from ISSUES SI,requests rq          
where SI.REQUEST_ID=RQ.REQUEST_ID      
AND ((SI.ASSIGN_TO= :ASSIGN_TO and RQ.REQUEST_STATUS =1)      
OR (RQ.CREATED_BY= :CREATED_BY and RQ.REQUEST_STATUS <>8 ))     
and NVL(SI.DELETED,0)=0 and SI.PROJECT_ID = :PROJECT_ID)ISSUES_CNT,         
(SELECT count(*) FROM INCIDENT_REPORT_REQUESTS IR 
where nvl(IR.DELETED,0)=0 and WORK_ORDER_OWNER = :WORK_ORDER_OWNER AND STATUS = '1' and IR.PROJECT_ID = :PROJECT_ID)INCIDENT_CNT,        
(select count(*) from Projects pj where nvl(PJ.DELETED,0)=0 and pj.PROJECT_MANAGER_ID = :PROJECT_MANAGER_ID AND pj.STATUS < 3 and pj.PROJECT_ID = :PROJECT_ID)PROJECTS_CNT        
from dual
              `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  