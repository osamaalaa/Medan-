
let statements = {
    insertJobOrderCounter: {
        statement: `
INSERT INTO JOB_ORDER_COUNTERS (JOB_ORDER_COUNTERS_ID,
                                JOB_ORDER_ID,
                                COUNTER_ID,
                                CREATED_BY,
                                CREATION_DATE,
                                DELETED,
                                DELETED_BY,
                                DELETED_DATE,
                                ASSET_ID,
                                COUNTER_READING)
     VALUES (JOB_ORDER_COUNTERS_SEQ.NEXTVAL,
             :JOB_ORDER_ID,
             :COUNTER_ID,
             :CREATED_BY,
             sysdate,
             0,
             :DELETED_BY,
             sysdate,
             :ASSET_ID,
             :COUNTER_READING)
        RETURN JOB_ORDER_COUNTERS_ID , JOB_ORDER_ID , ASSET_ID INTO :R_JOB_ORDER_COUNTERS_ID , :R_JOB_ORDER_ID , :R_ASSET_ID`,
        returns: ["R_JOB_ORDER_COUNTERS_ID" , "R_JOB_ORDER_ID" ,"R_ASSET_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },


updateJobOrderSparparts: {
    statement: `
    UPDATE JOB_ORDER_SPAREPARTS
    SET ITEM_COUNT = :ITEM_COUNT
    WHERE JOB_ORDER_SPAREPARTS_ID = :JOB_ORDER_SPAREPARTS_ID 
    `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: true
},

updateJobOrderAsset: {
    statement: `
    UPDATE JOB_ORDER_ASSETS
    SET ASSET_COUNT = :ASSET_COUNT
    WHERE JOB_ORDER_ASSET_ID = :JOB_ORDER_ASSET_ID
    `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: true
},

// updateJobOrderDetails: {
//     statement: `
//     UPDATE JOB_ORDER_DETAILS
//     SET ACTIVITY_VALUE = :ACTIVITY_VALUE,
//     position_item_asset_val = :position_item_asset_val,
//     DAY_CODE = :DAY_CODE
//     WHERE JOB_ORDER_detail_ID = :JOB_ORDER_detail_ID    `,
//     returns: [],
//     bindings: [],
//     qstring: "",
//     requireCommit: true
// },

updateJobOrderDetails: {
    statement: `
    UPDATE JOB_ORDER_DETAILS
    SET ACTIVITY_VALUE = :ACTIVITY_VALUE,
    POSITION_ITEM_ASSET_VAL = :POSITION_ITEM_ASSET_VAL,
    DAY_CODE = :DAY_CODE
    WHERE JOB_ORDER_DETAIL_ID = :JOB_ORDER_DETAIL_ID    `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: true
},


updateDailyWorkingHours : {
    statement: `
    UPDATE DAILY_WORKING_HOURS
    SET WORK_DATE = :WORK_DATE,
    WORKING_HOURS = :WORKING_HOURS,
    COMMENTS = :COMMENTS,
    WORK_ORDER_ID = :WORK_ORDER_ID,
    DAILY_HOURS_ID = :DAILY_HOURS_ID,
    STATUS = 1,
    DELETED = 0
    WHERE DAILY_HOURS_ID = :DAILY_HOURS_ID
    `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: true
},


deleteDailyWorkingHours : {
    statement: `
    UPDATE  DAILY_WORKING_HOURS
    SET DELETED = 1
    WHERE DAILY_HOURS_ID = :DAILY_HOURS_ID
    `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: true
},


createWorkingDailyHours: {
    statement: `
INSERT INTO DAILY_WORKING_HOURS (DAILY_HOURS_ID,
    WORK_ORDER_ID,
    WORK_DATE,
    WORKING_HOURS,
    COMMENTS )
 VALUES ( DAILY_WORKING_HOURS_SEQ.NEXTVAL,
    :WORK_ORDER_ID,
    :WORK_DATE,
    :WORKING_HOURS,
    :COMMENTS
    )
    RETURN WORK_ORDER_ID , WORK_DATE , WORKING_HOURS , COMMENTS INTO :R_WORK_ORDER_ID , :R_WORK_DATE , :R_WORKING_HOURS , :R_COMMENTS`,
    returns: ["R_WORK_ORDER_ID" , "R_WORK_DATE" ,"R_WORKING_HOURS" , "R_COMMENTS"],
    bindings: [],
    qstring: "",
    requireCommit: true
},




/////////////////
//////////////////////////////
updateOrCreateMeetingMinutes : {
    statement :`SELECT MOM_ID from MEETING_MINUTES WHERE MOM_ID = :MOM_ID `,
    bindings: [],
    qstring: "",
    requireCommit: false
},

updateMeetingMinutes: {
statement: `
UPDATE MEETING_MINUTES
SET
MEETING_ID = :MEETING_ID,
DESCRIPTION = :DESCRIPTION,
RESPONSABLE_MEMBER = :RESPONSABLE_MEMBER,
STATUS  = :STATUS,
TYPE     = :TYPE,
MOM_DATE   = :MOM_DATE
WHERE  MOM_ID   = :MOM_ID
`,
returns: [],
bindings: [],
qstring: "",
requireCommit: true
},

insertMeetingMinutess: {
statement: `
INSERT INTO MEETING_MINUTES (MOM_ID,
    MEETING_ID,
    DESCRIPTION,
    RESPONSABLE_MEMBER,
    STATUS,
    TYPE,
    MOM_DATE
    )
VALUES (
 MEETING_MINUTES_SEQ.NEXTVAL,
:MEETING_ID,
:DESCRIPTION,
:RESPONSABLE_MEMBER,
:STATUS,
:TYPE,
:MOM_DATE
)
`,
bindings: [],
qstring: "",
requireCommit: true
},

updateMeeting: {
    statement: `
    UPDATE MEETINGS
SET    MEETING_ID          = :MEETING_ID,
       MEETING_DESCRIPTION = :MEETING_DESCRIPTION,
       MEETING_DATE        = :MEETING_DATE,
       LOCATION            = :LOCATION,
       START_TIME_STR      = :START_TIME_STR,
       END_TIME_STR        = :END_TIME_STR
WHERE  MEETING_ID          = :MEETING_ID
    `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: true
    },

createOrUpdateMeetingMembers: {
        statement: `
       select meeting_member_id from meeting_members where meeting_member_id = :meeting_member_id
        `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: true
        },

updateMeetingMembers: {
    statement: `
    UPDATE MEETING_MEMBERS
    SET    MEETING_MEMBER_ID    = :MEETING_MEMBER_ID,
            MEETING_ID           = :MEETING_ID,
            MEMBER_ROLE          = :MEMBER_ROLE,
            STATUS               = :STATUS,
            MAIL_SENT_FLAG       = :MAIL_SENT_FLAG,
            MEMBER_TYPE          = :MEMBER_TYPE,
            ATTENDANCE_FLAG      = :ATTENDANCE_FLAG,
            INVITATION_MAIL_FLAG = :INVITATION_MAIL_FLAG,
            EMPLOYEE_ID          = :EMPLOYEE_ID,
            DELETED              = :DELETED,
            DELETED_BY           = :DELETED_BY,
            DELETED_DATE         = :DELETED_DATE,
            SUBSIDIARY_ID        = :SUBSIDIARY_ID,
            INVITED_FLAG         = :INVITED_FLAG
    WHERE  MEETING_MEMBER_ID    = :MEETING_MEMBER_ID
    `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: true
    },

    insertMeetingMembers: {
        statement: `
        INSERT INTO  MEETING_MEMBERS (MEETING_MEMBER_ID,
            MEETING_ID,
            MEMBER_ROLE,
            STATUS,
            MAIL_SENT_FLAG,
            MEMBER_TYPE,
            ATTENDANCE_FLAG,
            INVITATION_MAIL_FLAG,
            EMPLOYEE_ID,
            DELETED,
            DELETED_BY,
            DELETED_DATE,
            SUBSIDIARY_ID,
            INVITED_FLAG)
        VALUES (
            :MEETING_MEMBER_ID,
            :MEETING_ID,
            :MEMBER_ROLE,
            :STATUS,
            :MAIL_SENT_FLAG,
            :MEMBER_TYPE,
            :ATTENDANCE_FLAG,
            :INVITATION_MAIL_FLAG,
            :EMPLOYEE_ID,
            :DELETED,
            :DELETED_BY,
            :DELETED_DATE,
            :SUBSIDIARY_ID,
            :INVITED_FLAG
        )
        RETURN   MEETING_ID INTO  :R_MEETING_ID
        `,
        returns: ["R_MEETING_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
        },
        
        insertAttachment :{
            statement: `
            insert into attachments(
                ATTACH_ID,
                CREATED_BY,
                creation_date,
                attach_title,
                FILE_NAME
                )
                values
                (
                    :ATTACH_ID,
                    :CREATED_BY,
                    sysdate,
                    :attach_title,
                    :FILE_NAME
                )   
           `,
           returns: [],
           bindings: [],
           qstring: "",
           requireCommit: true
        },
        insertIncidentReport: {
            statement: `
            INSERT INTO HR.INCIDENT_REPORTS (
              INCIDENT_ID,
              INCIDENT_TITLE,
              TICKET_NUMBER,
              INCIDENT_START_DATE,
              INCIDENT_END_DATE,
              INCIDENT_TOTAL_DURATION,
              REPORT_DATE,
              INCIDENT_DESCRIPTION,
              PROJECT_ID,
              CORRECTIVE_ACTIONS,
              PREVENTIVE_ACTIONS,
              INCIDENT_BRIEF,
              EMPLOYEE_ID
              )VALUES (
              INCIDENT_REPORTS_SEQ.NEXTVAL,
              :INCIDENT_TITLE,
              :TICKET_NUMBER,
              :INCIDENT_START_DATE,
              :INCIDENT_END_DATE,
              :INCIDENT_TOTAL_DURATION,
              sysdate,
              :INCIDENT_DESCRIPTION,
              :PROJECT_ID,
              :CORRECTIVE_ACTIONS,
              :PREVENTIVE_ACTIONS,
              :INCIDENT_BRIEF,
              :EMPLOYEE_ID
            )
            RETURN   INCIDENT_ID , INCIDENT_TITLE, TICKET_NUMBER, PROJECT_ID , INCIDENT_DESCRIPTION , INCIDENT_BRIEF INTO  :R_INCIDENT_ID , :R_INCIDENT_TITLE , :R_TICKET_NUMBER, :R_PROJECT_ID , :R_INCIDENT_DESCRIPTION , :R_INCIDENT_BRIEF
            `,
            returns: [ "R_INCIDENT_ID" , "R_INCIDENT_TITLE", "R_TICKET_NUMBER", "R_PROJECT_ID" , "R_INCIDENT_BRIEF" , "R_INCIDENT_DESCRIPTION" ],
            bindings: [],
            qstring: "",
            requireCommit: true
            }, 

updateOrCreateMeetingAgenda: {
    statement: `
    select meeting_agenda_id from meeting_agenda where meeting_agenda_id = :meeting_agenda_id
    `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: true
    },
    
    
updateMeetingAgenda: {
    statement: `
    UPDATE MEETING_AGENDA
SET    MEETING_AGENDA_ID = :MEETING_AGENDA_ID,
       MEETING_ID        = :MEETING_ID,
       DESCRIPTION       = :DESCRIPTION,
       STATUS            = :STATUS,
       DELETED           = :DELETED,
       DELETED_BY        = :DELETED_BY,
       DELETED_DATE      = :DELETED_DATE,
       SUBSIDIARY_ID     = :SUBSIDIARY_ID
WHERE  MEETING_AGENDA_ID = :MEETING_AGENDA_ID
    `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: true
    },

    // insertMeetingAgenda: {
    //     statement: `
    //     INSERT INTO  MEETING_AGENDA (MEETING_AGENDA_ID,
    //         MEETING_ID,
    //         DESCRIPTION,
    //         STATUS,
    //         DELETED,
    //         DELETED_BY,
    //         DELETED_DATE,
    //         SUBSIDIARY_ID,
    //         agenda_or_presentaion)
    //     VALUES (
    //         :MEETING_AGENDA_ID,
    //         :MEETING_ID,
    //         :DESCRIPTION,
    //         :STATUS,
    //         :DELETED,
    //         :DELETED_BY,
    //         :DELETED_DATE,
    //         :SUBSIDIARY_ID,
    //         0
    //     )
    //     RETURN   MEETING_ID INTO  :R_MEETING_ID
    //     `,
    //     returns: ["R_MEETING_ID"],
    //     bindings: [],
    //     qstring: "",
    //     requireCommit: true
    //     },
       
        getCommitteetype : {
                       statement : `select committee_type from committee where COMMITTEE_ID = :COMMITTEE_ID `,
                       bindings: [],
        qstring: "",
        requireCommit: false
        },

        getCommType: {
            statement: `
            UPDATE MEETINGS
            SET    type = :type
            WHERE  committee_id = :committee_id
            `,
            bindings: [],
            qstring: "",
            requireCommit: true
            },
            
            getMeetingIDSEQ :{
                 statement :` select MEETINGS_SEQ.NEXTVAL  from dual
                 `,
                 bindings: [],
            qstring: "",
            requireCommit: false
            },

            insertMeeting: {
                statement: `
                INSERT INTO  Meetings 
                (MEETING_ID,
                    MEETING_CODE,
                    MEETING_DATE,
                    TYPE,
                    COMMITTEE_ID,
                    MEETING_DESCRIPTION,
                    LOCATION,
                    STATUS,
                    DELETED,
                    PROJECT_ID,
                    START_TIME_STR,
                    END_TIME_STR,
                    CREATED_BY
                    )
                VALUES (
                    :MEETING_ID,
                    :MEETING_CODE,
                    :MEETING_DATE,
                    :TYPE,
                    :COMMITTEE_ID,
                    :MEETING_DESCRIPTION,
                    :LOCATION,
                    1,
                    0,
                    :PROJECT_ID,
                    :START_TIME_STR,
                    :END_TIME_STR,
                    :CREATED_BY
                )
                
                `,
                returns: [],
                bindings: [],
                qstring: "",
                requireCommit: true
                },
            
                insertMeetingAgenda: {
                    statement: `
                    INSERT INTO  Meeting_Agenda (MEETING_AGENDA_ID,
                        MEETING_ID,
                        STATUS,
                        DELETED,
                        DESCRIPTION,
                        agenda_or_presentaion,
                        CLASSIFICATION_ID
                        )
                    VALUES (
                        MEETINGS_AGENDA_SEQ.NEXTVAL,
                        :MEETING_ID,
                        1,
                        0,
                        :DESCRIPTION,
                        0,
                        0
                        
                    )`,
                    bindings: [],
                    qstring: "",
                    requireCommit: true
                    },

                    insertMeetingMinutes: {
                        statement: `
                        INSERT INTO  Meeting_minutes (mom_ID,
                            MEETING_ID,
                            STATUS,
                            DELETED,
                            DESCRIPTION
                            )
                        VALUES (
                            MEETING_MINUTES_SEQ.NEXTVAL,
                            :MEETING_ID,
                            1,
                            0,
                            :DESCRIPTION
                        )
                        RETURN mom_ID INTO :R_mom_ID`,
                        returns: ["R_mom_ID"],
                        bindings: [],
                        qstring: "",
                        requireCommit: true
                        },


            //,

            insertMeetingMember: {
                statement: `
                INSERT INTO  Meeting_Members (MEETING_MEMBER_ID,
                    MEETING_ID,
                    STATUS,
                    DELETED,
                    MAIL_SENT_FLAG,
                    INVITATION_MAIL_FLAG,
                    ATTENDANCE_FLAG,
                    EMPLOYEE_ID,
                    MEMBER_ROLE,
                    INVITED_FLAG
                    )
                VALUES (
                    MEETINGS_MEMBER_SEQ.NEXTVAL,
                    :MEETING_ID,
                    1,
                    0,
                    0,
                    0,
                    2,
                    :EMPLOYEE_ID,
                    :MEMBER_ROLE,
                    :INVITED_FLAG
                )
                `,
                returns: [],
                bindings: [],
                qstring: "",
                requireCommit: true
                },
            
                insertCommitteeMembers: {
                    statement: `
                    INSERT INTO COMMITTEE_MEMBERS (COMMITTEE_MEMBERS_ID,
                        COMMITTEE_ID,
                        MEMBER_ROLE,
                        STATUS,
                        CREATED_BY,
                        CREATION_DATE,
                        MODIFIED_BY,
                        MODIFICATION_DATE,
                        EMPLOYEE_ID,
                        SUBSIDIARY_ID
                        )
                    VALUES (
                        COMMITTEE_MEMBERS_SEQ.NEXTVAL,
                        :COMMITTEE_ID,
                        :MEMBER_ROLE,
                        :STATUS,
                        :CREATED_BY,
                        sysdate,
                        :MODIFIED_BY,
                        :MODIFICATION_DATE,
                        :EMPLOYEE_ID,
                        :SUBSIDIARY_ID
                    )
                    RETURN   COMMITTEE_ID , MEMBER_ROLE INTO  :R_COMMITTEE_ID , :R_MEMBER_ROLE
                    `,
                    returns: ["R_COMMITTEE_ID" , "R_MEMBER_ROLE"],
                    bindings: [],
                    qstring: "",
                    requireCommit: true
                    },

                    deleteMember: {
                        statement: `UPDATE COMMITTEE_MEMBERS
                        SET DELETED = 1  , DELETED_DATE = sysdate , DELETED_BY = :DELETED_BY
                        WHERE
                        COMMITTEE_MEMBERS_ID = :COMMITTEE_MEMBERS_ID`,
                        returns: [],
                        bindings: [],
                        qstring: "",
                        requireCommit: true
                        },

                        workOrderApprovals: {
                            statement :`SELECT
                            REQUEST_ID, APPLICATION_ID, APPLICATION_NAME,
                              REQ_TYPE_ID, REQUEST_STATUS, REQ_TYPE_NAME,REQ_TYPE_DEFINITION_TYPE,
                              EMPLOYEE_ID, EMP_NAME,EMP_NAME_AR, INCOME_ACTION,
                              TRANACTION_ID, TRANS_CLASSIFICATION, TRANACTION_TYPE,
                              COMMENTS,ANSWER_ON_QUES, CREATED_DATE, OUTCOME_ACTION_DATE,
                              TRANACTION_STATUS, ASK_REPLY_STEP, PARENT_TRANACTION_ID,
                              FROM_DESTINATION_ID, FROM_DEST,FROM_DEST_AR, TO_DESTINATION_ID,
                              TO_DEST,TO_DEST_AR, STEP_ID, OPENED,REQ_CLASSIFICATION,
                              CLIENT_ID, PROJECT_ID, PROJECT_MANAGER_ID,
                              PRIORITY, WORK_ORDER_CODE, WO_STATUS_ID,
                              DESCRIPTION, CLIENT_NAME, PROJECT_NAME,
                              EMPLOYEE_EMAIL, STEP_DESCRIPTION_EN, STEP_DESCRIPTION_AR,
                              STEP_CLASSIFICATION, STEP_NEED_ACTION_FLAG, LAST_STEP_NEED_ACTION_FLAG,
                              (select count(*) from DAILY_WORKING_HOURS DW where DW.WORK_ORDER_ID=REQUEST_ID and nvl(DW.DELETED,0)=0 )DAILY_WORKING_COUNT,
                              (select case when REQ_TYPE_ID=71 then (select WO.WORK_ORDER_CODE from PROJECTS p ,WORK_ORDERS wo ,OBJECTION_REQUESTS ob
                            where OB.WORK_ORDER_ID=WO.WORK_ORDER_ID and P.PROJECT_ID=WO.PROJECT_ID and OB.OBJECTION_REQUEST_ID=REQUEST_ID) else null end from dual) work_order_code_obj,
                            (select case when REQ_TYPE_ID=71 then (select WO.DESCRIPTION from PROJECTS p ,WORK_ORDERS wo ,OBJECTION_REQUESTS ob
                            where OB.WORK_ORDER_ID=WO.WORK_ORDER_ID and P.PROJECT_ID=WO.PROJECT_ID and OB.OBJECTION_REQUEST_ID=REQUEST_ID) else null end from dual) work_order_desc_obj,
                              (select case when REQ_TYPE_ID=71 then (select P.PRIMARY_NAME  from  PROJECTS p ,WORK_ORDERS wo ,OBJECTION_REQUESTS ob
                            where OB.WORK_ORDER_ID=WO.WORK_ORDER_ID and P.PROJECT_ID=WO.PROJECT_ID and OB.OBJECTION_REQUEST_ID=REQUEST_ID) else null end from dual) project_name_obj_ar,
                            (select case when REQ_TYPE_ID=71 then (select P.SECONDARY_NAME from PROJECTS p ,WORK_ORDERS wo ,OBJECTION_REQUESTS ob
                            where OB.WORK_ORDER_ID=WO.WORK_ORDER_ID and P.PROJECT_ID=WO.PROJECT_ID and OB.OBJECTION_REQUEST_ID=REQUEST_ID) else null end from dual) project_name_obj_en,
                            (select case when REQ_TYPE_ID=71 then (select C.EN_NAME from projects p, clients c ,WORK_ORDERS wo ,OBJECTION_REQUESTS ob
                            where OB.WORK_ORDER_ID=WO.WORK_ORDER_ID and P.PROJECT_ID=WO.PROJECT_ID and OB.OBJECTION_REQUEST_ID=REQUEST_ID
                            and C.CLIENT_ID = P.CLIENT_ID) else null end from dual) client_name_en_obj,
                            (select case when REQ_TYPE_ID=71 then (select C.AR_NAME  from projects p, clients c ,WORK_ORDERS wo ,OBJECTION_REQUESTS ob
                            where OB.WORK_ORDER_ID=WO.WORK_ORDER_ID and P.PROJECT_ID=WO.PROJECT_ID and OB.OBJECTION_REQUEST_ID=REQUEST_ID
                            and C.CLIENT_ID = P.CLIENT_ID) else null end from dual) client_name_ar_obj
                            FROM INBOX_VIEW
                            where TO_DESTINATION_ID = (SELECT DESTINATION_ID FROM TRANSACTION_DESTINATIONS
                                                      WHERE EMPLOYEE_ID = :EMPLOYEE_ID and  nvl(DELETED,0)=0 ) and REQUEST_ID is not null and application_id=1
                                                      and (REQ_CLASSIFICATION = :REQ_CLASSIFICATION  or :REQ_CLASSIFICATION=0)
                                                      and REQUEST_ID = :REQUEST_ID
                            order by REQUEST_ID DESC`,
                                     bindings: [],
                                     qstring: "",
                                     requireCommit: false
                             },


                             getMomId:{
                                statement:`
                                select mom_id from meeting_minutes where meeting_id = :meeting_id
                           `,
                                returns: [],
                                bindings: [],
                                qstring: "",
                                requireCommit: false
                           },
                 
                           getMemberId:{
                                statement:`
                                select meeting_member_id from meeting_members mm where mm.meeting_id = :meeting_id
                           `,
                                returns: [],
                                bindings: [],
                                qstring: "",
                                requireCommit: false
                           },
                 
                     closeMeeting : {
                      statement: `
                      UPDATE meetings
                      SET status = 4
                      WHERE meeting_id = :meeting_id 
                      `,
                      returns: [],
                      bindings: [],
                      qstring: "",
                      requireCommit: true
                  },


                  getCommitteeEName :{
                    statement :`select Committee_Name_en from committee E where E.COMMITTEE_ID = :COMMITTEE_ID`,
                    bindings: [],
                                    qstring: "",
                                    requireCommit: true
                },
getEmpName :{
    statement :`select first_name2, s_second_name, employee_email,  phone from aot_gen.employees E where E.EMPLOYEE_ID = :EMPLOYEE_ID`,
    bindings: [],
                    qstring: "",
                    requireCommit: true
},

getMemberRole :{
    statement :`select secondary_name from lookup_details E where E.lookup_detail_id = :MEMBER_ROLE`,
    bindings: [],
                    qstring: "",
                    requireCommit: true
},
                  insertComment: {
                    statement: `
                    insert into meeting_comments(
                         comment_id,
                         employee_id,
                         agenda_id,
                         minutes_id,
                         user_comments,
                         creation_date
                         )
                         values
                         (
                         MEETING_COMMENTS_SEQ.NEXTVAL,
                         :employee_id,
                         :agenda_id,
                         :minutes_id,
                         :user_comments,
                         sysdate
                         )
                    RETURN comment_id, agenda_id, minutes_id, user_comments , employee_id                   
                    INTO
                    :R_comment_id , :R_agenda_id, :R_minutes_id , :R_user_comments , :R_employee_id ` ,
                    returns: ["R_comment_id", "R_agenda_id", "R_minutes_id", "R_user_comments", "R_employee_id"],
                    bindings: [],
                    qstring: "",
                    requireCommit: true
                },

                 getcreationDate
                      :{
          statement :`select to_char(creation_date, 'dd-MON-YY HH24:MI:SS') CREATION_DATE from meeting_comments where comment_id = :comment_id`,
          bindings: [],
                    qstring: "",
                    requireCommit: true
                      },
                 
                getMinutesComments :{
                    statement :`
                    select user_comments,employee_id,(select E.first_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) FIRST_NAME,
                    (select E.second_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) second_NAME,
                    (select E.first_name2 from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) FIRST_NAME_EN,
                    (select E.S_second_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) second_NAME_EN,
                     minutes_id , creation_date
                      from meeting_comments M
                    where employee_id = :employee_id and minutes_id in (select mom_id from meeting_minutes M where M.meeting_id = :meeting_id ) and APPROVED = 1
                    and deleted = 0 
                    order by creation_date asc `,
                    bindings: [],
                    qstring: "",
                    requireCommit: false
                },


                getMinutesComme :{
                    statement :`
                    select user_comments,employee_id,(select E.first_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) FIRST_NAME,
                    (select E.second_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) second_NAME,
                    (select E.first_name2 from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) FIRST_NAME_EN,
                    (select E.S_second_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) second_NAME_EN,
                     minutes_id , creation_date
                      from meeting_comments M
                    where employee_id = :employee_id and minutes_id in (select mom_id from meeting_minutes M where M.meeting_id = :meeting_id )
                    and deleted = 0
                    order by creation_date asc `,
                    bindings: [],
                    qstring: "",
                    requireCommit: false
                },


                getAgandeaComments :{
                    statement :`
                    select user_comments, (select E.first_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) FIRST_NAME,
                    (select E.second_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) second_NAME,
                    (select E.first_name2 from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) FIRST_NAME_EN,
                    (select E.S_second_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) second_NAME_EN,
                    creation_date
                     from meeting_comments M
                    where employee_id = :employee_id and agenda_id in (select meeting_agenda_id from meeting_agenda M where M.meeting_id = :meeting_id ) and APPROVED = 1
                    and deleted = 0
                    order by creation_date asc `,
                    bindings: [],
                    qstring: "",
                    requireCommit: false
                },

                getAgandeaComme :{
                    statement :`
                    select user_comments, (select E.first_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) FIRST_NAME,
                    (select E.second_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) second_NAME,
                    (select E.first_name2 from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) FIRST_NAME_EN,
                    (select E.S_second_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) second_NAME_EN,
                    creation_date
                     from meeting_comments M
                    where employee_id = :employee_id and agenda_id in (select meeting_agenda_id from meeting_agenda M where M.meeting_id = :meeting_id )
                    and deleted = 0
                    order by creation_date asc `,
                    bindings: [],
                    qstring: "",
                    requireCommit: false
                },



                uploadfiles :{
                    statement: `
                    insert into attachments(
                        attach_id,
                        created_by,
                        creation_date,
                        attach_title
                        )
                        values
                        (
                            :attach_id,
                            :created_by,
                            sysdate,
                            :attach_title
                                                    )
                   `,
                   returns: [],
                   bindings: [],
                   qstring: "",
                   requireCommit: true
                },
                getAttachmentMinutes :{
                    statement : `select FILE_NAME from attachments where attach_id in ( select att_id from meeting_minutes where meeting_id = :meeting_id and deleted = 0 )`,
                     returns: [],
                     bindings: [],
                     qstring: "",
                     requireCommit: true
             },
             getAttachmentAgenda :{
                statement : `select FILE_NAME from attachments where attach_id in ( select att_id from meeting_agenda where meeting_id = :meeting_id and deleted = 0 AND AGENDA_OR_PRESENTAION = 0)`,
                 returns: [],
                 bindings: [],
                 qstring: "",
                 requireCommit: true
         },
             getAttachmentPresentation :{
                statement : `select FILE_NAME from attachments where attach_id in ( select att_id from meeting_agenda where meeting_id = :meeting_id and deleted = 0 and AGENDA_OR_PRESENTAION = 1)`,
                 returns: [],
                 bindings: [],
                 qstring: "",
                 requireCommit: true
         },
                getMaxAttachId :{
                       statement : `select ATTACHMENT_SEQ.NEXTVAL from dual`,
                        returns: [],
                        bindings: [],
                        qstring: "",
                        requireCommit: true
                },
              
                updateMMinutes : {
                    statement: `
                    UPDATE MEETING_MINUTES
                    SET  ATT_ID = :ATT_ID
                    WHERE  MOM_ID= :MOM_ID
                    `,
                    returns: [],
                    bindings: [],
                    qstring: "",
                    requireCommit: true
                },

                updateMeetingAgenda :{
                    statement : `UPDATE MEETING_AGENDA
                    SET     ATT_ID  = :ATT_ID
                    WHERE  MEETING_AGENDA_ID  = :MEETING_AGENDA_ID`,
                    returns: [],
                    bindings: [],
                    qstring: "",
                    requireCommit: true
                },
                updateCommiteeId :{
                    statement : `UPDATE MEETINGS
                    SET   
                           COMMITTEE_ID              = :COMMITTEE_ID
                    WHERE  MEETING_ID                = :MEETING_ID`,
                    returns: [],
                    bindings: [],
                    qstring: "",
                    requireCommit: true
                },

                getDeletedProject : {
                    statement : `select deleted from projects where project_id = :project_id`,
                    bindings: [],
                    qstring: "",
                    requireCommit: false
                },
          
                 getCommitteesOfProject :
                 {
                    statement : `select project_id from committee where committee_id = :committee_id`,
                    bindings: [],
                    qstring: "",
                    requireCommit: false
                 },

                deleteMeetingAgenda : {
                    statement :`delete from meeting_agenda
                                where meeting_id = :meeting_id`,
                    bindings: [],
                    qstring: "",
                    requireCommit: true
                },

                createWorkOrder: {
                    statement: `
                INSERT INTO WORK_ORDERS (WORK_ORDER_ID, 
                                          Work_ORDER_CODE,
                                             EMPLOYEE_ID,
                                             PROJECT_ID, 
                                             DESCRIPTION, 
                                             START_DATE,
                                             END_DATE, 
                                             DURATION, 
                                             PRIORITY, 
                                             PHASE_TASK_ID, 
                                           WORK_ORDER_CLASSIFICATION,
                                            MILESTONE_ID, 
                                            MEASURE_VALUE, 
                                             MEASURE_UNIT,
                                             creation_date,
                                             status_id )
                 VALUES (REQUEST_ID_SEQ.NEXTVAL, 
                   REQUEST_ID_SEQ.NEXTVAL,
                  :EMPLOYEE_ID,
                  :PROJECT_ID, 
                  :DESCRIPTION, 
                  :START_DATE,
                  :END_DATE, 
                  :DURATION, 
                  :PRIORITY, 
                  :PHASE_TASK_ID, 
                  :WORK_ORDER_CLASSIFICATION,
                  :MILESTONE_ID, 
                  :MEASURE_VALUE, 
                  :MEASURE_UNIT,
                  :creation_date,
                  :status_id
                    )
                    RETURN WORK_ORDER_ID, EMPLOYEE_ID, creation_date  INTO :R_WORK_ORDER_ID, :R_EMPLOYEE_ID, :R_creation_date `,
                    returns: ["R_WORK_ORDER_ID","R_EMPLOYEE_ID","R_creation_date"],
                    bindings: [],
                    qstring: "",
                    requireCommit: true
                },


                insertRequest :{
                    statement : `INSERT INTO REQUESTS (
                                           REQUEST_ID,
                                           request_type,
                                           REQUEST_STATUS,
                                           CREATED_BY ,
                                            DESCRIPTION ,
                                            CLASSIFICATION_ID,   
                                            APPLICATION_ID  ,
                                            CREATION_DATE  )
                                VALUES ( :REQUEST_ID ,
                                    :request_type,
                                    1,
                                    :CREATED_BY,
                                    :DESCRIPTION,
                                    1,
                                    1,
                                    :CREATION_DATE

                                )
                                 `,
                                 bindings: [],
                                qstring: "",
                                requireCommit: true
                },
                
                getRequestType : {
                    statement :`select milestone_id, milestone_name from project_milestone `,
                    bindings: [],
                    qstring: "",
                    requireCommit: true
                },

                getOneRequestType : {
                    statement :`select request_type_id from project_milestone where milestone_id = :milestone_id`,
                    bindings: [],
                    qstring: "",
                    requireCommit: true
                },

                insertMeetingMembers: {
                    statement: `
                INSERT INTO MEETING_MEMBERS (MEETING_MEMBER_ID,
                    MEETING_ID,
                    MEMBER_ROLE,
                    STATUS,
                    MAIL_SENT_FLAG,
                    MEMBER_TYPE,
                    ATTENDANCE_FLAG,
                    INVITATION_MAIL_FLAG,
                    EMPLOYEE_ID,
                    SUBSIDIARY_ID,
                    INVITED_FLAG )
                 VALUES (MEETINGS_MEMBER_SEQ.NEXTVAL,
                    :MEETING_ID,
                    :MEMBER_ROLE,
                    :STATUS,
                    :MAIL_SENT_FLAG,
                    :MEMBER_TYPE,
                    :ATTENDANCE_FLAG,
                    :INVITATION_MAIL_FLAG,
                    :EMPLOYEE_ID,
                    :SUBSIDIARY_ID,
                    :INVITED_FLAG
                    )
 `,
                    bindings: [],
                    qstring: "",
                    requireCommit: true
                },


                Approved: {
                    statement: `
                    INSERT INTO MEETING_COMMENTS (COMMENT_ID,
                        EMPLOYEE_ID,
                        USER_COMMENTS,
                        CREATION_DATE,
                        AGENDA_ID,
                        MINUTES_ID,
                        APPROVED
                        )
                    VALUES (
                        MEETING_COMMENTS_SEQ.NEXTVAL,
                        :EMPLOYEE_ID,
                        'Aprroved',
                        sysdate,
                        :AGENDA_ID,
                        :MINUTES_ID,
                        1
                    )
                    RETURN  COMMENT_ID , APPROVED INTO  :R_COMMENT_ID , :R_APPROVED
                    `,
                    returns: ["R_COMMENT_ID" , "R_APPROVED"],
                    bindings: [],
                    qstring: "",
                    requireCommit: true
                    },



                    insertWishList: {
                        statement: `
                        INSERT INTO WISHLIST (WISHLIST_ID,
                          PROJECT_ID,
                          PROJCT_TRACK_ID,
                          TRACK_PHASE_ID,
                          PHASE_TASK_ID,
                          EMPLOYEE_ID,
                          WISHLIST_STATUS,
                          READ_STATUS,
                          CREATION_DATE,
                          SUBSIDIARY_ID)
                     VALUES (WISHLIST_SEQ.NEXTVAL,
                      :PROJECT_ID,
                      :PROJCT_TRACK_ID,
                      :TRACK_PHASE_ID,
                      :PHASE_TASK_ID,
                      :EMPLOYEE_ID,
                      :WISHLIST_STATUS,
                      :READ_STATUS,
                      sysdate,
                      :SUBSIDIARY_ID)
                        RETURN PROJECT_ID INTO :R_PROJECT_ID`,
                        returns: ["R_PROJECT_ID"],
                        bindings: [],
                        qstring: "",
                        requireCommit: true
                    },


                    attende: {
                        statement: `UPDATE MEETING_MEMBERS
                        SET  
                               ATTENDANCE_FLAG      = 1
                        WHERE  MEETING_MEMBER_ID    = :MEETING_MEMBER_ID`,
                        bindings: [],
                        qstring: "",
                        requireCommit: true
                    },

                    notAttende: {
                        statement: `UPDATE MEETING_MEMBERS
                        SET  
                               ATTENDANCE_FLAG      = 2
                        WHERE  MEETING_MEMBER_ID    = :MEETING_MEMBER_ID`,
                        bindings: [],
                        qstring: "",
                        requireCommit: true
                    },

     /////////////////////// ************** /////////////////
     /*********************  Insert new Employee and his user name and password */


                    insertNewEmployee: {
                        statement: `
                        INSERT INTO AOT_GEN.EMPLOYEES (EMPLOYEE_ID,
                            USER_CODE,
                            POSITION_ID,
                            FIRST_NAME,
                            S_SECOND_NAME,
                            LAST_NAME,
                            FIRST_NAME2,
                            EMPLOYEE_EMAIL,
                            PHONE,
                            CREATION_DATE
                            )
                        VALUES (EMPLOYEES_SEQ.NEXTVAL,
                            EMPLOYEES_SEQ.NEXTVAL,
                            83,
                            :FIRST_NAME,
                            :S_SECOND_NAME,
                            :LAST_NAME,
                            :FIRST_NAME2,
                            :EMPLOYEE_EMAIL,
                            :PHONE,
                            sysdate )
                        
                        `,
                        returns : [],
                        bindings: [],
                        qstring: "",
                        requireCommit: true
                        },

                        getMaxEmp :{
                            statement:`  select max(EMPLOYEE_id) max from AOT_GEN.EMPLOYEES`,
                            bindings: [],
                            qstring: "",
                            requireCommit: true
                        },

            
                        createUserAccount: {
                            statement: `
                            INSERT INTO AOT_SECURITY.USERS_ACCOUNTS (USER_ID,
                                EMPLOYEE_ID,
                                SUBSIDIARY_ID,
                                USER_NAME,
                                USER_PASSWORD,
                                STATUS,
                                CHANGE_PASS_FLAG
                                )
                            VALUES (USERS_ACCOUNTS_SEQ.NEXTVAL,
                                :EMPLOYEE_ID,
                                1,
                                :USER_NAME,
                                123,
                                1,
                                1
                            )
                            `,
                       
                            bindings: [],
                            qstring: "",
                            requireCommit: true
                            },


                            insertProjectMem: {
                                statement: `
                                INSERT INTO PROJECT_MEMBERS (MEMBER_ID,
                                    PROJECT_ID,
                                    EMPLOYEE_ID
                                    )
                                VALUES (PROJECT_MEMBERS_SEQ.NEXTVAL,
                                    :PROJECT_ID,
                                    :EMPLOYEE_ID
                                )
                                `,
                           
                                bindings: [],
                                qstring: "",
                                requireCommit: true
                                },


                                getMemberID :{
                                    statement:`select max(member_id) member_id from project_members`,
                                    
                                bindings: [],
                                qstring: "",
                                requireCommit: true
                                },

                                /////////////////////////
                                ////////////////////////////
                            createMeetingPresentation: {
                                statement: `
                                INSERT INTO  Meeting_Agenda (MEETING_AGENDA_ID,
                                    MEETING_ID,
                                    STATUS,
                                    DELETED,
                                    DESCRIPTION,
                                    agenda_or_presentaion
                                    )
                                VALUES (
                                    MEETINGS_AGENDA_SEQ.NEXTVAL,
                                    :MEETING_ID,
                                    1,
                                    0,
                                    :DESCRIPTION,
                                    1
                                )
                                RETURN MEETING_AGENDA_ID INTO :R_MEETING_AGENDA_ID`,
                                returns: ["R_MEETING_AGENDA_ID"],
                                bindings: [],
                                qstring: "",
                                requireCommit: true
                                },
                                getMeetingPresentation :{
                                    statement : `select * from meeting_agenda where agenda_or_presentaion = 1 and DELETED = 0`,
                                    bindings: [],
                                qstring: "",
                                requireCommit: true
                                },
                                reqCloseMeeting :{
                                    statement : `
                                    DECLARE 
                                         V_APPROVE_COUNT    NUMBER;
                                         V_MEMBER_COUNT   NUMBER;
                                    BEGIN
                                    select counT(*)
                                    into V_APPROVE_COUNT
                                    FROM MEETING_COMMENTS
                                    WHERE MINUTES_ID= :P_MINUTES_ID
                                    AND APPROVED=1
                                    AND DELETED =0;
                                    
                                    SELECT  COUNT(*)
                                    INTO V_MEMBER_COUNT 
                                    FROM MEETING_MEMBERS
                                    WHERE MEETING_ID= :P_MEETING_ID
                                    AND DELETED =0;
                                    
                                    IF V_APPROVE_COUNT =V_MEMBER_COUNT
                                    THEN 
                                    UPDATE MEETINGS
                                    SET STATUS =4
                                    WHERE MEETING_ID= :P_MEETING_ID;
                                    END IF;
                                    COMMIT;
                                    
                                    EXCEPTION
                                      WHEN NO_DATA_FOUND THEN
                                        NULL;
                                      WHEN OTHERS THEN
                                        -- Consider logging the error and then re-raise
                                        RAISE;
                                 END CLOSE_MEETING;`,
                                    bindings: [],
                                qstring: "",
                                requireCommit: true
                                },


                                //////////////////
                                /////////////// project status
                                getstatus:
                                {
                                    statement :` select 0 from dual`,
                                    bindings: [],
                                qstring: "",
                                requireCommit: false
                                },
                                jobOrderINProgress :{
                                    statement : `SELECT
                                    REQUEST_ID, APPLICATION_ID, APPLICATION_NAME,
                                     REQ_TYPE_ID, REQUEST_STATUS, REQ_TYPE_NAME,REQ_TYPE_DEFINITION_TYPE,
                                     EMPLOYEE_ID, EMP_NAME,EMP_NAME_AR, INCOME_ACTION,
                                     TRANACTION_ID, TRANS_CLASSIFICATION, TRANACTION_TYPE,
                                     COMMENTS,ANSWER_ON_QUES, CREATED_DATE, OUTCOME_ACTION_DATE,
                                     TRANACTION_STATUS, ASK_REPLY_STEP, PARENT_TRANACTION_ID,
                                     FROM_DESTINATION_ID, FROM_DEST,FROM_DEST_AR, TO_DESTINATION_ID,
                                     TO_DEST,TO_DEST_AR, STEP_ID, OPENED,REQ_CLASSIFICATION,
                                     CLIENT_ID, PROJECT_ID, PROJECT_MANAGER_ID,
                                     PRIORITY, WORK_ORDER_CODE, WO_STATUS_ID,
                                     DESCRIPTION, CLIENT_NAME, PROJECT_NAME,
                                     EMPLOYEE_EMAIL, STEP_DESCRIPTION_EN, STEP_DESCRIPTION_AR,
                                     STEP_CLASSIFICATION,
                                     (select count(*) from DAILY_WORKING_HOURS DW where DW.WORK_ORDER_ID=REQUEST_ID and nvl(DW.DELETED,0)=0 )DAILY_WORKING_COUNT,
                                     (select case when REQ_TYPE_ID=71 then (select WO.WORK_ORDER_CODE from PROJECTS p ,WORK_ORDERS wo ,OBJECTION_REQUESTS ob
                                    where OB.WORK_ORDER_ID=WO.WORK_ORDER_ID and P.PROJECT_ID=WO.PROJECT_ID and OB.OBJECTION_REQUEST_ID=REQUEST_ID) else null end from dual) work_order_code_obj,
                                    (select case when REQ_TYPE_ID=71 then (select WO.DESCRIPTION from PROJECTS p ,WORK_ORDERS wo ,OBJECTION_REQUESTS ob
                                    where OB.WORK_ORDER_ID=WO.WORK_ORDER_ID and P.PROJECT_ID=WO.PROJECT_ID and OB.OBJECTION_REQUEST_ID=REQUEST_ID) else null end from dual) work_order_desc_obj,
                                     (select case when REQ_TYPE_ID=71 then (select P.PRIMARY_NAME  from  PROJECTS p ,WORK_ORDERS wo ,OBJECTION_REQUESTS ob
                                    where OB.WORK_ORDER_ID=WO.WORK_ORDER_ID and P.PROJECT_ID=WO.PROJECT_ID and OB.OBJECTION_REQUEST_ID=REQUEST_ID) else null end from dual) project_name_obj_ar,
                                    (select case when REQ_TYPE_ID=71 then (select P.SECONDARY_NAME from PROJECTS p ,WORK_ORDERS wo ,OBJECTION_REQUESTS ob
                                    where OB.WORK_ORDER_ID=WO.WORK_ORDER_ID and P.PROJECT_ID=WO.PROJECT_ID and OB.OBJECTION_REQUEST_ID=REQUEST_ID) else null end from dual) project_name_obj_en,
                                    (select case when REQ_TYPE_ID=71 then (select C.EN_NAME from projects p, clients c ,WORK_ORDERS wo ,OBJECTION_REQUESTS ob
                                    where OB.WORK_ORDER_ID=WO.WORK_ORDER_ID and P.PROJECT_ID=WO.PROJECT_ID and OB.OBJECTION_REQUEST_ID=REQUEST_ID
                                    and C.CLIENT_ID = P.CLIENT_ID) else null end from dual) client_name_en_obj,
                                    (select case when REQ_TYPE_ID=71 then (select C.AR_NAME  from projects p, clients c ,WORK_ORDERS wo ,OBJECTION_REQUESTS ob
                                    where OB.WORK_ORDER_ID=WO.WORK_ORDER_ID and P.PROJECT_ID=WO.PROJECT_ID and OB.OBJECTION_REQUEST_ID=REQUEST_ID
                                    and C.CLIENT_ID = P.CLIENT_ID) else null end from dual) client_name_ar_obj
                                    FROM INBOX_VIEW
                                    where TO_DESTINATION_ID = (SELECT DESTINATION_ID FROM TRANSACTION_DESTINATIONS
                                                             WHERE EMPLOYEE_ID = :EMPLOYEE_ID and  nvl(DELETED,0)=0 ) and REQUEST_ID is not null and application_id=1
                                                             and (REQ_CLASSIFICATION=16)
                                                             and    STEP_CLASSIFICATION=261
                                    order by REQUEST_ID DESC`,
                                    bindings: [],
                                qstring: "",
                                requireCommit: true
                             },


                             avaliableResourcesInCloseJobOrder :{
                                 statement :`SELECT rownum,ESV.EMPLOYEE_ID, 
                                 GETEMPNAME_LANG (ESV.EMPLOYEE_ID, 1, 2) emp_name_en,
                                 GETEMPNAME_LANG (ESV.EMPLOYEE_ID, 1, 1) emp_name_ar,
                                 ESV.DAY_CODE
                                                            FROM att.EMPLOYEE_SHIFT_VIEW esv
                           WHERE   esv.POSITION_ID = :POSITION_ID
                           and TRIM (
                                        UPPER ( (SELECT TO_CHAR(trunc(to_date(:p_job_order_date,'DD-MON-RRRR')),'day','NLS_DATE_LANGUAGE = AMERICAN') FROM DUAL))) =
                                        TRIM (UPPER (ESV.DAY_NAME))
                                        
                                 AND trunc(TO_DATE ( :p_job_order_date,'DD-MON-RRRR')) BETWEEN TO_DATE(ESV.START_DATE,'DD-MON-RRRR')
                                                                    AND to_date(TO_CHAR(ESV.END_DATE,'DD-MON-RRRR')) 
                                                                      
                                 AND SUBSTR (TRIM (ESV.STARTING_TIME), 1, 2) <=
                                        SUBSTR (
                                           TRIM (
                                              (SELECT SDV.STARTING_TIME
                                                 FROM SHIFTS_DATA_VIEW sdv
                                                WHERE     SDV.TEMPLATE_ID = :TEMPLATE_ID
                                                AND SDV.DAY_TYPE <> 2
                                                      AND TRIM (UPPER (SDV.DAY_NAME)) =
                                                             TRIM (
                                                                UPPER (
                                                                   (SELECT TO_CHAR(trunc(to_date(:p_job_order_date,'DD-MON-RRRR')),'day','NLS_DATE_LANGUAGE = AMERICAN') FROM DUAL))))),
                                           1,
                                           2)
                                           
                                 AND SUBSTR (TRIM (ESV.STARTING_TIME), 4) <=
                                        SUBSTR (
                                           TRIM (
                                              (SELECT SDV.STARTING_TIME
                                                 FROM SHIFTS_DATA_VIEW sdv
                                                WHERE     SDV.TEMPLATE_ID = :TEMPLATE_ID
                                                AND SDV.DAY_TYPE <> 2
                                                      AND TRIM (UPPER (SDV.DAY_NAME)) =
                                                             TRIM (
                                                                UPPER (
                                                                   (SELECT TO_CHAR(trunc(to_date(:p_job_order_date,'DD-MON-RRRR')),'day','NLS_DATE_LANGUAGE = AMERICAN') FROM DUAL))))),
                                           4)
                                           
                                 AND SUBSTR (TRIM (ESV.ENDING_TIME), 1, 2) >=
                                        SUBSTR (
                                           TRIM (
                                              (SELECT SDV.ENDING_TIME
                                                 FROM SHIFTS_DATA_VIEW sdv
                                                WHERE     SDV.TEMPLATE_ID = :TEMPLATE_ID
                                                AND SDV.DAY_TYPE <> 2
                                                      AND TRIM (UPPER (SDV.DAY_NAME)) =
                                                             TRIM (
                                                                UPPER (
                                                                   (SELECT TO_CHAR(trunc(to_date(:p_job_order_date,'DD-MON-RRRR')),'day','NLS_DATE_LANGUAGE = AMERICAN') FROM DUAL))))),
                                           1,
                                           2)
                                           
                                 AND SUBSTR (TRIM (ESV.ENDING_TIME), 4) >=
                                        SUBSTR (
                                           TRIM (
                                              (SELECT SDV.ENDING_TIME
                                                 FROM SHIFTS_DATA_VIEW sdv
                                                WHERE     SDV.TEMPLATE_ID = :TEMPLATE_ID
                                                AND SDV.DAY_TYPE <> 2
                                                      AND TRIM (UPPER (SDV.DAY_NAME)) =
                                                             TRIM (
                                                                UPPER (
                                                                   (SELECT TO_CHAR(trunc(to_date(:p_job_order_date,'DD-MON-RRRR')),'day','NLS_DATE_LANGUAGE = AMERICAN') FROM DUAL))))),
                                           4)
                                           
                                           
`,
                                 bindings: [],
                                 qstring: "",
                                 requireCommit: true
                             },


                             anotherAvaliableResourcesInCloseJobOrder :{
                                statement :`SELECT rownum,ESV.EMPLOYEE_ID, 
                                GETEMPNAME_LANG (ESV.EMPLOYEE_ID, 1, 2) emp_name_en,
                                GETEMPNAME_LANG (ESV.EMPLOYEE_ID, 1, 1) emp_name_ar,
                                ESV.DAY_CODE
                                                           FROM att.EMPLOYEE_SHIFT_VIEW esv
                          WHERE   esv.POSITION_ID = :POSITION_ID
                          and TRIM (
                                       UPPER ( (SELECT TO_CHAR(trunc(to_date(:p_job_order_date,'DD-MON-RRRR')),'day','NLS_DATE_LANGUAGE = AMERICAN') FROM DUAL))) =
                                       TRIM (UPPER (ESV.DAY_NAME))
                                       
                                AND trunc(TO_DATE ( :p_job_order_date,'DD-MON-RRRR')) BETWEEN TO_DATE(ESV.START_DATE,'DD-MON-RRRR')
                                                                   AND to_date(TO_CHAR(ESV.END_DATE,'DD-MON-RRRR')) 
                                                                     
                                AND SUBSTR (TRIM (ESV.STARTING_TIME), 1, 2) <=
                                       SUBSTR (
                                          TRIM (
                                             (SELECT SDV.STARTING_TIME
                                                FROM SHIFTS_DATA_VIEW sdv
                                               WHERE     SDV.TEMPLATE_ID is null
                                               AND SDV.DAY_TYPE <> 2
                                                     AND TRIM (UPPER (SDV.DAY_NAME)) =
                                                            TRIM (
                                                               UPPER (
                                                                  (SELECT TO_CHAR(trunc(to_date(:p_job_order_date,'DD-MON-RRRR')),'day','NLS_DATE_LANGUAGE = AMERICAN') FROM DUAL))))),
                                          1,
                                          2)
                                          
                                AND SUBSTR (TRIM (ESV.STARTING_TIME), 4) <=
                                       SUBSTR (
                                          TRIM (
                                             (SELECT SDV.STARTING_TIME
                                                FROM SHIFTS_DATA_VIEW sdv
                                               WHERE     SDV.TEMPLATE_ID is null
                                               AND SDV.DAY_TYPE <> 2
                                                     AND TRIM (UPPER (SDV.DAY_NAME)) =
                                                            TRIM (
                                                               UPPER (
                                                                  (SELECT TO_CHAR(trunc(to_date(:p_job_order_date,'DD-MON-RRRR')),'day','NLS_DATE_LANGUAGE = AMERICAN') FROM DUAL))))),
                                          4)
                                          
                                AND SUBSTR (TRIM (ESV.ENDING_TIME), 1, 2) >=
                                       SUBSTR (
                                          TRIM (
                                             (SELECT SDV.ENDING_TIME
                                                FROM SHIFTS_DATA_VIEW sdv
                                               WHERE     SDV.TEMPLATE_ID is null
                                               AND SDV.DAY_TYPE <> 2
                                                     AND TRIM (UPPER (SDV.DAY_NAME)) =
                                                            TRIM (
                                                               UPPER (
                                                                  (SELECT TO_CHAR(trunc(to_date(:p_job_order_date,'DD-MON-RRRR')),'day','NLS_DATE_LANGUAGE = AMERICAN') FROM DUAL))))),
                                          1,
                                          2)
                                          
                                AND SUBSTR (TRIM (ESV.ENDING_TIME), 4) >=
                                       SUBSTR (
                                          TRIM (
                                             (SELECT SDV.ENDING_TIME
                                                FROM SHIFTS_DATA_VIEW sdv
                                               WHERE     SDV.TEMPLATE_ID is null
                                               AND SDV.DAY_TYPE <> 2
                                                     AND TRIM (UPPER (SDV.DAY_NAME)) =
                                                            TRIM (
                                                               UPPER (
                                                                  (SELECT TO_CHAR(trunc(to_date(:p_job_order_date,'DD-MON-RRRR')),'day','NLS_DATE_LANGUAGE = AMERICAN') FROM DUAL))))),
                                          4)
`,
                                bindings: [],
                                qstring: "",
                                requireCommit: true
                            },



                             insertMilestoneDeliverable :{
                                statement: `
                                insert into MILESTONE_DELEVRABLES (DELEVRABLE_ID,
                                    DESCRIPTION,
                                    STATUS,
                                    FILE_PATH,
                                    FILE_ID,
                                    MILESTONE_ID
                                    )
                                VALUES
                                    (
                                        MILESTONE_DELEVRABLES_SEQ.NEXTVAL,
                                        :DESCRIPTION,
                                        :STATUS,
                                        :FILE_PATH,
                                        :FILE_ID,
                                        :MILESTONE_ID                                   
                                         )

                               `,
                               returns: [],
                               bindings: [],
                               qstring: "",
                               requireCommit: true
                            },

                            insertRisk : {
                                statement: `
                                      INSERT INTO RISKS (RISK_ID,
                                        RISK_DESCRIPTION,
                                        RISK_WEIGHT,
                                        RISK_TYPE,
                                        RISK_CLASSIFICATION
                                          )
                                      VALUES (
                                        RISKS_SEQ.NEXTVAL,
                                          :RISK_DESCRIPTION,
                                          :RISK_WEIGHT,
                                          :RISK_TYPE,
                                          :RISK_CLASSIFICATION
                                      )`,
                                      bindings: [],
                                      qstring: "",
                                      requireCommit: true
                          
                              },

                              getRiskId :{
                                  statement :`select max(risk_id) max from RISKS`,
                                  bindings: [],
                                      qstring: "",
                                      requireCommit: true
                              },

                              insertMilestoneRisk : {
                                statement: `
                                      INSERT INTO MILESTONE_RISKS (MILE_RISK_ID,
                                        MILESTONE_ID,
                                        RISK_ID
                                          )
                                      VALUES (
                                        MILESTONE_RISKS_SEQ.NEXTVAL,
                                          :MILESTONE_ID,
                                          :RISK_ID
                                           )`,
                                      bindings: [],
                                      qstring: "",
                                      requireCommit: true
                          
                              },


                              updateIncidentStatus :{
                                statement :`UPDATE INCIDENT_REPORT_REQUESTS
                                SET  STATUS  =  2
                                WHERE  INC_REP_REQUEST_ID = :INC_REP_REQUEST_ID `,
                                             bindings: [],
                                      qstring: "",
                                      requireCommit: true
                              },

        ////////////////////////
        ///////////////**********************************
                             ////////// Project BOQ and Parents  *//////////////


                              getOneProjectBoqByProjectID:{
                                statement:`
                                SELECT BOQ_ID,
                                       PROJECT_ID,
                                       BOQ_DESCRIPTION,
                                       BOQ_TYPE,
                                       (select primary_name  from lookup_details L where L.lookup_detail_id = P.BOQ_TYPE ) type_f_name,
                                       (select secondary_name from lookup_details L where L.lookup_detail_id = P.BOQ_TYPE ) type_s_name,
                                       BOQ_AMOUNT,
                                       BOQ_QUANTITY,
                                       UNITE_OF_MEASURE,
                                       (select MEASURE_name_ar from boq_measurements B where B.measure_id = P.UNITE_OF_MEASURE) MEASURE_name_ar,
                                       (select MEASURE_name_en from boq_measurements B where B.measure_id = P.UNITE_OF_MEASURE) MEASURE_name_en,
                                       BOQ_TOTAL_AMOUNT,
                                       LOCATION_ID,
                                       (select label_ar from pin_trees T where T.pin_id = P.LOCATION_ID) location_name,
                                       STATUS,
                                       INVOICEING_METHOD,
                                       BOQ_CLASSIFICATION,
                                       CREATED_BY,
                                       CREATED_DATE,
                                       UPDATED_BY,
                                       UPDATED_DATE,
                                       BOQ_DEPENDENT,
                                       BOQ_PARENT,
                                       START_DATE,
                                       DURATION,
                                       BOQ_CLIENT,
                                       BOQ_OWNER,
                                       PROMISED_DATE,
                                       MEASURE_IN_HOURS,
                                       WORKING_HOURS_PER_DAY,
                                       DELETED,
                                       LAST_UNIT_OF_M,
                                       DELETED_BY,
                                       DELETED_DATE,
                                       SUBSIDIARY_ID,
                                       SPACE_OF_WORK,
                                       REVIEWED,
                                       LOCATION_ID,
                                       ASSET_ID,
                                       AUTO_MILESTONE,
                                       MAIN_LOCATION,
                                       STUDY_DETAIL_ID,
                                       IS_MAIN_BENEFIT
                                  FROM PROJECT_BOQ P
                           WHERE PROJECT_ID = :PROJECT_ID AND DELETED = 0
                           and BOQ_PARENT is null `,

                                returns: [],
                                bindings: [],
                                qstring: "",
                                requireCommit: false
                            },

                            getParent:{
                                statement:`
                                SELECT   BOQ_ID,
                                PROJECT_ID,
                                BOQ_DESCRIPTION,
                                BOQ_TYPE,
                                (select primary_name  from lookup_details L where L.lookup_detail_id = P.BOQ_TYPE ) type_f_name,
                                (select secondary_name from lookup_details L where L.lookup_detail_id = P.BOQ_TYPE ) type_s_name,
                                BOQ_AMOUNT,
                                BOQ_QUANTITY,
                                UNITE_OF_MEASURE,
                                (select MEASURE_name_ar from boq_measurements B where B.measure_id = P.UNITE_OF_MEASURE) MEASURE_name_ar,
                                (select MEASURE_name_en from boq_measurements B where B.measure_id = P.UNITE_OF_MEASURE) MEASURE_name_en,
                                BOQ_TOTAL_AMOUNT,
                                LOCATION_ID,
                                (select label_ar from pin_trees T where T.pin_id = P.LOCATION_ID) location_name,
                                STATUS,
                                INVOICEING_METHOD,
                                BOQ_CLASSIFICATION,
                                CREATED_BY,
                                CREATED_DATE,
                                UPDATED_BY,
                                UPDATED_DATE,
                                BOQ_DEPENDENT,
                                BOQ_PARENT,
                                START_DATE,
                                DURATION,
                                BOQ_CLIENT,
                                BOQ_OWNER,
                                PROMISED_DATE,
                                MEASURE_IN_HOURS,
                                WORKING_HOURS_PER_DAY,
                                DELETED,
                                LAST_UNIT_OF_M,
                                DELETED_BY,
                                DELETED_DATE,
                                SUBSIDIARY_ID,
                                SPACE_OF_WORK,
                                REVIEWED,
                                LOCATION_ID,
                                ASSET_ID,
                                AUTO_MILESTONE,
                                MAIN_LOCATION,
                                STUDY_DETAIL_ID,
                                IS_MAIN_BENEFIT
                                  FROM PROJECT_BOQ P
                           WHERE PROJECT_ID = :PROJECT_ID
                           and BOQ_PARENT is not null AND DELETED = 0`,
                                returns: [],
                                bindings: [],
                                qstring: "",
                                requireCommit: false
                            },

                            getParents:{
                                statement:`
                                SELECT  distinct (BOQ_PARENT)
                                  FROM PROJECT_BOQ P
                           WHERE PROJECT_ID = :PROJECT_ID
                           and BOQ_PARENT is not null AND DELETED = 0`,
                                returns: [],
                                bindings: [],
                                qstring: "",
                                requireCommit: false
                            },

         boqChild:{
    statement:`
    SELECT BOQ_ID,
           PROJECT_ID,
           BOQ_DESCRIPTION,
           BOQ_TYPE,
           (select primary_name  from lookup_details L where L.lookup_detail_id = P.BOQ_TYPE ) type_f_name,
           (select secondary_name from lookup_details L where L.lookup_detail_id = P.BOQ_TYPE ) type_s_name,
           BOQ_AMOUNT,
           BOQ_QUANTITY,
           UNITE_OF_MEASURE,
           (select MEASURE_name_ar from boq_measurements B where B.measure_id = P.UNITE_OF_MEASURE) MEASURE_name_ar,
           (select MEASURE_name_en from boq_measurements B where B.measure_id = P.UNITE_OF_MEASURE) MEASURE_name_en,
           BOQ_TOTAL_AMOUNT,
           LOCATION_ID,
           (select label_ar from pin_trees T where T.pin_id = P.LOCATION_ID) location_name,
           STATUS,
           INVOICEING_METHOD,
           BOQ_CLASSIFICATION,
           CREATED_BY,
           CREATED_DATE,
           UPDATED_BY,
           UPDATED_DATE,
           BOQ_DEPENDENT,
           BOQ_PARENT,
           START_DATE,
           DURATION,
           BOQ_CLIENT,
           BOQ_OWNER,
           PROMISED_DATE,
           MEASURE_IN_HOURS,
           WORKING_HOURS_PER_DAY,
           DELETED,
           LAST_UNIT_OF_M,
           DELETED_BY,
           DELETED_DATE,
           SUBSIDIARY_ID,
           SPACE_OF_WORK,
           REVIEWED,
           LOCATION_ID,
           ASSET_ID,
           AUTO_MILESTONE,
           MAIN_LOCATION,
           STUDY_DETAIL_ID,
           IS_MAIN_BENEFIT
      FROM PROJECT_BOQ P
WHERE BOQ_PARENT = :BOQ_PARENT `,
bindings: [],
qstring: "",
requireCommit: true
},

  submittles : {
      statement :`select lookup_detail_id, primary_name, secondary_name from lookup_details where lookup_id = 126`,
      bindings: [],
    qstring: "",
    requireCommit: false
  },

  getEmpNameENAR :{
      statement : `SELECT GETEMPNAME_LANG (E.EMPLOYEE_ID, 1, 2) as emp_name_en,
      GETEMPNAME_LANG (E.EMPLOYEE_ID, 1, 1) as emp_name_ar
      FROM AOT_GEN.EMPLOYEES e
      WHERE NVL (E.DELETED, 0) = 0 AND E.EMPLOYEE_ID = :EMPLOYEE_ID`,
      bindings: [],
    qstring: "",
    requireCommit: false
  },


  insertWishList: {
    statement: `
    INSERT INTO PHASE_TASKS (PHASE_TASK_ID,
        START_DATE,
        END_DATE,
        MEASURE_VALUE
        )
    VALUES (
        :PHASE_TASK_ID,
        :START_DATE,
        :END_DATE,
        :VALUE
    )
    `,
    bindings: [],
    qstring: "",
    requireCommit: true
    },

    getPhaseTaskSeq :{
        statement :`select PHASE_TASKS_SEQ.NEXTVAL from dual`,
        bindings: [],
        qstring: "",
        requireCommit: true
    },

    insertAttach :{
        statement: `
        insert into attachments(
            ATTACH_ID,
            creation_date,
            attach_title,
            FILE_NAME
            )
            values
            (
                :ATTACH_ID,
                sysdate,
                :attach_title,
                :FILE_NAME
            )   
       `,
       returns: [],
       bindings: [],
       qstring: "",
       requireCommit: true
    },

                            
       
}
module.exports = statements ;  