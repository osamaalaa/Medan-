
let statements = {
    getAllProjectTracks: {
            statement :`
            SELECT PROJCT_TRACK_ID,
                   TRACK_ID,
                   PROJECT_ID,
                   PROJECT_TRACK_STATUS,
                   CREATED_BY,
                   CREATED_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM PROJECT_TRACKS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneProjectTracksByID:{
        statement:`
        SELECT PROJCT_TRACK_ID,
               TRACK_ID,
               PROJECT_ID,
               PROJECT_TRACK_STATUS,
               CREATED_BY,
               CREATED_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM PROJECT_TRACKS
   WHERE PROJCT_TRACK_ID = :PROJCT_TRACK_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  