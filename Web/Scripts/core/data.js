define([
    "dojo/parser",
    "dojo/_base/declare",
    "dojo/request/xhr",
    "dojo/json",
    "Scripts/appConfig"],
    function (parser,declare, xhr, json, Cfg) {
        return declare(null, {

            //http://stackoverflow.com/questions/13215705/pass-info-from-one-dojo-amd-module-to-another


            GetAssessmentByMapTaxLot: function (mapTaxLot) {
                var config = new Cfg();

                //console.log(config.DataService + "ReturnAssessmentInfoByMapTaxlot?mapTaxLot=" + mapTaxLot);

                 return dojo.xhrGet({
                    url: config.DataService + "ReturnAssessmentInfoByMapTaxlot?mapTaxLot=" + mapTaxLot,
                    handleAs: "json",
                    preventCache: false
                });
            },
            GetAssessmentInfoByPropID: function (propertyID) {
                var config = new Cfg();
                return dojo.xhrGet({
                    url: config.DataService + "ReturnAssessmentInfoByPropertyID?propertyId=" + propertyID,
                    handleAs: "json",
                    preventCache: false
                });
            },
            GetCodeByPropID: function (propertyId) {
                var config = new Cfg();
                return dojo.xhrGet({
                    url: config.DataService + "ReturnCodeInfo?propertyId=" + propertyId,
                    handleAs: "json",
                    preventCache: false
                });
            },
            GetDeedHistoryByPropID: function (propertyId) {
                var config = new Cfg();
                return dojo.xhrGet({
                    url: config.DataService + "ReturnDeedHistory?propertyId=" + propertyId,
                    handleAs: "json",
                    preventCache: false
                });
            },
            GetOwnerByPropID: function (propertyId) {
                var config = new Cfg();
                return dojo.xhrGet({
                    url: config.DataService + "ReturnOwnerInfo?propertyId=" + propertyId,
                    handleAs: "json",
                    preventCache: false
                });
            },
            GetOwnerHistoryByPropID: function (propertyId) {
                var config = new Cfg();
                return dojo.xhrGet({
                    url: config.DataService + "ReturnOwnerHistory?propertyId=" + propertyId,
                    handleAs: "json",
                    preventCache: false
                });
            },
            GetSalesByPropID: function (propertyId) {
                var config = new Cfg();
                return dojo.xhrGet({
                    url: config.DataService + "ReturnSalesInfo?propertyId=" + propertyId,
                    handleAs: "json",
                    preventCache: false
                });
            },
            GetSitusByPropID: function (propertyId) {
                var config = new Cfg();
                return dojo.xhrGet({
                    url: config.DataService + "ReturnSitusInfo?propertyId=" + propertyId,
                    handleAs: "json",
                    preventCache: false
                });
            },
            GetTaxesDue: function (propertyId) {
                var config = new Cfg();
                return dojo.xhrGet({
                    url: config.DataService + "ReturnTaxInfo?propertyId=" + propertyId,
                    handleAs: "json",
                    preventCache: false
                });
            }
    });
 });