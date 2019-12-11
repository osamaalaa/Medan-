
let statements = {
    getAllCountries: {
            statement :`
            SELECT COUNTRY_ID,
                   USER_CODE,
                   PRIMARY_NAME,
                   SECONDARY_NAME,
                   COUNTRY_FLAG,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM COUNTRIES `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneCountriesByID:{
        statement:`SELECT COUNTRY_ID,
        USER_CODE,
        PRIMARY_NAME,
        SECONDARY_NAME,
        COUNTRY_FLAG,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        SUBSIDIARY_ID
   FROM COUNTRIES
   WHERE  COUNTRY_ID = :COUNTRY_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
  }
  
  module.exports = statements ;
  