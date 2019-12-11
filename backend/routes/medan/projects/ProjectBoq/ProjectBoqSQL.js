
let statements = {
    getAllProjectBoq: {
            statement :`
            SELECT BOQ_ID,
                   PROJECT_ID,
                   BOQ_DESCRIPTION,
                   BOQ_AMOUNT,
                   BOQ_QUANTITY,
                   BOQ_TOTAL_AMOUNT,
                   STATUS,
                   UNITE_OF_MEASURE,
                   INVOICEING_METHOD,
                   BOQ_CLASSIFICATION,
                   CREATED_BY,
                   CREATED_DATE,
                   UPDATED_BY,
                   UPDATED_DATE,
                   BOQ_DEPENDENT,
                   BOQ_PARENT,
                   START_DATE,
                   DURATION,
                   BOQ_CLIENT,
                   BOQ_OWNER,
                   PROMISED_DATE,
                   MEASURE_IN_HOURS,
                   WORKING_HOURS_PER_DAY,
                   DELETED,
                   LAST_UNIT_OF_M,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID,
                   BOQ_TYPE,
                   SPACE_OF_WORK,
                   REVIEWED,
                   LOCATION_ID,
                   ASSET_ID,
                   AUTO_MILESTONE,
                   MAIN_LOCATION,
                   STUDY_DETAIL_ID,
                   IS_MAIN_BENEFIT
              FROM PROJECT_BOQ `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneProjectBoqByID:{
        statement:`
        SELECT BOQ_ID,
               PROJECT_ID,
               BOQ_DESCRIPTION,
               BOQ_AMOUNT,
               BOQ_QUANTITY,
               BOQ_TOTAL_AMOUNT,
               STATUS,
               UNITE_OF_MEASURE,
               INVOICEING_METHOD,
               BOQ_CLASSIFICATION,
               CREATED_BY,
               CREATED_DATE,
               UPDATED_BY,
               UPDATED_DATE,
               BOQ_DEPENDENT,
               BOQ_PARENT,
               START_DATE,
               DURATION,
               BOQ_CLIENT,
               BOQ_OWNER,
               PROMISED_DATE,
               MEASURE_IN_HOURS,
               WORKING_HOURS_PER_DAY,
               DELETED,
               LAST_UNIT_OF_M,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID,
               BOQ_TYPE,
               SPACE_OF_WORK,
               REVIEWED,
               LOCATION_ID,
               ASSET_ID,
               AUTO_MILESTONE,
               MAIN_LOCATION,
               STUDY_DETAIL_ID,
               IS_MAIN_BENEFIT
          FROM PROJECT_BOQ
   WHERE BOQ_ID = :BOQ_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },


    getOneProjectBoqByProjectID:{
     statement:`
     SELECT BOQ_ID,
            PROJECT_ID,
            BOQ_DESCRIPTION,
            BOQ_TYPE,
            (select primary_name  from lookup_details L where L.lookup_detail_id = P.BOQ_TYPE ) type_f_name,
            (select secondary_name from lookup_details L where L.lookup_detail_id = P.BOQ_TYPE ) type_s_name,
            BOQ_AMOUNT,
            BOQ_QUANTITY,
            UNITE_OF_MEASURE,
            (select MEASURE_name_ar from boq_measurements B where B.measure_id = P.UNITE_OF_MEASURE) MEASURE_name_ar,
            (select MEASURE_name_en from boq_measurements B where B.measure_id = P.UNITE_OF_MEASURE) MEASURE_name_en,
            BOQ_TOTAL_AMOUNT,
            LOCATION_ID,
            (select label_ar from pin_trees T where T.pin_id = P.LOCATION_ID) location_name,
            STATUS,
            INVOICEING_METHOD,
            BOQ_CLASSIFICATION,
            CREATED_BY,
            CREATED_DATE,
            UPDATED_BY,
            UPDATED_DATE,
            BOQ_DEPENDENT,
            BOQ_PARENT,
            START_DATE,
            DURATION,
            BOQ_CLIENT,
            BOQ_OWNER,
            PROMISED_DATE,
            MEASURE_IN_HOURS,
            WORKING_HOURS_PER_DAY,
            DELETED,
            LAST_UNIT_OF_M,
            DELETED_BY,
            DELETED_DATE,
            SUBSIDIARY_ID,
            SPACE_OF_WORK,
            REVIEWED,
            LOCATION_ID,
            ASSET_ID,
            AUTO_MILESTONE,
            MAIN_LOCATION,
            STUDY_DETAIL_ID,
            IS_MAIN_BENEFIT
       FROM PROJECT_BOQ P
WHERE PROJECT_ID = :PROJECT_ID
and BOQ_PARENT is null `,
     returns: [],
     bindings: [],
     qstring: "",
     requireCommit: false
 },


 getOneProjectBoqByProID:{
    statement:`
    SELECT BOQ_ID,
           PROJECT_ID,
           BOQ_DESCRIPTION,
           BOQ_TYPE,
           (select primary_name  from lookup_details L where L.lookup_detail_id = P.BOQ_TYPE ) type_f_name,
           (select secondary_name from lookup_details L where L.lookup_detail_id = P.BOQ_TYPE ) type_s_name,
           BOQ_AMOUNT,
           BOQ_QUANTITY,
           UNITE_OF_MEASURE,
           (select MEASURE_name_ar from boq_measurements B where B.measure_id = P.UNITE_OF_MEASURE) MEASURE_name_ar,
           (select MEASURE_name_en from boq_measurements B where B.measure_id = P.UNITE_OF_MEASURE) MEASURE_name_en,
           BOQ_TOTAL_AMOUNT,
           LOCATION_ID,
           (select label_ar from pin_trees T where T.pin_id = P.LOCATION_ID) location_name,
           STATUS,
           INVOICEING_METHOD,
           BOQ_CLASSIFICATION,
           CREATED_BY,
           CREATED_DATE,
           UPDATED_BY,
           UPDATED_DATE,
           BOQ_DEPENDENT,
           BOQ_PARENT,
           START_DATE,
           DURATION,
           BOQ_CLIENT,
           BOQ_OWNER,
           PROMISED_DATE,
           MEASURE_IN_HOURS,
           WORKING_HOURS_PER_DAY,
           DELETED,
           LAST_UNIT_OF_M,
           DELETED_BY,
           DELETED_DATE,
           SUBSIDIARY_ID,
           SPACE_OF_WORK,
           REVIEWED,
           LOCATION_ID,
           ASSET_ID,
           AUTO_MILESTONE,
           MAIN_LOCATION,
           STUDY_DETAIL_ID,
           IS_MAIN_BENEFIT
      FROM PROJECT_BOQ P
WHERE PROJECT_ID = :PROJECT_ID `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
},
    insertProjectBoq: {
     statement: `
     INSERT INTO HR.PROJECT_BOQ (
        BOQ_ID,
        PROJECT_ID, 
        BOQ_DESCRIPTION,
     BOQ_TYPE,
     BOQ_CLASSIFICATION,
     START_DATE,
     DURATION,
     BOQ_QUANTITY,
     BOQ_TOTAL_AMOUNT,
     UNITE_OF_MEASURE,
     BOQ_AMOUNT,
   BOQ_CLIENT,
    BOQ_OWNER,
     LOCATION_ID,
     INVOICEING_METHOD,
     BOQ_PARENT, 
     DELETED 
     ) 
     VALUES ( 
            PROJECT_BOQ_SEQ.NEXTVAL,
         :PROJECT_ID, 
         :BOQ_DESCRIPTION, 
         :BOQ_TYPE,
        :BOQ_CLASSIFICATION,
        :START_DATE,
        :DURATION,
        :BOQ_QUANTITY,
        :BOQ_TOTAL_AMOUNT,
        :UNITE_OF_MEASURE,
        :BOQ_AMOUNT,
        :BOQ_CLIENT,
        :BOQ_OWNER,
        :LOCATION_ID,
        :INVOICEING_METHOD,
        :BOQ_PARENT, 
        0 
        
      )
     RETURN PROJECT_ID, BOQ_DESCRIPTION , BOQ_PARENT  INTO :R_PROJECT_ID, :R_BOQ_DESCRIPTION , :R_BOQ_PARENT`,
     returns: ["R_PROJECT_ID" ,"R_BOQ_DESCRIPTION" , "R_BOQ_PARENT"],
     bindings: [],
     qstring: "",
     requireCommit: true
 },

 

    getBoqLocations :{
         statement :`select * from pin_trees `,
         bindings: [],
     qstring: "",
     requireCommit: true
    },




    getBoqCalssification :{
     statement :`select primary_name || ' ' || secondary_name as name, lookup_detail_id from lookup_details where lookup_id = 127 `,
     bindings: [],
 qstring: "",
 requireCommit: true
},

getBoqType :{
     statement :`select primary_name || ' ' || secondary_name as name, lookup_detail_id from lookup_details where lookup_id = 77 `,
     bindings: [],
 qstring: "",
 requireCommit: true
},

getUnitsOfMeasure :{
     statement :`select measure_name_ar || ' ' || measure_name_en as name, measure_id from boq_measurements  `,
     bindings: [],
 qstring: "",
 requireCommit: true
},


deleteProjectBoq :{
     statement :`update project_boq
                 set deleted = 1
                 where project_id = :project_id
                 and boq_id = :boq_id  `,
     bindings: [],
 qstring: "",
 requireCommit: true
},


updateProjectBoq :{
     statement :`UPDATE PROJECT_BOQ
     SET   
            PROJECT_ID            = :PROJECT_ID,
            BOQ_DESCRIPTION       = :BOQ_DESCRIPTION,
            BOQ_TYPE            = :BOQ_TYPE,
            BOQ_CLASSIFICATION   = :BOQ_CLASSIFICATION,
            START_DATE      = :START_DATE,
            DURATION            = :DURATION,
            BOQ_QUANTITY      = :BOQ_QUANTITY,
            BOQ_TOTAL_AMOUNT    = :BOQ_TOTAL_AMOUNT,
            UNITE_OF_MEASURE    = :UNITE_OF_MEASURE,
            BOQ_AMOUNT         = :BOQ_AMOUNT,
            BOQ_CLIENT           = :BOQ_CLIENT,
            BOQ_OWNER            = :BOQ_OWNER,
            LOCATION_ID             = :LOCATION_ID,
            INVOICEING_METHOD       = :INVOICEING_METHOD,
            BOQ_PARENT             = :BOQ_PARENT,
            UPDATED_DATE   = SYSDATE

     WHERE  BOQ_ID                = :BOQ_ID `,
     bindings: [],
 qstring: "",
 requireCommit: true
},


boqChild:{
    statement:`
    SELECT BOQ_ID,
           PROJECT_ID,
           BOQ_DESCRIPTION,
           BOQ_TYPE,
           (select primary_name  from lookup_details L where L.lookup_detail_id = P.BOQ_TYPE ) type_f_name,
           (select secondary_name from lookup_details L where L.lookup_detail_id = P.BOQ_TYPE ) type_s_name,
           BOQ_AMOUNT,
           BOQ_QUANTITY,
           UNITE_OF_MEASURE,
           (select MEASURE_name_ar from boq_measurements B where B.measure_id = P.UNITE_OF_MEASURE) MEASURE_name_ar,
           (select MEASURE_name_en from boq_measurements B where B.measure_id = P.UNITE_OF_MEASURE) MEASURE_name_en,
           BOQ_TOTAL_AMOUNT,
           LOCATION_ID,
           (select label_ar from pin_trees T where T.pin_id = P.LOCATION_ID) location_name,
           STATUS,
           INVOICEING_METHOD,
           BOQ_CLASSIFICATION,
           CREATED_BY,
           CREATED_DATE,
           UPDATED_BY,
           UPDATED_DATE,
           BOQ_DEPENDENT,
           BOQ_PARENT,
           START_DATE,
           DURATION,
           BOQ_CLIENT,
           BOQ_OWNER,
           PROMISED_DATE,
           MEASURE_IN_HOURS,
           WORKING_HOURS_PER_DAY,
           DELETED,
           LAST_UNIT_OF_M,
           DELETED_BY,
           DELETED_DATE,
           SUBSIDIARY_ID,
           SPACE_OF_WORK,
           REVIEWED,
           LOCATION_ID,
           ASSET_ID,
           AUTO_MILESTONE,
           MAIN_LOCATION,
           STUDY_DETAIL_ID,
           IS_MAIN_BENEFIT
      FROM PROJECT_BOQ P
WHERE BOQ_PARENT = :BOQ_PARENT `,
bindings: [],
qstring: "",
requireCommit: true
}

  }
  
  module.exports = statements ;
  