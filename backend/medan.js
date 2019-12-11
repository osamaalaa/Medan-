// standard dec
require('module-alias/register');
let connPool = require('./routes/connectors/oraclePool');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
let bodyParser = require('body-parser');
let filelogger = require('./routes/loggers/fileLogger');
app.use(express.static('assets'));
app.use(cors());

// services dec
let violationGroup = require('@violationGroup/violationGroup/violationGroup');
let violationGroupDetails = require('@violationGroup/violationGroupDetails/violationGroupDetails');
let issues = require('@issues/issues/issues');
let issuesAttachments = require('@issues/issuesattachments/issuesattachments');
// let issuescustomvalue = require('@issues/issuescustomvalue/issuescustomvalue');
let issuessubclasscustomfiles = require('@issues/issuessubclasscustomfiles/issuessubclasscustomfiles');
let issuessubclassification = require('@issues/issuessubclassification/issuessubclassification');
let issuesComments = require('@issues/issuesComments/issueComments');
let issuesassignments = require('@issues/issuesassignments/issuesassignments');
let IssuesManySites = require('@issues/IssuesManySites/IssuesManySites');
let IssuesManySitesLocation = require('@issues/IssuesManySitesLocation/IssuesManySitesLocation');
let IssuesManySitesTypes = require('@issues/IssuesManySitesTypes/IssuesManySitesTypes');



/////////
let lookUpDetails = require('@lookUp/lookUpDetails/lookUpDetails');
let lookUpApps = require('@lookUp/lookUpApps/lookUp');
let LookupDetailSetting = require('@lookUp/LookupDetailSetting/LookupDetailSetting');
let LookupDetailDetails = require('@lookUp/LookupDetailDetails/LookupDetailDetails');
let LookupMaster = require('@lookUp/LookupMaster/LookupMaster');

//////////////////
let locations = require('@locations/locations/locations');
let assetDefiniation = require('@asst/assetsdefinition/assetsdefinition');
///////////////////////
let projects = require('@proj/Projects/projects');
let ProjectBenefit = require('@proj/ProjectBenefit/ProjectBenefit');
let ProjectBoq = require('@proj/ProjectBoq/ProjectBoq');
let ProjectBoqAssets = require('@proj/ProjectBoqAssets/ProjectBoqAssets');
let ProjectCMS = require('@proj/ProjectCMS/ProjectCMS');
let ProjectDataDelta = require('@proj/ProjectDataDelta/ProjectDataDelta');
let ProjectGroups = require('@proj/ProjectGroups/ProjectGroups');
let ProjectKPI = require('@proj/ProjectKPI/ProjectKPI');
let ProjectMembers = require('@proj/ProjectMembers/ProjectMembers');
let ProjectMileAssetDet = require('@proj/ProjectMileAssetDet/ProjectMileAssetDet');
let ProjectMilestone = require('@proj/ProjectMilestone/ProjectMilestone');
let ProjectReport = require('@proj/ProjectReport/ProjectReport');
let ProjectReq = require('@proj/ProjectReq/ProjectReq');
let ProjectRole = require('@proj/ProjectRole/ProjectRole');
let ProjectTracks = require('@proj/ProjectTracks/ProjectTracks');


////////////////////////
let employees = require('@emp/employees/employees');
let security = require('@sec/security');
let asstgro = require('@asstgro/assetgroups/assetgroups');
let assetgroupviolations = require('@assetgroupviolations/assetgroupviolations/assetgroupviolations');
let attachement = require('@att/attachement');
let customfieldJoinissuesubclasscustom = require('@customfieldJoinissuesubclasscustom/customfieldJoinissuesubclasscustom/customfieldJoinissuesubclasscustom');
let jobAdvertisments = require('@job/jobAdvertismentList/jobAdvertismentList');
let jobCompetency = require('@job/jobCompetency/jobCompetency');
let jobName = require('@job/jobName/jobName');
let jobOrderAssets = require('@job/jobOrderAssetsDummy/jobOrderAssetsDummy');
let jobOrderDetails = require('@job/jobOrderDetails/jobOrderDetails');
let jobOrderLabor = require('@job/jobOrderLabor/jobOrderLabor');
let jobOrderLaborsDummy = require('@job/jobOrderLaborsDummy/jobOrderLaborsDummy');
let jobOrderRequest = require('@job/jobOrderRequest/jobOrderRequest');
let JobOrderServices = require('@job/JobOrderServices/JobOrderServices');
let JobOrderSpareParts = require('@job/JobOrderSpareParts/JobOrderSpareParts');
let JobOrderSparePartsDummy = require('@job/JobOrderSparePartsDummy/JobOrderSparePartsDummy');
let JobOrders = require('@job/JobOrders/JobOrders');
let JobOrderDefinition = require('@job/JobOrderDefinition/JobOrderDefinition');
let JobOrderRecurring = require('@job/JobOrderRecurring/JobOrderRecurring');
let JobRequestCheck = require('@job/JobRequestCheck/JobRequestCheck');
let JobVacancy = require('@job/JobVacancy/JobVacancy');
let JobVacancyLinks = require('@job/JobVacancyLinks/JobVacancyLinks');
let Jobs = require('@job/Jobs/Jobs');
let jobOrderCounter = require('@job/jobOrderCounters/jobOrderCounter');
let webResources = require('@job/closeJobOrder/closeJobOrder');
//let updateDailyWorkingHours = require('@job/closeJobOrder/closeJobOrder');

