
let statements = {
    getAllMilestoneRisks: {
            statement :`
            SELECT MILE_RISK_ID,
                   MILESTONE_ID,
                   RISK_ID,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   SUBSIDIARY_ID
              FROM MILESTONE_RISKS `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneMilestoneRisksByID:{
        statement:`
        SELECT MILE_RISK_ID,
               MILESTONE_ID,
               RISK_ID,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               SUBSIDIARY_ID
          FROM MILESTONE_RISKS
   WHERE  MILE_RISK_ID = :MILE_RISK_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getRisksType:{
      statement:`
      SELECT lookup_detail_id, lookup_id, primary_name, secondary_name from lookup_details where lookup_id = 76
  `,
      bindings: [],
      qstring: "",
      requireCommit: false
  },

  getRisksClassification:{
    statement:`
    SELECT lookup_detail_id, lookup_id, primary_name, secondary_name from lookup_details where lookup_id = 131
`,
    bindings: [],
    qstring: "",
    requireCommit: false
},

getRisks:{
  statement:`
  SELECT w.MILE_RISK_ID,
            w.MILESTONE_ID,
            (SELECT MILESTONE_NAME FROM PROJECT_MILESTONE I WHERE I.MILESTONE_ID = w.MILESTONE_ID ) MILESTONE_NAME ,
            (SELECT MILESTONE_DESCRIPTION FROM PROJECT_MILESTONE I WHERE I.MILESTONE_ID = w.MILESTONE_ID ) MILESTONE_DESCRIPTION ,
            w.RISK_ID,
            (select primary_name ||'  '||secondary_name from lookup_details where lookup_detail_id = (select RISK_CLASSIFICATION from risks s where s.risk_id = w.RISK_ID)) CLASSIFICATION_name ,
            (select primary_name ||'  '||secondary_name from lookup_details where lookup_detail_id = (select RISK_type from risks s where s.risk_id = w.RISK_ID)) type_name,
            (SELECT RISK_DESCRIPTION FROM HR.RISKS R WHERE R.RISK_ID = w.RISK_ID ) RISK_DESCRIPTION ,
            (SELECT RISK_WEIGHT FROM HR.RISKS R WHERE R.RISK_ID = w.RISK_ID ) RISK_WEIGHT ,
            w.DELETED,
            w.DELETED_BY,
            w.DELETED_DATE,
            w.SUBSIDIARY_ID from milestone_risks w  where milestone_id = :milestone_id and  nvl(DELETED,0)=0 
`,
  bindings: [],
  qstring: "",
  requireCommit: false
},

   deleteMilestoneRisk :{
     statement : `update milestone_risks
                  set deleted = 1
                  where risk_id = :risk_id`,
                  bindings: [],
              qstring: "",
              requireCommit: true
   }
    
  }
  
  module.exports = statements ;
  