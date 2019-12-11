
let statements = {
    getAllMeetingMinutes: {
            statement :`
            SELECT MOM_ID,
                   MEETING_ID,
                   DESCRIPTION,
                   ACTION_TYPE,
                   RESPONSABLE_MEMBER,
                   STATUS,
                   TYPE,
                   MOM_DATE,
                   CREATION_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID,
                   ACTION_COMMENTS,
                   CLOSURE_DATE,
                   VOTING,
                   VOTING_STATUS
              FROM MEETING_MINUTES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneMeetingMinutesID:{
        statement:`
        SELECT *
          FROM MEETING_MINUTES
   WHERE  MEETING_ID = :MEETING_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },


    insertAttachment: {
     statement: `
INSERT INTO attachments (attach_id,
                             attachment)
  VALUES (ATTACHMENT_SEQ.NEXTVAL,
          :attachment)
     RETURN attach_id INTO  :R_attach_id`,
     returns: ["R_attach_id"],
     bindings: [],
     qstring: "",
     requireCommit: true
 },

 deleteMeetingMinutes: {
     statement: `UPDATE MEETING_MINUTES
     SET     DELETED = 1
     WHERE  MOM_ID = :MOM_ID`,
     bindings: [],
     qstring: "",
     requireCommit: true
 }
  }
  
  module.exports = statements ;
  