//////////// assets
let AssetActionLabors = require('@assets/AssetActionLabors/AssetActionLabors');
let AssetActionSpareParts = require('@assets/AssetActionSpareParts/AssetActionSpareParts');
let AssetActionStarting = require('@assets/AssetActionStarting/AssetActionStarting');
let AssetAction = require('@assets/AssetAction/AssetAction');
let AssetChecking = require('@assets/AssetChecking/AssetChecking');
let AssetCounters = require('@assets/AssetCounters/AssetCounters');
let AssetDefAttaches = require('@assets/AssetDefAttaches/AssetDefAttaches');
let AssetEquipments = require('@assets/AssetEquipments/AssetEquipments');
let AssetLabors = require('@assets/AssetLabors/AssetLabors');
let AssetPenelities = require('@assets/AssetPenelities/AssetPenelities');
let AssetPermits = require('@assets/AssetPermits/AssetPermits');
let AssetSpareparts = require('@assets/AssetSpareparts/AssetSpareparts');
let assetNameList = require('@assets/assetNameList/assetNameList');


////////////////////

let boqMeasur = require('@boqMeasur/BoqMeasurement/BoqMeasurement');
let boqMeasurSub = require('@boqMeasur/BoqMeasurementSub/BoqMeasurementSub');
let calender = require('@calender/Calender');
let ClientContactPerson = require('@ClientContactPerson/ClientContactPerson');
let Clients = require('@ClientContactPerson/Clients/Clients');
let Committee = require('@Committee/Committee/Committee');
let CommitteMembers = require('@Committee/CommitteMembers/CommitteMembers');
let CommuntiqueFields = require('@Committee/CommuntiqueFields/CommuntiqueFields');
let CommuntiqeuTypes= require('@Committee/CommuntiqeuTypes/CommuntiqeuTypes');
let Communtiqeu= require('@Committee/Communtiqeu/Communtiqeu');
let CompetencyGroup = require('@CompetencyGroup/CompetencyGroup');
let CompetencyMatrix = require('@CompetencyMatrix/CompetencyMatrix');
let Counters = require('@Counters/Counters');
let Countries = require('@Countries/Countries');
let DailyWorkingHours = require('@DailyWorkingHours/DailyWorkingHours');
let DecisionVoting = require('@DecisionVoting/DecisionVoting');
let Deductions = require('@Deductions/Deductions');
let Delegation = require('@Delegation/Delegation');
let DetailPlan = require('@DetailPlan/DetailPlan');
let Emails = require('@Emails/Emails');
let EmployeeContacts = require('@EmployeeContacts/EmployeeContacts');
let EmployeeProtoflio = require('@EmployeeProtoflio/EmployeeProtoflio');
let Expenses = require('@Expenses/Expenses');

let MaintanceTypes = require('@MaintanceTypes/MaintanceTypes');
let MasterPlan = require('@MasterPlan/MasterPlan');
let MasterPlanSetting = require('@MasterPlanSetting/MasterPlanSetting');

