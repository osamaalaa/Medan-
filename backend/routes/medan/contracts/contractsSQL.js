
let statements = {
    getAllContracts: {
            statement :`
            SELECT 
                        RULE_ID,
                        RULE_TYPE_ID,
          
                        AR_DESCRIPTION, 
                        EN_DESCRIPTION,
                            NOTES, 
                            CREATED_BY, 
                        CREATION_DATE,
                            DELETED, 
                            DELETED_BY, 
                        DELETED_DATE, 
                        PROJECT_ID
                    FROM HR.CONTRACT_RULES I
                    WHERE DELETED = 0 `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
    getOneContractByID:{
        statement:`SELECT 
                    RULE_ID,
                    RULE_TYPE_ID,
                    AR_DESCRIPTION, 
                    EN_DESCRIPTION,
                        NOTES, 
                        CREATED_BY, 
                    CREATION_DATE,
                        DELETED, 
                        DELETED_BY, 
                    DELETED_DATE, 
                    PROJECT_ID
            FROM HR.CONTRACT_RULES I
            WHERE DELETED = 0
                          AND  RULE_ID = :RULE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getOneContractByProId:{
        statement:`SELECT 
                    RULE_ID,
                    RULE_TYPE_ID,
                    AR_DESCRIPTION, 
                    EN_DESCRIPTION,
                        NOTES, 
                        CREATED_BY, 
                    CREATION_DATE,
                        DELETED,  
                    PROJECT_ID
            FROM HR.CONTRACT_RULES 
            WHERE DELETED = 0
                          AND  PROJECT_ID = :PROJECT_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    createContract: {
        statement: `
        INSERT INTO HR.CONTRACT_RULES (
            RULE_ID,
             RULE_TYPE_ID,
              AR_DESCRIPTION, 
            EN_DESCRIPTION,
             NOTES, 
            CREATION_DATE,
             DELETED ,
             PROJECT_ID) 
         VALUES (
                 CONTRACT_RULES_ID_SEQ.NEXTVAL,
                 :RULE_TYPE_ID,
                 :AR_DESCRIPTION,
                 :EN_DESCRIPTION,
                 :NOTES,
                 SYSDATE,
                 0,
                 :PROJECT_ID
           )
        RETURN RULE_ID , RULE_TYPE_ID , AR_DESCRIPTION , EN_DESCRIPTION , NOTES , PROJECT_ID  INTO :R_RULE_ID , :R_RULE_TYPE_ID , :R_AR_DESCRIPTION , :R_EN_DESCRIPTION , :R_NOTES , :R_PROJECT_ID`,
        returns: ["R_RULE_ID", "R_RULE_TYPE_ID", "R_AR_DESCRIPTION" , "R_EN_DESCRIPTION" , "R_NOTES" , "R_PROJECT_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
        },
        getAllContractsDetails: {
            statement :`
            SELECT 
                    CONTRACT_RULES_DETAILS_ID,
                    AR_DESCRIPTION, 
                    EN_DESCRIPTION, 
                VALUE,
                    STATUS, 
                    CREATED_BY, 
                CREATION_DATE,
                    DELETED,
                    DELETED_BY, 
                DELETED_DATE,
                    RULE_ID,
                    REF_ID
                FROM HR.CONTRACT_RULES_DETAILS 
                WHERE DELETED = 0 `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
    getOneContractDetailsByID:{
        statement:`SELECT 
                            CONTRACT_RULES_DETAILS_ID,
                            AR_DESCRIPTION, 
                            EN_DESCRIPTION, 
                        VALUE,
                            STATUS, 
                            CREATED_BY, 
                        CREATION_DATE,
                            DELETED,
                            DELETED_BY, 
                        DELETED_DATE,
                            RULE_ID,
                            REF_ID
                FROM HR.CONTRACT_RULES_DETAILS 
                    WHERE DELETED = 0 
                        AND CONTRACT_RULES_DETAILS_ID = :CONTRACT_RULES_DETAILS_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    createContractDetails: {
        statement: `
        INSERT INTO HR.CONTRACT_RULES_DETAILS (
            CONTRACT_RULES_DETAILS_ID,
             AR_DESCRIPTION,
              EN_DESCRIPTION, 
            VALUE,
             STATUS,
            CREATED_BY,
            CREATION_DATE,
             DELETED,
             RULE_ID) 
         VALUES ( 
         CONT_RULES_DETAIL_SEQ.NEXTVAL,
          :AR_DESCRIPTION,
          :EN_DESCRIPTION,
          :VALUE,
          :STATUS,
          :CREATED_BY,
            SYSDATE,
            0,
            :RULE_ID )
        RETURN CONTRACT_RULES_DETAILS_ID , RULE_ID , AR_DESCRIPTION , EN_DESCRIPTION , VALUE , STATUS INTO :R_CONTRACT_RULES_DETAILS_ID , :R_RULE_ID , :R_AR_DESCRIPTION , :R_EN_DESCRIPTION , :R_VALUE , :R_STATUS`,
        returns: ["R_CONTRACT_RULES_DETAILS_ID", "R_RULE_ID", "R_AR_DESCRIPTION" , "R_EN_DESCRIPTION" , "R_VALUE", "R_STATUS"],
        bindings: [],
        qstring: "",
        requireCommit: true
        },
        getNameByRuleType:{
            statement:`SELECT
             S.PRIMARY_NAME  RULE_AR_NAME,
             S.SECONDARY_NAME RULE_EN_NAME,
             I.RULE_TYPE_ID 

             FROM HR.LOOKUP_DETAILS S , HR.CONTRACT_RULES I

              WHERE S.LOOKUP_DETAIL_ID = I.RULE_TYPE_ID 

                         `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    getOneContractDetailsByRULeID:{
        statement:`SELECT 
                            CONTRACT_RULES_DETAILS_ID,
                            AR_DESCRIPTION, 
                            EN_DESCRIPTION, 
                        VALUE,
                            STATUS, 
                            CREATED_BY, 
                        CREATION_DATE,
                            DELETED,
                            DELETED_BY, 
                        DELETED_DATE,
                            RULE_ID,
                            REF_ID
                FROM HR.CONTRACT_RULES_DETAILS 
                    WHERE DELETED = 0 
                        AND RULE_ID = :RULE_ID `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },


    getContractTermsSEQ :{
        statement :`select CONTRACT_TERMS_SEQ.NEXTVAL from dual`,
        bindings: [],
        qstring: "",
        requireCommit: false
            },

    createContractTerms :{
        statement :`INSERT INTO CONTRACT_TERMS (CONTRACT_ID,
            TYPE_ID,
            DESCRIPTION,
            NOTES,
            PROJECT_ID,
            DELETED) 
         VALUES (:CONTRACT_ID,
                :TYPE_ID,
                :DESCRIPTION,
                :NOTES,
                :PROJECT_ID,
                0)`,
        bindings: [],
        qstring: "",
        requireCommit: true
    },

    getContractTypes : {
        statement :`select lookup_detail_id, secondary_name from lookup_details where lookup_id = 205`,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getContractsTerms : {
        statement : ` SELECT 
        C.CONTRACT_ID,  C.TYPE_ID, (select secondary_name from lookup_details where C.TYPE_ID = lookup_detail_id ) type_name,
           C.DESCRIPTION, C.NOTES
        FROM HR.CONTRACT_TERMS C
        where C.PROJECT_ID = :PROJECT_ID 
        and NVL(DELETED,0) = 0`,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    deleteContractTerms : {
        statement :`
        UPDATE CONTRACT_TERMS
        SET    DELETED       = 1
        WHERE  CONTRACT_ID   = :CONTRACT_ID`,
        bindings: [],
        qstring: "",
        requireCommit: true
    },

    updateContractTerms : {
        statement : `
        UPDATE CONTRACT_TERMS
SET   
       TYPE_ID       = :TYPE_ID,
       DESCRIPTION   = :DESCRIPTION,
       NOTES         = :NOTES,
       PROJECT_ID = :PROJECT_ID
WHERE  CONTRACT_ID   = :CONTRACT_ID`,
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    deleteContractRule: {
        statement: `
        UPDATE  CONTRACT_RULES
        SET DELETED = 1
        WHERE RULE_ID = :RULE_ID
        `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    deleteContractRuleDetails: {
        statement: `
        UPDATE  CONTRACT_RULES_DETAILS
        SET DELETED = 1
        WHERE CONTRACT_RULES_DETAILS_ID	 = :CONTRACT_RULES_DETAILS_ID
        `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: true
    }



  }
  
  module.exports = statements ;
  