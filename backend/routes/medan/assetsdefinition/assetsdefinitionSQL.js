let statements={
  getAllAssetsDefinition :{
       statement:`
       select * from ASSETS_DEFINITION ad where nvl(ad.deleted,0)=0
       `,
       returns: [],
       bindings: [],
       qstring: "",
       requireCommit: false


  },
  getOneAssetsDefinition:{
      statement:`SELECT
                  ASSET_ID, ASSET_NAME, DESCRIPTION,
                     CREATED_DATE, CREATED_BY, EXPIRE_DATE,
                     ASSET_TYPE, ASSET_STATUS, ASSET_IMAGE,
                     ASSET_SERIAL, ASSET_GROUP, PRIORITY,
                     DEPARTMENT_ID, ZONE_ID, STORE_ID,
                     LAT_DEGREES, LAT_MINUTES, LAT_SECONDS,
                     LON_DEGREES, LON_MINUTES, LON_SECONDS,
                     LAT_DIRECTION, LON_DIRECTION, CAN_MAINTENANCE,
                     DELETED, DELETED_BY, DELETED_DATE,
                     SUBSIDIARY_ID, MADEIN_ID, NOTES,
                     COUNTERS, LOCATION_ID, LOCATION_TYPE,
                     STATUS_CAUSE, START_DATE, NEED_PERMIT,
                     REPLACEMENT_ASSET, CONTRACTOR_RELATE, ORIGIN_NUMBER,
                     FOLLOWUP_MAINTENANCE, WORK_FLOW_STATUS, ITEMS_ID,
                     REQUEST_TYPE, SUB_LOCATION, CATEGORY,
                     ASSET_OWNER
                  FROM ASSETS_DEFINITION
                    WHERE asset_id = :ASSET_ID
      `,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false


  },
  getAssetsBYGROUP:{
      statement:`SELECT
    asset_id,
    asset_name,
    description,
    created_date,
    created_by,
    expire_date,
    asset_type,
    asset_status,
    asset_serial,
    asset_group,
    priority,
    department_id,
    zone_id,
    store_id,
    lat_degrees,
    lat_minutes,
    lat_seconds,
    lon_degrees,
    lon_minutes,
    lon_seconds,
    lat_direction,
    lon_direction,
    can_maintenance,
    deleted,
    deleted_by,
    deleted_date,
    subsidiary_id,
    madein_id,
    notes,
    counters,
    location_id,
    location_type,
    status_cause,
    start_date,
    need_permit,
    replacement_asset,
    contractor_relate,
    origin_number,
    followup_maintenance,
    work_flow_status,
    items_id,
    request_type,
    sub_location
FROM
    assets_definition
WHERE asset_group = :ASSET_GROUP
      `,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
  }
}

module.exports = statements;