//////////////////////////////
let meetingComments = require('@Meetings/meetingComments/meetingComments');
let MeetingAgenda = require('@Meetings/MeetingAgenda/MeetingAgenda');
let MeetingMembers = require('@Meetings/MeetingMembers/MeetingMembers');
let MeetingMinutes = require('@Meetings/MeetingMinutes/MeetingMinutes');
let MeetingMinutesDetail = require('@Meetings/MeetingMinutesDetail/MeetingMinutesDetail');
let MeetingSchedules = require('@Meetings/MeetingSchedules/MeetingSchedules');
let Meetings = require('@Meetings/Meetings/Meetings');
///////////////////////
let MilestonesDeleviables = require('@Milestones/MilestonesDeleviables/MilestonesDeleviables');
let MilestonesDetails = require('@Milestones/MilestonesDetails/MilestonesDetails');
let MilestonePayment = require('@Milestones/MilestonePayment/MilestonePayment');
let MilestonePaymentDetails = require('@Milestones/MilestonePaymentDetails/MilestonePaymentDetails');
let MilestonePromisedDate = require('@Milestones/MilestonePromisedDate/MilestonePromisedDate');
let MilestoneRisks = require('@Milestones/MilestoneRisks/MilestoneRisks');
let MilestoneScopes  = require('@Milestones/MilestoneScopes/MilestoneScopes');
////////////////

let NodeUploads = require('@NodeUploads/NodeUploads');
let NotificationTmpPrms = require('@Notification/NotificationsTemplatesParams/NotificationsTemplatesParams');
let NotificationsTmp = require('@Notification/NotificationsTemplates/NotificationsTemplates');
let PhaseTasks = require('@Phase/PhaseTasks/PhaseTasks');
let PhaseTaskDetail = require('@Phase/PhaseTasksDetails/PhaseTasksDetails');
let PlanHeaderWeeks = require('@PlanHeaderWeeks/PlanHeaderWeeks');
let PlanningTasks = require('@PlanningTasks/PlanningTasks');
let PortTrans = require('@PortTransactions/PortTransactions');
///////////////////
let PortfolioBoq = require('@Portfolio/PortfolioBoq/PortfolioBoq');
let Portofolios = require('@Portfolio/Portofolios/Portofolios');
//////////////////
let Positions = require('@Positions/Positions/Positions');
let PositionsPrerequists = require('@Positions/PositionsPrerequists/PositionsPrerequists');

/////////////////////////

let OLDHRAtRulesSettings = require('@OLDHR/OLDHRAtRulesSettings/OLDHRAtRulesSettings');
let OLDHRATRuesTempDetail = require('@OLDHR/OLDHRATRuesTempDetail/OLDHRATRuesTempDetail');
let OLDHRATRulesTemp = require('@OLDHR/OLDHRATRulesTemp/OLDHRATRulesTemp');
let OLDHRDelayRoleM = require('@OLDHR/OLDHRDelayRoleM/OLDHRDelayRoleM');
let OLDHREmpsRules = require('@OLDHR/OLDHREmpsRules/OLDHREmpsRules');
let OLDHROvertimeRules = require('@OLDHR/OLDHROvertimeRules/OLDHROvertimeRules');
let OLDHRScheduleDays = require('@OLDHR/OLDHRScheduleDays/OLDHRScheduleDays');
let OLDHRTimeSchedule = require('@OLDHR/OLDHRTimeSchedule/OLDHRTimeSchedule');
let OLDHRVacationReq = require('@OLDHR/OLDHRVacationReq/OLDHRVacationReq');
let OLDHRVacationRules = require('@OLDHR/OLDHRVacationRules/OLDHRVacationRules');

