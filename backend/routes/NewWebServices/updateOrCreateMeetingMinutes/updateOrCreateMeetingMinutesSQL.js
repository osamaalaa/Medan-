
let statements = {
    updateOrCreateMeetingMinutes : {
            statement :`SELECT MOM_ID from MEETING_MINUTES WHERE MOM_ID = :MOM_ID `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
    
    updateMeetingMinutes: {
        statement: `
        UPDATE HR.MEETING_MINUTES
SET    MOM_ID             = :MOM_ID,
       MEETING_ID         = :MEETING_ID,
       DESCRIPTION        = :DESCRIPTION,
       RESPONSABLE_MEMBER = :RESPONSABLE_MEMBER,
       STATUS             = :STATUS,
       TYPE               = :TYPE,
       MOM_DATE           = sysdate,
       DELETED            = :DELETED,
       DELETED_BY         = :DELETED_BY,
       DELETED_DATE       = sysdate,
WHERE  MOM_ID             = :MOM_ID
        `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: true
    },

    insertMeetingMinutes: {
        statement: `
        INSERT INTO HR.MEETING_MINUTES (MOM_ID,
            MEETING_ID,
            DESCRIPTION,
            RESPONSABLE_MEMBER,
            STATUS,
            TYPE,
            MOM_DATE,
            DELETED,
            DELETED_BY,
            DELETED_DATE)
VALUES (:MOM_ID,
    :MEETING_ID,
    :DESCRIPTION,
    :RESPONSABLE_MEMBER,
    :STATUS,
    :TYPE,
    :MOM_DATE,
    :DELETED,
    :DELETED_BY,
    :DELETED_DATE)
    RETURN  MOM_ID , MEETING_ID INTO :R_MOM_ID , :R_MEETING_ID
        `,
        returns: ["R_MOM_ID", "R_MEETING_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
    }
}
  module.exports = statements ;
  