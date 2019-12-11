
let statements = {
    getJobOrderCounter: {
            statement :`SELECT JobOrderCountersEO.JOB_ORDER_COUNTERS_ID, 
            JobOrderCountersEO.CODE, 
            JobOrderCountersEO.COUNTER_ID, 
            JobOrderCountersEO.CREATED_BY, 
            to_char(JobOrderCountersEO.CREATION_DATE,'dd,MM,YYYY') as CREATION_DATE, 
            JobOrderCountersEO.DELETED, 
            JobOrderCountersEO.DELETED_BY, 
            JobOrderCountersEO.DELETED_DATE, 
            JobOrderCountersEO.JOB_ORDER_ID, 
            JobOrderCountersEO.ASSET_ID, 
            (select C.COUNTER_NAME from counters c where C.COUNTER_ID=JobOrderCountersEO.COUNTER_ID and nvl(C.DELETED,0)=0 ) counter_name,
            JobOrderCountersEO.COUNTER_READING
     FROM  JOB_ORDER_COUNTERS JobOrderCountersEO
     where (JobOrderCountersEO.DELETED = 0   OR JobOrderCountersEO.DELETED IS NULL )
     and JOBORDERCOUNTERSEO.JOB_ORDER_ID=:P_Job_Order_id  `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },

    getCounterLov: {
       statement :`SELECT AC.ASSET_COUNTER_ID,  
       AC.COUNTERS_ID,  
       AC.ASSET_ID,  
       (SELECT C.COUNTER_NAME  
          FROM counters c  
         WHERE C.COUNTER_ID = AC.COUNTERS_ID AND NVL (c.DELETED, 0) = 0)  
          counter_name,  
       (SELECT C.DESCRPTION  
          FROM counters c  
         WHERE C.COUNTER_ID = AC.COUNTERS_ID AND NVL (c.DELETED, 0) = 0)  
          counter_desc,  
       (SELECT C.INITIAL_READING  
          FROM counters c  
         WHERE C.COUNTER_ID = AC.COUNTERS_ID AND NVL (c.DELETED, 0) = 0)  
          initial_read,  
       (SELECT (SELECT LD.SECONDARY_NAME  
                  FROM LOOKUP_DETAILS ld  
                 WHERE     LD.LOOKUP_DETAIL_ID = C.COUNTER_TYPE  
                       AND NVL (ld.DELETED, 0) = 0)  
          FROM counters c  
         WHERE C.COUNTER_ID = AC.COUNTERS_ID AND NVL (c.DELETED, 0) = 0)  
          counter_type  
  FROM ASSET_COUNTERS ac  
 WHERE NVL (AC.DELETED, 0) = 0 AND AC.ASSET_ID = :ASSET_ID  `,
       returns: [],
       bindings: [],
       qstring: "",
       requireCommit: false
},

 getAllJobCounter : {
    statement :`select rownum,C.COUNTER_ID,C.COUNTER_NAME,C.DESCRPTION,AC.ASSET_ID,    
    (select LD.SECONDARY_NAME from LOOKUP_DETAILS ld where LD.LOOKUP_DETAIL_ID=C.COUNTER_TYPE)co_type,    
    (select LD.SECONDARY_NAME from LOOKUP_DETAILS ld where LD.LOOKUP_DETAIL_ID=C.VALUE_CHANGE)co_value_ch,    
    (select LD.SECONDARY_NAME from LOOKUP_DETAILS ld where LD.LOOKUP_DETAIL_ID=C.MEASURE_UNIT)co_measure,    
    C.INITIAL_READING,   
    (select JOC.COUNTER_READING from JOB_ORDER_COUNTERS joc where nvl(JOC.DELETED,0)=0 and JOC.COUNTER_ID=C.COUNTER_ID and JOC.ASSET_ID=AC.ASSET_ID and JOC.CREATION_DATE=(select max(JO.CREATION_DATE) from JOB_ORDER_COUNTERS jo where nvl(JO.DELETED,0)=0 and JO.COUNTER_ID=C.COUNTER_ID and JO.ASSET_ID=AC.ASSET_ID )) last_reading,   
    (select max(JOC.CREATION_DATE) from JOB_ORDER_COUNTERS joc where nvl(JOC.DELETED,0)=0 and JOC.COUNTER_ID=C.COUNTER_ID and JOC.ASSET_ID=AC.ASSET_ID  ) last_counter_read_date , 
    C.VALUE_CHANGE, 
           (SELECT CASE 
                      WHEN (SELECT JOC.COUNTER_READING 
                              FROM JOB_ORDER_COUNTERS joc 
                             WHERE     NVL (JOC.DELETED, 0) = 0 
                                   AND JOC.COUNTER_ID = C.COUNTER_ID 
                                   AND JOC.ASSET_ID = AC.ASSET_ID 
                                   AND JOC.CREATION_DATE = 
                                          (SELECT MAX (JO.CREATION_DATE) 
                                             FROM JOB_ORDER_COUNTERS jo 
                                            WHERE     NVL (JO.DELETED, 0) = 0 
                                                  AND JO.COUNTER_ID = 
                                                         C.COUNTER_ID 
                                                  AND JO.ASSET_ID = AC.ASSET_ID)) 
                              IS NULL 
                      THEN 
                         C.INITIAL_READING 
                      ELSE 
                         (SELECT JOC.COUNTER_READING 
                            FROM JOB_ORDER_COUNTERS joc 
                           WHERE     NVL (JOC.DELETED, 0) = 0 
                                 AND JOC.COUNTER_ID = C.COUNTER_ID 
                                 AND JOC.ASSET_ID = AC.ASSET_ID 
                                 AND JOC.CREATION_DATE = 
                                        (SELECT MAX (JO.CREATION_DATE) 
                                           FROM JOB_ORDER_COUNTERS jo 
                                          WHERE     NVL (JO.DELETED, 0) = 0 
                                                AND JO.COUNTER_ID = C.COUNTER_ID 
                                                AND JO.ASSET_ID = AC.ASSET_ID)) 
                   END 
              FROM DUAL) 
              counter_current_value 
     from counters c,ASSET_COUNTERS ac  where nvl(C.DELETED,0)=0 and nvl(ac.DELETED,0)=0    
    and C.COUNTER_ID=AC.COUNTERS_ID`,
    bindings: [],
    qstring: "",
    requireCommit: false
 },

   getJobOrderCounterHistory :
   {
      statement :`SELECT JobOrderCountersEO.JOB_ORDER_COUNTERS_ID, 
      JobOrderCountersEO.CODE, 
      JobOrderCountersEO.COUNTER_ID,
      (select C.COUNTER_NAME from counters c where nvl(C.DELETED,0)=0 and C.COUNTER_ID=JobOrderCountersEO.COUNTER_ID ) COUNTER_NAME,
      (select C.INITIAL_READING from counters c where nvl(C.DELETED,0)=0 and C.COUNTER_ID=JobOrderCountersEO.COUNTER_ID ) COUNTER__INITIAL_READING, 
      JobOrderCountersEO.CREATED_BY, 
      JobOrderCountersEO.CREATION_DATE, 
      JobOrderCountersEO.DELETED, 
      JobOrderCountersEO.DELETED_BY, 
      JobOrderCountersEO.DELETED_DATE, 
      JobOrderCountersEO.JOB_ORDER_ID, 
      JobOrderCountersEO.ASSET_ID, 
      JobOrderCountersEO.COUNTER_READING
FROM  JOB_ORDER_COUNTERS JobOrderCountersEO
where ((  ( (JobOrderCountersEO.DELETED = 0 ) )  OR ( (JobOrderCountersEO.DELETED IS NULL ) )  ))
and   JobOrderCountersEO.ASSET_ID = :ASSET_ID`,
      bindings: [],
      qstring: "",
      requireCommit: false
   }
}


  module.exports = statements ;
  