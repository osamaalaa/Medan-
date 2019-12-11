
let statements = {
    getCommittee: {
            statement :`select DISTINCT ci.PROJECT_ID, ci.COMMITTEE_ID,ci.COMMITTEE_CODE,ci.COMMITTEE_NAME_AR,ci.COMMITTEE_NAME_EN
            from COMMITTEE ci,COMMITTEE_MEMBERS cm
            where ci.COMMITTEE_ID = cm.COMMITTEE_ID and cm.employee_id= :p_emp_id
            and ci.DELETED=0 and cm.DELETED=0 order by ci.PROJECT_ID `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
    
    loggedUserCommittee: {
      statement :`SELECT
      COM.COMMITTEE_ID         ,
      COM.COMMITTEE_CODE       ,
      COM.COMMITTEE_NAME_EN    ,
      COM.COMMITTEE_NAME_AR    ,
      COM.SUBSIDARY_ID         ,
      COM.STATUS               ,
      COM.CREATED_BY           ,
      COM.CREATION_DATE        ,
      COM.MODIFIED_BY          ,
      COM.MODIFICATION_DATE    ,
      COM.PROJECT_ID           ,
      COM.BOQ_ID               ,
      COM.COMMITTEE_TYPE       ,
      COM.COMMITTEE_PARENT_ID  ,
      COM.DELETED              ,
      COM.DELETED_BY           ,
      COM.DELETED_DATE         ,
      COM.ROLES_RESP           ,
      COM.DEPT_ID              ,
      COM.DESCRIPTION          ,
      COM.REPORTING_TO         ,
      (select count(*) from COMMITTEE_MEMBERS  cm where nvl(CM.DELETED,0)=0 and CM.COMMITTEE_ID=COM.COMMITTEE_ID ) members_count,
      (select count(*) from MEETINGS MEET  WHERE NVL(MEET.DELETED,0)=0 and MEET.COMMITTEE_ID=COM.COMMITTEE_ID  and MEET.STATUS=1 ) active_meetings,
      (select count(*) from MEETINGS MEET  WHERE NVL(MEET.DELETED,0)=0 and MEET.COMMITTEE_ID=COM.COMMITTEE_ID  and MEET.STATUS=2 ) finished_meetings,
      (select count(*) from MEETINGS MEET  WHERE NVL(MEET.DELETED,0)=0 and MEET.COMMITTEE_ID=COM.COMMITTEE_ID  and MEET.STATUS=4 ) closed_meetings
      FROM
      COMMITTEE COM
      WHERE
      COM.COMMITTEE_ID IN (SELECT MEMB.COMMITTEE_ID FROM COMMITTEE_MEMBERS MEMB WHERE MEMB.EMPLOYEE_ID = :EMPLOYEE_ID and nvl(MEMB.DELETED,0)=0)
      AND NVL(COM.DELETED,0)=0 `,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
}
}
  module.exports = statements ;
  