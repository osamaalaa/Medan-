let statements = {
  getAllassetGroupViolations: {
          statement :`SELECT
          ID,
       CODE,
       TITLE_EN,
       TITLE_AR,
       NOTES,
       VIOLATION_GROUP_ID,
       ASSET_ID,
       CREATED_BY,
       CREATION_DATE,
       DELETED,
       DELETED_BY,
      DELETED_DATE
  FROM
  ASSET_GROUP_VIOLATIONS
          `,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
  },

  getOneassetGroupViolationsByID:{
      statement:`SELECT
      ag.ID,
       ag.CODE,
       ag.TITLE_EN,
       ag.TITLE_AR,
       ag.NOTES,
       ag.VIOLATION_GROUP_ID,
       ag.ASSET_ID,
       ag.CREATED_BY,
       ag.CREATION_DATE,
       ag.DELETED,
       ag.DELETED_BY,
      ag.DELETED_DATE,
      g.TITLE_EN,
      g.TITLE_AR,
      g.CODE Group_code
  FROM
  ASSET_GROUP_VIOLATIONS ag, VIOLATION_GROUP g
  WHERE ag.ASSET_ID = :ASSET_ID
  and G.VIOLATION_GROUP_ID  =AG.VIOLATION_GROUP_ID`,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
  }

}


module.exports = statements ;
