let statements={
    getAllLocations:{
       statement:`SELECT
    location_id,
    location_no,
    description,
    priority_id,
    location_type_id,
    main_location_id,
    active_location,
    location_status_id,
    status_reason,
    status_start_date,
    maintenance_folwup,
    permit_needed,
    notes,
    created_by,
    creation_date,
    deleted,
    deleted_by,
    deleted_date,
    lat_degrees,
    lat_minutes,
    lat_seconds,
    lat_direction,
    lon_degrees,
    lon_minutes,
    lon_seconds,
    lon_direction
FROM
    locations
`,
       returns: [],
       bindings: [],
       qstring: "",
       requireCommit: false


    },

    getOneLocationByID:{
      statement:`SELECT
    location_id,
    location_no,
    description,
    priority_id,
    location_type_id,
    main_location_id,
    active_location,
    location_status_id,
    status_reason,
    status_start_date,
    maintenance_folwup,
    permit_needed,
    notes,
    created_by,
    creation_date,
    deleted,
    deleted_by,
    deleted_date,
    lat_degrees,
    lat_minutes,
    lat_seconds,
    lat_direction,
    lon_degrees,
    lon_minutes,
    lon_seconds,
    lon_direction
FROM
    locations
  WHERE location_id = :LOCATION_ID 
`,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false

    }


}


module.exports = statements;
