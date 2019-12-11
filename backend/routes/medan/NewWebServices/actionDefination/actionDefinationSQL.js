
let statements = {
    getACtionDefination: {
    statement :`SELECT 
    A.ACTION_ID, A.ACTION_TITLE_EN, A.ACTION_TITLE_AR, 
       A.CREATED_BY, A.CREATION_DATE, A.ACTION_STATUS, 
       A.DELETED, A.DELETED_BY, A.DELETED_DATE, 
       A.SUBSIDIARY_ID, A.ACTION_CODE, A.PROJECT_ID, 
       A.BOQ_ID, A.MAINTENANCE_TYPE_ID, A.SERVICES_TYPE_ID, 
       A.SUPERVISOR1_ID, A.SUPERVISOR2_ID, A.NOTES, 
       A.SERVICE_ID, A.ACT_RECURING, A.DAY_OF_WEEK
    FROM HR.ACTIONS_DEFINITION A`,
             bindings: [],
             qstring: "",
             requireCommit: false
     },
     
     getACtionDefinationByActionId: {
        statement :`SELECT 
        A.ACTION_ID, A.ACTION_TITLE_EN, A.ACTION_TITLE_AR, 
           A.CREATED_BY, A.CREATION_DATE, A.ACTION_STATUS, 
           A.DELETED, A.DELETED_BY, A.DELETED_DATE, 
           A.SUBSIDIARY_ID, A.ACTION_CODE, A.PROJECT_ID, 
           A.BOQ_ID, A.MAINTENANCE_TYPE_ID, A.SERVICES_TYPE_ID, 
           A.SUPERVISOR1_ID, A.SUPERVISOR2_ID, A.NOTES, 
           A.SERVICE_ID, A.ACT_RECURING, A.DAY_OF_WEEK
        FROM HR.ACTIONS_DEFINITION A
        where ACTION_ID = :ACTION_ID`,
                 bindings: [],
                 qstring: "",
                 requireCommit: false
         } 
 }
   module.exports = statements ;
 
   
   