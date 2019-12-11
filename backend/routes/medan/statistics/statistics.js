require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./statisticsSQL");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validateemployessSt = require('@joi/validateSt');
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');

//=========================== Equibment By Asset ========================================================
router.post('/getEquibmentCount', (req, res)=>{
  servicePool(req,
              res,
              statements.getEquibmentCount.statement,
              {'p_asset_id' :req.body.p_asset_id,
               'p_from_date' :req.body.p_from_date,
               'p_to_date' :req.body.p_to_date
              }
            );
});

//=============================== Equibment By Shift ==========================================================================

router.post('/getEquibmentCountByShift', (req, res)=>{
  servicePool(req,
              res,
              statements.getEquibmentCountByShift.statement,
              {'p_template_id' :req.body.p_template_id,
               'p_from_date' :req.body.p_from_date,
               'p_to_date' :req.body.p_to_date
              }
            );
});

//================================ Equibment By project ==========================================

router.post('/getEquibmentCountByProject', (req, res)=>{
    servicePool(req,
                res,
                statements.getEquibmentCountByProject.statement,
                {'p_project_id' :req.body.p_project_id,
                 'p_from_date' :req.body.p_from_date,
                 'p_to_date' :req.body.p_to_date
                }
              );
  });


  //======================================getEquibmentCountByService =======================================================

  router.post('/getEquibmentCountByService', (req, res)=>{
    servicePool(req,
                res,
                statements.getEquibmentCountByService.statement,
                {'p_service_id' :req.body.p_service_id,
                 'p_from_date' :req.body.p_from_date,
                 'p_to_date' :req.body.p_to_date
                }
              );
  });

//============================================================================================================================


//----------------------------------  incident Job Order --------------------------------------------------------

//==========================================get incident By Asset ID ===============================================================
router.post('/getincidentByAsset', (req, res)=>{
    servicePool(req,
                res,
                statements.getincidentByAsset.statement,
                {'p_asset_id' :req.body.p_asset_id,
                 'p_from_date' :req.body.p_from_date,
                 'p_to_date' :req.body.p_to_date
                }
              );
  });

//=============================== getincidentByProject =====================================================

router.post('/getincidentByProject', (req, res)=>{
    servicePool(req,
                res,
                statements.getincidentByProject.statement,
                {'p_project_id' :req.body.p_project_id,
                 'p_from_date' :req.body.p_from_date,
                 'p_to_date' :req.body.p_to_date
                }
              );
  });

//===================================getincidentByShift====================================================
router.post('/getincidentByShift', (req, res)=>{
    servicePool(req,
                res,
                statements.getincidentByShift.statement,
                {'p_template_id' :req.body.p_template_id,
                 'p_from_date' :req.body.p_from_date,
                 'p_to_date' :req.body.p_to_date
                }
              );
  });

  //===========================getincidentByService============================================================
router.post('/getincidentByService', (req, res)=>{
    servicePool(req,
                res,
                statements.getincidentByService.statement,
                {'p_service_id' :req.body.p_service_id,
                 'p_from_date' :req.body.p_from_date,
                 'p_to_date' :req.body.p_to_date
                }
              );
  });
//================================================================================================================
//--------------------------  issues ---------------------------------------------------------------