//////////////////
let QualitySafety = require('@QualitySafety/QualitySafety');
let ReassignRequests = require('@Reassign/ReassignRequests/ReassignRequests');
let ReassignTasks = require('@Reassign/ReassignTasks/ReassignTasks');
let ReceiptAssets = require('@ReceiptAssets/ReceiptAssets');
let Recommendations = require('@Recommendations/Recommendations');
let ReleasedStudies = require('@ReleasedStudies/ReleasedStudies');
let ReplaceAssetReq = require('@ReplaceAssetReq/ReplaceAssetReq');
let RequestDetails = require('@Requests/RequestDetails/RequestDetails');
let RequestTypeSteps = require('@Requests/RequestTypeSteps/RequestTypeSteps');
let RequestTypes = require('@Requests/RequestTypes/RequestTypes');
let Requests = require('@Requests/Requests/Requests');
let Risks = require('@Risks/Risks/Risks');
let RiskResponses = require('@Risks/RiskResponses/RiskResponses');
let ServicesTargetDef = require('@Services/ServicesTargetDef/ServicesTargetDef');
let ServicesTarget = require('@Services/ServicesTarget/ServicesTarget');
let ServicesTargetDetails = require('@Services/ServicesTargetDetails/ServicesTargetDetails');
let Services = require('@Services/Services/Services');
let SocialMedia = require('@SocialMedia/SocialMedia');
let Studies = require('@Studies/Studies/Studies');
let StudiesComments = require('@Studies/StudiesComments/StudiesComments');
let StudiesDetails  = require('@Studies/StudiesDetails/StudiesDetails');
let StudiesRequests = require('@Studies/StudiesRequests/StudiesRequests');
let SystemFun = require('@System/SystemFun/SystemFun');
let SystemSetting =  require('@System/SystemSetting/SystemSetting');
let userRole = require('./routes/medan/UserRole/userRole');
///////////////
//// last queries
let equibments = require('@equibments/equibments');
let inbox = require("@inbox/inbox");
let Materials = require("@Materials/Materials");
let trans = require("@trans/Transactions");
let compliance = require("@comp/compliance")

/////////////////// new web services
let travelOrder = require("@newWebServices/travelOrder/travelOrder");

let getCommittee = require("@newWebServices/getCommittee/getCommittee");
let workOrderApprovals = require("@newWebServices/workOrderApprovals/workOrderApprovals");
let notAssignedTasks = require("@newWebServices/notAssignedTasks/notAssignedTasks");
let pendingMeetingIssues = require("@newWebServices/pendingMeetingIssues/pendingMeetingIssues");
let getMeetings = require("@newWebServices/getMeetings/getMeetings");
let openIncidents = require("@newWebServices/openIncidents/openIncidents");
let openIssues = require("@newWebServices/openIssues/openIssues");
let myInbox = require("@newWebServices/myInbox/myInbox");
let myProjects = require("@newWebServices/myProjects/myProjects");
let toolBoxNumbers= require("@newWebServices/toolBoxNumbers/toolBoxNumbers");
let workOrderOtherDetails= require("@newWebServices/workOrderOtherDetails/workOrderOtherDetails");
let getCommitteeMembers= require("@newWebServices/getCommitteeMembers/getCommitteeMembers");
let getWorkingHours= require("@newWebServices/getWorkingHours/getWorkingHours");
let getWorkOrder= require("@newWebServices/getWorkOrder/getWorkOrder");
let getByProjectId= require("@newWebServices/getByProjectId/getByProjectId");
let getProjectMembersByProjectId= require("@newWebServices/getProjectMembersByProjectId/getProjectMembersByProjectId");
let getMeetingAgenda= require("@newWebServices/getMeetingAgenda/getMeetingAgenda");
let getMeetingMembers= require("@newWebServices/getMeetingMembers/getMeetingMembers");
let workorderstatus= require("@newWebServices/workorderstatus/workorderstatus");
let requestType= require("@newWebServices/requestType/requestType");
let lookupDetials= require("@newWebServices/lookupDetials/lookupDetials");
let getBoqByProject= require("@newWebServices/getBoqByProject/getBoqByProject");
let issueDetails= require("@newWebServices/issueDetails/issueDetails");
let updateOrCreateMeetingMinutes= require("@newWebServices/updateOrCreateMeetingMinutes/updateOrCreateMeetingMinutes");
let workOrderDetails= require("@newWebServices/workOrderDetails/workOrderDetails");
let getCommittees= require("@newWebServices/getCommittees/getCommittees");
let getIssuesByCommittee= require("@newWebServices/getIssuesByCommittee/getIssuesByCommittee");
let userPrivileges= require("@newWebServices/userPrivileges/userPrivileges");
let getMeetingDecisionsOrIssuesOrTasks = require("@newWebServices/getMeetingDecisionsOrIssuesOrTasks/getMeetingDecisionsOrIssuesOrTasks");
let workOrderInProg = require("@newWebServices/workOrderInProg/workOrderInProg");
let wishList = require("@newWebServices/wishList/wishList");
let getAllMembers = require("@newWebServices/getAllMembers/getAllMembers");
let approvalBox = require("@newWebServices/approvalBox/approvalBox");
let getUsers = require("@newWebServices/getUsers/getUsers");
let inboxView = require("@newWebServices/inboxView/inboxView");
let wfTransactions = require("@newWebServices/wfTransactions/wfTransactions");
let issueComments = require("@newWebServices/issueComments/issueComments");
let getZones = require("@newWebServices/getZones/getZones");
let attachedAssets = require("@newWebServices/attachedAssets/attachedAssets");
let actionDefination = require("@newWebServices/actionDefination/actionDefination");
let contract = require("@contract/contracts");  
let stat = require("@stat");  // statistics
let stores = require('@stores/stores/stores');
let storesItems = require('@stores/storesitems/storesitems');
let storesLocation= require('@stores/storeslocation/storeslocation');
///////////////////


