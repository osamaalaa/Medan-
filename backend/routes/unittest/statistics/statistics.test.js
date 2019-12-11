var request = require("request");
var base_url = "http://localhost:9004";


//-------------- statistics Test ---------------------
describe("statistics Routes .. ", function () {

 it("getMaterialInLocationByItemAndLoc| returns status code 200", function (done) {
     var itemInfo = JSON.stringify({p_item_id: 1, p_location_id: 1});
      request
      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getMaterialInLocationByItemAndLoc", body: itemInfo }, function (error, response) {
        if (error) throw new Error('unable to call getMaterialInLocationByItemAndLoc');
       expect(response.statusCode).toBe(200);
       expect(JSON.parse(response.body).status).toBe(200);
       done();
      });
    }, 20000);

    it("activitiesDetailsForEmp| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_emp_code: 1477});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/activitiesDetailsForEmp", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call activitiesDetailsForEmp');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("activitiesDetailsForEmpforLocAndSHift| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_location_id: 9028, p_template_id: ""});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/activitiesDetailsForEmpforLocAndSHift", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call activitiesDetailsForEmpforLocAndSHift');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getNoOfCup| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({P_TEMPLATE_ID: "", p_location_id: "9028", p_service_type_name: ""});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getNoOfCup", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getNoOfCup');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getZamByLocShf| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({P_TEMPLATE_ID: "", p_location_id: "9028", p_service_type_name: ""});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getZamByLocShf", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getZamByLocShf');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getItemQuantityByLocOrShift| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_template_id: 1, p_location_id: 1});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getItemQuantityByLocOrShift", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getItemQuantityByLocOrShift');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getpermissionfiltersByNumberOrLocation| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_location_id: "", p_permission_id: ""});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getpermissionfiltersByNumberOrLocation", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getpermissionfiltersByNumberOrLocation');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getContractorEvaluation| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_supp_code: ""});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getContractorEvaluation", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getContractorEvaluation');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getContractorData| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_supp_code: ""});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getContractorData", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getContractorData');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getItemsWithItemCode| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_item_code: "", p_item_name_en: "", p_item_name_ar: "", p_store_id: ""});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getItemsWithItemCode", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getItemsWithItemCode');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getPermissionDescription| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_location_id: 9028});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getPermissionDescription", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getPermissionDescription');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getIncidentsDetails| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_template_id: 25, p_location_id: 9028});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getIncidentsDetails", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getIncidentsDetails');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getprecentageincreament| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_template_id: "", p_location_id: "", p_item_code: "", p_item_name_en: "", p_item_name_ar: "",
    p_first_month_start_date: "", p_first_month_end_date: "", p_second_month_start_date: "", p_second_month_end_date: ""});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getprecentageincreament", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getprecentageincreament');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getissuesByLocagionAndShiftId| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_template_id: 25, p_location_id: 9028});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getissuesByLocagionAndShiftId", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getissuesByLocagionAndShiftId');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getItems| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_item_code: "", p_item_name_en: "", p_item_name_ar: ""});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getItems", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getItems');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getMissions| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_date: "", p_equib_serial: "Ser 902"});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getMissions", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getMissions');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getCountForCleanBases| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_service_type_en: "", p_service_type_ar: "", p_location_id: "", p_start_date: "", p_end_date: ""});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getCountForCleanBases", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getCountForCleanBases');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getMaterialByLocOrShift| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_location_id: "", P_TEMPLATE_ID: ""});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getMaterialByLocOrShift", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getMaterialByLocOrShift');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getActivity| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({LOCATION_ID: "",  ATT_TEMPLATE_ID: "", OPERATION_TYPE: ""});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getActivity", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getActivity');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getRangeOfEquibment| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_asset_serial: "bcvbxc54", p_start_date: "03-09-2019", p_end_date: "17-09-2019"});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getRangeOfEquibment", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getRangeOfEquibment');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("geEquMainStatus| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_equib_serial: "", p_date: ""});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/geEquMainStatus", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call geEquMainStatus');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getAssetCount| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_template_id: "", p_loc_id: ""});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getAssetCount", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getAssetCount');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getAssetData| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_template_id: "", p_loc_id: ""});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getAssetData", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getAssetData');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("gitActivityByLocOrShift| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_location_id: "", P_TEMPLATE_ID: "", p_service_op_type: ""});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/gitActivityByLocOrShift", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call gitActivityByLocOrShift');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("gitworkOrderByWeek| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_start_date: "01-09-2019", p_end_date: "28-09-2019"});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/gitworkOrderByWeek", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call gitworkOrderByWeek');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getAssetStatus| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_equib_serial: "12345"});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getAssetStatus", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getAssetStatus');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

       it("getIssuesType| returns status code 200", function (done) {
        var itemInfo = JSON.stringify({p_location_id: "", p_from_date: "3/9/2019", p_to_date: "18/9/2019", p_template_id: ""});
         request
         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/statistics/getIssuesType", body: itemInfo }, function (error, response) {
           if (error) throw new Error('unable to call getIssuesType');
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body).status).toBe(200);
          done();
         });
       }, 20000);

});