router.post('/getissueByAsset', (req, res)=>{
    servicePool(req,
                res,
                statements.getissueByAsset.statement,
                {'p_asset_id' :req.body.p_asset_id,
                 'p_from_date' :req.body.p_from_date,
                 'p_to_date' :req.body.p_to_date
                }
              );
  });



  router.post('/getissueByProject', (req, res)=>{
    servicePool(req,
                res,
                statements.getissueByProject.statement,
                {'p_project_id' :req.body.p_project_id,
                 'p_from_date' :req.body.p_from_date,
                 'p_to_date' :req.body.p_to_date
                }
              );
  });



  router.post('/getissueByService', (req, res)=>{
    servicePool(req,
                res,
                statements.getissueByService.statement,
                {'p_service_id' :req.body.p_service_id,
                 'p_from_date' :req.body.p_from_date,
                 'p_to_date' :req.body.p_to_date
                }
              );
  });
  router.post('/getissueByShift', (req, res)=>{
    servicePool(req,
                res,
                statements.getissueByShift.statement,
                {'p_template_id' :req.body.p_template_id,
                 'p_from_date' :req.body.p_from_date,
                 'p_to_date' :req.body.p_to_date
                }
              );
  });
  //======================================Position======================================================

  router.post('/getpositionByProject', (req, res)=>{
    servicePool(req,
                res,
                statements.getpositionByProject.statement,
                {'p_project_id' :req.body.p_project_id,
                 'p_from_date' :req.body.p_from_date,
                 'p_to_date' :req.body.p_to_date
                }
              );
  });


  router.post('/getpositionByAsset', (req, res)=>{
    servicePool(req,
                res,
                statements.getpositionByAsset.statement,
                {'p_asset_id' :req.body.p_asset_id,
                 'p_from_date' :req.body.p_from_date,
                 'p_to_date' :req.body.p_to_date
                }
              );
  });


  router.post('/getpositionByService', (req, res)=>{
    servicePool(req,
                res,
                statements.getpositionByService.statement,
                {'p_service_id' :req.body.p_service_id,
                 'p_from_date' :req.body.p_from_date,
                 'p_to_date' :req.body.p_to_date
                }
              );
  });


  router.post('/getpositionByShift', (req, res)=>{
    servicePool(req,
                res,
                statements.getpositionByShift.statement,
                {'p_template_id' :req.body.p_template_id,
                 'p_from_date' :req.body.p_from_date,
                 'p_to_date' :req.body.p_to_date
                }
              );
  });


//======================================================================================================
  router.get('/getJobCateg/:p_service_type', (req, res) =>{
    servicePool(req,
            res,
            statements.getJobCateg.statement,
          {'p_service_type' :req.params.p_service_type}
        );
  });
  
  //=====================================================================
  router.get('/getLaborNo/:p_service_type', (req, res) =>{
    servicePool(req,
            res,
            statements.getLaborNo.statement,
          {'p_service_type' :req.params.p_service_type}
        );
  });
  //==================================================================
  
  router.get('/getEquibCount/:p_service_type', (req, res) =>{
    servicePool(req,
            res,
            statements.getEquibCount.statement,
          {'p_service_type' :req.params.p_service_type}
        );
  });

  router.post('/getJobOrderMaterial', (req, res) =>{
    servicePool(req,
            res,
            statements.getJobOrderMaterial.statement,
          {
            'p_project_id' :req.body.p_project_id , 
            'p_from_date' :req.body.p_from_date , 
            'p_to_date' :req.body.p_to_date ,
            'p_service_id': req.body.p_service_id,
            'p_asset_id': req.body.p_asset_id,
            'p_template_id': req.body.p_template_id,
            'p_location_id': req.body.p_location_id   
        }
        );
  });


  router.get('/getJobOrderData', (req, res) =>{
    servicePool(req,
            res,
            statements.getJobOrderData.statement,
         []
        );
  });


  router.get('/getShiftNameById/:ATT_TEMPLATE_ID', (req, res) =>{
    servicePool(req,
            res,
            statements.getShiftNameById.statement,
         {'ATT_TEMPLATE_ID': req.params.ATT_TEMPLATE_ID}
        );
  });


  router.post('/getShiftName', (req, res) =>{
    servicePool(req,
            res,
            statements.getShiftName.statement,
         []
        );
  });

//====================================================================== 
router.post('/getShiftName', (req, res) =>{
  servicePool(req,
          res,
          statements.getShiftName.statement,
       []
      );
});

//=======================================================================

router.post('/getIncidentsDetails', (req, res) =>{
  servicePool(req,
          res,
          statements.getIncidentsDetails.statement,
          {
            'p_template_id' :req.body.p_template_id , 
            'p_location_id' :req.body.p_location_id 
        }
      );
});  // return issue id , issue summary , issue title 



//===================================================================== 
router.post('/getIncidentNo', (req, res) =>{
  servicePool(req,
          res,
          statements.getIncidentNo.statement,
          {
            'p_location_id' :req.body.p_location_id , 
            'p_template_id' :req.body.p_template_id 
        }
      );
});  // return incident Number 
//===========================================================================
router.post('/getPermissionDescription', (req, res) =>{
  servicePool(req,
          res,
          statements.getPermissionDescription.statement,
          {
            'p_location_id' :req.body.p_location_id 
        }
      );
});  // return permissions + description  by location id   => 5.1.17 


