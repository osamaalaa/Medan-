
let statements = {
    getAssetAttachedToCommittee: {
    statement :`select * from assets_definition asd where asd.DELETED=0 and EXISTS (
        select DISTINCT ba.asset_id
        from project_boq pb ,committee cm ,PROJECT_BOQ_ASSETS ba
        where pb.BOQ_ID = cm.BOQ_ID and pb.BOQ_ID = ba.BOQ_ID
        and pb.DELETED=0 and cm.DELETED=0 and ba.DELETED=0
        and cm.COMMITTEE_ID= :COMMITTEE_ID and asd.ASSET_ID = ba.ASSET_ID )`,
             bindings: [],
             qstring: "",
             requireCommit: false
     }    
 }
   module.exports = statements ;
 
   
   