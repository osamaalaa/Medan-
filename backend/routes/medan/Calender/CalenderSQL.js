let statements = {
    getAllDates: {
            statement :`
SELECT ID,
       PROVIDER,
       START_DATE,
       END_DATE,
       DESCRIPTION
  FROM CALENDAR   
            `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }
}
  

  
  module.exports = statements ;
  