router.post('/getShiftIdByName', (req, res) =>{
  servicePool(req,
          res,
          statements.getShiftIdByName.statement,
          {
            'p_shift_name_en' :req.body.p_shift_name_en,
            'p_shift_name_ar' :req.body.p_shift_name_ar

        }
      );
});  // return template id and template name  

//==================================================================================


router.post('/getLabName', (req, res) =>{
  servicePool(req,
          res,
          statements.getlocIdByName.statement,
          {
            'p_loc_name_en' :req.body.p_loc_name_en,
            'p_loc_name_ar' :req.body.p_loc_name_ar

        }
      );
});  // return location id by name 


router.post('/getlocIdByName', (req, res) =>{
  servicePool(req,
          res,
          statements.getlocIdByName.statement,
          {
            'p_loc_name_en' :req.body.p_loc_name_en,
            'p_loc_name_ar' :req.body.p_loc_name_ar

        }
      );
});  // return location id by name 


router.post('/getpermissionfiltersByNumberOrLocation', (req, res) =>{
  servicePool(req,
          res,
          statements.getpermissionfiltersByNumberOrLocation.statement,
          {
            'p_location_id' :req.body.p_location_id,
            'p_status_id' :req.body.p_status_id

        }
      );
});  // return permissions filter 


router.get('/getPermissionStatus', (req, res) =>{
  servicePool(req,
          res,
          statements.getPermissionStatus.statement,
          []
      );
}); // return permission's status 


router.post('/getissuesByLocagionAndShiftId', (req, res) =>{
  servicePool(req,
          res,
          statements.getissuesByLocagionAndShiftId.statement,
          {
            'p_template_id' :req.body.p_template_id,
            'p_location_id' :req.body.p_location_id

        }
      );
});  // return  issues by location and shift id 5.1.14



router.post('/getEquibByServiceType', (req, res) =>{
  servicePool(req,
          res,
          statements.getEquibByServiceType.statement,
          {
            'p_service_type' :req.body.p_service_type

        }
      );
});  // return   EquibCount By Service Type



router.post('/getLaborCountByServiceType', (req, res) =>{
  servicePool(req,
          res,
          statements.getLaborCountByServiceType.statement,
          {
            'p_service_type' :req.body.p_service_type

        }
      );
});  // return   LaborCount By Service Type



router.post('/getSumItemsByUnits', (req, res) =>{
  servicePool(req,
          res,
          statements.getSumItemsByUnits.statement,
          {
            'p_service_type' :req.body.p_service_type

        }
      );
});  // return   NumberCateg , LookUpName , itemCount


router.post('/getMissions', (req, res) =>{
  servicePool(req,
          res,
          statements.getMissions.statement,
          {
            'p_date' :req.body.p_date,
            'p_equib_serial': req.body.p_equib_serial

        }
      );
});  // return  Mission With Descript  => 5.1.23

router.post('/getAssetSerial', (req, res) =>{
  servicePool(req,
          res,
          statements.getAssetSerial.statement,
          {
            'ASSET_SERIAL' :req.body.ASSET_SERIAL

        }
      );
});  


router.post('/getPermissionByLocation', (req, res) =>{
  servicePool(req,
          res,
          statements.getPermissionByLocation.statement,
          {
            'p_location_id' :req.body.p_location_id

        }
      );
});  // return  DESCRIPTION and PERMISSION_TYPE_EN and PERMISSION_TYPE_AR



router.post('/getIssuesType', (req, res) =>{
  servicePool(req,
          res,
          statements.getIssuesType.statement,
          {
                'p_location_id' :req.body.p_location_id,
                 'p_from_date' :req.body.p_from_date,
                 'p_to_date' :req.body.p_to_date,
                 'P_TEMPLATE_ID' : req.body.P_TEMPLATE_ID

        }
      );
});  // return  IssueTypeAr   IssueSummary And Issue Title  , ISSUE_TYPE_EN



router.post('/getZamByLocShf', (req, res) =>{
  servicePool(req,
          res,
          statements.getZamByLocShf.statement,
          {
                'p_location_id' :req.body.p_location_id,
                 'p_template_id' :req.body.p_template_id
        }
      );
});  // return  MINUTE_OR_EQUIB_CATEGORY   EN_NAME And AR_NAME   , MEASURE_UNIT , ITEM_COUNT

