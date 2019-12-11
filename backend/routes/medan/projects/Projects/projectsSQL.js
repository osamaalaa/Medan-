let statements={
       getAllProjects :{
          statment:`
SELECT
    project_id,
    client_id,
    (select AR_name from clients C where C.client_id = P.client_id) client_name_ar,
    (select en_name from clients C where C.client_id = P.client_id) client_name_en,
    user_code,
    primary_name,
    secondary_name,
    (select primary_name from lookup_details L where L.lookup_detail_id = P.project_type ) project_type_name,
    project_manager_id,
    (select first_name||' '||second_name from aot_gen.employees E where E.employee_id = P.project_manager_id) manager_name,
    portfolio_id,
    (select portfolio_name_ar from portfolios PO where Po.portfolio_id = P.portfolio_id) portfolio_name_ar ,
    (select portfolio_name_en from portfolios PO where Po.portfolio_id = P.portfolio_id) portfolio_name_en ,
    profite_percentage,
    depreciation_percentage,
    start_date,
    end_date,
    revenue,
    cost,
    status,
    address,
    downpayment,
    project_sponser_id,
    client_project_manager,
    creation_date,
    created_by_user_id,
    working_hours_per_day,
    deleted,
    deleted_by,
    deleted_date,
    subsidiary_id,
    project_type,
    color,
    study_id,
    boq_id,
    vendor_manager_id,
    notes,
    cost_text,
    classification,
    main_project_id,
    iscontract,
    contract_owner,
    contract_executer,
    study_boq,
    currency_id,
    request_type_id,
    wf_status
FROM
    projects P
`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false

       },

       getOneProjectByID :{
           statment:`
SELECT
    project_id,
    CLIENT_ID,
    (select AR_name from clients C where C.client_id = P.client_id) client_name_ar,
    (select en_name from clients C where C.client_id = P.client_id) client_name_en,
    (select primary_name from lookup_details L where L.lookup_detail_id = P.project_type ) project_type_name,
    (select first_name||' '||second_name from aot_gen.employees E where E.employee_id = P.project_manager_id) manager_name,
    (select portfolio_name_ar from portfolios PO where Po.portfolio_id = P.portfolio_id) portfolio_name_ar ,
    (select portfolio_name_en from portfolios PO where Po.portfolio_id = P.portfolio_id) portfolio_name_en ,
    user_code,
    primary_name,
    secondary_name,
    profite_percentage,
    depreciation_percentage,
    start_date,
    end_date,
    revenue,
    cost,
    status,
    address,
    project_manager_id,
    downpayment,
    portfolio_id,
    project_sponser_id,
    client_project_manager,
    creation_date,
    created_by_user_id,
    working_hours_per_day,
    deleted,
    deleted_by,
    deleted_date,
    subsidiary_id,
    project_type,
    color,
    study_id,
    boq_id,
    vendor_manager_id,
    notes,
    cost_text,
    classification,
    main_project_id,
    iscontract,
    contract_owner,
    contract_executer,
    study_boq,
    currency_id,
    (select ar_name from aot_gen.currencies C where C.currency_id = P.currency_id) currency_name,
    request_type_id,
    wf_status
FROM
    projects P
  WHERE project_id = :PROJECT_ID
`,
           returns: [],
           bindings: [],
           qstring: "",
           requireCommit: false

       },

       insertProjects: {
        statement: `
        INSERT INTO PROJECTS (PROJECT_ID,
            CLIENT_ID,
            USER_CODE,
            PRIMARY_NAME,
            SECONDARY_NAME,
            PROFITE_PERCENTAGE,
            DEPRECIATION_PERCENTAGE,
            START_DATE,
            END_DATE,
            REVENUE,
            COST,
            STATUS,
            ADDRESS,
            PROJECT_MANAGER_ID,
            DOWNPAYMENT,
            PORTFOLIO_ID,
            PROJECT_SPONSER_ID,
            CLIENT_PROJECT_MANAGER,
            CREATION_DATE,
            CREATED_BY_USER_ID,
            WORKING_HOURS_PER_DAY,
            SUBSIDIARY_ID,
            PROJECT_TYPE,
            COLOR,
            STUDY_ID,
            BOQ_ID,
            VENDOR_MANAGER_ID,
            NOTES,
            COST_TEXT,
            CLASSIFICATION,
            MAIN_PROJECT_ID,
            ISCONTRACT,
            CONTRACT_OWNER,
            CONTRACT_EXECUTER,
            STUDY_BOQ,
            CURRENCY_ID,
            REQUEST_TYPE_ID,
            WF_STATUS,
            SUPPLIER_ID)
     VALUES (PROJECTS_SEQ.NEXTVAL,
        :CLIENT_ID,
        :USER_CODE,
        :PRIMARY_NAME,
        :SECONDARY_NAME,
        :PROFITE_PERCENTAGE,
        :DEPRECIATION_PERCENTAGE,
        :START_DATE,
        :END_DATE,
        :REVENUE,
        :COST,
        :STATUS,
        :ADDRESS,
        :PROJECT_MANAGER_ID,
        :DOWNPAYMENT,
        :PORTFOLIO_ID,
        :PROJECT_SPONSER_ID,
        :CLIENT_PROJECT_MANAGER,
        sysdate,
        :CREATED_BY_USER_ID,
        :WORKING_HOURS_PER_DAY,
        :SUBSIDIARY_ID,
        :PROJECT_TYPE,
        :COLOR,
        :STUDY_ID,
        :BOQ_ID,
        :VENDOR_MANAGER_ID,
        :NOTES,
        :COST_TEXT,
        :CLASSIFICATION,
        :MAIN_PROJECT_ID,
        :ISCONTRACT,
        :CONTRACT_OWNER,
        :CONTRACT_EXECUTER,
        :STUDY_BOQ,
        :CURRENCY_ID,
        :REQUEST_TYPE_ID,
        :WF_STATUS,
        :SUPPLIER_ID)
        RETURN  PROJECT_ID INTO  :R_PROJECT_ID`,
        returns: ["R_PROJECT_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },

    updateProject :{
        statement :`UPDATE PROJECTS
        SET    PROJECT_ID              = :PROJECT_ID,
               CLIENT_ID               = :CLIENT_ID, 
               USER_CODE               = :USER_CODE, 
               PRIMARY_NAME            = :PRIMARY_NAME, 
               SECONDARY_NAME          = :SECONDARY_NAME, 
               START_DATE              = :START_DATE,
               END_DATE                = :END_DATE,
               COST                    = :COST, 
               STATUS                  = :STATUS, 
               ADDRESS                 = :ADDRESS, 
               PROJECT_SPONSER_ID      = :PROJECT_SPONSER_ID, 
               CREATION_DATE           = sysdate ,
               PROJECT_TYPE            = :PROJECT_TYPE, 
               COLOR                   = :COLOR,
               NOTES                   = :NOTES,
               CURRENCY_ID             = :CURRENCY_ID
        WHERE  PROJECT_ID              = :PROJECT_ID `,
        bindings: [],
        qstring: "",
        requireCommit: true
    },

    getClients :{
        statment:`
        select client_id, ar_name , en_name from clients where client_id in (select client_id from projects where project_id = :project_id )`,
        bindings: [],
        qstring: "",
        requireCommit: false

     },

     getProjectTypes :{
        statment:`
        select lookup_detail_id as type_id, primary_name , secondary_name from lookup_details where lookup_id = 65
`,
        bindings: [],
        qstring: "",
        requireCommit: false

     },

     getAssetBasedOnProject :{
        statment:`
        SELECT AD.ASSET_ID,
        AD.ASSET_NAME,
        AD.DESCRIPTION FROM ASSETS_DEFINITION AD
        WHERE nvl(AD.DELETED,0)=0 AND AD.ASSET_ID IN
  (SELECT DISTINCT PBA.ASSET_ID FROM
   PROJECT_BOQ_ASSETS PBA WHERE PBA.PROJECT_ID = :PROJECT_ID  AND NVL(PBA.DELETED,0)=0)`,
        bindings: [],
        qstring: "",
        requireCommit: false

     },

     getAssetBasedOnProjectCompliance :{
        statment:`
        SELECT AD.ASSET_ID, AD.asset_group,
      AD.ASSET_NAME,
      AD.DESCRIPTION FROM ASSETS_DEFINITION AD
      WHERE nvl(AD.DELETED,0)=0
      AND (Select PS.PROJECT_TYPE FROM PROJECTS PS WHERE PS.PROJECT_ID = :PROJECT_ID ) = 702
      AND AD.ASSET_ID IN
(SELECT DISTINCT PBA.ASSET_ID FROM
 PROJECT_BOQ_ASSETS PBA WHERE PBA.PROJECT_ID = :PROJECT_ID  AND NVL(PBA.DELETED,0)=0 )`,
        bindings: [],
        qstring: "",
        requireCommit: false

     },

     getLocations :{
        statment:`
        SELECT * FROM PIN_TREES  PT WHERE PT.PARENT_PIN_ID in
(SELECT PTT.PIN_ID FROM  PIN_TREES PTT WHERE PTT.project_Id = :project_Id)`,
        bindings: [],
        qstring: "",
        requireCommit: false
     },
       ////////////***************
       //////////////////////*********pin tree***********/////////////

       insertProjectTree: {
        statement: `
        INSERT INTO PIN_TREES (PIN_ID,
            LABEL_AR,
            LABEL_EN,
            PARENT_PIN_ID,
            PROJECT_ID,
            deleted)
     VALUES (
         PIN_TREES_SEQ.NEXTVAL,
        :LABEL_AR,
        :LABEL_EN,
        :PARENT_PIN_ID,
        :PROJECT_ID,
        nvl(0,0))
        RETURN PIN_ID , LABEL_AR , LABEL_EN , PARENT_PIN_ID , PROJECT_ID INTO :R_PIN_ID , :R_LABEL_AR , :R_LABEL_EN , :R_PARENT_PIN_ID , :R_PROJECT_ID`,
        returns: ["R_PIN_ID" , "R_LABEL_AR" , "R_LABEL_EN", "R_PARENT_PIN_ID",  "R_PROJECT_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },

    getProjectsTree :{
        statment:`
        SELECT * FROM PIN_TREES  PT WHERE PT.PARENT_PIN_ID in
        (SELECT PTT.PIN_ID FROM  PIN_TREES PTT WHERE PTT.project_Id = :project_Id )
        and PARENT_PIN_ID is not null
        `,
        bindings: [],
        qstring: "",
        requireCommit: false
     },
      
     getChildTree :{
         statement :`select * from PIN_TREES where PIN_ID in (SELECT distinct (PARENT_PIN_ID) FROM PIN_TREES  PT WHERE PT.PARENT_PIN_ID in
         (SELECT PTT.PIN_ID FROM  PIN_TREES PTT WHERE PTT.project_Id = :project_Id ))
         `,
         bindings: [],
        qstring: "",
        requireCommit: false
     },

     getProjectsTreeWithNoParent :
     {
        statment:`
        SELECT * FROM PIN_TREES  PT WHERE PT.PARENT_PIN_ID in
        (SELECT PTT.PIN_ID FROM  PIN_TREES PTT WHERE PTT.project_Id = :project_Id )
        and PARENT_PIN_ID is  null
        `,
        bindings: [],
        qstring: "",
        requireCommit: false
     },

     deleteProjectTree: {
        statement: `
        UPDATE PIN_TREES
        SET  DELETED = 1
        WHERE  PIN_ID = :PIN_ID
        `,
        bindings: [],
        qstring: "",
        requireCommit: true
    },

    updateProjectTree: {
        statement: `
        UPDATE PIN_TREES
SET  
       LABEL_AR       = :LABEL_AR,
       LABEL_EN       = :LABEL_EN
       WHERE  PIN_ID         = :PIN_ID
        `,
        bindings: [],
        qstring: "",
        requireCommit: true
    },

    getPinTree :{
        statement :`SELECT * FROM PIN_TREES  WHERE project_Id = :project_Id and deleted=0
        ` ,
        bindings: [],
        qstring: "",
        requireCommit: false
    }
}

module.exports = statements ;
