
  let statements = {
    getEquibmentCount:{
        statement:`
        SELECT COUNT (*) as equibment_count
  FROM JOB_ORDER_DETAILS jod, job_orders jo
 WHERE     NVL (jod.DELETED, 0) = 0
       AND NVL (JO.DELETED, 0) = 0
       AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
       AND JOD.ACTION_TAKEN_TYPE = 24044
       AND JO.ASSET_ID = :p_asset_id
       AND JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                                 AND TO_DATE ( :p_to_date, 'DD/MM/YYYY') `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getEquibmentCountByShift:{
        statement:`
        SELECT COUNT (*) as equibment_count
        FROM JOB_ORDER_DETAILS jod, job_orders jo
        WHERE     NVL (jod.DELETED, 0) = 0
       AND NVL (JO.DELETED, 0) = 0
       AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
       AND JOD.ACTION_TAKEN_TYPE = 24044
       AND JO.ATT_TEMPLATE_ID = :p_template_id
       AND JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                                 AND TO_DATE ( :p_to_date, 'DD/MM/YYYY') `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getEquibmentCountByProject:{
        statement:`
        SELECT COUNT (*) as equibment_count
    FROM JOB_ORDER_DETAILS jod, job_orders jo
    WHERE     NVL (jod.DELETED, 0) = 0
       AND NVL (JO.DELETED, 0) = 0
       AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
       AND JOD.ACTION_TAKEN_TYPE = 24044
       AND JO.PROJECT_ID = :p_project_id
       AND (JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                                 AND TO_DATE ( :p_to_date, 'DD/MM/YYYY') )`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getEquibmentCountByService:{
        statement:`
        SELECT COUNT (*) as equibment_count
        FROM JOB_ORDER_DETAILS jod, job_orders jo, ACTIONS_DEFINITION acd
       WHERE     NVL (jod.DELETED, 0) = 0
             AND NVL (jo.DELETED, 0) = 0
             AND NVL (acd.DELETED, 0) = 0
             AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
             AND JO.ACTION_DEF_ID = ACD.ACTION_ID
             AND JOD.ACTION_TAKEN_TYPE = 24044
             AND ACD.SERVICE_ID = :p_service_id
             AND JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                                       AND TO_DATE ( :p_to_date, 'DD/MM/YYYY')`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getincidentByAsset:{
        statement:`
        SELECT COUNT (*) AS incident_count
  FROM issues iss, job_orders jo
 WHERE     NVL (JO.DELETED, 0) = 0
       AND NVL (iss.DELETED, 0) = 0
       AND JO.JOB_ORDER_ID = ISS.JOB_ORDER_ID
       and ISS.TYPE_ID=12275
       AND JO.ASSET_ID = :p_asset_id
       AND JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                                 AND TO_DATE ( :p_to_date, 'DD/MM/YYYY')`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getincidentByProject:{
        statement:`
        SELECT COUNT (*) as   incident_count
  FROM issues iss, job_orders jo
 WHERE    NVL (iss.DELETED, 0) = 0 and NVL (jo.DELETED, 0) = 0
       AND JO.JOB_ORDER_ID = ISS.JOB_ORDER_ID
       and ISS.TYPE_ID=12275
       AND JO.PROJECT_ID = :p_project_id
       AND (JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                                 AND TO_DATE ( :p_to_date, 'DD/MM/YYYY') )`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getincidentByService:{
        statement:`
        SELECT COUNT (*) as incident_count
  FROM issues iss, job_orders jo , ACTIONS_DEFINITION acd
 WHERE    NVL (iss.DELETED, 0) = 0
 and NVL (jo.DELETED, 0) = 0  and NVL (acd.DELETED, 0) = 0
       AND JO.JOB_ORDER_ID = ISS.JOB_ORDER_ID
       AND JO.ACTION_DEF_ID = ACD.ACTION_ID
       and ISS.TYPE_ID=12275
       AND ACD.SERVICE_ID = :p_service_id
       AND (JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                                 AND TO_DATE ( :p_to_date, 'DD/MM/YYYY') )`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getincidentByShift:{
        statement:`
        SELECT COUNT (*) AS incident_count
  FROM issues iss, job_orders jo
 WHERE     NVL (JO.DELETED, 0) = 0
       AND NVL (iss.DELETED, 0) = 0
       AND JO.JOB_ORDER_ID = ISS.JOB_ORDER_ID
       and ISS.TYPE_ID=12275
       AND JO.ATT_TEMPLATE_ID = :p_template_id
       AND JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                                 AND TO_DATE ( :p_to_date, 'DD/MM/YYYY')`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getissueByAsset:{
        statement:`
        SELECT COUNT (*) AS issues_count
  FROM issues iss, job_orders jo
 WHERE     NVL (JO.DELETED, 0) = 0
       AND NVL (iss.DELETED, 0) = 0
       AND ISS.TYPE_ID <> 12275
       AND JO.JOB_ORDER_ID = ISS.JOB_ORDER_ID
       AND JO.ASSET_ID = :p_asset_id
       AND JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                                 AND TO_DATE ( :p_to_date, 'DD/MM/YYYY')`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getissueByProject:{
        statement:`
        SELECT COUNT (*) AS issues_count
  FROM issues iss, job_orders jo
 WHERE     NVL (iss.DELETED, 0) = 0
       AND NVL (jo.DELETED, 0) = 0
       AND ISS.TYPE_ID <> 12275
       AND JO.JOB_ORDER_ID = ISS.JOB_ORDER_ID
       AND JO.PROJECT_ID = :p_project_id
       AND (JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                                  AND TO_DATE ( :p_to_date, 'DD/MM/YYYY'))`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getissueByService:{
        statement:`
        SELECT COUNT (*) as issues_count
  FROM issues iss, job_orders jo , ACTIONS_DEFINITION acd
 WHERE    NVL (iss.DELETED, 0) = 0
 and NVL (jo.DELETED, 0) = 0  and NVL (acd.DELETED, 0) = 0
       AND JO.JOB_ORDER_ID = ISS.JOB_ORDER_ID
       AND ISS.TYPE_ID <> 12275
       AND JO.ACTION_DEF_ID = ACD.ACTION_ID
       AND ACD.SERVICE_ID = :p_service_id
       AND (JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                                 AND TO_DATE ( :p_to_date, 'DD/MM/YYYY') )`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getissueByShift:{
        statement:`
        SELECT COUNT (*) AS issues_count
        FROM issues iss, job_orders jo
       WHERE     NVL (JO.DELETED, 0) = 0
             AND NVL (iss.DELETED, 0) = 0
             AND JO.JOB_ORDER_ID = ISS.JOB_ORDER_ID
             AND JO.ATT_TEMPLATE_ID = :p_template_id
             AND JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                                       AND TO_DATE ( :p_to_date, 'DD/MM/YYYY')`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getpositionByShift:{
        statement:`
        SELECT COUNT (*) as position_count
  FROM JOB_ORDER_DETAILS jod, job_orders jo
 WHERE     NVL (jod.DELETED, 0) = 0
       AND NVL (JO.DELETED, 0) = 0
       AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
       AND JOD.ACTION_TAKEN_TYPE = 24042
       AND JO.ATT_TEMPLATE_ID = :p_template_id
       AND JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                                 AND TO_DATE ( :p_to_date, 'DD/MM/YYYY')`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getpositionByService:{
        statement:`
        SELECT COUNT (*) as position_count
  FROM JOB_ORDER_DETAILS jod, job_orders jo, ACTIONS_DEFINITION acd
 WHERE     NVL (jod.DELETED, 0) = 0
       AND NVL (jo.DELETED, 0) = 0
       AND NVL (acd.DELETED, 0) = 0
       AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
       AND JO.ACTION_DEF_ID = ACD.ACTION_ID
       AND JOD.ACTION_TAKEN_TYPE = 24042
       AND ACD.SERVICE_ID = :p_service_id
       AND JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                                 AND TO_DATE ( :p_to_date, 'DD/MM/YYYY')`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getpositionByAsset:{
        statement:`
        SELECT COUNT (*) as position_count
  FROM JOB_ORDER_DETAILS jod, job_orders jo
 WHERE     NVL (jod.DELETED, 0) = 0
       AND NVL (JO.DELETED, 0) = 0
       AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
       AND JOD.ACTION_TAKEN_TYPE = 24042
       AND JO.ASSET_ID = :p_asset_id
       AND JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                                 AND TO_DATE ( :p_to_date, 'DD/MM/YYYY')`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getpositionByProject:{
        statement:`
        SELECT COUNT (*) as position_count
  FROM JOB_ORDER_DETAILS jod, job_orders jo
 WHERE     NVL (jod.DELETED, 0) = 0
       AND NVL (JO.DELETED, 0) = 0
       AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
       AND JOD.ACTION_TAKEN_TYPE = 24042
       AND JO.PROJECT_ID = :p_project_id
       AND (JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                                 AND TO_DATE ( :p_to_date, 'DD/MM/YYYY') )`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getJobCateg:{
        statement:` 
        SELECT JOD.MINUTE_OR_EQUIB_CATEGORY,
        GET_LOOKUP_NAME (JOD.MINUTE_OR_EQUIB_CATEGORY, 2),
        SUM (JOD.HOUR_MATER_ASSET_COUNT) AS item_count
   FROM job_order_details jod
  WHERE     NVL (JOD.DELETED, 0) = 0
        AND JOD.ACTION_TAKEN_TYPE = 24044
        AND JOD.JOB_ORDER_ID IN (SELECT JO.JOB_ORDER_ID
                                   FROM job_orders jo
                                  WHERE     NVL (JO.DELETED, 0) = 0
                                        AND JO.ACTION_DEF_ID IN (SELECT AD.ACTION_ID
                                                                   FROM ACTIONS_DEFINITION ad
                                                                  WHERE     NVL (
                                                                               AD.DELETED,
                                                                               0) =
                                                                               0
                                                                        AND AD.SERVICE_ID IN (SELECT S.SERVICE_ID
                                                                                                FROM SERVICES s
                                                                                               WHERE     NVL (
                                                                                                            S.DELETED,
                                                                                                            0) =
                                                                                                            0
                                                                                                     AND S.TYPE =
                                                                                                            :p_service_type)))
                                                                                                      GROUP BY JOD.MINUTE_OR_EQUIB_CATEGORY `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getLaborNo:{
      statement:` 
      SELECT COUNT (*) AS labor_no
    FROM job_order_details jod
   WHERE     NVL (JOD.DELETED, 0) = 0
         AND JOD.ACTION_TAKEN_TYPE = 24042
         AND JOD.JOB_ORDER_ID IN (SELECT JO.JOB_ORDER_ID
                                    FROM job_orders jo
                                   WHERE     NVL (JO.DELETED, 0) = 0
                                         AND JO.ACTION_DEF_ID IN (SELECT AD.ACTION_ID
                                                                    FROM ACTIONS_DEFINITION ad
                                                                   WHERE     NVL (
                                                                                AD.DELETED,
                                                                                0) =
                                                                                0
                                                                         AND AD.SERVICE_ID IN (SELECT S.SERVICE_ID
                                                                                                 FROM SERVICES s
                                                                                                WHERE     NVL (
                                                                                                             S.DELETED,
                                                                                                             0) =
                                                                                                             0
                                                                                                      AND S.TYPE =
                                                                                                             :p_service_type))) `,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
  },
  getEquibCount:{
    statement:` 
    SELECT COUNT (*) equib_count
    FROM job_order_details jod
   WHERE     NVL (JOD.DELETED, 0) = 0
         AND JOD.ACTION_TAKEN_TYPE = 24043
         AND JOD.JOB_ORDER_ID IN (SELECT JO.JOB_ORDER_ID
                                    FROM job_orders jo
                                   WHERE     NVL (JO.DELETED, 0) = 0
                                         AND JO.ACTION_DEF_ID IN (SELECT AD.ACTION_ID
                                                                    FROM ACTIONS_DEFINITION ad
                                                                   WHERE     NVL (
                                                                                AD.DELETED,
                                                                                0) =
                                                                                0
                                                                         AND AD.SERVICE_ID IN (SELECT S.SERVICE_ID
                                                                                                 FROM SERVICES s
                                                                                                WHERE     NVL (
                                                                                                             S.DELETED,
                                                                                                             0) =
                                                                                                             0
                                                                                                      AND S.TYPE =
                                                                                                             :p_service_type))) `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getJobOrderMaterial:{
    statement:` 
    SELECT JOD.MINUTE_OR_EQUIB_CATEGORY,T.EN_NAME , T.AR_NAME,
 GET_LOOKUP_NAME (JOD.MINUTE_OR_EQUIB_CATEGORY, 2) unit_name_en,
 GET_LOOKUP_NAME (JOD.MINUTE_OR_EQUIB_CATEGORY, 1) unit_name_ar,
 SUM (JOD.HOUR_MATER_ASSET_COUNT) AS item_count
FROM job_orders jo, job_order_details jod ,ACTIONS_DEFINITION acd , ITEMS T ,project_boq pq
WHERE     NVL (JOD.DELETED, 0) = 0
 AND NVL (jo.DELETED, 0) = 0
 AND NVL (acd.DELETED, 0) = 0
 AND NVL (T.DELETED, 0) = 0
 AND NVL (pq.DELETED, 0) = 0
 AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
 and JO.ACTION_DEF_ID=ACD.ACTION_ID
 and jod.POSITION_ITEM_ASSET=T.ITEMS_ID
 AND PQ.BOQ_ID=JO.BOQ_ID
 AND JOD.ACTION_TAKEN_TYPE = 24044
 AND (JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                            AND TO_DATE ( :p_to_date, 'DD/MM/YYYY') or (:p_from_date is null and :p_to_date is null))
 AND (JO.PROJECT_ID = :p_project_id OR :p_project_id IS NULL)
 AND (ACD.SERVICE_ID = :p_service_id OR :p_service_id IS NULL)
 AND (JO.ASSET_ID = :p_asset_id OR :p_asset_id IS NULL)
 AND (JO.ATT_TEMPLATE_ID = :p_template_id OR :p_template_id IS NULL)
 AND (PQ.LOCATION_ID = :p_location_id or :p_location_id is null)
GROUP BY JOD.MINUTE_OR_EQUIB_CATEGORY,T.EN_NAME , T.AR_NAME`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getJobOrderData:{
    statement:` 
    SELECT 
                JOB_ORDER_ID, 
                JOB_ORDER_DESC, 
                JOB_ORDER_DATE, 
                ASSET_ID,
                    ATT_TEMPLATE_ID,
                    TEMPLATE_NAME_EN, 
                TEMPLATE_NAME_AR,
                    SERVICE_TITLE_EN,
                    SERVICE_TITLE_AR, 
                SERVICE_TYPE_EN,
                    SERVICE_TYPE_AR, 
                    SERVICE_OPER_TYPE_EN, 
                SERVICE_OPER_TYPE_AR,
                    PROJECT_ID, 
                    PRIMARY_NAME , 
                SECONDARY_NAME,
                    BOQ_DESCRIPTION, 
                    MILESTONE_NAME, 
                ASSET_NAME,
                    ASSET_TYPE_EN,
                    ASSET_TYPE_AR, 
                ACTION_TITLE_EN,
                    ACTION_TITLE_AR, 
                    JOB_ORDER_TYPE_EN, 
                JOB_ORDER_TYPE_AR,
                    JOB_ORDER_STATUS_EN,
                    JOB_ORDER_STATUS_AR
                FROM HR.JOB_ORDERS_DATA  `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getShiftNameById:{
    statement:` 
    SELECT 
        JOB_ORDER_ID, 
        JOB_ORDER_DESC, 
        JOB_ORDER_DATE, 
        ASSET_ID,
            ATT_TEMPLATE_ID,
            TEMPLATE_NAME_EN, 
        TEMPLATE_NAME_AR
    FROM HR.JOB_ORDERS_DATA 
          WHERE ATT_TEMPLATE_ID = :ATT_TEMPLATE_ID `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  }, getShiftName:{
    statement:` 
    SELECT 
            ATT_TEMPLATE_ID,
            TEMPLATE_NAME_EN, 
        TEMPLATE_NAME_AR
    FROM HR.JOB_ORDERS_DATA `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getIncidentsDetails:{
    statement:` 
    SELECT ISS.ISSUE_ID,
      ISS.ISSUE_TITLE,
      ISS.ISSUE_SUMMARY,
      GETEMPNAME_LANG (ISS.ASSIGN_TO, 1, 2) AS employee_assigned_en,
      GETEMPNAME_LANG (ISS.ASSIGN_TO, 1, 1) AS employee_assigned_ar,
      ISS.CREATION_DATE,
      ISS.TARGET_RESOLUTION_DATE
 FROM issues iss, ASSETS_DEFINITION ad
WHERE     NVL (iss.DELETED, 0) = 0
      AND NVL (ad.DELETED, 0) = 0
      AND ISS.ASSEET_ID = AD.ASSET_ID
      AND ISS.TYPE_ID = 12275
      AND (ISS.SHIFT = :p_template_id OR :p_template_id IS NULL)
      AND (AD.LOCATION_ID = :p_location_id OR :p_location_id IS NULL) `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  }, 
  getIncidentNo:{
    statement:` 
    SELECT COUNT (*) AS incident_no
    FROM issues iss, ASSETS_DEFINITION ad
    WHERE     NVL (iss.DELETED, 0) = 0
            AND NVL (ad.DELETED, 0) = 0
            AND ISS.ASSEET_ID = AD.ASSET_ID
            AND (AD.LOCATION_ID = :p_location_id OR :p_location_id IS NULL)
            AND ISS.TYPE_ID = 12275
            AND (ISS.SHIFT = :p_template_id OR :p_template_id IS NULL)
    GROUP BY ISS.SHIFT, ad.LOCATION_ID `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getPermissionDescription:{
    statement:` 
    SELECT PD.DESCRIPTION,
       GET_LOOKUP_NAME (P.PERMISSION_TYPE_ID, 2) permission_type_en,
       GET_LOOKUP_NAME (P.PERMISSION_TYPE_ID, 2) permission_type_ar
  FROM PERMISSION_DETAILS pd, PERMISSIONS p, ASSETS_DEFINITION ad
 WHERE     NVL (PD.DELETED, 0) = 0
       AND NVL (AD.DELETED, 0) = 0
       AND NVL (p.DELETED, 0) = 0
       AND (P.PERMISSION_ID = PD.PERMISSION_ID)
       AND PD.EQUIPMENT_ID = AD.ASSET_ID
       AND PD.TYPE_ID = 2
       AND (AD.LOCATION_ID = :p_location_id OR :p_location_id IS NULL) `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getShiftIdByName:{
    statement:` 
    SELECT ATR.TEMPLATE_ID,
    ats.RULE_EN_NAME template_name_en,
    ats.RULE_AR_NAME template_name_AR
FROM ATT.HR_ATT_RULE_TEMPLATE atr, ATT.HR_AT_RULES_SETTINGS ats
WHERE     NVL (ATR.DELETED, 0) = 0
    AND NVL (ATS.DELETED, 0) = 0
    AND ats.RULE_SETTING_ID = atr.RULE_SETTING_ID
    AND (   ats.RULE_EN_NAME LIKE :p_shift_name_en || '%'
         OR :p_shift_name_en IS NULL)
    AND (   ATS.RULE_AR_NAME LIKE :p_shift_name_ar || '%'
         OR :p_shift_name_ar IS NULL) 
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getlocIdByName:{
    statement:` 
    SELECT PT.PIN_ID  Location_ID, PT.LABEL_EN, PT.LABEL_AR
  FROM PIN_TREES pt
 WHERE     NVL (pt.DELETED, 0) = 0
       AND (PT.LABEL_EN LIKE :p_loc_name_en || '%' OR :p_loc_name_en IS NULL)
       AND (PT.LABEL_AR LIKE :p_loc_name_ar || '%' OR :p_loc_name_ar IS NULL)
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getlocNameById:{
    statement:` 
    SELECT PT.PIN_ID  Location_ID, PT.LABEL_EN, PT.LABEL_AR
  FROM PIN_TREES pt
 WHERE     NVL (pt.DELETED, 0) = 0
       AND (PT.PIN_ID LIKE :PIN_ID || '%' OR :PIN_ID IS NULL)
       
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },


  getpermissionfiltersByNumberOrLocation:{
    statement:` 
    SELECT P.PERMISSION_ID,
    P.WORK_DESCRIPTION,
    P.PERMISSION_TYPE_ID ,
    PD.TYPE_ID,
    GET_LOOKUP_NAME (P.PERMISSION_TYPE_ID, 2) permission_type_en,
    GET_LOOKUP_NAME (P.PERMISSION_TYPE_ID, 1) permission_type_ar,
    (SELECT CASE
               WHEN PD.TYPE_ID = 1 THEN 'Employee Permission'
               WHEN PD.TYPE_ID = 2 THEN 'Equibment Permission'
               ELSE '--'
            END
       FROM DUAL)
       permission_detail_type_en,
    (SELECT POS.SECONDARY_NAME
       FROM positions pos
      WHERE NVL (POS.DELETED, 0) = 0 AND POS.POSITION_ID = PD.POSITION_ID)
       position_english_name,
    (SELECT POS.PRIMARY_NAME
       FROM positions pos
      WHERE NVL (POS.DELETED, 0) = 0 AND POS.POSITION_ID = PD.POSITION_ID)
       position_arabic_name,
    (SELECT AD.ASSET_NAME
       FROM ASSETS_DEFINITION ad
      WHERE NVL (AD.DELETED, 0) = 0 AND AD.ASSET_ID = PD.EQUIPMENT_ID)
       equibment_name,
    PD.DESCRIPTION,
     GET_LOOKUP_NAME (P.PERMISSION_TYPE_ID, 2) permission_type_en,
     GET_LOOKUP_NAME (P.PERMISSION_TYPE_ID, 2) permission_type_ar,
     P.DATE_FROM as permission_start_date,
     P.DATE_TO as permission_end_date,
     WOS.AR_NAME as status_en,
     WOS.AR_NAME2 as status_ar
FROM PERMISSION_DETAILS pd, PERMISSIONS p, ASSETS_DEFINITION ad ,WORK_ORDER_STATUS wos
WHERE     NVL (PD.DELETED, 0) = 0
     AND NVL (AD.DELETED, 0) = 0
     AND NVL (p.DELETED, 0) = 0
     AND NVL (wos.DELETED, 0) = 0
     AND (P.PERMISSION_ID = PD.PERMISSION_ID)
     AND PD.EQUIPMENT_ID = AD.ASSET_ID
     and WOS.STATUS_ID=P.STATUS
     AND (AD.LOCATION_ID = :p_location_id OR :p_location_id IS NULL)
     AND (P.STATUS = :p_status_id OR :p_status_id IS NULL) `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },

  getPermissionStatus:{
    statement:` 
    SELECT WOS.STATUS_ID, WOS.AR_NAME AS status_en, WOS.AR_NAME2 AS status_ar
 FROM WORK_ORDER_STATUS wos
WHERE NVL (WOS.DELETED, 0) = 0 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },


  getissuesByLocagionAndShiftId:{
    statement:` 
    SELECT ISS.ISSUE_ID,
      GETEMPNAME_LANG (E.EMPLOYEE_ID, 1, 2) emp_name_en,
      GETEMPNAME_LANG (E.EMPLOYEE_ID, 1, 1) emp_name_ar,
      VGD.TITLE_EN AS violation_name_en,
      VGD.TITLE_AR AS violation_name_ar,
      ISS.VIOLATION_VALUE,
      ISS.CREATION_DATE,
      ISS.ISSUE_TITLE,
      ISS.ISSUE_SUMMARY
 FROM HR.issues iss,
      AOT_GEN.EMPLOYEES e,
      HR.ASSETS_DEFINITION ad,
      HR.VIOLATION_GROUP_DETAILS vgd
WHERE     NVL (iss.DELETED, 0) = 0
      AND NVL (e.DELETED, 0) = 0
      AND NVL (ad.DELETED, 0) = 0
      AND NVL (vgd.DELETED, 0) = 0
      and ISS.VIOLATION_ID=VGD.VIOLATION_ID
      AND ISS.EMPLOYEE_ID = E.EMPLOYEE_ID
      AND ISS.ASSEET_ID = AD.ASSET_ID
      AND ISS.TYPE_ID = 11219
      AND (ISS.SHIFT = :p_template_id OR :p_template_id IS NULL)
      AND (AD.LOCATION_ID = :p_location_id OR :p_location_id IS NULL)
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  }, 
  getEquibByServiceType:{
    statement:` 
    SELECT COUNT (*) equib_count
  FROM job_order_details jod
 WHERE     NVL (JOD.DELETED, 0) = 0
       AND JOD.ACTION_TAKEN_TYPE = 24043
       AND JOD.JOB_ORDER_ID IN (SELECT JO.JOB_ORDER_ID
                                  FROM job_orders jo
                                 WHERE     NVL (JO.DELETED, 0) = 0
                                       AND JO.ACTION_DEF_ID IN (SELECT AD.ACTION_ID
                                                                  FROM ACTIONS_DEFINITION ad
                                                                 WHERE     NVL (
                                                                              AD.DELETED,
                                                                              0) =
                                                                              0
                                                                       AND AD.SERVICE_ID IN (SELECT S.SERVICE_ID
                                                                                               FROM SERVICES s
                                                                                              WHERE     NVL (
                                                                                                           S.DELETED,
                                                                                                           0) =
                                                                                                           0
                                                                                                    AND S.TYPE =
                                                                                                           :p_service_type)))
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  }, 
  getLaborCountByServiceType:{
    statement:` 
    SELECT COUNT (*) AS labor_no
    FROM job_order_details jod
   WHERE     NVL (JOD.DELETED, 0) = 0
         AND JOD.ACTION_TAKEN_TYPE = 24042
         AND JOD.JOB_ORDER_ID IN (SELECT JO.JOB_ORDER_ID
                                    FROM job_orders jo
                                   WHERE     NVL (JO.DELETED, 0) = 0
                                         AND JO.ACTION_DEF_ID IN (SELECT AD.ACTION_ID
                                                                    FROM ACTIONS_DEFINITION ad
                                                                   WHERE     NVL (
                                                                                AD.DELETED,
                                                                                0) =
                                                                                0
                                                                         AND AD.SERVICE_ID IN (SELECT S.SERVICE_ID
                                                                                                 FROM SERVICES s
                                                                                                WHERE     NVL (
                                                                                                             S.DELETED,
                                                                                                             0) =
                                                                                                             0
                                                                                                      AND S.TYPE =
                                                                                                             :p_service_type)))
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getSumItemsByUnits:{
    statement:` 
    SELECT JOD.MINUTE_OR_EQUIB_CATEGORY,
    GET_LOOKUP_NAME (JOD.MINUTE_OR_EQUIB_CATEGORY, 2),
    SUM (JOD.HOUR_MATER_ASSET_COUNT) AS item_count
FROM job_order_details jod
WHERE     NVL (JOD.DELETED, 0) = 0
    AND JOD.ACTION_TAKEN_TYPE = 24044
    AND JOD.JOB_ORDER_ID IN (SELECT JO.JOB_ORDER_ID
                               FROM job_orders jo
                              WHERE     NVL (JO.DELETED, 0) = 0
                                    AND JO.ACTION_DEF_ID IN (SELECT AD.ACTION_ID
                                                               FROM ACTIONS_DEFINITION ad
                                                              WHERE     NVL (
                                                                           AD.DELETED,
                                                                           0) =
                                                                           0
                                                                    AND AD.SERVICE_ID IN (SELECT S.SERVICE_ID
                                                                                            FROM SERVICES s
                                                                                           WHERE     NVL (
                                                                                                        S.DELETED,
                                                                                                        0) =
                                                                                                        0
                                                                                                 AND (S.TYPE =
                                                                                                        :p_service_type   OR :p_service_type IS NULL))))
GROUP BY JOD.MINUTE_OR_EQUIB_CATEGORY
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getMissions:{
    statement:`
    SELECT M.MISSION_TYPE ,M.MISSION_DESCRIPTION, M.START_DATE, M.END_DATE
    FROM ATT.HR_MISSIONS m, ASSETS_DEFINITION ad
   WHERE     NVL (AD.DELETED, 0) = 0
         AND M.OPERATION_TYPE = 2
         AND M.EMPLOYEE_ID = AD.ASSET_ID
         AND (AD.ASSET_SERIAL LIKE :p_equib_serial || '%' OR :p_equib_serial IS NULL)
         AND (TO_DATE ( :p_date, 'DD-MM-YYYY') BETWEEN M.START_DATE
                                                   AND M.END_DATE
              )
              
              
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getPermissionByLocation:{
    statement:` 
    SELECT PD.DESCRIPTION,
       GET_LOOKUP_NAME (P.PERMISSION_TYPE_ID, 2) permission_type_en,
       GET_LOOKUP_NAME (P.PERMISSION_TYPE_ID, 2) permission_type_ar,
       PD.PERMISSION_ID
  FROM PERMISSION_DETAILS pd, PERMISSIONS p, ASSETS_DEFINITION ad
 WHERE     NVL (PD.DELETED, 0) = 0
       AND NVL (AD.DELETED, 0) = 0
       AND NVL (p.DELETED, 0) = 0
       AND (P.PERMISSION_ID = PD.PERMISSION_ID)
       AND PD.EQUIPMENT_ID = AD.ASSET_ID
       AND PD.TYPE_ID = 2
       AND (AD.LOCATION_ID = :p_location_id OR :p_location_id IS NULL)
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getIssuesType:{
    statement:` 

    SELECT ISS.ISSUE_TITLE,
     ISS.ISSUE_SUMMARY,
     GET_LOOKUP_NAME (ISS.TYPE_ID, 2) issue_type_en,
     GET_LOOKUP_NAME (ISS.TYPE_ID, 1) issue_type_ar,
     ISS.VIOLATION_VALUE
FROM issues iss
WHERE     NVL (iss.DELETED, 0) = 0
     AND (ISS.TYPE_ID = 12274 OR ISS.TYPE_ID = 11219)
     AND (ISS.SHIFT=:P_TEMPLATE_ID or :P_TEMPLATE_ID is null)
     AND ISS.ASSEET_ID IN (SELECT ADS.ASSET_ID
                                FROM ASSETS_DEFINITION ads
                               WHERE     NVL (ads.DELETED, 0) = 0
                                     AND (ADS.LOCATION_ID =:p_location_id or :p_location_id is null))
     AND ISS.CREATION_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                               AND TO_DATE ( :p_to_date, 'DD/MM/YYYY')

    `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getZamByLocShf:{
    statement:` 

    SELECT AA.ACTIVITY_TITLE_EN,
    AA.ACTIVITY_TITLE_AR,
    JOD.ACTIVITY_VALUE ,
    GET_LOOKUP_NAME (AA.ACTIVITY_TYPE_ID, 2) activity_type_en,
    GET_LOOKUP_NAME (AA.ACTIVITY_TYPE_ID, 1) activity_type_ar,
    GET_LOOKUP_NAME (AA.ACTION_TAKEN_TYPE, 2) action_type_en,
    GET_LOOKUP_NAME (AA.ACTION_TAKEN_TYPE, 1) action_type_ar,
    ats.RULE_EN_NAME template_name_en,
    ats.RULE_AR_NAME template_name_AR
FROM job_order_details jod,
    ACTIVITY_ACTIONS aa,
    job_orders jo,
    project_boq pq,
    ATT.HR_ATT_RULE_TEMPLATE atr,
    ATT.HR_AT_RULES_SETTINGS ats,
    ACTIONS_DEFINITION acd ,
    services s
WHERE     NVL (JOD.DELETED, 0) = 0
    AND NVL (AA.DELETED, 0) = 0
    AND NVL (jo.DELETED, 0) = 0
    AND NVL (acd.DELETED, 0) = 0
    AND NVL (s.DELETED, 0) = 0
    AND NVL (pq.DELETED, 0) = 0
    AND NVL (ATR.DELETED, 0) = 0
    AND NVL (ATS.DELETED, 0) = 0
    and AA.ACTION_TAKEN_TYPE=11257
    AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
    and PQ.BOQ_ID=JO.BOQ_ID
    and ATR.TEMPLATE_ID=JO.ATT_TEMPLATE_ID
    AND ats.RULE_SETTING_ID = atr.RULE_SETTING_ID
    AND JOD.ACTIVITY_ACTION_ID = AA.ACTIVITY_ACTION_ID
    and JO.ACTION_DEF_ID=ACD.ACTION_ID
    and ACD.SERVICE_ID=S.SERVICE_ID
    and (PQ.LOCATION_ID = :p_location_id or :p_location_id is null)
    AND (JO.ATT_TEMPLATE_ID = :p_template_id OR :p_template_id IS NULL)
    AND S.TYPE = 24110
    --AND (S.TYPE = :p_ser_type_id OR :p_ser_type_id IS NULL)
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getNoOfCup:{
    statement:` 
    SELECT JOD.MINUTE_OR_EQUIB_CATEGORY ,
    T.EN_NAME,T.AR_NAME,
    GET_LOOKUP_NAME (JOD.MINUTE_OR_EQUIB_CATEGORY, 2) as measure_unit,
    SUM (JOD.HOUR_MATER_ASSET_COUNT) AS item_count
FROM job_order_details jod,
    job_orders jo,
    ACTIONS_DEFINITION acd,
    services s,
    items t,
    ASSETS_DEFINITION ad
WHERE     NVL (JOD.DELETED, 0) = 0
    AND NVL (JOD.DELETED, 0) = 0
    AND NVL (jo.DELETED, 0) = 0
    AND NVL (acd.DELETED, 0) = 0
    AND NVL (s.DELETED, 0) = 0
    AND NVL (t.DELETED, 0) = 0
    AND NVL (ad.DELETED, 0) = 0
    AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
    AND JO.ACTION_DEF_ID = ACD.ACTION_ID
    AND ACD.SERVICE_ID = S.SERVICE_ID
    and JO.ASSET_ID = AD.ASSET_ID
    AND JOD.POSITION_ITEM_ASSET = T.ITEMS_ID
    AND JOD.ACTION_TAKEN_TYPE = 24044
    AND (jo.ATT_TEMPLATE_ID=:P_TEMPLATE_ID or :P_TEMPLATE_ID is null)     
    and (AD.LOCATION_ID = :p_location_id or :p_location_id is null)
    AND (   GET_LOOKUP_NAME (S.TYPE, 2) LIKE :p_service_type_name || '%'
         OR :p_service_type_name IS NULL)
    
GROUP BY JOD.MINUTE_OR_EQUIB_CATEGORY, T.EN_NAME,T.AR_NAME
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  EquibByLocOrShift:{
    statement:` 

SELECT M.MISSION_DESCRIPTION,
       MT.MISSION_TYPE_DESCRIPTION_EN,
       MT.MISSION_TYPE_DESCRIPTION
  FROM ATT.HR_MISSIONS m,
       ASSETS_DEFINITION ad,
       ATT.MISSION_TYPES mt,
       job_orders jo,
       job_order_details jod
 WHERE     NVL (AD.DELETED, 0) = 0
       AND NVL (jo.DELETED, 0) = 0
       AND NVL (jod.DELETED, 0) = 0
       AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
       AND JOD.ACTION_TAKEN_TYPE = 24043
       AND M.OPERATION_TYPE = 2
       AND M.MISSION_TYPE = MT.MISSION_TYPE
       AND M.EMPLOYEE_ID = AD.ASSET_ID
       AND JOD.POSITION_ITEM_ASSET = AD.ASSET_ID
       AND AD.ASSET_SERIAL = :p_equib_serial
       AND (TO_DATE ( :p_date, 'DD-MM-YYYY') BETWEEN M.START_DATE
                                                 AND M.END_DATE)
       AND (JO.ATT_TEMPLATE_ID = :p_shift_id OR :p_shift_id IS NULL)
       AND (AD.LOCATION_ID = :p_location_id OR :p_location_id IS NULL)
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  EquibByLocOrShiftDailyFilter:{
    statement:` 
    SELECT DISTINCT (ADS.ASSET_ID), ADS.ASSET_NAME
  FROM job_orders jo, job_order_details jod, ASSETS_DEFINITION ads
 WHERE     NVL (JO.DELETED, 0) = 0
       AND NVL (JOD.DELETED, 0) = 0
       AND NVL (ads.DELETED, 0) = 0
       AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
       AND JO.ASSET_ID = ADS.ASSET_ID
       AND JOD.ACTION_TAKEN_TYPE = 24043
       AND (jo.ATT_TEMPLATE_ID = :P_TEMPLATE_ID OR :P_TEMPLATE_ID IS NULL)
       AND (ADS.LOCATION_ID = :p_location_id OR :p_location_id IS NULL)
       AND TRUNC (SYSDATE) = JO.JOB_ORDER_DATE
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getAssetIdByLocOrShift:{
    statement:` 
    SELECT DISTINCT (ADS.ASSET_ID), ADS.ASSET_NAME
  FROM job_orders jo, job_order_details jod, ASSETS_DEFINITION ads
 WHERE     NVL (JO.DELETED, 0) = 0
       AND NVL (JOD.DELETED, 0) = 0
       AND NVL (ads.DELETED, 0) = 0
       AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
       AND JO.ASSET_ID = ADS.ASSET_ID
       AND JOD.ACTION_TAKEN_TYPE = 24043
       AND (jo.ATT_TEMPLATE_ID = :P_TEMPLATE_ID OR :P_TEMPLATE_ID IS NULL)
       AND (ADS.LOCATION_ID = :p_location_id OR :p_location_id IS NULL)
       AND TRUNC (SYSDATE) = JO.JOB_ORDER_DATE
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getItemByLocOrShiftIds:{
    statement:` 
    SELECT JOD.MINUTE_OR_EQUIB_CATEGORY,
    T.ITEMS_ID,
    T.EN_NAME,
    T.AR_NAME,
    GET_LOOKUP_NAME (JOD.MINUTE_OR_EQUIB_CATEGORY, 2) measure_unit,
    SUM (JOD.HOUR_MATER_ASSET_COUNT) AS item_count
FROM job_orders jo,
    job_order_details jod,
    ASSETS_DEFINITION ad,
    items t
WHERE     NVL (JO.DELETED, 0) = 0
    AND NVL (JOD.DELETED, 0) = 0
    AND NVL (ad.DELETED, 0) = 0
    AND NVL (t.DELETED, 0) = 0
    AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
    AND JO.ASSET_ID = AD.ASSET_ID
    AND JOD.POSITION_ITEM_ASSET = T.ITEMS_ID
    AND JOD.ACTION_TAKEN_TYPE = 24044
    AND TRUNC (SYSDATE) = JO.JOB_ORDER_DATE
    AND (JO.ATT_TEMPLATE_ID = :p_template_id OR :p_template_id IS NULL)
    AND (AD.LOCATION_ID = :p_location_id OR :p_location_id IS NULL)
GROUP BY JOD.MINUTE_OR_EQUIB_CATEGORY,
    T.ITEMS_ID,
    T.EN_NAME,
    T.AR_NAME
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getSumItemsByUnits:{
    statement:` 
    SELECT JOD.MINUTE_OR_EQUIB_CATEGORY,
    GET_LOOKUP_NAME (JOD.MINUTE_OR_EQUIB_CATEGORY, 2),
    SUM (JOD.HOUR_MATER_ASSET_COUNT) AS item_count
FROM job_order_details jod
WHERE     NVL (JOD.DELETED, 0) = 0
    AND JOD.ACTION_TAKEN_TYPE = 24044
    AND JOD.JOB_ORDER_ID IN (SELECT JO.JOB_ORDER_ID
                               FROM job_orders jo
                              WHERE     NVL (JO.DELETED, 0) = 0
                                    AND JO.ACTION_DEF_ID IN (SELECT AD.ACTION_ID
                                                               FROM ACTIONS_DEFINITION ad
                                                              WHERE     NVL (
                                                                           AD.DELETED,
                                                                           0) =
                                                                           0
                                                                    AND AD.SERVICE_ID IN (SELECT S.SERVICE_ID
                                                                                            FROM SERVICES s
                                                                                           WHERE     NVL (
                                                                                                        S.DELETED,
                                                                                                        0) =
                                                                                                        0
                                                                                                 AND (S.TYPE =
                                                                                                        :p_service_type   OR :p_service_type IS NULL))))
GROUP BY JOD.MINUTE_OR_EQUIB_CATEGORY
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getLaborss:{
    statement:` 
    SELECT DISTINCT TITLE_EN from SERVICES WHERE SERVICE_ID = :SERVICE_ID  and  NVL (
      DELETED,
      0) =
      0 
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getMaterialInLocationByItemAndLoc:{
    statement:` 
    SELECT JOD.MINUTE_OR_EQUIB_CATEGORY,
         T.ITEMS_ID,
         T.EN_NAME,
         T.AR_NAME,
         GET_LOOKUP_NAME (JOD.MINUTE_OR_EQUIB_CATEGORY, 2) measure_unit,
         SUM (JOD.HOUR_MATER_ASSET_COUNT) AS item_count
    FROM job_orders jo,
         job_order_details jod,
         ASSETS_DEFINITION ad,
         items t
   WHERE     NVL (JO.DELETED, 0) = 0
         AND NVL (JOD.DELETED, 0) = 0
         AND NVL (ad.DELETED, 0) = 0
         AND NVL (t.DELETED, 0) = 0
         AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
         AND JO.ASSET_ID = AD.ASSET_ID
         AND JOD.POSITION_ITEM_ASSET = T.ITEMS_ID
         AND JOD.ACTION_TAKEN_TYPE = 24044
         AND (AD.LOCATION_ID = :p_location_id OR :p_location_id IS NULL)
         AND (T.ITEMS_ID = :p_item_id OR :p_item_id IS NULL)
GROUP BY JOD.MINUTE_OR_EQUIB_CATEGORY,
         T.ITEMS_ID,
         T.EN_NAME,
         T.AR_NAME
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  activitiesDetailsForEmp:{
    statement:` 
    SELECT GETEMPNAME_LANG (JOD.POSITION_ITEM_ASSET_VAL, 1, 2) emp_name_en,
    GETEMPNAME_LANG (JOD.POSITION_ITEM_ASSET_VAL, 1, 1) emp_name_ar,
    AA.ACTIVITY_TITLE_EN,
    AA.ACTIVITY_TITLE_AR,
    AA.HOUR_MATER_ASSET_COUNT as actvity_duration,
    GET_LOOKUP_NAME (AA.ACTIVITY_TYPE_ID, 2) activity_type_en,
    GET_LOOKUP_NAME (AA.ACTIVITY_TYPE_ID, 1) activity_type_ar,
    GET_LOOKUP_NAME (AA.ACTION_TAKEN_TYPE, 2) action_type_en,
    GET_LOOKUP_NAME (AA.ACTION_TAKEN_TYPE, 1) action_type_ar
FROM job_order_details jod,
    ACTIVITY_ACTIONS aa,
    AOT_GEN.EMPLOYEES e,
    job_orders jo
WHERE     NVL (JOD.DELETED, 0) = 0
    AND NVL (AA.DELETED, 0) = 0
    AND NVL (e.DELETED, 0) = 0
    AND NVL (jo.DELETED, 0) = 0
    AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
    AND JOD.ACTIVITY_ACTION_ID = AA.ACTIVITY_ACTION_ID
    AND E.EMPLOYEE_ID = JOD.POSITION_ITEM_ASSET_VAL
    AND JOD.ACTION_TAKEN_TYPE = 24042
    AND (E.USER_CODE LIKE :p_emp_code || '%' OR :p_emp_code IS NULL)
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  activitiesDetailsForEmpforLocAndSHift:{
    statement:` 
SELECT AA.ACTIVITY_TITLE_EN,
AA.ACTIVITY_TITLE_AR,
GET_LOOKUP_NAME (AA.ACTIVITY_TYPE_ID, 2) activity_type_en,
GET_LOOKUP_NAME (AA.ACTIVITY_TYPE_ID, 1) activity_type_ar,
GET_LOOKUP_NAME (AA.ACTION_TAKEN_TYPE, 2) action_type_en,
GET_LOOKUP_NAME (AA.ACTION_TAKEN_TYPE, 1) action_type_ar,
WOS.AR_NAME activity_status_en,
WOS.AR_NAME2 activity_status_ar,
ats.RULE_EN_NAME template_name_en,
ats.RULE_AR_NAME template_name_AR
FROM job_order_details jod,
ACTIVITY_ACTIONS aa,
job_orders jo,
WORK_ORDER_STATUS wos,
project_boq pq,
ATT.HR_ATT_RULE_TEMPLATE atr,
ATT.HR_AT_RULES_SETTINGS ats
WHERE     NVL (JOD.DELETED, 0) = 0
AND NVL (AA.DELETED, 0) = 0
AND NVL (jo.DELETED, 0) = 0
AND NVL (wos.DELETED, 0) = 0
AND NVL (pq.DELETED, 0) = 0
AND NVL (ATR.DELETED, 0) = 0
AND NVL (ATS.DELETED, 0) = 0
AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
AND JO.STATUS = WOS.STATUS_ID
AND PQ.BOQ_ID=JO.BOQ_ID
and ATR.TEMPLATE_ID=JO.ATT_TEMPLATE_ID
AND ats.RULE_SETTING_ID = atr.RULE_SETTING_ID
AND JOD.ACTIVITY_ACTION_ID = AA.ACTIVITY_ACTION_ID
AND (PQ.LOCATION_ID = :p_location_id or :p_location_id is null) 
AND (JO.ATT_TEMPLATE_ID = :p_template_id OR :p_template_id IS NULL)
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getServiceTypeNameById:{
    statement:` 
    SELECT LD.SECONDARY_NAME service_name_en ,
    LD.PRIMARY_NAME service_name_ar
     FROM LOOKUP_DETAILS ld
    WHERE     NVL (ld.DELETED, 0) = 0
          AND (LD.LOOKUP_DETAIL_ID = :p_service_type_id OR :p_service_type_id IS NULL)
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getItemQuantityByLocOrShift:{
    statement:` 
  SELECT JOD.MINUTE_OR_EQUIB_CATEGORY,
         T.ITEMS_ID,
         T.EN_NAME,
         T.AR_NAME,
         GET_LOOKUP_NAME (JOD.MINUTE_OR_EQUIB_CATEGORY, 2) measure_unit,
         SUM (JOD.HOUR_MATER_ASSET_COUNT) AS item_count
    FROM job_orders jo,
         job_order_details jod,
         ASSETS_DEFINITION ad,
         items t
   WHERE     NVL (JO.DELETED, 0) = 0
         AND NVL (JOD.DELETED, 0) = 0
         AND NVL (ad.DELETED, 0) = 0
         AND NVL (t.DELETED, 0) = 0
         AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
         AND JO.ASSET_ID = AD.ASSET_ID
         AND JOD.POSITION_ITEM_ASSET = T.ITEMS_ID
         AND JOD.ACTION_TAKEN_TYPE = 24044
         AND TRUNC (SYSDATE) = JO.JOB_ORDER_DATE
         AND (JO.ATT_TEMPLATE_ID = :p_template_id OR :p_template_id IS NULL)
         AND (AD.LOCATION_ID = :p_location_id OR :p_location_id IS NULL)
GROUP BY JOD.MINUTE_OR_EQUIB_CATEGORY,
         T.ITEMS_ID,
         T.EN_NAME,
         T.AR_NAME
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getPermissionById:{
    statement:` 
    SELECT PD.DESCRIPTION,
    GET_LOOKUP_NAME (P.PERMISSION_TYPE_ID, 2) permission_type_en,
    GET_LOOKUP_NAME (P.PERMISSION_TYPE_ID, 2) permission_type_ar,
    PD.PERMISSION_ID
FROM PERMISSION_DETAILS pd, PERMISSIONS p, ASSETS_DEFINITION ad
WHERE     NVL (PD.DELETED, 0) = 0
    AND NVL (AD.DELETED, 0) = 0
    AND NVL (p.DELETED, 0) = 0
    AND (P.PERMISSION_ID = PD.PERMISSION_ID)
    AND PD.EQUIPMENT_ID = AD.ASSET_ID
    AND PD.TYPE_ID = 2
    AND (PD.PERMISSION_ID = :PERMISSION_ID OR :PERMISSION_ID IS NULL)

 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getContractorEvaluation:{
    statement:` 
    SELECT S.SUPPLIER_CODE,
      S.EN_NAME,
      S.AR_NAME,
      SU.EN_NAME subsidary_en,
      SU.AR_NAME subsidery_ar,
      GET_LOOKUP_NAME(S.SUPPLIER_CLASSIFICATION,1) as supplier_classification_ar ,
      GET_LOOKUP_NAME(S.SUPPLIER_CLASSIFICATION,2) as supplier_classification_en
 FROM INVENTORY.SUPPLIERS s, AOT_GEN.SUBSIDARIES su
WHERE     NVL (S.DELETED, 0) = 0
      AND NVL (SU.DELETED, 0) = 0
      AND S.SUBSIDIARY_ID = SU.SUBSIDIARY_ID
      AND (S.SUPPLIER_CODE LIKE :p_supp_code || '%' OR :p_supp_code IS NULL)
 `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  }, 
  getContractorData:{
    statement:` 
    
    SELECT S.SUPPLIER_CODE,
           S.EN_NAME,
           S.AR_NAME,
           SU.EN_NAME subsidary_en,
           SU.AR_NAME subsidery_ar
      FROM INVENTORY.SUPPLIERS s, AOT_GEN.SUBSIDARIES su
     WHERE     NVL (S.DELETED, 0) = 0
           AND NVL (SU.DELETED, 0) = 0
           AND S.SUBSIDIARY_ID = SU.SUBSIDIARY_ID
           AND (S.SUPPLIER_CODE LIKE :p_supp_code || '%' OR :p_supp_code IS NULL)`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  }, 
  getItemsWithItemCode:{
    statement:` 
    --------5128--and--5130---merge two screens-----
 SELECT T.ITEMS_ID,
        T.EN_NAME,
        T.AR_NAME,
        IBU.UNITS_ID,
        GET_LOOKUP_NAME (IBU.UNITS_ID, 2) measure_unit,
        SUM (NVL (ibu.CURRENT_BALANCE, 0)) all_items_include_reserved,
        SUM (NVL (ibu.QTY_ON_HAND, 0)) all_items_except_reserved,
        NVL (itmd.MINIMUM_ORDER_QUANTITY, 0) AS min_order_limit,
        NVL (itmd.MAXIMUM_ORDER_QUANTITY, 0) AS max_order_limit
   FROM inventory.ITEMS_BALANCE_UNITS ibu,
        inventory.items t,
        INVENTORY.ITEMS_DETAILS itmd
  WHERE     NVL (ibu.DELETED, 0) = 0
        AND NVL (itmd.DELETED, 0) = 0
        AND NVL (t.DELETED, 0) = 0
        AND IBU.ITEMS_ID = T.ITEMS_ID
        AND T.ITEMS_ID = itmd.ITEMS_ID
        AND (T.ITEM_CODE LIKE :p_item_code || '%' OR :p_item_code IS NULL)
        AND (T.EN_NAME LIKE :p_item_name_en || '%' OR :p_item_name_en IS NULL)
        AND (T.AR_NAME LIKE :p_item_name_ar || '%' OR :p_item_name_ar IS NULL)
        AND (IBU.STORES_ID = :p_store_id OR :p_store_id IS NULL)
GROUP BY T.ITEMS_ID,
        IBU.UNITS_ID,
        itmd.MINIMUM_ORDER_QUANTITY,
        itmd.MAXIMUM_ORDER_QUANTITY,
        T.EN_NAME,
        T.AR_NAME`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getJobOrderCountFine:{
    statement:` 
    SELECT COUNT (*) AS job_order_count
    FROM job_orders jo,
         ACTIONS_DEFINITION acd,
         services s,
         ASSETS_DEFINITION ad
   WHERE     NVL (JO.DELETED, 0) = 0
         AND NVL (ACD.DELETED, 0) = 0
         AND NVL (S.DELETED, 0) = 0
         AND NVL (ad.DELETED, 0) = 0
         AND JO.ACTION_DEF_ID = ACD.ACTION_ID
         AND ACD.SERVICE_ID = S.SERVICE_ID
         AND AD.ASSET_ID = JO.ASSET_ID
         AND (   GET_LOOKUP_NAME (S.TYPE, 2) LIKE :p_service_type_en || '%'
              OR :p_service_type_en IS NULL)
         AND (   GET_LOOKUP_NAME (S.TYPE, 1) LIKE :p_service_type_ar || '%'
              OR :p_service_type_ar IS NULL)
         AND (AD.LOCATION_ID = :p_location_id OR :p_location_id IS NULL)
         AND JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_start_date, 'DD-MM-YYYY')
                                   AND TO_DATE ( :p_end_date, 'DD-MM-YYYY')`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getprecentageincreament:{
    statement:` 

    WITH first_month
    AS (  SELECT JOD.MINUTE_OR_EQUIB_CATEGORY,
                 T.ITEMS_ID,
                 T.EN_NAME,
                 T.AR_NAME,
                 GET_LOOKUP_NAME (JOD.MINUTE_OR_EQUIB_CATEGORY, 2)
                    measure_unit_en,
                 GET_LOOKUP_NAME (JOD.MINUTE_OR_EQUIB_CATEGORY, 1)
                    measure_unit_ar,
                 SUM (JOD.HOUR_MATER_ASSET_COUNT) AS fa_item_count
            FROM job_orders jo,
                 job_order_details jod,
                 project_boq pq,
                 items t
           WHERE     NVL (JO.DELETED, 0) = 0
                 AND NVL (JOD.DELETED, 0) = 0
                 AND NVL (pq.DELETED, 0) = 0
                 AND NVL (t.DELETED, 0) = 0
                 AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
                 AND PQ.BOQ_ID = JO.BOQ_ID
                 AND JOD.POSITION_ITEM_ASSET = T.ITEMS_ID
                 AND JOD.ACTION_TAKEN_TYPE = 24044
                 AND (   JO.ATT_TEMPLATE_ID = :p_template_id
                      OR :p_template_id IS NULL)
                 AND (   PQ.LOCATION_ID = :p_location_id
                      OR :p_location_id IS NULL)
                 AND (   T.ITEM_CODE LIKE :p_item_code || '%'
                      OR :p_item_code IS NULL)
                 AND (   T.EN_NAME LIKE :p_item_name_en || '%'
                      OR :p_item_name_en IS NULL)
                 AND (   T.AR_NAME LIKE :p_item_name_ar || '%'
                      OR :p_item_name_ar IS NULL)
                 AND JO.JOB_ORDER_DATE BETWEEN TO_DATE (
                                                  :p_first_month_start_date,
                                                  'DD-MM-YYYY')
                                           AND TO_DATE (
                                                  :p_first_month_end_date,
                                                  'DD-MM-YYYY')
        GROUP BY JOD.MINUTE_OR_EQUIB_CATEGORY,
                 T.ITEMS_ID,
                 T.EN_NAME,
                 T.AR_NAME),
    second_month
    AS (  SELECT JOD.MINUTE_OR_EQUIB_CATEGORY,
                 T.ITEMS_ID,
                 T.EN_NAME,
                 T.AR_NAME,
                 GET_LOOKUP_NAME (JOD.MINUTE_OR_EQUIB_CATEGORY, 2)
                    measure_unit_en,
                 GET_LOOKUP_NAME (JOD.MINUTE_OR_EQUIB_CATEGORY, 1)
                    measure_unit_ar,
                 SUM (JOD.HOUR_MATER_ASSET_COUNT) AS se_item_count
            FROM job_orders jo,
                 job_order_details jod,
                 project_boq pq,
                 items t
           WHERE     NVL (JO.DELETED, 0) = 0
                 AND NVL (JOD.DELETED, 0) = 0
                 AND NVL (pq.DELETED, 0) = 0
                 AND NVL (t.DELETED, 0) = 0
                 AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
                 AND PQ.BOQ_ID = JO.BOQ_ID
                 AND JOD.POSITION_ITEM_ASSET = T.ITEMS_ID
                 AND JOD.ACTION_TAKEN_TYPE = 24044
                 AND (   JO.ATT_TEMPLATE_ID = :p_template_id
                      OR :p_template_id IS NULL)
                 AND (   PQ.LOCATION_ID = :p_location_id
                      OR :p_location_id IS NULL)
                 AND (   T.ITEM_CODE LIKE :p_item_code || '%'
                      OR :p_item_code IS NULL)
                 AND (   T.EN_NAME LIKE :p_item_name_en || '%'
                      OR :p_item_name_en IS NULL)
                 AND (   T.AR_NAME LIKE :p_item_name_ar || '%'
                      OR :p_item_name_ar IS NULL)
                 AND JO.JOB_ORDER_DATE BETWEEN TO_DATE (
                                                  :p_second_month_start_date,
                                                  'DD-MM-YYYY')
                                           AND TO_DATE (
                                                  :p_second_month_end_date,
                                                  'DD-MM-YYYY')
        GROUP BY JOD.MINUTE_OR_EQUIB_CATEGORY,
                 T.ITEMS_ID,
                 T.EN_NAME,
                 T.AR_NAME)
SELECT first_month.ITEMS_ID,
      first_month.EN_NAME,
      first_month.AR_NAME,
      first_month.MINUTE_OR_EQUIB_CATEGORY,
      first_month.measure_unit_en,
      first_month.measure_unit_ar,
         ( (first_month.fa_item_count / second_month.se_item_count) * 100)
      || ' '
      || '%'
         increase_percentage
 FROM first_month, second_month
WHERE     first_month.ITEMS_ID = second_month.ITEMS_ID
      AND first_month.MINUTE_OR_EQUIB_CATEGORY =
             second_month.MINUTE_OR_EQUIB_CATEGORY`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getItems:{
    statement:` 
    SELECT T.ITEMS_ID,
    T.ITEM_CODE,
    T.AR_NAME,
    T.EN_NAME,
    T.EN_DESCRIPTION,
    T.AR_DESCRIPTION
FROM inventory.items t
WHERE     NVL (T.DELETED, 0) = 0
    AND (T.ITEM_CODE LIKE :p_item_code || '%' OR :p_item_code IS NULL)
    AND (T.EN_NAME LIKE :p_item_name_en || '%' OR :p_item_name_en IS NULL)
    AND (T.AR_NAME LIKE :p_item_name_ar || '%' OR :p_item_name_ar IS NULL)`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getAssetSerial:{
    statement:` 
    SELECT 
    ASSET_ID,
     ASSET_NAME,
      DESCRIPTION, 
       ASSET_SERIAL
    FROM HR.ASSETS_DEFINITION WHERE DELETED = 0 AND (ASSET_SERIAL = :ASSET_SERIAL or :ASSET_SERIAL is null)`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getCountForCleanBases:{
    statement:` 
    SELECT COUNT (*) AS job_order_count
  FROM job_orders jo,
       ACTIONS_DEFINITION acd,
       services s,
       ASSETS_DEFINITION ad
 WHERE     NVL (JO.DELETED, 0) = 0
       AND NVL (ACD.DELETED, 0) = 0
       AND NVL (S.DELETED, 0) = 0
       AND NVL (ad.DELETED, 0) = 0
       AND JO.ACTION_DEF_ID = ACD.ACTION_ID
       AND ACD.SERVICE_ID = S.SERVICE_ID
       AND AD.ASSET_ID = JO.ASSET_ID
       AND (   GET_LOOKUP_NAME (S.TYPE, 2) LIKE :p_service_type_en || '%'
            OR :p_service_type_en IS NULL)
       AND (   GET_LOOKUP_NAME (S.TYPE, 1) LIKE :p_service_type_ar || '%'
            OR :p_service_type_ar IS NULL)
       AND (AD.LOCATION_ID = :p_location_id OR :p_location_id IS NULL)
       AND JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_start_date, 'DD-MM-YYYY')
                                 AND TO_DATE ( :p_end_date, 'DD-MM-YYYY')`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  }, 
  getMaterialByLocOrShift:{
    statement:` 
    SELECT JOD.MINUTE_OR_EQUIB_CATEGORY,T.EN_NAME , T.AR_NAME,T.EN_DESCRIPTION,T.AR_DESCRIPTION,
         GET_LOOKUP_NAME (JOD.MINUTE_OR_EQUIB_CATEGORY, 2) unit_name_en,
         GET_LOOKUP_NAME (JOD.MINUTE_OR_EQUIB_CATEGORY, 1) unit_name_ar, 
         SUM (JOD.HOUR_MATER_ASSET_COUNT) AS item_count
    FROM job_orders jo, job_order_details jod ,ACTIONS_DEFINITION acd , ITEMS T , project_boq pq
   WHERE     NVL (JOD.DELETED, 0) = 0
         AND NVL (jo.DELETED, 0) = 0
         AND NVL (acd.DELETED, 0) = 0
         AND NVL (T.DELETED, 0) = 0
         AND NVL (pq.DELETED, 0) = 0
         AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
         and JO.ACTION_DEF_ID=ACD.ACTION_ID
         and jod.POSITION_ITEM_ASSET=T.ITEMS_ID
         and PQ.BOQ_ID=JO.BOQ_ID
         AND JOD.ACTION_TAKEN_TYPE = 24044
         AND (JO.PROJECT_ID = :p_project_id or :p_project_id is null)
         AND (JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                                    AND TO_DATE ( :p_to_date, 'DD/MM/YYYY') or (:p_from_date is null and :p_to_date is null))
         AND (JO.PROJECT_ID = :p_project_id OR :p_project_id IS NULL)
         AND (ACD.SERVICE_ID = :p_service_id OR :p_service_id IS NULL)
         AND (JO.ASSET_ID = :p_asset_id OR :p_asset_id IS NULL)
         AND (JO.ATT_TEMPLATE_ID = :p_template_id OR :p_template_id IS NULL)
         and (PQ.LOCATION_ID = :p_location_id or :p_location_id is null)  
GROUP BY JOD.MINUTE_OR_EQUIB_CATEGORY,T.EN_NAME , T.AR_NAME,T.EN_DESCRIPTION,T.AR_DESCRIPTION
                                   `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getActivity:{
    statement:` 
    SELECT JO.CODE as job_order_code,
    JO.JOB_ORDER_DESC,
    ADS.ASSET_NAME,
    GET_LOOKUP_NAME(AA.RECURRING,2) as recuring_en,
    GET_LOOKUP_NAME(AA.RECURRING,1) as recuring_ar
FROM job_orders jo ,ACTIONS_DEFINITION acd ,SERVICES s , ASSETS_DEFINITION ads , ASSET_ACTIONS aa ,project_boq pq
WHERE     NVL (jo.DELETED, 0) = 0
    AND NVL (acd.DELETED, 0) = 0
    AND NVL (s.DELETED, 0) = 0
    AND NVL (ADS.DELETED, 0) = 0
    AND NVL (aa.DELETED, 0) = 0
    AND NVL (pq.DELETED, 0) = 0
    AND JO.ACTION_DEF_ID=ACD.ACTION_ID
    and ACD.SERVICE_ID=S.SERVICE_ID
    and JO.ASSET_ID=ADS.ASSET_ID
    and AA.ACTION_ID=JO.ACTION_DEF_ID
    and AA.ASSET_ID=JO.ASSET_ID
    and PQ.BOQ_ID=JO.BOQ_ID
    AND (jo.ATT_TEMPLATE_ID = :P_TEMPLATE_ID or :P_TEMPLATE_ID is null)
    AND (S.OPERATION_TYPE =:p_service_op_type or :p_service_op_type is null)
    and (PQ.LOCATION_ID = :p_location_id or :p_location_id is null)
                                   `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
   getOpType:{
    statement:` 
                    SELECT S.SERVICE_ID , 
                    S.OPERATION_TYPE,
                    GET_LOOKUP_NAME (S.OPERATION_TYPE, 2) maintain_type_en,
                    GET_LOOKUP_NAME (S.OPERATION_TYPE, 1) maintain_type_ar
                                                            FROM SERVICES s
                                                           WHERE     NVL (
                                                                        S.DELETED,
                                                                        0) =
                                                                        0
                                                                 AND S.OPERATION_TYPE =
                                                                        :p_service_op_type or :p_service_op_type is null`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getServiceBySerID:{
    statement:` 
                    SELECT S.SERVICE_ID , 
                    S.OPERATION_TYPE,
                    GET_LOOKUP_NAME (S.OPERATION_TYPE, 2) maintain_type_en,
                    GET_LOOKUP_NAME (S.OPERATION_TYPE, 1) maintain_type_ar
                                                            FROM SERVICES s
                                                           WHERE     NVL (
                                                                        S.DELETED,
                                                                        0) =
                                                                        0
                                                                 AND S.OPERATION_TYPE =
                                                                        :p_service_op_type or :p_service_op_type is null`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getRangeOfEquibment:{
   statement:` 
   
SELECT JO.JOB_ORDER_ID,
JO.JOB_ORDER_DESC,
JO.JOB_ORDER_DATE,
GET_LOOKUP_NAME (S.OPERATION_TYPE, 2) maintain_type_en,
GET_LOOKUP_NAME (S.OPERATION_TYPE, 1) maintain_type_ar,
GET_LOOKUP_NAME (AA.RECURRING, 2) AS recuring_en,
GET_LOOKUP_NAME (AA.RECURRING, 1) AS recuring_ar
FROM job_orders jo,
ASSETS_DEFINITION ad,
ACTIONS_DEFINITION acd,
services s,
ASSET_ACTIONS aa,
project_boq pq
WHERE     NVL (JO.DELETED, 0) = 0
AND NVL (AD.DELETED, 0) = 0
AND NVL (ACD.DELETED, 0) = 0
AND NVL (S.DELETED, 0) = 0
AND NVL (aa.DELETED, 0) = 0
AND NVL (pq.DELETED, 0) = 0
AND JO.ASSET_ID = AD.ASSET_ID
AND ACD.ACTION_ID = JO.ACTION_DEF_ID
AND AA.ACTION_ID = JO.ACTION_DEF_ID
AND AA.ASSET_ID = JO.ASSET_ID
AND ACD.SERVICE_ID = S.SERVICE_ID
AND PQ.BOQ_ID=JO.BOQ_ID
AND (   AD.ASSET_SERIAL LIKE :p_asset_serial || '%'
     OR :p_asset_serial IS NULL)
AND (PQ.LOCATION_ID = :p_location_id or :p_location_id is null)         
AND JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_start_date, 'DD-MM-YYYY')
                          AND (TO_DATE ( :p_end_date, 'DD-MM-YYYY')) `,
   returns: [],
   bindings: [],
   qstring: "",
   requireCommit: false
 },getAssetData:{
  statement:` 
  SELECT distinct AD.ASSET_ID,
  AD.ASSET_NAME,
  AD.ASSET_SERIAL,
  AD.DESCRIPTION,
  GET_LOOKUP_NAME (AD.ASSET_TYPE, 2) asset_type_en,
  GET_LOOKUP_NAME (AD.ASSET_TYPE, 1) asset_type_ar
FROM ASSETS_DEFINITION ad, job_orders jo, job_order_details jod ,project_boq pq
WHERE     NVL (AD.DELETED, 0) = 0
  AND NVL (jo.DELETED, 0) = 0
  AND NVL (jod.DELETED, 0) = 0
  AND NVL (pq.DELETED, 0) = 0
  AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
  AND JOD.ACTION_TAKEN_TYPE = 24043
  AND JOD.POSITION_ITEM_ASSET = AD.ASSET_ID
  and PQ.BOQ_ID=JO.BOQ_ID
  AND (JO.ATT_TEMPLATE_ID = :p_template_id OR :p_template_id IS NULL)
  and (PQ.LOCATION_ID = :p_location_id or :p_location_id is null)`,
  returns: [],
  bindings: [],
  qstring: "",
  requireCommit: false
},
getAssetCount:{
  statement:` 
  SELECT COUNT (*) AS equibment_count
  FROM ASSETS_DEFINITION ad, job_orders jo, job_order_details jod ,project_boq pq
 WHERE     NVL (AD.DELETED, 0) = 0
       AND NVL (jo.DELETED, 0) = 0
       AND NVL (jod.DELETED, 0) = 0
       AND NVL (pq.DELETED, 0) = 0
       AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
       AND JOD.ACTION_TAKEN_TYPE = 24043
       AND JOD.POSITION_ITEM_ASSET = AD.ASSET_ID
       AND PQ.BOQ_ID=JO.BOQ_ID
       AND (JO.ATT_TEMPLATE_ID = :p_template_id OR :p_template_id IS NULL)
       and (PQ.LOCATION_ID = :p_location_id or :p_location_id is null) `,
  returns: [],
  bindings: [],
  qstring: "",
  requireCommit: false
},
getAssetStatus:{
  statement:` 
  SELECT AD.ASSET_NAME,
      CASE
         WHEN AD.ASSET_STATUS = 1 THEN 'Active'
         WHEN AD.ASSET_STATUS = 2 THEN 'Not Active'
         ELSE 'Retirement'
      END
         AS status
 FROM ASSETS_DEFINITION ad
WHERE     NVL (AD.DELETED, 0) = 0
      AND (   AD.ASSET_SERIAL LIKE :p_equib_serial || '%'
           OR :p_equib_serial IS NULL)`,
  returns: [],
  bindings: [],
  qstring: "",
  requireCommit: false
},
geEquMainStatus:{
  statement:` 
  SELECT 'Under Maintain',M.MISSION_DESCRIPTION, M.START_DATE, M.END_DATE 
  FROM ATT.HR_MISSIONS m, ASSETS_DEFINITION ad
 WHERE     NVL (AD.DELETED, 0) = 0
       AND M.OPERATION_TYPE = 2
       AND M.EMPLOYEE_ID = AD.ASSET_ID
       AND AD.ASSET_SERIAL = :p_equib_serial
       AND (TO_DATE ( :p_date, 'DD-MM-YYYY') BETWEEN M.START_DATE
                                                 AND M.END_DATE )`,
  returns: [],
  bindings: [],
  qstring: "",
  requireCommit: false

},
gitActivityByLocOrShift:{
  statement:` 
  SELECT distinct(jod.ACTIVITY_ACTION_ID),
       AA.ACTIVITY_TITLE_EN,
       AA.ACTIVITY_TITLE_AR
  FROM job_orders jo, job_order_details jod, ACTIVITY_ACTIONS aa 
 WHERE     NVL (JOD.DELETED, 0) = 0
       AND NVL (aa.DELETED, 0) = 0
       AND NVL (jo.DELETED, 0) = 0
       AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
       AND JOD.ACTIVITY_ACTION_ID = AA.ACTIVITY_ACTION_ID
       AND jo.ATT_TEMPLATE_ID = :P_TEMPLATE_ID
       AND JO.ASSET_ID IN (SELECT ADS.ASSET_ID
                             FROM ASSETS_DEFINITION ads
                            WHERE     NVL (ads.DELETED, 0) = 0
                                  AND ADS.LOCATION_ID = :p_location_id or :p_location_id is null)
       AND JO.ACTION_DEF_ID IN (SELECT AD.ACTION_ID
                                  FROM ACTIONS_DEFINITION ad
                                 WHERE     NVL (AD.DELETED, 0) = 0
                                       AND AD.SERVICE_ID IN (SELECT S.SERVICE_ID
                                                               FROM SERVICES s
                                                              WHERE     NVL (
                                                                           S.DELETED,
                                                                           0) =
                                                                           0
                                                                    AND S.OPERATION_TYPE =
                                                                           :p_service_op_type or :p_service_op_type is null))`,
  returns: [],
  bindings: [],
  qstring: "",
  requireCommit: false
}, 
gitworkOrderByWeek:{
  statement:` 
  SELECT  ACD.ACTION_TITLE_EN,
               ACD.ACTION_TITLE_AR,
               GET_LOOKUP_NAME (S.OPERATION_TYPE, 2) oper_type_en,
               GET_LOOKUP_NAME (S.OPERATION_TYPE, 1) oper_type_ar,
               GET_LOOKUP_NAME (aa.RECURRING, 1) RECURRING_AR,
               GET_LOOKUP_NAME (aa.RECURRING, 2) RECURRING_EN,
               (select ASSET_NAME from ASSETS_DEFINITION AD where AD.ASSET_ID = aa.ASSET_ID ) ASSET_NAME
 FROM DETAIL_PLAN dp,
      ASSET_ACTIONS aa,
      ACTIONS_DEFINITION acd,
      services s
WHERE     NVL (DP.DELETED, 0) = 0
      AND NVL (aa.DELETED, 0) = 0
      AND NVL (acd.DELETED, 0) = 0
      AND NVL (s.DELETED, 0) = 0
      AND DP.ASSET_ACTION_ID = AA.ASSET_ACTION_ID
      AND AA.ACTION_ID = ACD.ACTION_ID
      AND ACD.SERVICE_ID = S.SERVICE_ID
      AND (   DP.ASSET_ACTION_DISPATCHED = 0
           OR DP.ASSET_ACTION_DISPATCHED IS NULL)
      AND DP.DISPATCH_DATE BETWEEN TO_DATE ( :p_start_date, 'DD-MM-YYYY')
                               AND (TO_DATE ( :p_end_date, 'DD-MM-YYYY'))`,
  returns: [],
  bindings: [],
  qstring: "",
  requireCommit: false
},
getweeklyPlanForCleanSearvices:{
  statement:` 
  SELECT ACD.ACTION_TITLE_EN,
  ACD.ACTION_TITLE_AR,
  GET_LOOKUP_NAME (S.OPERATION_TYPE, 2) oper_type_en,
  GET_LOOKUP_NAME (S.OPERATION_TYPE, 1) oper_type_ar
FROM DETAIL_PLAN dp,
  ASSET_ACTIONS aa,
  ACTIONS_DEFINITION acd,
  services s
WHERE     NVL (DP.DELETED, 0) = 0
  AND NVL (aa.DELETED, 0) = 0
  AND NVL (acd.DELETED, 0) = 0
  AND NVL (s.DELETED, 0) = 0
  AND DP.ASSET_ACTION_ID = AA.ASSET_ACTION_ID
  AND AA.ACTION_ID = ACD.ACTION_ID
  AND ACD.SERVICE_ID = S.SERVICE_ID
  AND S.TYPE=24054                     
  AND DP.DISPATCH_DATE BETWEEN TO_DATE ( :p_start_date, 'DD-MM-YYYY')
                           AND (TO_DATE ( :p_end_date, 'DD-MM-YYYY'))`,
  returns: [],
  bindings: [],
  qstring: "",
  requireCommit: false
},
getLabourCountAndName:{
  statement:` 
  SELECT JOD.POSITION_ITEM_ASSET,
  P.SECONDARY_NAME,
  P.PRIMARY_NAME,
  COUNT (*) AS labor_no
FROM job_order_details jod,
  job_orders jo,
  ACTIONS_DEFINITION ad,
  SERVICES s,
  positions p,
  project_boq pq
WHERE     NVL (JOD.DELETED, 0) = 0
  AND NVL (JO.DELETED, 0) = 0
  AND NVL (AD.DELETED, 0) = 0
  AND NVL (S.DELETED, 0) = 0
  AND NVL (p.DELETED, 0) = 0
  AND NVL (pq.DELETED, 0) = 0
  AND PQ.BOQ_ID = JO.BOQ_ID
  AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
  AND JO.ACTION_DEF_ID = AD.ACTION_ID
  AND AD.SERVICE_ID = S.SERVICE_ID
  AND P.POSITION_ID = JOD.POSITION_ITEM_ASSET
  AND JOD.ACTION_TAKEN_TYPE = 24042
  AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
  AND JO.ACTION_DEF_ID = ad.ACTION_ID
  AND (S.TYPE = :p_service_type   or  :p_service_type  is null)
  AND (JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                             AND TO_DATE ( :p_to_date, 'DD/MM/YYYY'))
  AND (JO.PROJECT_ID = :p_project_id OR :p_project_id IS NULL)
  AND (JO.ATT_TEMPLATE_ID = :p_template_id OR :p_template_id IS NULL)
  AND (PQ.LOCATION_ID = :p_location_id OR :p_location_id IS NULL)
GROUP BY JOD.POSITION_ITEM_ASSET, P.SECONDARY_NAME, P.PRIMARY_NAME `,
  returns: [],
  bindings: [],
  qstring: "",
  requireCommit: false
},
getJobOrderDateByAssetANdProject:{
  statement:` 
  SELECT 
                JOB_ORDER_ID, 
                JOB_ORDER_DESC, 
                JOB_ORDER_DATE, 
                 ASSET_ID,    -- 
                    ATT_TEMPLATE_ID,   
                    TEMPLATE_NAME_EN, 
                TEMPLATE_NAME_AR,
                    SERVICE_TITLE_EN,
                    SERVICE_TITLE_AR, 
                SERVICE_TYPE_EN,
                    SERVICE_TYPE_AR, 
                    SERVICE_OPER_TYPE_EN, 
                SERVICE_OPER_TYPE_AR,
                    PROJECT_ID, 
                    PRIMARY_NAME ,  -- 
                SECONDARY_NAME,
                    BOQ_DESCRIPTION, 
                    MILESTONE_NAME, 
                ASSET_NAME,
                    ASSET_TYPE_EN,  
                    ASSET_TYPE_AR, 
                ACTION_TITLE_EN,
                    ACTION_TITLE_AR, 
                    JOB_ORDER_TYPE_EN, 
                JOB_ORDER_TYPE_AR,
                    JOB_ORDER_STATUS_EN,
                    JOB_ORDER_STATUS_AR
                FROM HR.JOB_ORDERS_DATA 
                 WHERE ( PROJECT_ID = :PROJECT_ID OR :PROJECT_ID IS NULL)
                   AND (ASSET_ID = :ASSET_ID OR :ASSET_ID IS NULL) `,
  returns: [],
  bindings: [],
  qstring: "",
  requireCommit: false
},
getEquibMentCountByAssPro:{
  statement:` 
  SELECT JOD.POSITION_ITEM_ASSET, ADS.ASSET_NAME, COUNT (*) AS equibment_count
FROM JOB_ORDER_DETAILS jod,
     job_orders jo,
     ACTIONS_DEFINITION acd,
     ASSETS_DEFINITION ads,
     project_boq pq
WHERE     NVL (jod.DELETED, 0) = 0
     AND NVL (JO.DELETED, 0) = 0
     AND NVL (acd.DELETED, 0) = 0
     AND NVL (ads.DELETED, 0) = 0
     AND NVL (pq.DELETED, 0) = 0
     AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
     AND JO.ACTION_DEF_ID = ACD.ACTION_ID
     AND JOD.POSITION_ITEM_ASSET = ADS.ASSET_ID
     AND PQ.BOQ_ID=JO.BOQ_ID
     AND JOD.ACTION_TAKEN_TYPE = 24043
     AND (JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                                AND TO_DATE ( :p_to_date, 'DD/MM/YYYY'))
     AND (JO.PROJECT_ID = :p_project_id OR :p_project_id IS NULL)
     AND (ACD.SERVICE_ID = :p_service_id OR :p_service_id IS NULL)
     AND (JO.ASSET_ID = :p_asset_id OR :p_asset_id IS NULL)
     AND (JO.ATT_TEMPLATE_ID = :p_template_id OR :p_template_id IS NULL)
     AND (PQ.LOCATION_ID = :p_location_id or :p_location_id is null)
GROUP BY JOD.POSITION_ITEM_ASSET, ADS.ASSET_NAME `,
  returns: [],
  bindings: [],
  qstring: "",
  requireCommit: false
},
getIncidentCountByAssPro:{
  statement:` 
  SELECT ISS.VIOLATION_ID,
  VGD.TITLE_EN AS violation_name_en,
  VGD.TITLE_AR AS violation_name_ar,
  COUNT (*) AS incident_count
FROM issues iss,
  job_orders jo,
  ACTIONS_DEFINITION acd,
  VIOLATION_GROUP_DETAILS vgd,
  project_boq pq,
  services s
WHERE     NVL (iss.DELETED, 0) = 0
  AND NVL (jo.DELETED, 0) = 0
  AND NVL (acd.DELETED, 0) = 0
  AND NVL (vgd.DELETED, 0) = 0
  AND NVL (pq.DELETED, 0) = 0
  AND NVL (s.DELETED, 0) = 0
  AND JO.JOB_ORDER_ID = ISS.JOB_ORDER_ID
  AND JO.ACTION_DEF_ID = ACD.ACTION_ID
  and ACD.SERVICE_ID = S.SERVICE_ID
  AND VGD.VIOLATION_ID = ISS.VIOLATION_ID
  AND PQ.BOQ_ID = JO.BOQ_ID
  AND ISS.TYPE_ID = 12275
  AND (JO.JOB_ORDER_DATE BETWEEN TO_DATE ( :p_from_date, 'DD/MM/YYYY')
                             AND TO_DATE ( :p_to_date, 'DD/MM/YYYY'))
  AND (JO.PROJECT_ID = :p_project_id OR :p_project_id IS NULL)
  AND (S.TYPE = :p_service_type OR :p_service_type IS NULL)
  AND (JO.ASSET_ID = :p_asset_id OR :p_asset_id IS NULL)
  AND (PQ.LOCATION_ID = :p_location_id OR :p_location_id IS NULL)
  AND (JO.ATT_TEMPLATE_ID = :p_template_id OR :p_template_id IS NULL)
GROUP BY ISS.VIOLATION_ID, VGD.TITLE_EN, VGD.TITLE_AR`,
  returns: [],
  bindings: [],
  qstring: "",
  requireCommit: false
},
getWasteByLocOrShift:{
  statement:` 
  
SELECT AA.ACTIVITY_TITLE_EN,
AA.ACTIVITY_TITLE_AR,
JOD.ACTIVITY_VALUE ,
GET_LOOKUP_NAME (AA.ACTIVITY_TYPE_ID, 2) activity_type_en,
GET_LOOKUP_NAME (AA.ACTIVITY_TYPE_ID, 1) activity_type_ar,
GET_LOOKUP_NAME (AA.ACTION_TAKEN_TYPE, 2) action_type_en,
GET_LOOKUP_NAME (AA.ACTION_TAKEN_TYPE, 1) action_type_ar,
ats.RULE_EN_NAME template_name_en,
ats.RULE_AR_NAME template_name_AR
FROM job_order_details jod,
ACTIVITY_ACTIONS aa,
job_orders jo,
project_boq pq,
ATT.HR_ATT_RULE_TEMPLATE atr,
ATT.HR_AT_RULES_SETTINGS ats,
ACTIONS_DEFINITION acd ,
services s
WHERE     NVL (JOD.DELETED, 0) = 0
AND NVL (AA.DELETED, 0) = 0
AND NVL (jo.DELETED, 0) = 0
AND NVL (acd.DELETED, 0) = 0
AND NVL (s.DELETED, 0) = 0
AND NVL (pq.DELETED, 0) = 0
AND NVL (ATR.DELETED, 0) = 0
AND NVL (ATS.DELETED, 0) = 0
and AA.ACTION_TAKEN_TYPE=11257
AND JO.JOB_ORDER_ID = JOD.JOB_ORDER_ID
and PQ.BOQ_ID=JO.BOQ_ID
and ATR.TEMPLATE_ID=JO.ATT_TEMPLATE_ID
AND ats.RULE_SETTING_ID = atr.RULE_SETTING_ID
AND JOD.ACTIVITY_ACTION_ID = AA.ACTIVITY_ACTION_ID
and JO.ACTION_DEF_ID=ACD.ACTION_ID
and ACD.SERVICE_ID=S.SERVICE_ID
and (PQ.LOCATION_ID = :p_location_id or :p_location_id is null)
AND (JO.ATT_TEMPLATE_ID = :p_template_id OR :p_template_id IS NULL)
AND (S.TYPE = :p_ser_type_id OR :p_ser_type_id IS NULL) `,
  returns: [],
  bindings: [],
  qstring: "",
  requireCommit: false
},
purshasingOrder:{
  statement:` 
  SELECT T.EN_NAME,
      T.AR_NAME,
      T.EN_DESCRIPTION,
      T.AR_DESCRIPTION,
      SP.MIN_QUANTITY,
      NVL (SP.MAX_QUANTITY , 0 ) MAX_Quantity
 FROM items t, inventory.SHORTAGE_POLICY sp
WHERE     T.SHORTAGE_POLICY_ID = sp.SHORTAGE_POLICY_ID
      AND NVL (T.DELETED, 0) = 0
      AND NVL (SP.DELETED, 0) = 0
     AND (T.ITEM_CODE LIKE :p_item_code || '%' OR :p_item_code IS NULL)
      AND (T.EN_NAME LIKE :p_item_name_en || '%' OR :p_item_name_en IS NULL)
      AND (T.AR_NAME LIKE :p_item_name_ar || '%' OR :p_item_name_ar IS NULL) `,
  returns: [],
  bindings: [],
  qstring: "",
  requireCommit: false
},
ReportVariance:{
  statement:` 
  SELECT 
   START_WEEK,
    END_WEEK,
    V_EQUIB_COUNT AS EQUIPMENT_COUNT ,
    (
    CASE
      WHEN V_EQUIB_PERCENTAGE IS NULL
      OR V_EQUIB_PERCENTAGE    =0
      THEN ' '
      ELSE ROUND(V_EQUIB_PERCENTAGE,3)
        ||' '
        ||'%'
    END)          AS EUIPMENT_INCREASE_PERCENTAGE ,
    V_LABOR_COUNT AS LABOR_COUNT ,
    (
    CASE
      WHEN V_LABOR_PERCENTAGE IS NULL
      OR V_LABOR_PERCENTAGE    =0
      THEN ' '
      ELSE ROUND(V_LABOR_PERCENTAGE,3)
        ||' '
        ||'%'
    END)             AS LABOR_INCREASE_PERCENTAGE,
    V_MATERIAL_COUNT AS MATERIAL_COUNT,
    (
    CASE
      WHEN V_MATERIAL_PERCENTAGE IS NULL
      OR V_MATERIAL_PERCENTAGE    =0
      THEN ' '
      ELSE ROUND(V_MATERIAL_PERCENTAGE,3)
        ||' '
        ||'%'
    END)             AS MATERIAL_INCREASE_PERCENTAGE,
    v_incident_count AS INCIDENT_COUNT,
    (
    CASE
      WHEN v_incident_percentage IS NULL
      OR v_incident_percentage    =0
      THEN ' ' 
      ELSE ROUND(v_incident_percentage,3)
        ||' '
        ||'%'
    END) AS INCIDENT_INCREASE_PERCENTAGE
    FROM TABLE(variance_rep_pkg.get_weeks(to_date(:p_from_date, 'DD-MM-YYYY'), to_date(:p_to_date, 'DD-MM-YYYY'),:p_project_id,:p_service_type,:p_location_id,:p_template_id))`,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
  },

getProjectsAndItsLocations :{
  statement : `SELECT (CASE
    WHEN PT2.PROJECT_ID IS NOT NULL AND PT2.PARENT_PIN_ID IS NULL
    THEN
       PT2.PROJECT_ID
    WHEN PT2.PROJECT_ID IS NULL AND PT2.PARENT_PIN_ID IS NOT NULL
    THEN
       (SELECT PT4.PROJECT_ID
          FROM PIN_TREES pt4
         WHERE     NVL (PT4.DELETED, 0) = 0
               AND PT4.PIN_ID = PT2.PARENT_PIN_ID)
    ELSE
       PT2.PROJECT_ID
 END)
   AS proj_id,
(CASE
    WHEN     PT2.PROJECT_ID IS NOT NULL
         AND PT2.MAIN_NODE = 1
         AND PT2.CLASSIFICATION = 1
    THEN
       (SELECT P.PRIMARY_NAME
          FROM projects p
         WHERE     NVL (P.DELETED, 0) = 0
               AND P.PROJECT_ID = PT2.PROJECT_ID)
    ELSE
       ' '
 END)
   AS AR_Name,
(CASE
    WHEN     PT2.PROJECT_ID IS NOT NULL
         AND PT2.MAIN_NODE = 1
         AND PT2.CLASSIFICATION = 1
    THEN
       (SELECT P.SECONDARY_NAME
          FROM projects p
         WHERE     NVL (P.DELETED, 0) = 0
               AND P.PROJECT_ID = PT2.PROJECT_ID)
    ELSE
       ' '
 END)
   AS EN_Name,
PT2.PIN_ID,
PT2.LABEL_EN AS EN_Name,
PT2.LABEL_AR AS AR_Name,
PT2.PARENT_PIN_ID,
(CASE
    WHEN     PT2.PROJECT_ID IS NOT NULL
         AND PT2.PIN_ID IS NOT NULL
         AND PT2.PARENT_PIN_ID IS NULL
    THEN
       'project'                 --display root location as project
    WHEN PT2.PIN_ID IS NULL AND PT2.PARENT_PIN_ID IS NULL
    THEN
       'project'
    WHEN PT2.PARENT_PIN_ID IS NOT NULL
    THEN
       'location'
    ELSE
       ' '
 END)
   AS node_type
FROM PIN_TREES pt2
WHERE NVL (PT2.DELETED, 0) = 0
START WITH     PT2.PARENT_PIN_ID IS NULL
AND PT2.MAIN_NODE = 1
AND PT2.CLASSIFICATION = 1
CONNECT BY PRIOR PT2.PIN_ID = PT2.PARENT_PIN_ID
UNION
SELECT pr.PROJECT_ID,
pr.PRIMARY_NAME AS AR_Name,
pr.SECONDARY_NAME AS EN_name,
NULL AS PIN_ID,
' ' AS LABEL_EN,
' ' AS LABEL_AR,
NULL AS PARENT_PIN_ID,
'project' AS node_type
FROM projects pr
WHERE     NVL (PR.DELETED, 0) = 0
AND PR.PROJECT_ID NOT IN (SELECT PT.PROJECT_ID
                        FROM PIN_TREES pt
                       WHERE     NVL (PT.DELETED, 0) = 0
                             AND PT.MAIN_NODE = 1
                             AND PT.CLASSIFICATION = 1)` ,
                      
  bindings: [],
  qstring: "",
  requireCommit: false       

},
getProjectsById :{
  statement : `SELECT pr.PROJECT_ID,
  pr.PRIMARY_NAME AS AR_Name,
  pr.SECONDARY_NAME AS EN_name
  FROM projects pr WHERE pr.PROJECT_ID = :PROJECT_ID` ,             
  bindings: [],
  qstring: "",
  requireCommit: false       

},
getEmployeesByloCOrSHift :{
  statement : ` SELECT DISTINCT
  GETEMPNAME_LANG (E.EMPLOYEE_ID, 1, 2) emp_name_en,
  GETEMPNAME_LANG (E.EMPLOYEE_ID, 1, 1) emp_name_ar
FROM HR.issues iss,
  AOT_GEN.EMPLOYEES e,
  HR.ASSETS_DEFINITION ad,
  HR.VIOLATION_GROUP_DETAILS vgd
WHERE     NVL (iss.DELETED, 0) = 0
  AND NVL (e.DELETED, 0) = 0
  AND NVL (ad.DELETED, 0) = 0
  AND NVL (vgd.DELETED, 0) = 0
  and ISS.VIOLATION_ID=VGD.VIOLATION_ID
  AND ISS.EMPLOYEE_ID = E.EMPLOYEE_ID
  AND ISS.ASSEET_ID = AD.ASSET_ID
  AND (ISS.SHIFT = :p_template_id OR :p_template_id IS NULL)
  AND (AD.LOCATION_ID = :p_location_id OR :p_location_id IS NULL)` ,             
  bindings: [],
  qstring: "",
  requireCommit: false       

},
getAllProjects :{
  statement : `SELECT PIN_ID, LABEL_AR PROJECT_AR, LABEL_EN PROJECT_EN , MAIN_NODE, PROJECT_ID, CLASSIFICATION  
  FROM HR.PIN_TREES 
  where project_id is not null and nvl(deleted , 0) = 0 AND PARENT_PIN_ID IS NULL AND  CLASSIFICATION=1 
  ` ,             
  bindings: [],
  qstring: "",
  requireCommit: false       

},
getAllProjectsDetails :{
  statement : `  SELECT  pin_id ,  label_ar ,label_en,parent_pin_id  , level 
  from hr.pin_trees
  where nvl(deleted , 0)= 0  START WITH parent_pin_id = :p_parent_id
  CONNECT BY PRIOR pin_id = parent_pin_id 
  ` ,             
  bindings: [],
  qstring: "",
  requireCommit: false       

},
getAllShiftsBylocationID :{
  statement : `  select distinct template_id , 
                        template_ar_name , 
                        template_en_name 
                  from ATT.HR_ATT_RULE_TEMPLATE a,
                   ATT.HR_ATT_SHIFT_LOCATIONS b
                  where a.rule_setting_id = b.rule_setting_id  and b.location_id = :p_location
                  and nvl(a.deleted , 0) = 0   and nvl(b.deleted , 0) = 0  ` ,             
  bindings: [],
  qstring: "",
  requireCommit: false       

},
getAllEmployeesInShift :{
  statement : `  select employee_id , HR.GETEMPNAME_LANG (employee_id,1, employee_id) as employee_name
  
   , TEMPLATE_ID , template_ar_name , template_en_name  , day_code , day_type , day_name , starting_time , ending_time, shift_type
  from att.EMPLOYEE_SHIFT_VIEW
  where upper(trim(day_name)) =   (select trim(upper(to_char(to_date (:p_date , 'dd/MM/yyyy') , 'DAY'))) from dual )
  and template_id = :p_template_id` ,             
  bindings: [],
  qstring: "",
  requireCommit: false       

},
InsertAttendedEmployee: {
  statement: `
  INSERT INTO 
  HR_ATT_TRANSACTIONS
 (
   ATT_TRANSACTION_ID,
  EMPLOYEE_ID,
   ATT_TRANSACTION_DATE,
    ATT_TRANSACTION_TIME,
   COMING_FROM, 
    CREATED_BY,
    CREATED_DATE,
    ATT_TRANSACTION_TYPE,
     DELETED
     )
VALUES 
 (
   HR_ATT_TRANSACTIONS_SEQ.NEXTVAL,
  :EMPLOYEE_ID,
  TO_DATE(:ATT_TRANSACTION_DATE, 'MM/DD/YYYY HH24:MI'),
   TO_DATE(:ATT_TRANSACTION_TIME, 'MM/DD/YYYY HH24:MI'),
  :COMING_FROM,
  :CREATED_BY,
  SYSDATE,
  :ATT_TRANSACTION_TYPE,
  0
  ) `,
  returns: [],
  bindings: [],
  qstring: "",
  requireCommit: true
  }


}

  module.exports = statements ;
