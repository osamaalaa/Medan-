
let statements = {
    getTransactions: {
            statement :`
            SELECT WfTransactionsEO.TRANACTION_ID, 
       WfTransactionsEO.FROM_DESTINATION_ID, 
       WfTransactionsEO.TO_DESTINATION_ID,  
       WfTransactionsEO.OUTCOME_ACTION_ID, 
       (select T.AR_NAME from TRANSACTIONS_ACTIONS t where T.ACTION_ID=WfTransactionsEO.OUTCOME_ACTION_ID and nvl(T.DELETED,0)=0) outcome_action_name_ar,
       (select T.EN_NAME from TRANSACTIONS_ACTIONS t where T.ACTION_ID=WfTransactionsEO.OUTCOME_ACTION_ID and nvl(T.DELETED,0)=0) outcome_action_name_en,
       WfTransactionsEO.COMMENTS, 
       WfTransactionsEO.REQUEST_ID,  
       WfTransactionsEO.DELETED, 
       WfTransactionsEO.DELETED_BY, 
       WfTransactionsEO.DELETED_DATE, 
       (SELECT TR.DESTINATION_NAME_EN FROM TRANSACTION_DESTINATIONS TR WHERE TR.DESTINATION_ID = WfTransactionsEO.FROM_DESTINATION_ID) AS From_Dest_Name_En, 
       (SELECT TR.DESTINATION_NAME_EN FROM TRANSACTION_DESTINATIONS TR WHERE TR.DESTINATION_ID = WfTransactionsEO.TO_DESTINATION_ID) AS To_Dest_Name_En, 
       (SELECT TR.DESTINATION_NAME_AR FROM TRANSACTION_DESTINATIONS TR WHERE TR.DESTINATION_ID = WfTransactionsEO.FROM_DESTINATION_ID) AS From_Dest_Name_Ar, 
       (SELECT TR.DESTINATION_NAME_AR FROM TRANSACTION_DESTINATIONS TR WHERE TR.DESTINATION_ID = WfTransactionsEO.TO_DESTINATION_ID) AS To_Dest_Name_Ar
FROM  WF_TRANSACTIONS WfTransactionsEO
where ( WfTransactionsEO.DELETED = 0   OR WfTransactionsEO.DELETED IS NULL )
and WFTRANSACTIONSEO.REQUEST_ID=:p_request_id  `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }
  }
  
  module.exports = statements ;
  