router.post('/getNoOfCup', (req, res) =>{
  servicePool(req,
          res,
          statements.getNoOfCup.statement,
          {
                'P_TEMPLATE_ID' :req.body.P_TEMPLATE_ID,
                 'p_location_id' :req.body.p_location_id,
                 'p_service_type_name' :req.body.p_service_type_name

        }
      );
});  // return  MINUTE_OR_EQUIB_CATEGORY   EN_NAME And AR_NAME   , MEASURE_UNIT , ITEM_COUNT



router.post('/EquibByLocOrShift', (req, res) =>{
  servicePool(req,
          res,
          statements.EquibByLocOrShift.statement,
          {
                'p_equib_serial' :req.body.p_equib_serial,
                 'p_shift_id' :req.body.p_shift_id,
                 'p_location_id' :req.body.p_location_id,
                 'p_date' :req.body.p_date

        }
      );
});  // return  MINUTE_OR_EQUIB_CATEGORY   EN_NAME And AR_NAME   , MEASURE_UNIT , ITEM_COUNT

router.post('/getAssetIdByLocOrShift', (req, res) =>{
  servicePool(req,
          res,
          statements.getAssetIdByLocOrShift.statement,
          {
                'P_TEMPLATE_ID' :req.body.P_TEMPLATE_ID,
                 'p_location_id' :req.body.p_location_id

        }
      );
});  // return  AssetId And AssetName



router.post('/getItemByLocOrShiftIds', (req, res) =>{
  servicePool(req,
          res,
          statements.getItemByLocOrShiftIds.statement,
          {
                'P_TEMPLATE_ID' :req.body.P_TEMPLATE_ID,
                 'p_location_id' :req.body.p_location_id

        }
      );
});  // return  AssetId And AssetName

router.post('/getLaborss', (req, res) =>{
  servicePool(req,
          res,
          statements.getLaborss.statement,
          {
                'SERVICE_ID' :req.body.SERVICE_ID

        }
      );
});  


router.post('/getMaterialInLocationByItemAndLoc', (req, res) =>{
  servicePool(req,
          res,
          statements.getMaterialInLocationByItemAndLoc.statement,
          {
                'p_item_id' :req.body.p_item_id ,
                'p_location_id': req.body.p_location_id

        }
      );
});  // 5.1.31 

router.post('/activitiesDetailsForEmp', (req, res) =>{
  servicePool(req,
          res,
          statements.activitiesDetailsForEmp.statement,
          {
                'p_emp_code' :req.body.p_emp_code 

        }
      );
});  // 5.1.32

router.post('/activitiesDetailsForEmpforLocAndSHift', (req, res) =>{
  servicePool(req,
          res,
          statements.activitiesDetailsForEmpforLocAndSHift.statement,
          {
                'p_location_id' :req.body.p_location_id ,
                'p_template_id': req.body.p_template_id 

        }
      );
});  // 5.1.32

router.post('/getServiceTypeNameById', (req, res) =>{
  servicePool(req,
          res,
          statements.getServiceTypeNameById.statement,
          {
                'p_service_type_id' :req.body.p_service_type_id 

        }
      );
});  // get service type name by id 


router.post('/getItemQuantityByLocOrShift', (req, res) =>{
  servicePool(req,
          res,
          statements.getItemQuantityByLocOrShift.statement,
          {
                'p_template_id' :req.body.p_template_id ,
                'p_location_id' :req.body.p_location_id

        }
      );
});  // get item quantity by loc or shift 



router.post('/getPermissionById', (req, res) =>{
  servicePool(req,
          res,
          statements.getPermissionById.statement,
          {
                'PERMISSION_ID' :req.body.PERMISSION_ID
        }
      );
});  // get permission 


router.post('/getContractorEvaluation', (req, res) =>{
  servicePool(req,
          res,
          statements.getContractorEvaluation.statement,
          {
                'p_supp_code' :req.body.p_supp_code
        }
      );
});  // get contract evaluation 



router.post('/getContractorData', (req, res) =>{
  servicePool(req,
          res,
          statements.getContractorData.statement,
          {
                'p_supp_code' :req.body.p_supp_code
        }
      );
});  // get contractor data


