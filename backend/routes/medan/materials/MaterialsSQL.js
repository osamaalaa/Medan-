
let statements = {
    getMaterials: {
            statement :`
            SELECT ActivitiesDefMaterialsEO.ID, 
       ActivitiesDefMaterialsEO.ACTIVITY_ID, 
       ActivitiesDefMaterialsEO.ITEMS_ID,
       (select I.AR_NAME from ITEMS i where I.ITEMS_ID=ActivitiesDefMaterialsEO.ITEMS_ID and nvl(I.DELETED,0)=0 ) item_name_ar,
       (select I.EN_NAME from ITEMS i where I.ITEMS_ID=ActivitiesDefMaterialsEO.ITEMS_ID and nvl(I.DELETED,0)=0 ) item_name_en,
       ActivitiesDefMaterialsEO.MATERIAL_COUNT, 
       ActivitiesDefMaterialsEO.CODE, 
       ActivitiesDefMaterialsEO.CREATED_BY, 
       ActivitiesDefMaterialsEO.CREATION_DATE, 
       ActivitiesDefMaterialsEO.DELETED, 
       ActivitiesDefMaterialsEO.DELETED_BY, 
       ActivitiesDefMaterialsEO.DELETED_DATE, 
       ActivitiesDefMaterialsEO.DESC_AR, 
       ActivitiesDefMaterialsEO.DESC_EN
FROM  ACTIVITIES_DEF_MATERIAL ActivitiesDefMaterialsEO
where ( ActivitiesDefMaterialsEO.DELETED = 0   OR ActivitiesDefMaterialsEO.DELETED IS NULL )
and ACTIVITIESDEFMATERIALSEO.ACTIVITY_ID= :p_activity_id  `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }    
}
  module.exports = statements ;
  