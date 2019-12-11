
let statements = {
    getTravelOrder: {
            statement :`
            SELECT T.TRAVEL_REQ_ID,
                   T.WORK_ORDER_ID,
                   T.NEED_CAR,
                   T.NEED_HOTEL,
                   T.TRAVEL_REASON,
                   T.HOTEL_FROM_DATE,
                   T.HOTEL_TO_DATE,
                   T.CAR_FROM_DATE,
                   T.CAR_TO_DATE,
                   T.HOTEL_NAME,
                   T.CAR_AGENCY_NAME,
                   T.CANCEL_REASON,
                   T.OLD_TRAVEL_ORDER_ID,
                   T.DELETED,
                   T.DELETED_BY,
                   T.DELETED_DATE,
                   T.SUBSIDIARY_ID,
                   (select primary_name from lookup_details where lookup_detail_id =(select city_from from travel_order_request_detail
                    where travel_request_id = T.TRAVEL_REQ_ID )) city_from_ar ,
                    (select secondary_name from lookup_details where lookup_detail_id =(select city_from from travel_order_request_detail
                      where travel_request_id = T.TRAVEL_REQ_ID )) city_from_en,
                  (select primary_name from lookup_details where lookup_detail_id =(select city_to from travel_order_request_detail
                    where travel_request_id = T.TRAVEL_REQ_ID )) city_to_ar,
                    (select secondary_name from lookup_details where lookup_detail_id =(select city_to from travel_order_request_detail
                      where travel_request_id = T.TRAVEL_REQ_ID )) city_to_en,
            (select travel_date from travel_order_request_detail where travel_request_id = T.TRAVEL_REQ_ID) travel_date ,
            (select return_date from travel_order_request_detail where travel_request_id = T.TRAVEL_REQ_ID) return_date,
            (select passenger_name from travel_order_request_detail where travel_request_id = T.TRAVEL_REQ_ID) passenger_name,
            (select passport_no from travel_order_request_detail where travel_request_id = T.TRAVEL_REQ_ID) passport_no,
            (select primary_name from lookup_details where lookup_detail_id =(select trip_type from travel_order_request_detail
            where travel_request_id = T.TRAVEL_REQ_ID )) trip_type_name_ar,
            (select secondary_name from lookup_details where lookup_detail_id =(select trip_type from travel_order_request_detail
              where travel_request_id = T.TRAVEL_REQ_ID )) trip_type_name_en,
          (select primary_name from lookup_details where lookup_detail_id =(select gender from travel_order_request_detail
            where travel_request_id = T.TRAVEL_REQ_ID )) gender_name_ar,
            (select secondary_name from lookup_details where lookup_detail_id =(select gender from travel_order_request_detail
              where travel_request_id = T.TRAVEL_REQ_ID )) gender_name_en,
            (select primary_name from lookup_details where lookup_detail_id =(select nationality from travel_order_request_detail
              where travel_request_id = T.TRAVEL_REQ_ID )) nationality_name_ar,
              (select secondary_name from lookup_details where lookup_detail_id =(select nationality from travel_order_request_detail
                where travel_request_id = T.TRAVEL_REQ_ID )) nationality_name_en,
        (select passport_expiry_date from travel_order_request_detail where travel_request_id = T.TRAVEL_REQ_ID) passport_expiry_date,
        (select passenger_birth_date from travel_order_request_detail where travel_request_id = T.TRAVEL_REQ_ID) passenger_birth_date
              FROM HR.TRAVEL_ORDER_REQUEST T
              `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    }
  }
  
  module.exports = statements ;
  