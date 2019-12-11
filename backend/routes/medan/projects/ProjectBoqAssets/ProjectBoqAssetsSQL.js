
let statements = {
    getAllProjectBoqAssets: {
            statement :`
            SELECT BOQ_ASSET_ID,
                   BOQ_ID,
                   PROJECT_ID,
                   ASSET_ID,
                   NOTE,
                   CREATED_BY,
                   CREATED_DATE,
                   UPDATED_BY,
                   UPDATED_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   MILESTONE_ID
              FROM PROJECT_BOQ_ASSETS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneProjectBoqAssetsByID:{
        statement:`
        SELECT BOQ_ASSET_ID,
               BOQ_ID,
               PROJECT_ID,
               ASSET_ID,
               NOTE,
               CREATED_BY,
               CREATED_DATE,
               UPDATED_BY,
               UPDATED_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               MILESTONE_ID
          FROM PROJECT_BOQ_ASSETS
   WHERE BOQ_ASSET_ID = :BOQ_ASSET_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    insertProjectBoqAseets: {
     statement: `
     INSERT INTO PROJECT_BOQ_ASSETS (BOQ_ASSET_ID,
          BOQ_ID,
          PROJECT_ID,
          ASSET_ID,
          NOTE,
          CREATED_BY,
          CREATED_DATE,
          MILESTONE_ID)
  VALUES (PROJECT_BOQ_ASSETS_SEQ.NEXTVAL,
     :BOQ_ID,
     :PROJECT_ID,
     :ASSET_ID,
     :NOTE,
     :CREATED_BY,
     sysdate,
     :MILESTONE_ID)
     RETURN BOQ_ASSET_ID, PROJECT_ID, BOQ_ID INTO :R_BOQ_ASSET_ID, :R_PROJECT_ID, :R_BOQ_ID`,
     returns: ["R_BOQ_ASSET_ID","R_PROJECT_ID", "R_BOQ_ID"],
     bindings: [],
     qstring: "",
     requireCommit: true
 }
  }
  
  module.exports = statements ;
  