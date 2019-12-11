
let statements = {
    myInbox: {
            statement :`select  trans.transition_id,trans.WITH_ORIGINAL, mails.mail_id ,mails.TITLE,  mails.barcode , mails.mail_date , MAILS.SUBJECT,                            
            trans.from_mailbox , ftd.DESTINATION_NAME_EN  from_inbox_name , ftd.DESTINATION_NAME_AR from_inbox_name_AR ,                               
            trans.to_mailbox , trans.notes, td.DESTINATION_NAME_EN to_inbox_name ,td.DESTINATION_NAME_AR to_inbox_name_AR ,                                 
            trans.assign_date_g ,trans.action_needed_id , act.item_desc_arabic as action_needed_name_ar,                                 
              act.item_desc_english as action_needed_name_en,PCM.PROJECT_ID ,PJ.PRIMARY_NAME,PJ.SECONDARY_NAME                           
                from mails , transitions trans , lookups  act , TRANSACTION_DESTINATIONS td,TRANSACTION_DESTINATIONS ftd  ,project_cms pcm  ,projects pj                            
               where mails.mail_id = trans.mail_id                                
               and trans.action_needed_id = act.lookup_id (+)                  
               and mails.mail_status = 31   and PCM.CMS_MAIL_ID(+)=mails.mail_id                            
                   and trans.to_mailbox = (SELECT TD.DESTINATION_ID   
           FROM   TRANSACTION_DESTINATIONS TD            
           where  nvl(td.deleted,0)=0 and (td.EMPLOYEE_ID is not null or TD.ROLE_ID is not null)
           and EMPLOYEE_ID= :EMPLOYEE_ID
            and  STATUS=1)   
            and PCM.PROJECT_ID=PJ.PROJECT_ID                            
               and trans.TO_MAILBOX = td.DESTINATION_ID  and nvl(pj.deleted,0)=0                 
               and trans.from_mailbox = ftd.DESTINATION_ID                         
               and trans.STATUS = 414
              `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  