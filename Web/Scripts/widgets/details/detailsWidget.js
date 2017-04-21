define([
    "dojo/_base/declare",
    "dojo/dom-class",
    "dojo/query",
    "dojo/json",
    "dojo/_base/xhr",
    "Scripts/appConfig",
    "Scripts/core/data",
    "dojo/dom-construct",
    "dojo/data/ItemFileReadStore",
    "dijit/_WidgetBase",
    "dijit/_OnDijitClickMixin",
    "dijit/_TemplatedMixin",
    "dojo/text!./detailsWidget.htm"
], function(declare, domClass, Query, JSON, Xhr, Config, Data, domConstruct, DataStore, _WidgetBase, _OnDijitClickMixin, _TemplatedMixin, template) {

    return declare([_WidgetBase, _OnDijitClickMixin, _TemplatedMixin], {
        //	set our template
        templateString: template,
        accountNum: "",
        //	some properties
        baseClass: "someWidget",

        _resultsBackClick: function() {
            //alert("go back");

            Query(".resultsTable").forEach(function(node) {}).style("display", "block");

            dojo.style("ResultsContainer", "display", "block");
            dojo.style("DetailsContainer", "display", "none");
        },

        _resultsBackMouseOver: function(e) {
            //alert("Over");
            domClass.toggle(this.backBtn, "backButton");
        },
        _resultsBackMouseOut: function(e) {
            domClass.toggle(this.backBtn, "backButtonHover");
        },

        updateDetails: function(acctNo) {
            this.doInitialRequest(this.accountNum);
        },

        startup: function(acctNo) {
            //alert("started: " + acctNo);
        },

        postCreate: function() {
            //alert("Weeee");
        },

        doInitialRequest: function(accountNum) {

            //console.log("Intial Request :: Account::: " + accountNum);

            var config = new Config();
            var data = new Data();

            //console.log("Intial Request :: A");

            // assessment by PropertyID
            data.GetAssessmentInfoByPropID(accountNum).then(function(json) {

                //var store = new DataStore({ data: json });
                var assessOutput = dojo.byId("dvAssess");

                if (JSON.stringify(json).length > 4) {
                    dojo.style(assessOutput, "display", "block");

                    var output = "<table width='99%'>";
                    output += "<tr><td class='resultsDataTop' colspan=2>Assessment Information</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Property ID</td><td class='resultsText'> " + json["PropertyId"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Situs Address</td><td class='resultsText'> " + json["Situsaddr"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Situs City State Zip</td><td class='resultsText'> " + json["Situscsz"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Owner Name</td><td class='resultsText'> " + json["OwnerName"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Additional Names</td><td class='resultsText'> " + json["Acreage"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Owner Address1</td><td class='resultsText'> " + json["Address1"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Owner Address2</td><td class='resultsText'> " + json["Address2"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Owner Address3</td><td class='resultsText'> " + json["Address3"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Owner City State Zip</td><td class='resultsText'> " + json["CityStateZip"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>County Prop Class</td><td class='resultsText'> " + json["CoPropCls"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Current Levy</td><td class='resultsText'> " + json["CurrentLevy"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Living Area</td><td class='resultsText'> " + json["LivingArea"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Map Taxlot</td><td class='resultsText'> " + json["Maplot"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Property Class</td><td class='resultsText'> " + json["Pclass"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Property Code</td><td class='resultsText'> " + json["PropCode"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Assesd Value</td><td class='resultsText'> " + json["RollAssdVal"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Land Value</td><td class='resultsText'> " + json["RollLandMkt"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Real Market Value</td><td class='resultsText'> " + json["RollRmvValue"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Total Improvements</td><td class='resultsText'> " + json["RollTotalImp"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Year Built</td><td class='resultsText'> " + json["Yrblt"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Acreage</td><td class='resultsText'>" + json["Acreage"] + "</td></tr>";
                    output += "</table>";

                    assessOutput.innerHTML = output;
                } else { dojo.style(assessOutput, "display", "none"); }
            });

            // Code info
            data.GetCodeByPropID(accountNum).then(function(json) {

                var codeContainer = dojo.byId("dvCode");

                if (JSON.stringify(json).length > 4) {
                    dojo.style(codeContainer, "display", "block");

                    var output = "<table width='99%'>";
                    output += "<tr><td class='resultsDataTop' colspan=2>Code Information</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Code Area</td><td class='resultsText'> " + json["CodeArea"] + "</td></tr>";
                    output += "<tr><td class='resultsTextBold'>Maintenance Area</td><td class='resultsText'> " + json["MaintenanceArea"] + "</td></tr>";
                    output += "</table>";

                    codeContainer.innerHTML = output;
                } else { dojo.style(codeContainer, "display", "none"); }
            });

            // Deed history
            data.GetDeedHistoryByPropID(accountNum).then(function(json) {

                var deedContainer = dojo.byId("dvDeed");

                if (JSON.stringify(json).length > 4) {
                    dojo.style(deedContainer, "display", "block");

                    var output = "<table width='99%'>";
                    output += "<tr><td class='resultsDataTop' colspan=2>Deed History</td></tr>";

                    for (var i = 0; i < json.length; i++) {

                        if (i > 0 && i < json.length) { output += "<tr><td class='resultsTextBold' colspan='2'><hr noshade></td></tr>"; }
                        output += "<tr><td class='resultsTextBold'>Book ID</td><td class='resultsText'> " + json[i]["Bookid"] + "</td></tr>";
                        output += "<tr><td class='resultsTextBold'>Buyer Name</td><td class='resultsText'> " + json[i]["BuyerName"] + "</td></tr>";
                        output += "<tr><td class='resultsTextBold'>Comment</td><td class='resultsText'> " + json[i]["Comment"] + "</td></tr>";
                        output += "<tr><td class='resultsTextBold'>Deed Date</td><td class='resultsText'> " + json[i]["Deeddate"] + "</td></tr>";
                        output += "<tr><td class='resultsTextBold'>Deed Type</td><td class='resultsText'> " + json[i]["Deedtype"] + "</td></tr>";
                        output += "<tr><td class='resultsTextBold'>Instrument Number</td><td class='resultsText'> " + json[i]["InstNum"] + "</td></tr>";
                        output += "<tr><td class='resultsTextBold'>Sale Price</td><td class='resultsText'> " + json[i]["SalePrice"] + "</td></tr>";
                        output += "<tr><td class='resultsTextBold'>Sale Yes/No</td><td class='resultsText'> " + json[i]["SaleYn"] + "</td></tr>";
                        output += "<tr><td class='resultsTextBold'>SalesDate</td><td class='resultsText'> " + json[i]["SalesDate"] + "</td></tr>";
                        output += "<tr><td class='resultsTextBold'>SellerName</td><td class='resultsText'> " + json[i]["SellerName"] + "</td></tr>";
                        output += "<tr><td class='resultsTextBold'></td></tr>";
                    }
                    output += "</table>";

                    deedContainer.innerHTML = output;



                } else { dojo.style(deedContainer, "display", "none"); }
            });

            // Owner history
            data.GetOwnerHistoryByPropID(accountNum).then(function(json) {
                var ownHistContainer = dojo.byId("dvOwnerHistory");

                if (JSON.stringify(json).length > 4) {
                    dojo.style(ownHistContainer, "display", "block");

                    var output = "<table width='99%'>";
                    output += "<tr><td class='resultsDataTop' colspan=2>Owner History</td></tr>";

                    for (var i = 0; i < json.length; i++) {

                        if (i > 0 && i < json.length) { output += "<tr><td class='resultsTextBold' colspan='2'><hr noshade></td></tr>"; }
                        output += "<tr><td class='resultsTextBold'>Account Status</td><td class='resultsText'> " + json[i]["AcctStatus"] + "</td></tr>";
                        output += "<tr><td class='resultsTextBold'>Buyer Name</td><td class='resultsText'> " + json[i]["BuyerName"] + "</td></tr>";
                        output += "<tr><td class='resultsTextBold'>Deed Date</td><td class='resultsText'> " + json[i]["DeedDate"] + "</td></tr>";
                        output += "<tr><td class='resultsTextBold'>Deed Type</td><td class='resultsText'> " + json[i]["DeedType"] + "</td></tr>";
                        output += "<tr><td class='resultsTextBold'>Comment</td><td class='resultsText'> " + json[i]["Infocomment"] + "</td></tr>";
                        output += "<tr><td class='resultsTextBold'>Sale ID</td><td class='resultsText'> " + json[i]["SaleID"] + "</td></tr>";
                        output += "<tr><td class='resultsTextBold'>Sale Price</td><td class='resultsText'> " + json[i]["Saleprice"] + "</td></tr>";
                        output += "<tr><td class='resultsTextBold'>Seller Name</td><td class='resultsText'> " + json[i]["SellerName"] + "</td></tr>";
                        output += "<tr><td class='resultsTextBold'>Year</td><td class='resultsText'> " + json[i]["Year"] + "</td></tr>";


                    }
                    output += "</table>";
                    ownHistContainer.innerHTML = output;
                } else { dojo.style(ownHistContainer, "display", "none"); }
            });
        }
    });
});