
////////////// tested with spEmployeeId = 55 and p_reqClassification = 0 
let statements = {
    getInbox: {
        statement: `
                     SELECT request_id, 
                     application_id, 
                     application_name, 
                     req_type_id, 
                     request_status, 
                     req_type_name, 
                     req_type_definition_type, 
                     employee_id, 
                     emp_name, 
                     emp_name_ar, 
                     income_action, 
                     tranaction_id, 
                     trans_classification, 
                     tranaction_type, 
                     comments, 
                     answer_on_ques, 
                     created_date, 
                     outcome_action_date, 
                     tranaction_status, 
                     ask_reply_step, 
                     parent_tranaction_id, 
                     from_destination_id, 
                     from_dest, 
                     from_dest_ar, 
                     to_destination_id, 
                     to_dest, 
                     to_dest_ar, 
                     step_id, 
                     opened, 
                     req_classification, 
                     client_id, 
                     project_id, 
                     project_manager_id, 
                     priority, 
                     work_order_code, 
                     wo_status_id, 
                     description, 
                     client_name, 
                     project_name, 
                     employee_email, 
                     step_description_en, 
                     step_description_ar, 
                     step_classification, 
                     step_need_action_flag, 
                     last_step_need_action_flag, 
                     (SELECT Count(*) 
                        FROM   daily_working_hours DW 
                        WHERE  DW.work_order_id = request_id 
                              AND Nvl(DW.deleted, 0) = 0)DAILY_WORKING_COUNT, 
                     (SELECT CASE 
                                 WHEN req_type_id = 71 THEN (SELECT WO.work_order_code 
                                                            FROM   projects p, 
                                                                  work_orders wo, 
                                                                  objection_requests ob 
                                                            WHERE 
                                 OB.work_order_id = WO.work_order_id 
                                 AND P.project_id = WO.project_id 
                                 AND 
               OB.objection_request_id = request_id) 
               ELSE NULL 
               END 
               FROM   dual)                      work_order_code_obj, 
               (SELECT CASE 
               WHEN req_type_id = 71 THEN (SELECT WO.description 
               FROM   projects p, 
                        work_orders wo, 
                        objection_requests ob 
               WHERE  OB.work_order_id = WO.work_order_id 
                        AND P.project_id = WO.project_id 
                        AND 
               OB.objection_request_id = request_id) 
               ELSE NULL 
               END 
               FROM   dual)                      work_order_desc_obj, 
               (SELECT CASE 
               WHEN req_type_id = 71 THEN (SELECT P.primary_name 
               FROM   projects p, 
                        work_orders wo, 
                        objection_requests ob 
               WHERE  OB.work_order_id = WO.work_order_id 
                        AND P.project_id = WO.project_id 
                        AND 
               OB.objection_request_id = request_id) 
               ELSE NULL 
               END 
               FROM   dual)                      project_name_obj_ar, 
               (SELECT CASE 
               WHEN req_type_id = 71 THEN (SELECT P.secondary_name 
               FROM   projects p, 
                        work_orders wo, 
                        objection_requests ob 
               WHERE  OB.work_order_id = WO.work_order_id 
                        AND P.project_id = WO.project_id 
                        AND 
               OB.objection_request_id = request_id) 
               ELSE NULL 
               END 
               FROM   dual)                      project_name_obj_en, 
               (SELECT CASE 
               WHEN req_type_id = 71 THEN (SELECT C.en_name 
               FROM   projects p, 
                        clients c, 
                        work_orders wo, 
                        objection_requests ob 
               WHERE  OB.work_order_id = WO.work_order_id 
                        AND P.project_id = WO.project_id 
                        AND 
               OB.objection_request_id = request_id 
                        AND C.client_id = P.client_id) 
               ELSE NULL 
               END 
               FROM   dual)                      client_name_en_obj, 
               (SELECT CASE 
               WHEN req_type_id = 71 THEN (SELECT C.ar_name 
               FROM   projects p, 
                        clients c, 
                        work_orders wo, 
                        objection_requests ob 
               WHERE  OB.work_order_id = WO.work_order_id 
                        AND P.project_id = WO.project_id 
                        AND 
               OB.objection_request_id = request_id 
                        AND C.client_id = P.client_id) 
               ELSE NULL 
               END 
               FROM   dual)                      client_name_ar_obj 
               FROM   inbox_view 
               WHERE  to_destination_id = (SELECT destination_id 
                                          FROM   transaction_destinations 
                                          WHERE  employee_id = :spEmployeeId 
                                                   AND Nvl(deleted, 0) = 0) 
                     AND request_id IS NOT NULL 
                     AND application_id = 1
                `,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    }
}

module.exports = statements;