router.post('/getItemsWithItemCode', (req, res) =>{
  servicePool(req,
          res,
          statements.getItemsWithItemCode.statement,
          {
                'p_item_code' :req.body.p_item_code,
                'p_item_name_en': req.body.p_item_name_en,
                'p_item_name_ar': req.body.p_item_name_ar,
                'p_store_id': req.body.p_store_id,
        }
      );
});  // get items units


router.post('/getJobOrderCountFine', (req, res) =>{
  servicePool(req,
          res,
          statements.getJobOrderCountFine.statement,
          {
                'p_service_type_en' :req.body.p_service_type_en,
                'p_service_type_ar': req.body.p_service_type_ar,
                'p_location_id': req.body.p_location_id,
                'p_start_date': req.body.p_start_date,
                'p_end_date': req.body.p_end_date,
                "ATT_TEMPLATE_ID": req.body.ATT_TEMPLATE_ID
        }
      );
});  // 

router.post('/getprecentageincreament', (req, res) =>{
  servicePool(req,
          res,
          statements.getprecentageincreament.statement,
          {
                'p_template_id' :req.body.p_template_id,
                'p_location_id': req.body.p_location_id,
                'p_item_code': req.body.p_item_code,
                'p_item_name_en': req.body.p_item_name_en,
                'p_item_name_ar': req.body.p_item_name_ar,
                'p_first_month_start_date': req.body.p_first_month_start_date,
                'p_first_month_end_date': req.body.p_first_month_end_date,
                'p_second_month_start_date': req.body.p_second_month_start_date,
                'p_second_month_end_date': req.body.p_second_month_end_date
        }
      );
});  // ( Month Increment Percentage )  5.1.6

router.post('/getItems', (req, res) =>{
  servicePool(req,
          res,
          statements.getItems.statement,
          {
                'p_item_code' :req.body.p_item_code,
                'p_item_name_en': req.body.p_item_name_en,
                'p_item_name_ar': req.body.p_item_name_ar,
                
        }
      );
});  // ( Items)  5.1.27

router.post('/getCountForCleanBases', (req, res) =>{
  servicePool(req,
          res,
          statements.getCountForCleanBases.statement,
          {
                'p_service_type_en' :req.body.p_service_type_en,
                'p_service_type_ar': req.body.p_service_type_ar,
                'p_location_id': req.body.p_location_id,
                'p_start_date': req.body.p_start_date,
                'p_end_date': req.body.p_end_date,

        }
      );
});  // ( Items)  5.1.27



router.post('/getMaterialByLocOrShift', (req, res) =>{
  servicePool(req,
          res,
          statements.getMaterialByLocOrShift.statement,
          {
                'p_project_id' :req.body.p_project_id,
                'p_from_date': req.body.p_from_date,
                "p_to_date": req.body.p_to_date ,
                "p_service_id": req.body.p_service_id,
                "p_asset_id": req.body.p_asset_id,
                "p_template_id": req.body.p_template_id,
                "p_location_id": req.body.p_location_id

        }
      );
});  // ( materials)  5.1.15


router.post('/getActivity', (req, res) =>{
  servicePool(req,
          res,
          statements.getActivity.statement,
          {
                'P_TEMPLATE_ID' :req.body.P_TEMPLATE_ID,
                'p_service_op_type': req.body.p_service_op_type,
                'p_location_id': req.body.p_location_id

        }
      );
});  // ( materials)  5.1.16

//==================================================
router.post('/getOpType', (req, res) =>{
  servicePool(req,
          res,
          statements.getOpType.statement,
          {
                'p_service_op_type' :req.body.p_service_op_type

        }
      );
});  // ( serviceOpType )  5.1.16
//====================================================

router.post('/getRangeOfEquibment', (req, res) =>{
  servicePool(req,
          res,
          statements.getRangeOfEquibment.statement,
          {
                'p_asset_serial' :req.body.p_asset_serial,
                'p_location_id': req.body.p_location_id,
                'p_start_date' :req.body.p_start_date,
                'p_end_date' :req.body.p_end_date,
        }
      );
});  // ( Equbment order  )  5.1.24
//====================================================

