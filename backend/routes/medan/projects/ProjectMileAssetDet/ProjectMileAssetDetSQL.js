
let statements = {
    getAllProjectMileAssetDet: {
            statement :`
            SELECT MILE_ASSET_ACTION_ID,
                   MILESTONE_ASSET_ID,
                   ASSET_ACTION_ID,
                   JOB_ORDER_ACTION_TYPE,
                   SUPERVISOR_ID,
                   NOTE,
                   CREATED_BY,
                   CREATED_DATE,
                   UPDATED_BY,
                   UPDATED_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM PROJECT_MILE_ASSET_DET `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneProjectMileAssetDetByID:{
        statement:`
        SELECT MILE_ASSET_ACTION_ID,
               MILESTONE_ASSET_ID,
               ASSET_ACTION_ID,
               JOB_ORDER_ACTION_TYPE,
               SUPERVISOR_ID,
               NOTE,
               CREATED_BY,
               CREATED_DATE,
               UPDATED_BY,
               UPDATED_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM PROJECT_MILE_ASSET_DET
   WHERE MILE_ASSET_ACTION_ID = :MILE_ASSET_ACTION_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    insertProjectMileAssetDet: {
     statement: `
     INSERT INTO PROJECT_MILE_ASSET_DET (MILE_ASSET_ACTION_ID,
          MILESTONE_ASSET_ID,
          ASSET_ACTION_ID,
          JOB_ORDER_ACTION_TYPE,
          SUPERVISOR_ID,
          NOTE,
          CREATED_BY,
          CREATED_DATE,
          MS_ASSET_ID,
          WEIGHT)
  VALUES (:MILE_ASSET_ACTION_ID,
     :MILESTONE_ASSET_ID,
     :ASSET_ACTION_ID,
     :JOB_ORDER_ACTION_TYPE,
     :SUPERVISOR_ID,
     :NOTE,
     :CREATED_BY,
     sysdate,
     :MS_ASSET_ID,
     :WEIGHT)
     RETURN MILE_ASSET_ACTION_ID, MILESTONE_ASSET_ID INTO :R_MILE_ASSET_ACTION_ID, :R_MILESTONE_ASSET_ID`,
     returns: ["R_MILE_ASSET_ACTION_ID","R_MILESTONE_ASSET_ID"],
     bindings: [],
     qstring: "",
     requireCommit: true
 }
  }
  
  module.exports = statements ;
  