//-----------------attachments--------------------

let attach = require('@attach');
//app.use('/createMeeting', createMeeting);
app.use("/meetingComments", meetingComments);
app.use('/actionDefination', actionDefination)
app.use('/attachedAssets', attachedAssets)
app.use('/getZones',getZones);
app.use('/issueComments', issueComments)
app.use('/wfTransactions', wfTransactions);
app.use('/inboxView', inboxView);
app.use('/getUsers', getUsers);
app.use('/approvalBox', approvalBox);
app.use('/getCommittee', getCommittee);
app.use('/getAllMembers', getAllMembers);
app.use('/wishList', wishList);
app.use('/workOrderInProg', workOrderInProg);
app.use('/getMeetingDecisionsOrIssuesOrTasks', getMeetingDecisionsOrIssuesOrTasks);
app.use('/userPrivileges',userPrivileges)
app.use('/getIssuesByCommittee', getIssuesByCommittee);
//app.use('/updateDailyWorkingHours', updateDailyWorkingHours);
app.use('/getCommittees', getCommittees);
app.use('/workOrderDetails', workOrderDetails);
app.use('/updateOrCreateMeetingMinutes', updateOrCreateMeetingMinutes);
app.use('/issueDetails', issueDetails);
app.use('/getBoqByProject', getBoqByProject);
app.use('/lookupDetials', lookupDetials);
app.use('/requestType', requestType);
app.use('/workOrderApprovals', workOrderApprovals);
app.use('/notAssignedTasks', notAssignedTasks);
app.use('/pendingMeetingIssues', pendingMeetingIssues);
app.use('/getMeetings', getMeetings);
app.use('/openIncidents', openIncidents);
app.use('/openIssues', openIssues);
app.use('/myInbox', myInbox);
app.use('/myProjects', myProjects);
app.use('/toolBoxNumbers', toolBoxNumbers);
app.use('/workOrderOtherDetails', workOrderOtherDetails);
app.use('/getCommitteeMembers', getCommitteeMembers);
app.use('/getWorkingHours', getWorkingHours);
app.use('/getWorkOrder', getWorkOrder);
app.use('/getByProjectId', getByProjectId);
app.use('/getProjectMembersByProjectId', getProjectMembersByProjectId);
app.use('/getMeetingAgenda', getMeetingAgenda);
app.use('/getMeetingMembers', getMeetingMembers);
app.use('/workorderstatus', workorderstatus);

app.use('/assetNameList', assetNameList);





//////////////
app.use('/equibments', equibments);
app.use('/inbox', inbox);
app.use("/Materials", Materials);
app.use("/trans", trans);

///////////////
app.use('/QualitySafety', QualitySafety);
app.use('/ReassignRequests', ReassignRequests);
app.use('/ReassignTasks', ReassignTasks);
app.use('/ReceiptAssets', ReceiptAssets);
app.use('/Recommendations', Recommendations);
app.use('/ReleasedStudies', ReleasedStudies);
app.use('/ReplaceAssetReq', ReplaceAssetReq);
app.use('/RequestDetails', RequestDetails);
app.use('/RequestTypeSteps', RequestTypeSteps);
app.use('/RequestTypes', RequestTypes);
app.use('/Requests', Requests);
app.use('/Risks', Risks);
app.use('/RiskResponses', RiskResponses);
app.use('/ServicesTargetDef', ServicesTargetDef);
app.use('/ServicesTarget', ServicesTarget);
app.use('/ServicesTargetDetails', ServicesTargetDetails);
app.use('/Services', Services);
app.use('/SocialMedia', SocialMedia);
app.use('/Studies', Studies);
app.use('/StudiesComments', StudiesComments);
app.use('/StudiesDetails', StudiesDetails);
app.use('/StudiesRequests', StudiesRequests);
app.use('/SystemFun', SystemFun);
app.use('/SystemSetting', SystemSetting);
////////
app.use('/MeetingAgenda', MeetingAgenda);
app.use('/MeetingMembers', MeetingMembers);
app.use('/MeetingMinutes', MeetingMinutes);
app.use('/MeetingMinutesDetail', MeetingMinutesDetail);
app.use('/MeetingSchedules', MeetingSchedules);
app.use('/Meetings', Meetings);
///////////////////

