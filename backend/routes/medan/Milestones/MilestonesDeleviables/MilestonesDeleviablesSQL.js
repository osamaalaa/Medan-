
let statements = {
    getAllMilestonesDeleviables: {
            statement :`
            SELECT DELEVRABLE_ID,
                   DESCRIPTION,
                   STATUS,
                   MILESTONE_ID,
                   CONTENT_TYPE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID,
                   FILE_ID,
                   FILE_PATH,
                   ATTACHMENT_ID
              FROM MILESTONE_DELEVRABLES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneMilestonesDeleviablesByID:{
        statement:`
        SELECT DELEVRABLE_ID,
               DESCRIPTION,
               STATUS,
               MILESTONE_ID,
               CONTENT_TYPE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID,
               FILE_ID,
               FILE_PATH,
               ATTACHMENT_ID
          FROM MILESTONE_DELEVRABLES
   WHERE  DELEVRABLE_ID = :DELEVRABLE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getMilestonesDeleviablesByMilestoneID:{
      statement:`
      SELECT m.DELEVRABLE_ID,
             m.DESCRIPTION,
             m.STATUS,
             (select secondary_name from lookup_details where lookup_detail_id in (select m.STATUS from MILESTONE_DELEVRABLES where m.MILESTONE_ID = :MILESTONE_ID)) STATUS_name,
             m.MILESTONE_ID,
             m.CONTENT_TYPE,
             m.DELETED,
             m.DELETED_BY,
             m.DELETED_DATE,
             m.SUBSIDIARY_ID,
             m.FILE_ID,
             m.FILE_PATH,
             m.ATTACHMENT_ID
        FROM MILESTONE_DELEVRABLES m
 WHERE  m.MILESTONE_ID = :MILESTONE_ID `,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
  },

  getDeliverablesStatus :{
    statement :`select lookup_detail_id , lookup_id, primary_name, secondary_name from lookup_details where lookup_id = 9`,
    bindings: [],
      qstring: "",
      requireCommit: false
  },

  deleteMilestoneDeliverable :{
    statement : `update MILESTONE_DELEVRABLES
                 set deleted = 1
                 where DELEVRABLE_ID = :DELEVRABLE_ID`,
                 bindings: [],
             qstring: "",
             requireCommit: true
  }

  }
  
  module.exports = statements ;
  