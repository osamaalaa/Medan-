
let statements = {
    getAllOLDHRDelayRoleM: {
            statement :`
            SELECT ID_PK,
                   CODE_SN,
                   NAME_EN,
                   NAME_AR,
                   STATUS,
                   CREATED_BY,
                   UPDATED_BY,
                   CREATED_DATE,
                   UPDATED_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE
              FROM OLDHR_DELAY_ROLE_M `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneOLDHRDelayRoleMByID:{
        statement:`
        SELECT ID_PK,
               CODE_SN,
               NAME_EN,
               NAME_AR,
               STATUS,
               CREATED_BY,
               UPDATED_BY,
               CREATED_DATE,
               UPDATED_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE
          FROM OLDHR_DELAY_ROLE_M
   WHERE ID_PK = :ID_PK `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  