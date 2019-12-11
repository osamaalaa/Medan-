require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./closeJobOrderSQL");
let servicePool = require('@lib/servicePool');
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validate = require('@lib/validatestructure');
let businessPool = require("@lib/businessPool");
let fs = require('fs');
let result = [];
let dateFormat = require('dateformat');
let ip = require('ip');
let multer = require('multer');
let settings = require("@lib/settings");
const publicIp = require('public-ip');


router.post('/insertJobOrderCounter', checkdataexists, validate.validatevalidateCloseJobOrderStructure, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertJobOrderCounter.returns).then(convertedbody => {
    servicePool(req, res, statements.insertJobOrderCounter.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});


router.post('/updateJobOrderSparparts/:JOB_ORDER_SPAREPARTS_ID', checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    statements.updateJobOrderSparparts.statement,
    {
      JOB_ORDER_SPAREPARTS_ID: req.params.JOB_ORDER_SPAREPARTS_ID,
      ITEM_COUNT: req.body.ITEM_COUNT
    });
});

router.post('/updateJobOrderAsset/:JOB_ORDER_ASSET_ID', checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    statements.updateJobOrderAsset.statement,
    {
      JOB_ORDER_ASSET_ID: req.params.JOB_ORDER_ASSET_ID,
      ASSET_COUNT: req.body.ASSET_COUNT
    });
});

router.post('/updateJobOrderDetails', checkdataexists, (req, res ) => {
  let osama = req.body; 
  Promise.all([req.body]);
  for (let i = 0 ; i < osama.length ; i++){
  
  businessPool(
    req,
    res,
    statements.updateJobOrderDetails.statement,
    {

      ACTIVITY_VALUE: osama[i].ACTIVITY_VALUE,
      POSITION_ITEM_ASSET_VAL: osama[i].POSITION_ITEM_ASSET_VAL,
      DAY_CODE: osama[i].DAY_CODE,
      JOB_ORDER_DETAIL_ID: osama[i].JOB_ORDER_DETAIL_ID
    }).then( () => {
      res.status(200).json({
        message : "update succeeded",
        status: 200
      })
      
    }).catch(error => {
      res.status(200).json({
        message : error,
        status: 400
      })

    })

  }
  // console.log(osama);

});


router.post('/updateDailyWorkingHours', (req, res) => {
  servicePool(
    req,
    res,
    statements.updateDailyWorkingHours.statement,
    {
      DAILY_HOURS_ID: req.body.DAILY_HOURS_ID,
      WORK_DATE: req.body.WORK_DATE,
      WORKING_HOURS: req.body.WORKING_HOURS,
      COMMENTS: req.body.COMMENTS,
      WORK_ORDER_ID: req.body.WORK_ORDER_ID,
    });
});

router.post('/deleteDailyWorkingHours/:DAILY_HOURS_ID', (req, res) => {
  servicePool(
    req,
    res,
    statements.deleteDailyWorkingHours.statement,
    {
      DAILY_HOURS_ID: req.params.DAILY_HOURS_ID
    });
});



