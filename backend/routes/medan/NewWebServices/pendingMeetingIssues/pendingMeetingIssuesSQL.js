
let statements = {
    pendingMeetingIssues: {
            statement :`SELECT ROWNUM MM_ROWNUM,MT.MEETING_DESCRIPTION,ME.MEMBER_ROLE,                    
            MT.STATUS,MT.MEETING_DATE,MT.TYPE MT_TYPE,                      
             MT.START_TIME_STR,MT.END_TIME_STR,MT.MEETING_ID ,MM.MOM_ID               
             ,MM.DESCRIPTION, MM.RESPONSABLE_MEMBER,                  
             GETEMPNAME_LANG(MM.RESPONSABLE_MEMBER,1,1) RESPONSABLE_MEMBER_AR,                      
             GETEMPNAME_LANG(MM.RESPONSABLE_MEMBER,1,2)RESPONSABLE_MEMBER_EN,                     
             MM.ACTION_TYPE,MT.COMMITTEE_ID,MT.PROJECT_ID,                     
             AC.primary_name ACTION_TYPE_AR,AC.SECONDARY_NAME ACTION_TYPE_EN,                     
             MM.TYPE,MM.STATUS MINUTE_STATUS,mm.ACTION_COMMENTS,         
             (select PJ.PRIMARY_NAME from projects pj where PJ.PROJECT_ID=MT.PROJECT_ID) PROJECT_NAME_AR,       
             (select PJ.SECONDARY_NAME from projects pj where PJ.PROJECT_ID=MT.PROJECT_ID )PROJECT_NAME_EN,         
             (select CM.COMMITTEE_NAME_AR from COMMITTEE CM where CM.COMMITTEE_ID=MT.COMMITTEE_ID ) COMMITTEE_NAME_AR,        
             (select CM.COMMITTEE_NAME_EN from COMMITTEE CM where CM.COMMITTEE_ID=MT.COMMITTEE_ID ) COMMITTEE_NAME_EN         
      FROM MEETING_MINUTES MM, MEETINGS MT ,lookup_details AC ,MEETING_MEMBERS ME                     
      WHERE MM.MEETING_ID = MT.MEETING_ID --and MT.STATUS=1                     
                      and AC.LOOKUP_DETAIL_ID=MM.ACTION_TYPE and MM.RESPONSABLE_MEMBER=ME.MEETING_MEMBER_ID (+)                    
      and nvl(MT.DELETED,0)=0 and nvl(MM.DELETED,0)=0  and   RESPONSABLE_MEMBER = :RESPONSABLE_MEMBER          
      order by MT.MEETING_ID
              `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  