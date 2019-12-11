let statements ={
   getAllAssetGroups:{
     statement:`SELECT
    id,
    code,
    serial,
    name_en,
    name_ar,
    start_code,
    start_number,
    created_by,
    creation_date,
    deleted,
    deleted_by,
    deleted_date,
    creation_type,
    digits_before
FROM
    asset_groups
    `,
    bindings :[],
    qstring : "",
    requireCommit : false
  },

    getOneAssetGroupByID:{
      statement:`SELECT
    id,
    code,
    serial,
    name_en,
    name_ar,
    start_code,
    start_number,
    created_by,
    creation_date,
    deleted,
    deleted_by,
    deleted_date,
    creation_type,
    digits_before
FROM
    asset_groups
WHERE id = :ID
`,
bindings :[],
qstring : "",
requireCommit : false
    },

    insertAssetGroup : {
      statement :`INSERT INTO ASSET_GROUPS (
        ID,
        CODE,
        SERIAL,
        NAME_EN,
        NAME_AR,
        START_CODE,
        START_NUMBER,
        CREATED_BY,
        CREATION_DATE,
        DIGITS_BEFORE
      )VALUES (                              
        ASSET_GROUPS_SEQ.NEXTVAL,
        :CODE,
        :SERIAL,
        :NAME_EN,
        :NAME_AR,
        :START_CODE,
        :START_NUMBER,
        :CREATED_BY,
        sysdate,
        :DIGITS_BEFORE      
  )
   RETURN CODE into :R_CODE `,
      returns :["R_CODE"],
      bindings: [],
      qstring: "",
      requireCommit: true
   }

}

module.exports = statements ;