router.post('/createWorkingDailyHours', checkdataexists, validate.validatecreateDailyWorkingHours, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.createWorkingDailyHours.returns).then(convertedbody => {
    servicePool(req, res, statements.createWorkingDailyHours.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

router.post('/insertIncidentReport', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertIncidentReport.returns).then(convertedbody => {
    servicePool(req, res, statements.insertIncidentReport.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

////////////////////////////


router.post('/updateOrCreateMeetingMinutes', (req, res) => {
  console.log("=======")
  console.log(req.body.MOM_ID)
  if(req.body.MOM_ID != "")
  {
   // console.log("yes")
    servicePool(
      req,
      res,
      statements.updateMeetingMinutes.statement,
      {
        MOM_ID: req.body.MOM_ID,
        MEETING_ID: req.body.MEETING_ID,
        DESCRIPTION: req.body.DESCRIPTION,
        RESPONSABLE_MEMBER: req.body.RESPONSABLE_MEMBER,
        STATUS: req.body.STATUS,
        TYPE: req.body.TYPE,
        MOM_DATE: req.body.MOM_DATE
      });
      }
  else{
   // console.log("no")
    bodyconverter.bodyconverter(req, res, {
      MEETING_ID: req.body.MEETING_ID,
      DESCRIPTION: req.body.DESCRIPTION,
      RESPONSABLE_MEMBER: req.body.RESPONSABLE_MEMBER,
      STATUS: req.body.STATUS,
      TYPE: req.body.TYPE,
      MOM_DATE: req.body.MOM_DATE
    }).then(convertedbody => {
      servicePool(req, res, statements.insertMeetingMinutess.statement, convertedbody);
    }).catch(error => {
      res.status(400).json(error);
    })
  }
  // businessPool(req,
  //   res,
  //   statements.updateOrCreateMeetingMinutes.statement,
  //   {
  //     MOM_ID: req.body.MOM_ID
  //   }
  // ).then(rMomId => {
  //   console.log(rMomId.rows);
  //   let momId = rMomId.rows;

  //   if (rMomId.rows != 0) {
  //     console.log("update");
  //     servicePool(
  //       req,
  //       res,
  //       statements.updateMeetingMinutes.statement,
  //       {
  //         MOM_ID: req.body.MOM_ID,
  //         MEETING_ID: req.body.MEETING_ID,
  //         DESCRIPTION: req.body.DESCRIPTION,
  //         RESPONSABLE_MEMBER: req.body.RESPONSABLE_MEMBER,
  //         STATUS: req.body.STATUS,
  //         TYPE: req.body.TYPE,
  //         MOM_DATE: req.body.MOM_DATE
  //       });


  //   }
  //   else {
  //     console.log("insert");
  //     bodyconverter.bodyconverter(req, res, req.body).then(convertedbody => {
  //       servicePool(req, res, statements.insertMeetingMinutess.statement, convertedbody);
  //     }).catch(error => {
  //       res.status(400).json(error);
  //       console.log(error)
  //     // servicePool(
  //     //   req,
  //     //   res,
  //     //   statements.insertMeetingMinutes.statement,
  //     //   {
  //     //     MOM_ID : req.,
  //     //     MEETING_ID,
  //     //     DESCRIPTION,
  //     //     RESPONSABLE_MEMBER,
  //     //     STATUS,
  //     //     TYPE,
  //     //     MOM_DATE
  //     //   });
  //      });
  //   }
 // }).catch(error => { console.log("error"); })

});


router.post('/updateMeeting', (req, res) => {
  servicePool(
    req,
    res,
    statements.updateMeeting.statement,
    {
      MEETING_ID: req.body.MEETING_ID,
      MEETING_DESCRIPTION: req.body.MEETING_DESCRIPTION,
      MEETING_DATE: req.body.MEETING_DATE,
      LOCATION: req.body.LOCATION,
      START_TIME_STR: req.body.START_TIME_STR,
      END_TIME_STR: req.body.END_TIME_STR
    });
});


router.post('/createOrUpdateMeetingMembers', (req, res) => {
  businessPool(req,
    res,
    statements.createOrUpdateMeetingMembers.statement,
    {
      MEETING_MEMBER_ID: req.body.MEETING_MEMBER_ID
    }
  ).then(meetingMemberId => {
    console.log(meetingMemberId.rows);

    if (meetingMemberId.rows != 0) {
      console.log("update");
      servicePool(
        req,
        res,
        statements.updateMeetingMembers.statement,
        {
          MEETING_MEMBER_ID: req.body.MEETING_MEMBER_ID,
          MEETING_ID: req.body.MEETING_ID,
          MEMBER_ROLE: req.body.MEMBER_ROLE,
          STATUS: req.body.STATUS,
          MAIL_SENT_FLAG: req.body.MAIL_SENT_FLAG,
          MEMBER_TYPE: req.body.MEMBER_TYPE,
          ATTENDANCE_FLAG: req.body.ATTENDANCE_FLAG,
          INVITATION_MAIL_FLAG: req.body.INVITATION_MAIL_FLAG,
          EMPLOYEE_ID: req.body.EMPLOYEE_ID,
          DELETED: req.body.DELETED,
          DELETED_BY: req.body.DELETED_BY,
          DELETED_DATE: req.body.DELETED_DATE,
          SUBSIDIARY_ID: req.body.SUBSIDIARY_ID,
          INVITED_FLAG: req.body.INVITED_FLAG
        }
      );
    }
    else {
      console.log("insert");
      bodyconverter.bodyconverter(req, res, req.body, statements.insertMeetingMembers.returns).then(convertedbody => {
        servicePool(req, res, statements.insertMeetingMembers.statement, convertedbody);
      }).catch(error => {
        res.status(400).json(error);
      });
    }

  }).catch(error => { console.log("error"); })
});


router.post('/updateOrCreateMeetingAgenda', (req, res) => {
  businessPool(req,
    res,
    statements.updateOrCreateMeetingAgenda.statement,
    {
      MEETING_AGENDA_ID: req.body.MEETING_AGENDA_ID
    }
  ).then(meetingAgendaId => {
    console.log(meetingAgendaId.rows);

    if (meetingAgendaId.rows != 0) {
      console.log("update");
      servicePool(
        req,
        res,
        statements.updateMeetingAgenda.statement,
        {
          MEETING_AGENDA_ID: req.body.MEETING_AGENDA_ID,
          MEETING_ID: req.body.MEETING_ID,
          DESCRIPTION: req.body.DESCRIPTION,
          STATUS: req.body.STATUS,
          DELETED: req.body.DELETED,
          DELETED_BY: req.body.DELETED_BY,
          DELETED_DATE: req.body.DELETED_DATE,
          SUBSIDIARY_ID: req.body.SUBSIDIARY_ID
        }
      );
    }
    else {
      console.log("insert");
      bodyconverter.bodyconverter(req, res, req.body, statements.insertMeetingAgenda.returns).then(convertedbody => {
        servicePool(req, res, statements.insertMeetingAgenda.statement, convertedbody);
      }).catch(error => {
        res.status(400).json(error);
      });
    }

  }).catch(error => { console.log("error"); })
});

router.post('/insertMeeting', (req, res) => {

  businessPool(req,
    res,
    statements.getMeetingIDSEQ.statement,
    []
  ).then(meetingID => {
    // console.log(meetingID.rows[0]);
    let meeting_Id = meetingID.rows[0].NEXTVAL;
    businessPool(req,
      res,
      statements.getCommitteetype.statement,
      {
        COMMITTEE_ID: req.body.COMMITTEE_ID
      }
    ).then(committeeType => {
      // console.log("committee type ")
      // console.log(committeeType.rows[0]);
      let commType = 0;
      if (committeeType.rows[0].COMMITTEE_TYPE != 616) {
        //  console.log("===========")
        commType = 136;
      }
      else {
        // console.log("==++++++=====")
        commType = 137;
      }
      // console.log(commType);
            businessPool(req, res, statements.getDeletedProject.statement, {project_id : req.body.PROJECT_ID}).then(delet =>{
                  console.log(delet.rows[0]);

                  if( delet.rows[0] != undefined ){
                    if(delet.rows[0].DELETED != 1) {
                     businessPool(req, res, statements.getCommitteesOfProject.statement, {committee_id : req.body.COMMITTEE_ID})
                     .then(proj =>{
                    //   console.log(proj.rows[0].PROJECT_ID)
                       if(proj.rows[0].PROJECT_ID != req.body.PROJECT_ID){
                        res.status(200).json({
                          message : "This committee id isn't exists on this project"
                        })
                       }
                       else{
                      console.log("good")
                      businessPool(req, res, statements.insertMeeting.statement,
                            {
                              MEETING_ID: meeting_Id,
                              MEETING_CODE: meeting_Id,
                              MEETING_DATE: req.body.MEETING_DATE,
                              TYPE: commType,
                              COMMITTEE_ID: req.body.COMMITTEE_ID,
                              MEETING_DESCRIPTION: req.body.MEETING_DESCRIPTION,
                              LOCATION: req.body.LOCATION,
                              PROJECT_ID: req.body.PROJECT_ID,
                              START_TIME_STR: req.body.START_TIME_STR,
                              END_TIME_STR: req.body.END_TIME_STR,
                              CREATED_BY : req.body.CREATED_BY
                            }).then(zz => {
                              // console.log("vdav")
                    
                    
                              businessPool(req, res, statements.insertMeetingMember.statement,
                                {
                                  MEETING_ID: meeting_Id,
                                  EMPLOYEE_ID: req.body.EMPLOYEE_ID,
                                  MEMBER_ROLE: req.body.MEMBER_ROLE,
                                  INVITED_FLAG: req.body.INVITED_FLAG
                                }).then(insertionn => {
                                  businessPool(req, res, statements.updateCommiteeId.statement,
                                    {
                                      COMMITTEE_ID: req.body.COMMITTEE_ID,
                                      MEETING_ID: meeting_Id
                    
                                    }
                                  ).then(result => {
                    
                                    res.status(200).json({
                                      status: 200,
                                      MeetingID: meetingID.rows[0].NEXTVAL,
                                      MeetingDescription: req.body.MEETING_DESCRIPTION,
                                      message: "succeeded"
                                    });
                                  }).catch(error => console.log("error update"))
                    
                                }).catch(error => console.log("error insert"));
                    
                    
                            }).catch(error => {
                              res.status(400).json({
                                status: 400,
                                message: error
                              });
                            })
                    


                       }
                     })
                  } else{
                    res.status(200).json({
                      message : "This project was deleted, please enter an existing project"
                    })
                  }
                }
                  else{
                    res.status(200).json({
                      message : "This project isn't exist"
                    })
                  }
            })
    //   
    }).catch(error => {
      res.status(200).json({
        status: 200,
        message: error
      });
    })


  }).catch(error => {
    res.status(200).json({
      status: 200,
      message: error
    });
  })
});

router.post('/insertCommitteeMembers', checkdataexists, (req, res) => {
  businessPool(req, res, statements.getEmpName.statement,
    {
      EMPLOYEE_ID: req.body.EMPLOYEE_ID
    }).then(zz => {
      // console.log(zz.rows)
      businessPool(req, res, statements.getCommitteeEName.statement,
        {
          COMMITTEE_ID: req.body.COMMITTEE_ID
        }).then(yy => {
          businessPool(req, res, statements.getMemberRole.statement,
            {
              MEMBER_ROLE: req.body.MEMBER_ROLE
            }).then(aa => {
              bodyconverter.bodyconverter(req, res, req.body, statements.insertCommitteeMembers.returns).then(convertedbody => {
                businessPool(req, res, statements.insertCommitteeMembers.statement, convertedbody).then(ss => {
                  res.status(200).json({
                    status: 200,
                    message: "Success",
                    Employee: zz.rows[0],
                    committee_name: yy.rows[0],
                    Employee_Name_EN: aa.rows[0],
                    rows: ss.rows
                  });
                })
              })
            })
          //  console.log(yy.rows)
        })
    })
  // console.log("yes")
  // bodyconverter.bodyconverter(req, res, req.body, statements.insertCommitteeMembers.returns).then(convertedbody => {
  //   servicePool(req, res, statements.insertCommitteeMembers.statement, convertedbody);
  // }).catch(error => {
  //   res.status(400).json(error);
  // });
});

router.post('/deleteMember', checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    statements.deleteMember.statement, {
    "COMMITTEE_MEMBERS_ID": req.body.COMMITTEE_MEMBERS_ID,
    "DELETED_BY": req.body.DELETED_BY
  });
});

router.get('/workOrderApprovals', (req, res) => {
  servicePool(req, res,
    statements.workOrderApprovals.statement,
    {
      EMPLOYEE_ID: req.body.EMPLOYEE_ID,
      REQ_CLASSIFICATION: req.body.REQ_CLASSIFICATION,
      REQUEST_ID: req.body.REQUEST_ID
    }
  );
});


router.post('/closeMeeting', (req, res) => {
  businessPool(req, res,
    statements.getMomId.statement,
    {
      meeting_id: req.body.meeting_id
    }).then(momId => {
      console.log(momId.rows)
      businessPool(req, res,
        statements.getMemberId.statement,
        {
          meeting_id: req.body.meeting_id
        }).then(memberId => {
          console.log(memberId.rows)
          if (momId.rows != 0 && memberId.rows != 0) {
            servicePool(req, res,
              statements.closeMeeting.statement,
              { meeting_id: req.body.meeting_id }
            );
          }
          else {
            res.status(200).json({
              status: 400,
              message: "NO MOM or MEMBERS in this meeting"
            })
          }

        }).catch(error => {
          ;
          res.status(200).json({
            status: 200,
            message: error
          })
        })

    }).catch(error => {
      console.log("error");
      res.status(200).json({
        status: 200,
        message: error
      })
    })
});


router.post('/insertComment', checkdataexists, (req, res) => {

  businessPool(req, res, statements.getEmpName.statement,
    {
      employee_id: req.body.employee_id
    }).then(zz => {
      // console.log("yes")

      bodyconverter.bodyconverter(req, res, req.body, statements.insertComment.returns).then(convertedbody => {
        businessPool(req, res, statements.insertComment.statement, convertedbody).then(inserted => {
          console.log("inserted")
          console.log(inserted.rows.R_comment_id)
          businessPool(req, res, statements.getcreationDate.statement,
            {
              comment_id: inserted.rows.R_comment_id
            }).then(a => {
              console.log(a.rows)
              res.status(200).json({
                status: 200,
                message: "Success",
                Creation_Date: a.rows[0],
                Employee_Name: zz.rows[0],
                rows: inserted.rows
              });
            })


        });
      }).catch(error => {
        res.status(400).json(error);
      });





    }).catch(error => res.status(400).json({
      status: 400,
      message: "Error WHile Connecting Please try Again!"
    }));

  // bodyconverter.bodyconverter(req, res, req.body, statements.insertComment.returns).then(convertedbody => {
  //   servicePool(req, res, statements.insertComment.statement, convertedbody);
  // }).catch(error => {
  //   res.status(400).json(error);
  // });
});


router.get("/getComments/:filter/:employee_id/:meeting_id", (req, res) => {

  if (req.params.filter != 2) {
    businessPool(req, res,
      statements.getMinutesComments.statement,
      {
        employee_id: req.params.employee_id,
        meeting_id: req.params.meeting_id
      }).then(getCount => {
        if (getCount.rows.length > 0) {
          businessPool(req, res,
            statements.getMinutesComments.statement,
            {
              employee_id: req.params.employee_id,
              meeting_id: req.params.meeting_id
            }).then(data => {
              res.status(200).json({
                status: 200,
                message: 1,
                rows: data.rows
              })
            }).catch(error => {
              res.status(400).json({
                status: 400,
                message: "Error WHile Connecting Please try Again!",
              })
            })

        }
        else {
          businessPool(req, res,
            statements.getMinutesComme.statement,
            {
              employee_id: req.params.employee_id,
              meeting_id: req.params.meeting_id
            }).then(data => {
              res.status(200).json({
                status: 200,
                message: 0,
                rows: data.rows
              })
            }).catch(error => {
              res.status(400).json({
                status: 400,
                message: "Error WHile Connecting Please try Again!",
              })
            })


        }
      }).catch(error => {
        res.status(400).json({
          status: 400,
          message: "Error WHile Connecting Please try Again!",
        })
      })
  }
  else (
    businessPool(req, res,
      statements.getAgandeaComments.statement,
      {
        employee_id: req.params.employee_id,
        meeting_id: req.params.meeting_id
      }).then(getCount => {
        if (getCount.rows.length > 0) {
          businessPool(req, res,
            statements.getAgandeaComments.statement,
            {
              employee_id: req.params.employee_id,
              meeting_id: req.params.meeting_id
            }).then(data => {
              res.status(200).json({
                status: 200,
                message: 1,
                rows: data.rows
              })
            }).catch(error => {
              res.status(400).json({
                status: 400,
                message: "Error WHile Connecting Please try Again!",
              })
            })
        }
        else {
          businessPool(req, res,
            statements.getAgandeaComme.statement,
            {
              employee_id: req.params.employee_id,
              meeting_id: req.params.meeting_id
            }).then(data => {
              res.status(200).json({
                status: 200,
                message: 0,
                rows: data.rows
              })
            }).catch(error => res.status(400).json({
              status: 400,
              message: "Error WHile Connecting Please try Again!",
            }))
        }
      }).catch(error => res.status(400).json({
        status: 400,
        message: "Error WHile Connecting Please try Again!",
      }))

  )

});



let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/uploads/')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
  }
});

// cb(null, 'assets/uploads/')
const upload = multer({ storage: storage });

router.post('/insertMilestoneDeliverable', upload.single(settings.genericfilename),async (req, res) => {
  let ipAddress = await publicIp.v4()

  let fileDetails = {
    "DESCRIPTION": req.body.DESCRIPTION,
    "STATUS": req.body.STATUS,
    "MILESTONE_ID": req.body.MILESTONE_ID,
    "FILE_ID": req.file.filename,
    "FILE_PATH": "http://" + ipAddress + ':' + process.env.MEDPORT + '/uploads/' + req.file.filename
  };
  bodyconverter.bodyconverter(req, res, fileDetails, statements.insertMilestoneDeliverable.returns).then(insert => {

    businessPool(req, res, statements.insertMilestoneDeliverable.statement, insert).then(inserted => {
      res.status(200).json({
        status: 200,
        message: "success"
      })
    }
    ).catch(error => res.status(400).json({
      status: 400,
      message: error
    }));
  })
})

router.post('/insertWishList', upload.single(settings.genericfilename), (req, res) => {
  businessPool(req, res, statements.getPhaseTaskSeq.statement, []).then(async attach => {
    // console.log(attach)
    let ipAddress = await publicIp.v4()

    let attachID = attach.rows[0].NEXTVAL;
    let fileDetails = {
      "ATTACH_ID": attachID,
      "attach_title": req.file.filename,
      "FILE_NAME": "http://" + ipAddress + ':' + process.env.MEDPORT + '/uploads/' + req.file.filename
    };
     bodyconverter.bodyconverter(req, res, fileDetails, statements.insertAttach.returns).then(upload => {

       businessPool(req, res, statements.insertAttach.statement, upload).then(inserted => {
         businessPool(req, res, statements.insertWishList.statement, 
          {
            PHASE_TASK_ID : attachID,
            START_DATE : req.body.START_DATE,
            END_DATE : req.body.END_DATE,
            VALUE : req.body.VALUE
          }).then(wishlist =>{
            res.status(200).json({
              status : 200,
              message : "successed",
              attach_id : attachID
            })
          })        
       }).catch(error => { console.log("after inserted error !") })
     });
  });
})


router.post('/uploadFile/:filter/:MOM_ID/:CREATED_BY', upload.single(settings.genericfilename), (req, res) => {
  businessPool(req, res, statements.getMaxAttachId.statement, []).then(async(attach) => {
    let ipAddress = await publicIp.v4()

    let attachID = attach.rows[0].NEXTVAL;
    let fileDetails = {
      "ATTACH_ID": attachID,
      "CREATED_BY": req.params.CREATED_BY,
      "attach_title": req.file.filename,
      "FILE_NAME": "http://" + ipAddress + ':' + process.env.MEDPORT + '/uploads/' + req.file.filename
    };
    bodyconverter.bodyconverter(req, res, fileDetails, statements.insertAttachment.returns).then(upload => {

      // console.log(upload);
      businessPool(req, res, statements.insertAttachment.statement, upload).then(inserted => {
        if (req.params.filter != 1) {
          servicePool(
            req,
            res,
            statements.updateMMinutes.statement,
            {
              ATT_ID: attachID,
              MOM_ID: req.params.MOM_ID
            });

        } else {
          servicePool(
            req,
            res,
            statements.updateMeetingAgenda.statement,
            {
              ATT_ID: attachID,
              MEETING_AGENDA_ID: req.params.MOM_ID
            });
        }
      }).catch(error => { console.log("after inserted error !") })
    });
  });
})

router.get('/getAttachment/:filter/:meeting_id', (req, res) => {
  if (req.params.filter != 1) {
    servicePool(req, res, statements.getAttachmentMinutes.statement, { meeting_id: req.params.meeting_id })
  }
  else {
    servicePool(req, res, statements.getAttachmentAgenda.statement, { meeting_id: req.params.meeting_id })
  }
})
router.get('/getPresentationAttachment/:meeting_id', (req, res) => {
  servicePool(req, res, statements.getAttachmentPresentation.statement, { meeting_id: req.params.meeting_id })

})
router.post('/insertMeetingAgenda', checkdataexists, (req, res) => {
 
   let arr = req.body;
  for(let i =0; i < arr.length; i++)
  {
    businessPool(req, res, statements.insertMeetingAgenda.statement,
     {
       MEETING_ID : arr[i].MEETING_ID,
       DESCRIPTION : arr[i].DESCRIPTION
     }).then(ou =>{
      res.status(200).json({
        message : "insert successed",
        status : 200
      })
    })
 
 }

});


router.post('/insertMeetingMinutes', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertMeetingMinutes.returns).then(convertedbody => {
    servicePool(req, res, statements.insertMeetingMinutes.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});


router.post('/deleteMeetingAgenda/:meeting_id', (req, res) => {
  servicePool(req, res, statements.deleteMeetingAgenda.statement, {
    meeting_id: req.params.meeting_id
  })
})

router.post('/createWorkOrder', checkdataexists, (req, res) => {

  bodyconverter.bodyconverter(req, res, req.body, statements.createWorkOrder.returns).then(convertedbody => {
    businessPool(req, res, statements.createWorkOrder.statement, convertedbody).then(insert => {
      console.log(insert)
      console.log(insert.rows.R_WORK_ORDER_ID)
      let x = insert.rows.R_WORK_ORDER_ID;
      businessPool(req, res, statements.getOneRequestType.statement, {milestone_id : req.body.MILESTONE_ID}).then(get => {
        console.log(get.rows[0].REQUEST_TYPE_ID)
        y = get.rows[0].REQUEST_TYPE_ID ;
              bodyconverter.bodyconverter(req, res, { REQUEST_ID: x,
                request_type : y,
                  DESCRIPTION : req.body.DESCRIPTION ,
                  CREATED_BY : req.body.EMPLOYEE_ID,
                  CREATION_DATE: req.body.creation_date
                
                 }, statements.insertRequest.returns).then(convertedbody => {
                  console.log("osam");
                businessPool(req, res, statements.insertRequest.statement, convertedbody).then(y => {

                console.log("good");
                res.status(200).json({
                status: 200,
                message: "success",
                REQUEST_ID: x,
                WORK_ORDER_ID: x
                    })
                  })
                })
      })
      

      // res.status(200).json({
      //   status : 200,
      //   message : "success",
      //   REQUEST_ID : insert.rows.R_WORK_ORDER_ID,
      //   WORK_ORDER_ID : insert.rows.R_WORK_ORDER_ID
      // })
    })
  })
});

router.get('/getRequestType', (req, res) => {
  servicePool(req,
    res,
    statements.getRequestType.statement,
    []
  );
});


router.post('/insertMeetingMembers', checkdataexists, (req, res) => {
  // bodyconverter.bodyconverter(req, res, req.body, statements.insertMeetingMembers.returns).then(convertedbody => {
  //   servicePool(req, res, statements.insertMeetingMembers.statement, convertedbody);
  // }).catch(error => {
  //   res.status(400).json(error);
  // });
  // bodyconverter.bodyconverter(req, res, {
  //   MEETING_ID : arr[i].MEETING_ID,
  //   MEMBER_ROLE : arr[i].MEMBER_ROLE,
  //   STATUS : arr[i].STATUS,
  //   MEMBER_TYPE : arr[i].MEMBER_TYPE,
  //   MAIL_SENT_FLAG : arr[i].MAIL_SENT_FLAG,
  //   ATTENDANCE_FLAG : arr[i].ATTENDANCE_FLAG,
  //   INVITATION_MAIL_FLAG : arr[i].INVITATION_MAIL_FLAG,
  //   EMPLOYEE_ID : arr[i].EMPLOYEE_ID,
  //   SUBSIDIARY_ID : arr[i].SUBSIDIARY_ID,
  //   INVITED_FLAG : arr[i].INVITED_FLAG
  //  }, statements.insertMeetingMembers.returns).then(convertedbody => {
  //   servicePool(req, res, statements.insertMeetingMembers.statement,convertedbody)
       
  //  }).catch(error => {
  //     res.status(400).json(error);
  //   });
   let arr = req.body;
   for(let i =0; i < arr.length ; i++)
   {
      // bodyconverter.bodyconverter(req, res, {
      //   MEETING_ID : arr[i].MEETING_ID,
      //   MEMBER_ROLE : arr[i].MEMBER_ROLE,
      //   STATUS : arr[i].STATUS,
      //   MEMBER_TYPE : arr[i].MEMBER_TYPE,
      //   MAIL_SENT_FLAG : arr[i].MAIL_SENT_FLAG,
      //   ATTENDANCE_FLAG : arr[i].ATTENDANCE_FLAG,
      //   INVITATION_MAIL_FLAG : arr[i].INVITATION_MAIL_FLAG,
      //   EMPLOYEE_ID : arr[i].EMPLOYEE_ID,
      //   SUBSIDIARY_ID : arr[i].SUBSIDIARY_ID,
      //   INVITED_FLAG : arr[i].INVITED_FLAG
      //  }, statements.insertMeetingMembers.returns).then(convertedbody => {
      //   businessPool(req, res, statements.insertMeetingMembers.statement,convertedbody)
           
      //  }).catch(error => {
      //     res.status(400).json(error);
      //   });

     businessPool(req, res, statements.insertMeetingMembers.statement,
      {
        MEETING_ID : arr[i].MEETING_ID,
        MEMBER_ROLE : arr[i].MEMBER_ROLE,
        STATUS : arr[i].STATUS,
        MEMBER_TYPE : arr[i].MEMBER_TYPE,
        MAIL_SENT_FLAG : arr[i].MAIL_SENT_FLAG,
        ATTENDANCE_FLAG : arr[i].ATTENDANCE_FLAG,
        INVITATION_MAIL_FLAG : arr[i].INVITATION_MAIL_FLAG,
        EMPLOYEE_ID : arr[i].EMPLOYEE_ID,
        SUBSIDIARY_ID : arr[i].SUBSIDIARY_ID,
        INVITED_FLAG : arr[i].INVITED_FLAG 
      }).then(ou =>{
        res.status(200).json({
          message : "insert successed",
          status : 200
        })
      })
  
  }
});

// router.post('/insertMeetingMembers', checkdataexists, (req, res) => {
//   var list = new ArrayList;
//   for(var i in list){
//   bodyconverter.bodyconverter(req, res, req.body, statements.insertMeetingMembers.returns).then(convertedbody => {
//     servicePool(req, res, statements.insertMeetingMembers.statement, convertedbody);
//   }).catch(error => {
//     res.status(400).json(error);
//   });
//               }
// });

router.post('/Approved', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.Approved.returns).then(convertedbody => {
    servicePool(req, res, statements.Approved.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

router.post('/insertWishList', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertWishList.returns).then(convertedbody => {
    servicePool(req, res, statements.insertWishList.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});


router.post('/updateMeetingMemberAttendance/:MEETING_MEMBER_ID/:ATTENDANCE_FLAG', (req, res) => {

  if (req.params.ATTENDANCE_FLAG != "attend") {
    servicePool(req,
      res,
      statements.notAttende.statement,
      { 'MEETING_MEMBER_ID': req.params.MEETING_MEMBER_ID }
    );
  }
  else {
    servicePool(req,
      res,
      statements.attende.statement,
      { 'MEETING_MEMBER_ID': req.params.MEETING_MEMBER_ID }
    );
  }
});

///////////////***********   insert new employee    */
router.post('/insertNewEmployee', (req, res) => {

  businessPool(req, res, statements.insertNewEmployee.statement,
    {
      FIRST_NAME: req.body.FIRST_NAME,
      S_SECOND_NAME: req.body.S_SECOND_NAME,
      LAST_NAME: req.body.LAST_NAME,
      FIRST_NAME2: req.body.FIRST_NAME2,
      EMPLOYEE_EMAIL: req.body.EMPLOYEE_EMAIL,
      PHONE: req.body.PHONE
    }).then(inserted => {
      businessPool(req, res, statements.getMaxEmp.statement, []).then(get => {
        console.log(get.rows[0].MAX)
        businessPool(req, res, statements.createUserAccount.statement,
          {
            EMPLOYEE_ID: get.rows[0].MAX,
            USER_NAME: req.body.EMPLOYEE_EMAIL
          }).then(userAccount => {
            console.log("Created")
            businessPool(req, res, statements.insertProjectMem.statement, {
              EMPLOYEE_ID: get.rows[0].MAX,
              PROJECT_ID: req.body.PROJECT_ID
            }).then(p => {
              console.log("project member")
              servicePool(req, res, statements.getMemberID.statement, []);
              // res.status(200).json({
              //   status : 200,
              //   message : "Success"
              // })
            })

          })
      })
    })

})


router.post('/createMeetingPresentation', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.createMeetingPresentation.returns).then(convertedbody => {
    servicePool(req, res, statements.createMeetingPresentation.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

router.get('/getMeetingPresentation', (req, res) => {
  servicePool(req, res, statements.getMeetingPresentation.statement, [])
})

router.post('/reqCloseMeeting/:P_MEETING_ID/:P_MINUTES_ID', reqCloseMeeting)

function reqCloseMeeting(req, res) {
  servicePool(req,
    res,
    statements.reqCloseMeeting.statement, {
    P_MEETING_ID: req.params.P_MEETING_ID,
    P_MINUTES_ID: req.params.P_MINUTES_ID
  }
  );
};

/////////// project status

router.get('/getstatus', (req, res) => {
  businessPool(req, res, statements.getstatus.statement, []).then(e => {
    res.status(200).json({
      status: 200,
      message: "Success",
      0: "not active",
      1: "new project and no spons and assign to manager",
      2: "project assign sponsar and client mgr boq and mile",
      3: "project ready to export and import plan",
      4: "finished"
    })
  })
})


router.get('/jobOrderINProgress/:EMPLOYEE_ID', (req, res) => {
  servicePool(req,
    res,
    statements.jobOrderINProgress.statement,
    { 'EMPLOYEE_ID': req.params.EMPLOYEE_ID }
  );
});

router.get('/avaliableResourcesInCloseJobOrder/:p_job_order_date/:POSITION_ID/:TEMPLATE_ID', (req, res) => {
  // var myDate = new Date(req.body.p_job_order_date);
  // var date = myDate.toDateString();
  /////////////////
  // let x = dateFormat(req.body.p_job_order_date, "mm/dd/yyyy")
  // var y = new Date(x);
  //     var z = dateFormat(y,"m/d/yyyy")
  //     console.log(z)
  /////////////
  // var s = req.body.p_job_order_date;
  // var d = new Date(s);

  // console.log(d);
  // var z = dateFormat(d,"mm/dd/yyyy")

  // console.log(z);

  let temp = null ;
  const x = req.params.TEMPLATE_ID ;
  console.log(x)

  if(req.params.TEMPLATE_ID > null)
  {
    console.log("first")
  servicePool(req,
    res,
    statements.avaliableResourcesInCloseJobOrder.statement,
    {
      POSITION_ID: req.params.POSITION_ID,
      p_job_order_date: req.params.p_job_order_date,
      TEMPLATE_ID: req.params.TEMPLATE_ID
    }
  );
  }
  else{
    console.log("second")

    servicePool(req,
      res,
      statements.anotherAvaliableResourcesInCloseJobOrder.statement,
      {
        POSITION_ID: req.params.POSITION_ID,
        p_job_order_date: req.params.p_job_order_date
      }
    );
  }

  
});


router.post('/insertRisk', checkdataexists, (req, res) => {
  businessPool(req, res, statements.insertRisk.statement,
    {
      RISK_DESCRIPTION: req.body.RISK_DESCRIPTION,
      RISK_WEIGHT: req.body.RISK_WEIGHT,
      RISK_TYPE: req.body.RISK_TYPE,
      RISK_CLASSIFICATION: req.body.RISK_CLASSIFICATION
    }).then(inserted => {
      businessPool(req, res, statements.getRiskId.statement, []).then(get => {
        const x = get.rows[0].MAX
        console.log(get.rows[0].MAX)
        businessPool(req, res, statements.insertMilestoneRisk.statement,
          {
            MILESTONE_ID: req.body.MILESTONE_ID,
            RISK_ID: x
          }).then(y => {
            res.status(200).json({
              status: 200,
              message: "success"
            })
          })
      }
      )
    })
  // bodyconverter.bodyconverter(req, res, req.body, statements.insertRisk.returns).then(convertedbody => {
  //   servicePool(req, res, statements.insertRisk.statement, convertedbody);
  // }).catch(error => {
  //   res.status(400).json(error);
  // });
});


router.post('/updateIncidentStatus', (req, res) => {
  servicePool(req, res,
    statements.updateIncidentStatus.statement,
    { INC_REP_REQUEST_ID: req.body.INC_REP_REQUEST_ID }
  );
});


router.get('/getOneProjectBoqByProjectID/:PROJECT_ID', (req, res) =>{
 
  let arr = [] ;
  
  businessPool(req,
          res,
          statements.getOneProjectBoqByProjectID.statement,
        {'PROJECT_ID' :req.params.PROJECT_ID},
      ).then(get1 =>{
     //  console.log(get1.rows)
      //  console.log("=============")
       businessPool(req, res, statements.getParents.statement, {'PROJECT_ID' :req.params.PROJECT_ID}).then(parents=>{
      //   console.log(parents.rows[1].BOQ_PARENT)
        //  for(let i = 0; i < parents.rows.length; i++)
        //  {
        businessPool(req, res, statements.getParent.statement, {'PROJECT_ID' :req.params.PROJECT_ID}).then(get2 =>{
      //    console.log(get2.rows)
        //  console.log("+++++++++")
         if(get2.rows <= 0)
         {
         res.status(200).json({
                    // "parent_id" : get2.rows[0].BOQ_PARENT , 
                     'child' : get2.rows,
                    'rows' : get1.rows
                   })
                 }
                 else(
                   res.status(200).json({
                     "parent_id" : parents.rows , 
                     'child' : get2.rows,
                    'rows' : get1.rows
                   })
                 )
       })
      //}
      })
        // if(get2.rows[0].BOQ_PARENT != undefined)
        // {
        //       businessPool(req, res, statements.boqChild.statement, { BOQ_PARENT : get2.rows[0].BOQ_PARENT}).then(child =>{
        //         res.status(200).json({
        //           "parent_id" : get2.rows[0].BOQ_PARENT , 
        //           'child' : child.rows,
        //          'rows' : get1.rows
        //         })
        //       })}
        //       else(
        //        res.status(200).json({
        //         'Data' : "No project id"
        //        })
 
        //       )
       
       
      //   for(let x=0 ; x < get.rows.length; x++)
      //   {
      //  //   console.log(get.rows[x].BOQ_PARENT)
      //  if(get.rows[x].BOQ_PARENT != null){
      //     businessPool(req, res, statements.boqChild.statement, { BOQ_PARENT : get.rows[x].BOQ_PARENT}).then(child=>{
      //       console.log(child)
      //       arr.push(child)
      //       res.status(200).json({
      //         "Parent" : get.rows[x].BOQ_PARENT ,
      //         "Child" : arr,
      //         rows : get.rows
      //       })
      //         }) 
      //         break;   
      //               }
      //      else if(get.rows[x].BOQ_PARENT != 1)
      //        {
      //         continue ;
      //         res.status(200).json({
      //           "Child" : arr,
      //           rows : get.rows
      //         }) 
                    
      //        }
      //  } 
      
      // //  res.status(200).json({
      // //   "Child" : arr,
      // //   rows : get.rows
      // // })     
      }).catch(err =>{
        res.status(400).json({
          message : "Run again !!"
        });
      })   

});

  router.get('/submittles', (req, res)=>{
    servicePool(req, res, statements.submittles.statement, [])
  })


  

  router.get('/getEmpNameENAR/:EMPLOYEE_ID', (req, res)=>{
    servicePool(req, res, statements.getEmpNameENAR.statement, { EMPLOYEE_ID : req.params.EMPLOYEE_ID})
  })

module.exports = router;
