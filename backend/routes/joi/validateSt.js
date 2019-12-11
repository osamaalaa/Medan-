const Joi = require('joi');

let result;

const assetsdefinition = Joi.object().keys(
    {
        ASSET_ID: Joi.required()
    }
);

const employeesSt = Joi.object().keys(
    {
        EMPLOYEE_ID: Joi.required()
    }
);
const lookUpAppsST = Joi.object().keys(

    {

        LOOKUP_APP_ID: Joi.required(),
        LOOKUP_MASTER_ID: Joi.required(),
        APPLICATION_ID: Joi.required()

    }
);

const lookUpDetailsSt = Joi.object().keys(
    {
        LOOK_APP_ID: Joi.required(),
        LOOKUP_DETAIL_ID: Joi.required()

    }
);


const projectsSt = Joi.object().keys(
    {
        PROJECT_ID: Joi.required()

    }
);

const violationGroupSt = Joi.object().keys(
    {
        VIOLATION_GROUP_ID: Joi.required()

    }
);

const violationGroupDetailsSt = Joi.object().keys(
    {
        VIOLATION_GROUP_ID: Joi.required()

    }
);




    const issuesassignments = Joi.object().keys(
        {
            ASSIGNMENT_ID: Joi.required()
        }
    );

    const issuesattachments = Joi.object().keys(
        {
            ATTACH_ID: Joi.required()
        }
    );

    const issuescomments = Joi.object().keys(
        {
            COMMENT_ID: Joi.required()
        }
    );

    const issuescustomvalue = Joi.object().keys(
        {

        }
    );

    const issuessubclasscustomfiles = Joi.object().keys(
        {
            ISSUES_SUB_CLASS_ID: Joi.required()
        }
    );

    const issuessubclassification = Joi.object().keys(
        {
            CLASSIFICATION_ID: Joi.required()
        }
    );
    const locationsSt = Joi.object().keys(
        {
            LOCATION_ID: Joi.required()
        }
    );

    const issues = Joi.object().keys(
            {
              REQUEST_ID: Joi.required(),
              ISSUE_TITLE : Joi.required(),
              ISSUE_SUMMARY : Joi.required(),
              ASSIGN_TO: Joi.required(),
              TARGET_RESOLUTION_DATE: Joi.required(),
              ACTUAL_RESOLUTION_DATE: Joi.required(),
              READ_STATUS: Joi.required(),
              REFERENCE_ID: Joi.required(),
              REFERENCE_TYPE: Joi.required(),
              ISSUE_TRACK_ID: Joi.required(),
              ISSUE_TYPE: Joi.required(),
              FINAL_RESOLUTION: Joi.required(),
              PROJECT_ID: Joi.required(),
              DELETED: Joi.required(),
              DELETED_BY: Joi.required(),
              DELETED_DATE: Joi.required(),
              CREATED_WO: Joi.required(),
              SUBSIDIARY_ID: Joi.required(),
              CLASSIFICATION: Joi.required(),
              CREATION_DATE: Joi.required(),
              TYPE_ID: Joi.required(),
              ISSUE_SUB_CLASS: Joi.required(),
              ISSUE_LOCATION: Joi.required(),
              SHIFT: Joi.required(),
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
              CUSTOM_FIELD_DATE2:Joi.required(),
              CUSTOM_FIELD_DATE3:Joi.required(),
              CUSTOM_FIELD_DATE4:Joi.required(),
              CUSTOM_FIELD_DATE5:Joi.required(),
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
              PARENT_ISSUE_ID: Joi.required()
            }
        );
    function validatetokenstructure(req, res, next) {
        result = Joi.validate(req.body, tokenstructure);
        if (result.error == null) {
            next();
        } else {
            res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
        }
    }


    function validatelocationSt(req, res, next) {
        result = Joi.validate(req.body, locationsSt);
        if (result.error == null) {
            next();
        } else {
            res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
        }
    }


  function issuesStructure(req, res, next) {
    result = Joi.validate(req.body, issues);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}




function issuesassignmentsStructure(req, res, next) {
    result = Joi.validate(req.body, issuesassignments);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function issuesattachmentsStructure(req, res, next) {
    result = Joi.validate(req.body, issuesattachments);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function issuescustomvalueStructure(req, res, next) {
    result = Joi.validate(req.body, issuescustomvalue);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function issuescommentsStructure(req, res, next) {
    result = Joi.validate(req.body, issuescomments);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function issuessubclasscustomfilesStructure(req, res, next) {
    result = Joi.validate(req.body, issuessubclasscustomfiles);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function issuessubclassificationStructure(req, res, next) {
    result = Joi.validate(req.body, issuessubclassification);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}



function validateviolationGroupDetailsSts(req, res, next) {
    result = Joi.validate(req.body, violationGroupSt);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validateviolationGroupSt(req, res, next) {
    result = Joi.validate(req.body, violationGroupSt);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}


function validateprojectsSt(req, res, next) {
    result = Joi.validate(req.body, projectsSt);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}




function validatelookUpDetailsSt(req, res, next) {
    result = Joi.validate(req.body, lookUpDetailsSt);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}


function validatelookUpAppsSt(req, res, next) {
    result = Joi.validate(req.body, lookUpAppsST);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}


function validateemployessSt(req, res, next) {
    result = Joi.validate(req.body, employeesSt);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function assetsdefinitionStructure(req, res, next) {
    result = Joi.validate(req.body, assetsdefinition);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}


function validateuploadimagestructure(req, res, next) {
    if (Object.keys(req.query).length <= 0) {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    } else {
        let val = false;
        Object.keys(req.query).forEach(function (key) {
            if (key !== 'ISSUE_ID' && key !== 'COMMENT_ID') {
                val = true;
            }
          });
          if (val){
            res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
          } else{
            next();
          }
    }
}

module.exports = {
    assetsdefinitionStructure: assetsdefinitionStructure,
    validateemployessSt: validateemployessSt,
    validatelocationSt: validatelocationSt,
    validatelookUpAppsSt: validatelookUpAppsSt,
    validatelookUpDetailsSt: validatelookUpDetailsSt,
    validateprojectsSt: validateprojectsSt,
    validateviolationGroupSt: validateviolationGroupSt,
    validateviolationGroupDetailsSts: validateviolationGroupDetailsSts,
    issuesStructure: issuesStructure,
    issuesassignmentsStructure: issuesassignmentsStructure,
    issuesattachmentsStructure: issuesattachmentsStructure,
    issuescommentsStructure: issuescommentsStructure,
    issuescustomvalueStructure:issuescustomvalueStructure,
    issuessubclasscustomfilesStructure: issuessubclasscustomfilesStructure,
    issuessubclassificationStructure: issuessubclassificationStructure,
    validateuploadimagestructure : validateuploadimagestructure
  };
