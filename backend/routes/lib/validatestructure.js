const Joi = require('@hapi/joi');
let squel = require("squel");


let result;

const tokenstructure = Joi.object().keys(
    {
        USERNAME: Joi.required(),
        PASSWORD: Joi.required()
    }
);


const newrequeststructure = Joi.object().keys(
    {
        REQUEST_TYPE: Joi.required(),
        DESCRIPTION: Joi.required(),
        DELETED: Joi.required(),
        SUBSIDIARY_ID: Joi.required(),
        CLASSIFICATION_ID: Joi.required(),
        EMPLOYEE_ID: Joi.required()
    }
);

const newrequeststructureincaseofobjection = Joi.object().keys(
    {
        REQUEST_TYPE: Joi.required(),
        DESCRIPTION: Joi.required(),
        DELETED: Joi.required(),
        SUBSIDIARY_ID: Joi.required(),
        CLASSIFICATION_ID: Joi.required(),
        EMPLOYEE_ID: Joi.required(),
        REJECTED_REQUEST: Joi.required()
    }
);

const newactionstructure = Joi.object().keys(
    {
        REQUEST_ID: Joi.required(),
        ACTION_ID: Joi.required(),
        FROM_DESTINATION_ID: Joi.required(),
        COMMENT: Joi.required()
    }
);

const approvestructure = Joi.object().keys(
    {
        REQUEST_ID: Joi.required(),
        ACTION_ID: Joi.required(),
        FROM_DESTINATION_ID: Joi.required(),
        COMMENT: Joi.required()
    }
);

const rejectstructure = Joi.object().keys(
    {
        "REQUEST_ID": Joi.required(),
        "ACTION_ID": Joi.required(),
        "FROM_DESTINATION_ID": Joi.required(),
        "COMMENT": Joi.required()
    }
);

const acknowledgestructure = Joi.object().keys(
    {
        "REQUEST_ID": Joi.required(),
        "STEP_ID": Joi.required(),
        "FROM_DESTINATION_ID" : Joi.required()
    }
);

const askothersreq=Joi.object().keys(
    {
        REQUEST_ID:Joi.required(),
        ACTION_USER_ID:Joi.required(),
        OUTCOME_ACTION_ID:Joi.required(),
        TRANACTION_ID:Joi.required(),
        COMMENTS:Joi.required(),
        ACTION_USER_ID:Joi.required(),
        TO_DESTINATION_ID:Joi.required()
    }
)
const askothersreplyreq=Joi.object().keys(
    {
        ACTION_USER_ID:Joi.required(),
        OUTCOME_ACTION_ID:Joi.required(),
        TRANACTION_ID:Joi.required(),
        TRANACTION_ID:Joi.required(),
        ANSWER_ON_QUES:Joi.required()

    }
)

const jobOrderValidate = Joi.object().keys(
    {
        CODE :Joi.required(),
          JOB_ORDER_DESC:Joi.required(),
          ASSET_ACTION_ID:Joi.required(),
          EMPLOYEE_ID:Joi.required(),
          STATUS:Joi.required(),
          CREATED_BY:Joi.required(),
          DELETED:Joi.required(),
          DELETED_BY:Joi.required(),
          REQUEST_ID:Joi.required(),
          DETAIL_PLAN_ID:Joi.required(),
          PROJECT_ID:Joi.required(),
          BOQ_ID:Joi.required(),
          MILESTONE_ID:Joi.required(),
          ASSET_ID:Joi.required(),
          OPERATION_TYPE :Joi.required()
    }
)

const validateAssetGroup = Joi.object().keys(
    {
        CODE :Joi.required(),
        SERIAL:Joi.required(),
        NAME_EN:Joi.required(),
        NAME_AR:Joi.required(),
        START_CODE:Joi.required(),
        START_NUMBER:Joi.required(),
        CREATED_BY:Joi.required(),
        DIGITS_BEFORE:Joi.required()
    }
)

const assetGroupViolationValidate = Joi.object().keys(
    {
        CODE:Joi.required(),
        TITLE_EN:Joi.required(),
        TITLE_AR:Joi.required(),
        NOTES:Joi.required(),
        VIOLATION_GROUP_ID:Joi.required(),
        ASSET_ID:Joi.required(),
        CREATED_BY:Joi.required()
    }
)
const loginStructure = Joi.object().keys(
    {
        USER_NAME: Joi.required(),
        USER_PASSWORD: Joi.required()
    }
);

const validateCloseJobOrderStructure = Joi.object().keys(
    {
        JOB_ORDER_ID : Joi.required(),
        COUNTER_ID: Joi.required(),
        CREATED_BY: Joi.required(),
        DELETED_BY: Joi.required(),
        ASSET_ID: Joi.required(),
        COUNTER_READING: Joi.required()
});

const updateJobOrder = Joi.object().keys(
    {
        ACTIVITY_VALUE : Joi.required(),
            DURATION : Joi.required(),
            EMP_ID: Joi.required(),
            DONE : Joi.required(),
            REPLACEMENT_EMP_ID : Joi.required(),
            NOT_ATTEND: Joi.required()
    }
);