app.use('/MilestonesDeleviables', MilestonesDeleviables);
app.use('/MilestonesDetails', MilestonesDetails);
app.use('/MilestonePayment', MilestonePayment);
app.use('/MilestonePaymentDetails', MilestonePaymentDetails);
app.use('/MilestonePromisedDate', MilestonePromisedDate);
app.use('/MilestoneRisks', MilestoneRisks);
app.use('/MilestoneScopes', MilestoneScopes);
////////
app.use('/MaintanceTypes', MaintanceTypes);
app.use('/MasterPlan', MasterPlan);
app.use('/MasterPlanSetting', MasterPlanSetting);
app.use('/NodeUploads', NodeUploads);
app.use('/NotificationTmpPrms', NotificationTmpPrms);
app.use('/NotificationsTmp', NotificationsTmp);
app.use('/PhaseTasks', PhaseTasks);
app.use('/PhaseTaskDetail', PhaseTaskDetail);
app.use('/PlanHeaderWeeks', PlanHeaderWeeks);
app.use('/PlanningTasks', PlanningTasks);
app.use('/PortTrans', PortTrans);
/////////////////
app.use('/PortfolioBoq', PortfolioBoq);
app.use('/Portofolios', Portofolios);
///////////////
app.use('/Positions', Positions);
app.use('/PositionsPrerequists', PositionsPrerequists);

// common
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('assets'));

app.use(cors());

//------------------------------------------------------
app.use('/lookUpDetails',lookUpDetails);
app.use('/lookUpApps',lookUpApps);
app.use('/LookupDetailSetting', LookupDetailSetting);
app.use('/LookupDetailDetails', LookupDetailDetails);
app.use('/LookupMaster', LookupMaster);

////////////
app.use('/violationGroup',violationGroup);
app.use('/violationGroupDetails',violationGroupDetails);
app.use('/issues',issues);
app.use('/issuesAttachments',issuesAttachments);
// app.use('/issuescustomvalue',issuescustomvalue);
app.use('/issuessubclassification',issuessubclassification);
app.use('/issuesComments', issuesComments);
app.use('/issuesassignments', issuesassignments);
app.use('/IssuesManySites', IssuesManySites);
app.use('/IssuesManySitesLocation', IssuesManySitesLocation);
app.use('/IssuesManySitesTypes',IssuesManySitesTypes);
/////////////////////
app.use('/OLDHRAtRulesSettings', OLDHRAtRulesSettings);
app.use('/OLDHRATRuesTempDetail', OLDHRATRuesTempDetail);
app.use('/OLDHRATRulesTemp', OLDHRATRulesTemp);
app.use('/OLDHRDelayRoleM', OLDHRDelayRoleM);
app.use('/OLDHREmpsRules', OLDHREmpsRules);
app.use('/OLDHROvertimeRules', OLDHROvertimeRules);
app.use('/OLDHRScheduleDays', OLDHRScheduleDays);
app.use('/OLDHRTimeSchedule', OLDHRTimeSchedule);
app.use('/OLDHRVacationReq', OLDHRVacationReq);
app.use('/OLDHRVacationRules', OLDHRVacationRules);

//////
app.use('/locations', locations);
app.use('/assetDefiniation', assetDefiniation);
///////////////
app.use('/projects', projects);
app.use('/ProjectBenefit', ProjectBenefit);
app.use('/ProjectBoq', ProjectBoq);
app.use('/ProjectBoqAssets', ProjectBoqAssets);
app.use('/ProjectCMS', ProjectCMS);
app.use('/ProjectDataDelta', ProjectDataDelta);
app.use('/ProjectGroups', ProjectGroups);
app.use('/ProjectKPI', ProjectKPI);
app.use('/ProjectMembers', ProjectMembers);
app.use('/ProjectMileAssetDet', ProjectMileAssetDet);
app.use('/ProjectMilestone', ProjectMilestone);
app.use('/ProjectReport', ProjectReport);
app.use('/ProjectReq', ProjectReq);
app.use('/ProjectRole', ProjectRole);
app.use('/ProjectTracks', ProjectTracks);