router.post('/getAssetData', (req, res) =>{
  servicePool(req,
          res,
          statements.getAssetData.statement,
          {
                'p_template_id' :req.body.p_template_id,
                'p_location_id' :req.body.p_location_id
        }
      );
});  // ( Equibment data  )  5.1.19
//====================================================

router.post('/getAssetCount', (req, res) =>{
  servicePool(req,
          res,
          statements.getAssetCount.statement,
          {
                'p_template_id' :req.body.p_template_id,
                'p_location_id' :req.body.p_location_id
        }
      );
});  // ( Equibment count )  5.1.20
//====================================================
router.post('/getAssetStatus', (req, res) =>{
  servicePool(req,
          res,
          statements.getAssetStatus.statement,
          {
                'p_equib_serial' :req.body.p_equib_serial
        }
      );
});  // ( Equibment status )  5.1.21
//============================================================

//============================================================
router.post('/geEquMainStatus', (req, res) =>{
  servicePool(req,
          res,
          statements.geEquMainStatus.statement,
          {
                'p_equib_serial' :req.body.p_equib_serial,
                'p_date': req.body.p_date
        }
      );
});  
// ( Equibment maintain status )  5.1.22
//============================================================


//============================================================
router.post('/gitActivityByLocOrShift', (req, res) =>{
  servicePool(req,
          res,
          statements.gitActivityByLocOrShift.statement,
          {
                'p_location_id' :req.body.p_location_id,
                'P_TEMPLATE_ID': req.body.P_TEMPLATE_ID,
                'p_service_op_type': req.body.p_service_op_type

        }
      );
});  
// ( Activities )  5.1.16
//============================================================

router.post('/gitworkOrderByWeek', (req, res) =>{
  servicePool(req,
          res,
          statements.gitworkOrderByWeek.statement,
          {
                'p_start_date' :req.body.p_start_date,
                'p_end_date': req.body.p_end_date
        }
      );
});  
// ( work order )  5.1.25
//============================================================

router.post('/EquibByLocOrShiftDailyFilter', (req, res) =>{
  servicePool(req,
          res,
          statements.EquibByLocOrShiftDailyFilter.statement,
          {
                'P_TEMPLATE_ID' :req.body.P_TEMPLATE_ID,
                'p_location_id': req.body.p_location_id
        }
      );
});  
//  5.1.5
//============================================================

router.post('/getweeklyPlanForCleanSearvices', (req, res) =>{
  servicePool(req,
          res,
          statements.getweeklyPlanForCleanSearvices.statement,
          {
                'p_start_date' :req.body.p_start_date,
                'p_end_date': req.body.p_end_date
        }
      );
});  
//  5.1.11
//============================================================

router.post('/getLabourCountAndName', (req, res) =>{
  servicePool(req,
          res,
          statements.getLabourCountAndName.statement,
          {
            'p_from_date' :req.body.p_from_date ,
                'p_to_date' :req.body.p_to_date,
                'p_project_id' :req.body.p_project_id ,
        
                'p_location_id' :req.body.p_location_id ,
                'p_template_id' :req.body.p_template_id,
                'p_service_type' :req.body.p_service_type

        }
      );
});  
//  Report Official
//============================================================


router.post('/getJobOrderDateByAssetANdProject', (req, res) =>{
  servicePool(req,
          res,
          statements.getJobOrderDateByAssetANdProject.statement,
          {
                'PROJECT_ID' :req.body.PROJECT_ID ,
                'ASSET_ID' :req.body.ASSET_ID
        }
      );
});  
//  JobOrderData 
//============================================================



router.post('/getEquibMentCountByAssPro', (req, res) =>{
  servicePool(req,
          res,
          statements.getEquibMentCountByAssPro.statement,
          {
                'p_from_date' :req.body.p_from_date ,
                'p_to_date' :req.body.p_to_date,
                'p_project_id' :req.body.p_project_id ,
                'p_service_id' :req.body.p_service_id,
                'p_asset_id' :req.body.p_asset_id ,
                'p_template_id' :req.body.p_template_id,
                'p_location_id' :req.body.p_location_id
        }
      );
});  

//  EquibmentCount
//============================================================