const createDailyWorkingHours = Joi.object().keys({
    WORK_ORDER_ID :  Joi.required() ,
    WORK_DATE : Joi.required(),
    WORKING_HOURS : Joi.required(),
    COMMENTS : Joi.required()
})

const insertIssuew = Joi.object().keys({
        REQUEST_ID: Joi.required(),
        ISSUE_TITLE: Joi.required(),
        ISSUE_SUMMARY: Joi.required(),
        ISSUE_PRIORITY: Joi.required(),
        ASSIGN_TO: Joi.required(),
        TARGET_RESOLUTION_DATE: Joi.required(),
        ACTUAL_RESOLUTION_DATE: Joi.required(),
        READ_STATUS: Joi.required(),
        REFERENCE_ID: Joi.required(),
        ISSUE_TRACK_ID: Joi.required(),
        ISSUE_TYPE: Joi.required(),
        FINAL_RESOLUTION: Joi.required(),
        PROJECT_ID: Joi.required(),
        CREATED_WO: Joi.required(),
        SUBSIDIARY_ID: Joi.required(),
        CLASSIFICATION: Joi.required(),
        TYPE_ID: Joi.required(),
        ISSUE_SUB_CLASS: Joi.required(),
        ISSUE_LOCATION: Joi.required(),
        ISSUE_SHIFT: Joi.required(),
        TOOL: Joi.required(),
        REQUIRE_REPORT: Joi.required(),
        ISSUE_STATE: Joi.required(),
        ISSUE_NOTE: Joi.required(),
        CUSTOM_FIELD_CHAR1: Joi.required(),
        CUSTOM_FIELD_CHAR2: Joi.required(),
        CUSTOM_FIELD_CHAR3: Joi.required(),
        CUSTOM_FIELD_CHAR4: Joi.required(),
        CUSTOM_FIELD_CHAR5: Joi.required(),
        CUSTOM_FIELD_NUMBER1: Joi.required(),
        CUSTOM_FIELD_NUMBER2: Joi.required(),
        CUSTOM_FIELD_NUMBER3: Joi.required(),
        CUSTOM_FIELD_NUMBER4: Joi.required(),
        CUSTOM_FIELD_NUMBER5: Joi.required(),
        CUSTOM_FIELD_DATE1: Joi.required(),
        CUSTOM_FIELD_DATE2: Joi.required(),
        CUSTOM_FIELD_DATE3: Joi.required(),
        CUSTOM_FIELD_DATE4: Joi.required(),
        CUSTOM_FIELD_DATE5: Joi.required(),
        CUSTOM_FIELD_LIST1: Joi.required(),
        CUSTOM_FIELD_CHAR6: Joi.required(),
        CUSTOM_FIELD_CHAR7: Joi.required(),
        CUSTOM_FIELD_CHAR8: Joi.required(),
        CUSTOM_FIELD_CHAR9: Joi.required(),
        CUSTOM_FIELD_CHAR10: Joi.required(),
        CUSTOM_FIELD_CHAR11: Joi.required(),
        CUSTOM_FIELD_CHAR16: Joi.required(),
        CUSTOM_FIELD_CHAR17: Joi.required(),
        CUSTOM_FIELD_CHAR12: Joi.required(),
        ASSEET_ID: Joi.required(),
        CUSTOM_FIELD_CHAR13: Joi.required(),
        CUSTOM_FIELD_CHAR14: Joi.required(),
        CUSTOM_FIELD_CHAR15: Joi.required(),
        CUSTOM_FIELD_CHAR18: Joi.required(),
        CUSTOM_FIELD_CHAR19: Joi.required(),
        EMPLOYEE_ID: Joi.required(),
        CUSTOM_FIELD_CHAR20: Joi.required(),
        CUSTOM_FIELD_DATE9: Joi.required(),
        CUSTOM_FIELD_DATE11: Joi.required(),
        CUSTOM_FIELD_DATE12: Joi.required(),
        CUSTOM_FIELD_DATE13: Joi.required(),
        CUSTOM_FIELD_DATE14: Joi.required(),
        CUSTOM_FIELD_DATE15: Joi.required(),
        CUSTOM_FIELD_DATE16: Joi.required(),
        CUSTOM_FIELD_DATE17: Joi.required(),
        CUSTOM_FIELD_DATE18: Joi.required(),
        CUSTOM_FIELD_DATE19: Joi.required(),
        CUSTOM_FIELD_DATE20: Joi.required(),
        CUSTOM_FIELD_DATE10: Joi.required(),
        CUSTOM_FIELD_DATE6: Joi.required(),
        CUSTOM_FIELD_DATE7: Joi.required(),
        CUSTOM_FIELD_DATE8: Joi.required(),
        CUSTOM_FIELD_NUMBER6: Joi.required(),
        CUSTOM_FIELD_NUMBER7: Joi.required(),
        CUSTOM_FIELD_NUMBER8: Joi.required(),
        CUSTOM_FIELD_NUMBER9: Joi.required(),
        CUSTOM_FIELD_NUMBER10: Joi.required(),
        CUSTOM_FIELD_NUMBER11: Joi.required(),
        CUSTOM_FIELD_NUMBER12: Joi.required(),
        CUSTOM_FIELD_NUMBER13: Joi.required(),
        CUSTOM_FIELD_NUMBER14: Joi.required(),
        CUSTOM_FIELD_NUMBER15: Joi.required(),
        CUSTOM_FIELD_NUMBER16: Joi.required(),
        CUSTOM_FIELD_NUMBER17: Joi.required(),
        CUSTOM_FIELD_NUMBER18: Joi.required(),
        CUSTOM_FIELD_NUMBER19: Joi.required(),
        CUSTOM_FIELD_NUMBER20: Joi.required(),
        SUB_LOCATION: Joi.required(),
        FINISH_DATE: Joi.required(),
        START_DATE: Joi.required(),
        EXPECT_END_DATE: Joi.required(),
        PERIOD: Joi.required(),
        DEPARTMENT_ID: Joi.required(),
        VIOLATION_ID: Joi.required(),
        VIOLATION_GROUP_ID: Joi.required(),
        VIOLATION_VALUE: Joi.required(),
        ASSET_GROUP_ID: Joi.required(),
        PARENT_ISSUE_ID: Joi.required(),
        CREATED_BY: Joi.required(),
        JOB_ORDER_ID: Joi.required()
});