//////////////
app.use('/employees', employees);
app.use('/security', security);
app.use('/asstgro', asstgro);
app.use('/assetgroupviolations', assetgroupviolations);
app.use('/attachements', attachement);
app.use('/issuessubclasscustomfiles', issuessubclasscustomfiles);
app.use('/customfieldJoinissuesubclasscustom', customfieldJoinissuesubclasscustom);

app.use('/jobAdvertisments', jobAdvertisments);
app.use('/jobCompetency', jobCompetency);
app.use('/jobName', jobName);
app.use('/jobOrderAssets', jobOrderAssets);
app.use('/jobOrderDetails', jobOrderDetails);
app.use('/jobOrderLabor', jobOrderLabor);
app.use('/jobOrderLaborsDummy', jobOrderLaborsDummy);
app.use('/JobOrderServices', JobOrderServices);
app.use('/JobOrderSpareParts', JobOrderSpareParts);
app.use('/JobOrderSparePartsDummy', JobOrderSparePartsDummy);
app.use('/JobOrders', JobOrders);
app.use('/JobOrderDefinition', JobOrderDefinition);
app.use('/JobOrderRecurring', JobOrderRecurring);
app.use('/JobRequestCheck', JobRequestCheck);
app.use('/JobVacancy', JobVacancy);
app.use('/JobVacancyLinks', JobVacancyLinks);
app.use('/Jobs', Jobs);
app.use('/jobOrderCounter', jobOrderCounter);
app.use('/webResources', webResources);
//-------------------------------------------------------
// assets
app.use('/AssetActionLabors', AssetActionLabors);
app.use('/AssetActionSpareParts', AssetActionSpareParts);
app.use('/AssetActionStarting', AssetActionStarting);
app.use('/AssetAction', AssetAction);
app.use('/AssetChecking', AssetChecking);
app.use('/AssetCounters', AssetCounters);
app.use('/AssetDefAttaches', AssetDefAttaches);
app.use('/AssetEquipments', AssetEquipments);
app.use('/AssetLabors', AssetLabors);
app.use('/AssetPenelities', AssetPenelities);
app.use('/AssetPermits', AssetPermits);
app.use('/AssetSpareparts', AssetSpareparts);
app.use('/boqMeasur', boqMeasur);
app.use('/boqMeasurSub', boqMeasurSub);
app.use('/calender', calender);
app.use('/ClientContactPerson', ClientContactPerson);
app.use('/Clients', Clients);
app.use('/Committee', Committee);
app.use('/CommitteMembers', CommitteMembers);
app.use('/CommuntiqueFields', CommuntiqueFields);
app.use('/CommuntiqeuTypes', CommuntiqeuTypes);
app.use('/Communtiqeu', Communtiqeu);
app.use('/CompetencyGroup', CompetencyGroup);
app.use('/CompetencyMatrix', CompetencyMatrix);
app.use('/Counters', Counters);
app.use('/Countries', Countries);
app.use('/jobOrderRequest', jobOrderRequest);
app.use('/DailyWorkingHours', DailyWorkingHours);
app.use('/DecisionVoting',DecisionVoting);
app.use('/Deductions', Deductions);
app.use('/Delegation', Delegation);
app.use('/DetailPlan', DetailPlan);
app.use('/Emails', Emails);
app.use('/EmployeeContacts', EmployeeContacts);
app.use('/EmployeeProtoflio', EmployeeProtoflio);
app.use('/Expenses', Expenses);
app.use("/userRole" , userRole);
app.use("/compliance", compliance);
app.use("/attachments", attach);
app.use("/travelOrder",travelOrder);
app.use("/contract",contract);  // *Contracts*
app.use("/statistics" , stat);   //  * statistics * 
app.use("/stores" , stores);   //  * stores * 
app.use("/stores" , storesItems);   //  * stores * 
app.use("/stores", storesLocation)
// Authorization
// loggers
//app.use(fileLogger);
// performance
require('./routes/lib/prod')(app);
 //
 const port = process.env.MEDPORT;
 app.listen(port, () => console.log(`Listening on Port :` + process.env.MEDPORT ));

 
//  const port = process.env.PORT || 9004;
//  app.listen(port, () => console.log(`Listening on Port ${port}`));
