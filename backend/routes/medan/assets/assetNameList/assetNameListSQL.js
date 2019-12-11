
let statements = {
    getAssetsName: {
            statement :`
            SELECT
              ASSET_ID,
              ASSET_NAME,
             DESCRIPTION
        FROM ASSETS_DEFINITION
       WHERE     NVL (DELETED, 0) = 0 `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }
}
  module.exports = statements ;
  