router.post('/getIncidentCountByAssPro', (req, res) =>{
  servicePool(req,
          res,
          statements.getIncidentCountByAssPro.statement,
          {
                'p_from_date' :req.body.p_from_date ,
                'p_to_date' :req.body.p_to_date,
                'p_project_id' :req.body.p_project_id ,
                'p_service_type' :req.body.p_service_type,
                'p_asset_id' :req.body.p_asset_id ,
                'p_template_id' :req.body.p_template_id,
                'p_location_id' :req.body.p_location_id 
        }
      );
});  

//  EquibmentCount
//============================================================



router.post('/getWasteByLocOrShift', (req, res) =>{
  servicePool(req,
          res,
          statements.getWasteByLocOrShift.statement,
          {
                'p_location_id' :req.body.p_location_id ,
                'p_template_id' :req.body.p_template_id,
                'p_ser_type_id' :req.body.p_ser_type_id 
        }
      );
});  

//  Wastes 5.1.12 
//============================================================
router.post('/purshasingOrder', (req, res) =>{
  servicePool(req,
          res,
          statements.purshasingOrder.statement,
          {
                'p_item_code' :req.body.p_item_code ,
                'p_item_name_en' :req.body.p_item_name_en,
                'p_item_name_ar' :req.body.p_item_name_ar 
        }
      );
});  

router.get('/getProjectsAndItsLocations', (req, res) =>{
  businessPool(req,
          res,
          statements.getProjectsAndItsLocations.statement,
          []
      ).then(get =>{
      
        
        res.status(200).json({
          status : 200 ,
          length : get.rows.length,
          rows : get.rows
                })
      })
});

//  purshasing order  5.1.29
//============================================================

router.post('/ReportVariance', (req, res) =>{
  servicePool(req,
          res,
          statements.ReportVariance.statement,
          {
                'p_from_date' :req.body.p_from_date ,
                'p_to_date' :req.body.p_to_date,
                'p_project_id' :req.body.p_project_id, 
                'p_service_type' :req.body.p_service_type,
                'p_location_id' :req.body.p_location_id, 
                'p_template_id' :req.body.p_template_id
        }
      );
});  

//  Variance Report
//============================================================
router.post('/getlocNameById', (req, res) =>{
  servicePool(req,
          res,
          statements.getlocNameById.statement,
          {
                'PIN_ID' :req.body.PIN_ID 
        }
      );
});  

//  location name by id 
//============================================================

router.post('/getProjectsById', (req, res) =>{
  servicePool(req,
          res,
          statements.getProjectsById.statement,
          {
                'PROJECT_ID' :req.body.PROJECT_ID 
        }
      );
});  

//  Project name by id 
//============================================================


router.get('/getAllProjects', (req, res) =>{
  servicePool(req,
          res,
          statements.getAllProjects.statement,
         []
      );
});  

//  Projects
//============================================================

router.get('/getAllShiftsBylocationID/:p_location', (req, res) =>{
  servicePool(req,
          res,
          statements.getAllShiftsBylocationID.statement,
          {
            'p_location' :req.params.p_location 
    }
      );
});  

//  all shifts by location id 
//===============================================================

router.get('/getAllShiftsBylocationID/:p_location', (req, res) =>{
  servicePool(req,
          res,
          statements.getAllShiftsBylocationID.statement,
          {
            'p_location' :req.params.p_location 
    }
      );
});  

//  all shifts by location id 
//===============================================================

router.post('/getAllEmployeesInShift', (req, res) =>{
  servicePool(req,
          res,
          statements.getAllEmployeesInShift.statement,
          {
            'p_date' :req.body.p_date ,
            'p_template_id' :req.body.p_template_id 

    }
      );
});  

//  all shifts by location id 
//===============================================================


router.post('/InsertAttendedEmployee', (req, res) =>{
  servicePool(req,
          res,
          statements.InsertAttendedEmployee.statement,
          {
            'EMPLOYEE_ID' :req.body.EMPLOYEE_ID ,
            'ATT_TRANSACTION_DATE' :req.body.ATT_TRANSACTION_DATE , 
            'ATT_TRANSACTION_TIME' :req.body.ATT_TRANSACTION_TIME ,    
            'COMING_FROM' :req.body.COMING_FROM ,
            'CREATED_BY' :req.body.CREATED_BY , 
            'ATT_TRANSACTION_TYPE' :req.body.ATT_TRANSACTION_TYPE  
             

    }
      );
});  

//  insertAttendedEmployees 
//===============================================================





module.exports = router;