function validateloginStructure(req, res, next) {
    result = Joi.validate(req.body, loginStructure);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validatetokenstructure(req, res, next) {
    result = Joi.validate(req.body, tokenstructure);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validatenewrequeststructure(req, res, next) {
    if (req.body.REQUEST_TYPE != exceptions.objection) {
        result = Joi.validate(req.body, newrequeststructure);
    } else {
        result = Joi.validate(req.body, newrequeststructureincaseofobjection);
    }
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validatenewactionstructure(req, res, next) {
    result = Joi.validate(req.body, newactionstructure);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validateapprovestructure(req, res, next) {
    result = Joi.validate(req.body, approvestructure);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validaterejectstructure(req, res, next) {
    result = Joi.validate(req.body, rejectstructure);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}
function validateaskotherreq(req, res, next) {
    result = Joi.validate(req.body, askothersreq);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}
function validateaskothersreplyreq(req, res, next) {
    result = Joi.validate(req.body, askothersreplyreq);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}


function validateacknowledgestructure(req, res, next) {
    result = Joi.validate(req.body, acknowledgestructure);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function jobOrderValidatestructure(req, res, next) {
    result = Joi.validate(req.body, jobOrderValidate);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validateAssetGroupstructure(req, res, next) {
    result = Joi.validate(req.body, validateAssetGroup);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validatevalidateCloseJobOrderStructure(req, res, next) {
    result = Joi.validate(req.body, validateCloseJobOrderStructure);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validatevalidateupdateJobOrder(req, res, next) {
    result = Joi.validate(req.body, validateupdateJobOrder);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}
function validatinsertIssuew(req, res, next) {
    result = Joi.validate(req.body, insertIssuew);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validatecreateDailyWorkingHours(req, res, next) {
    result = Joi.validate(req.body, createDailyWorkingHours);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validateupdateJobOrder(req, res, next) {
    //console.log(req.body)
  //  // console.log(
  //     ` {
  //       ITEMS_ID: Joi.required(),
  //       COMPONENTS_ITEMS_ID: Joi.required(),
  //       UNITS_ID: Joi.required(),
  //       QUANTITY: Joi.required(),
  //       ITEM_PRICE: Joi.required(),
  //       COST_PERCENTAGE: Joi.required(),
  //       CREATED_BY: Joi.required()
  //     }`
  //   )
    result = Joi.validate(req.body, updateJobOrder);
    if (result.error == null) {
      next();
    } else {
      res.status(400).json({
        "error": "invalid payload request Structure, please verify service catalog !"
      });
    }
  
  }


function composeupdatestatement(tableName, setValues, where, returns) {
    let result = squel
    .update()
    .table(tableName)
    .setFields(setValues)
    .where(where)
    .toString();
  
    return result;
    }
    
module.exports = {
    validatetokenstructure: validatetokenstructure,
    validatenewrequeststructure: validatenewrequeststructure,
    validatenewactionstructure: validatenewactionstructure,
    validateapprovestructure: validateapprovestructure,
    validaterejectstructure: validaterejectstructure,
    validateacknowledgestructure : validateacknowledgestructure,
    validateaskotherreq:validateaskotherreq,
    validateaskothersreplyreq:validateaskothersreplyreq,
    jobOrderValidatestructure:jobOrderValidatestructure,
    validateAssetGroupstructure:validateAssetGroupstructure,
    validateloginStructure: validateloginStructure,
    validatevalidateCloseJobOrderStructure : validatevalidateCloseJobOrderStructure,
    validatevalidateupdateJobOrder : validatevalidateupdateJobOrder,
    composeupdatestatement : composeupdatestatement,
    validateupdateJobOrder, validateupdateJobOrder,
    validatecreateDailyWorkingHours : validatecreateDailyWorkingHours,
    validatinsertIssuew: validatinsertIssuew
};
