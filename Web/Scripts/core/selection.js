define([
        "dojo/parser", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/Color", "dojo/dom-style", "dojo/dom-class",
        "dojo/dom", "dojo/on", "dojo/json", "dojo/mouse", "dojo/dom-construct", "esri/tasks/QueryTask",
        "esri/tasks/query", "Scripts/appConfig", "Scripts/core/uiutil",
        "Scripts/core/details", "Scripts/core/data", "esri/layers/FeatureLayer", "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol"
    ],
    function(
        parser, declare, lang, Color, DomStyle, DomClass, Dom, On, JSON, Mouse, domConstruct, QueryTask, Query, Cfg, Util,
        Details, Data, FeatureLayer, SimpleFillSymbol, SimpleLineSymbol) {
        return declare(null, {

            drawend: null,
            queryCount: 0,

            constructor: function() {

            },

            doSelection: function() {

                var util = new Util();
                var resultsWidth = util.returnResultPanelWidth();

                if (resultsWidth > 50)
                    util.toggleResults(config, 'CLOSE');

                //this.initSelection();

            },

            createTaxlotLayer: function() {

                console.log("Create taxlot layer");


                global.TAXLOTLAYER.clear();
                global.MAP.graphics.clear();

                var fieldsSelectionSymbol = new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([255, 0, 0, 0.8]));
                fieldsSelectionSymbol.setOutline(new esri.symbol.SimpleLineSymbol("dashdot", new dojo.Color([255, 0, 0]), 2));

                //esri.layers.FeatureLayer.MODE_SELECTION,
                global.TAXLOTLAYER = new esri.layers.FeatureLayer(config.TaxlotFeatureLayer, {
                    mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
                    //infoTemplate: infoTemplate,
                    outFields: ["*"]
                });

                global.TAXLOTLAYER.setSelectionSymbol(fieldsSelectionSymbol);
                dojo.connect(global.TAXLOTLAYER, "onSelectionComplete", lang.hitch(this, this.loadResults));

                global.MAP.addLayer(global.TAXLOTLAYER);

                //console.log("Create taxlot layer");
            },

            initSelection: function(geometry) {
                if (global.TAXLOTLAYER) global.MAP.removeLayer(global.TAXLOTLAYER);

                this.createTaxlotLayer();
                var selectQuery = new esri.tasks.Query();
                if (global.DRAWTOOLBAR) {
                    if (global.MAP.getScale() < 5800) {

                        //console.log("Go do that query!!!  " + JSON.stringify(geometry));
                        selectQuery.geometry = geometry;
                        //console.log("Go do that query 222!!!");

                        if (!global.TAXLOTLAYER) console.log("No Taxlots");

                        global.TAXLOTLAYER.selectFeatures(selectQuery, esri.layers.FeatureLayer.SELECTION_NEW);
                        //console.log("after select");
                        dojo.style("ResultsLoading", "display", "block");

                    } else {
                        this.openResultsContainer();
                        this.loadScaleError();
                    }
                }
            },

            loadScaleError: function() {
                dojo.style("ResultsLoading", "display", "none");
                dojo.byId('ResultsContainer').innerHTML = 'Could not load results. Scale is too high.';
            },

            clearResults: function() {

                dojo.query(".resultsTable").forEach(dojo.destroy);
            },

            openResultsContainer: function() {

                //console.log("Open results 1");

                var util = new Util();
                var resultsWidth = util.returnResultPanelWidth();

                //console.log("Open results 2");

                dojo.style(config.ResultsContainer, "display", "block");
                dojo.style(config.DetailsContainer, "display", "none");
                dojo.byId('ResultsContainer').innerHTML = '';
                dojo.query(".resultsTable").forEach(dojo.destroy);

                util.toggleResults(config, 'OPEN');

            },

            doQueryTask: function(where) {
                if (global.TAXLOTLAYER) global.MAP.removeLayer(global.TAXLOTLAYER);

                this.createTaxlotLayer();
                var selectQuery = new esri.tasks.Query();
                selectQuery.where = where;
                global.TAXLOTLAYER.selectFeatures(selectQuery, esri.layers.FeatureLayer.SELECTION_NEW);
                dojo.style("ResultsLoading", "display", "block");
            },

            loadResults: function(features) {

                var featureExtent = esri.graphicsExtent(features);
                global.MAP.setExtent(featureExtent);

                //console.log("in load results");

                this.drawend = null;

                //console.log("Gimme the results");

                var config = new Cfg();
                //var util = new Util();
                var data = new Data();

                //var resultsWidth = util.returnResultPanelWidth();

                var selectResults = "";
                var extent;
                var iCount = 0;
                var geom;

                //console.log("Gimme the results 2");
                this.openResultsContainer();

                dojo.forEach(features, function(feature) {

                    //console.log("xxxxx 1 ::: " + JSON.stringify(feature));

                    global.MAP.graphics.add(feature);

                    extent = feature.geometry.getExtent();
                    var xmax = extent.xmax;
                    var ymax = extent.ymax;
                    var xmin = extent.xmin;
                    var ymin = extent.ymin;
                    var geomString = feature.geometry.toJson();

                    data.GetAssessmentByMapTaxLot(feature.attributes.MapTaxlot.replace('S', '').replace('W', '')).then(function(json) {

                        //console.log('assessment details results follow');

                        if (json.length > 0) {

                            //console.log('length is ' + json.length);

                            dojo.style("ResultsLoading", "display", "none");
                            for (var z = 0; z < json.length; z++) {

                                //console.log('looping in the json');

                                var propID = json[z]["PropertyId"];
                                var maplot = json[z]["Maplot"];
                                var ownerName = json[z]["OwnerName"];
                                var address = json[z]["Situsaddr"];
                                var cityState = json[z]["CityStateZip"];
                                var csz = cityState.split(',');

                                var mainDiv = domConstruct.create("div");
                                DomClass.add(mainDiv, "resultsTable");

                                var accountDiv = domConstruct.create("div", { class: "resultsTextBold", innerHTML: "&nbsp;&nbsp;PropID: <span style='left: 130px; position: absolute;'>" + propID + "</span>" });
                                DomClass.add(accountDiv, "resultsTextBold");
                                dojo.place(accountDiv, mainDiv);

                                var maplotDiv = domConstruct.create("div", { class: "resultsTextBold", innerHTML: "&nbsp;&nbsp;Maplot: <span style='left: 130px; position: absolute;'>" + maplot + "</span>" });
                                DomClass.add(maplotDiv, "resultsTextBold");
                                dojo.place(maplotDiv, mainDiv);

                                var ownerDiv = domConstruct.create("div", { class: "resultsTextBold", innerHTML: "&nbsp;&nbsp;Owner: <span style='left: 130px; position: absolute;'>" + ownerName + "</span>" });
                                DomClass.add(ownerDiv, "resultsTextBold");
                                dojo.place(ownerDiv, mainDiv);

                                var addressDiv = domConstruct.create("div", { class: "resultsTextBold", innerHTML: "&nbsp;&nbsp;Address: <span style='left: 130px; position: absolute;'>" + address + "</span>" });
                                DomClass.add(addressDiv, "resultsTextBold");
                                dojo.place(addressDiv, mainDiv);

                                var cityDiv = domConstruct.create("div", { class: "resultsTextBold", innerHTML: "&nbsp;&nbsp;City,State,Zip: <span style='left: 130px; position: absolute;'>" + csz[0] + "</span>" });
                                DomClass.add(cityDiv, "resultsTextBold");
                                dojo.place(cityDiv, mainDiv);

                                if (propID.length > 0) {
                                    // do the image links now ::: 
                                    var dataLnk = domConstruct.create("div", { class: "resultsData", innerHTML: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='Images/info.png'>&nbsp;&nbsp;&nbsp;View Data" });
                                    DomClass.add(dataLnk, "resultsDataTop");
                                    dojo.place(dataLnk, mainDiv);

                                    var zoomLnk = domConstruct.create("div", { class: "resultsTextBold", innerHTML: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='Images/find.png'>&nbsp;&nbsp;&nbsp;Zoom to this location" });
                                    DomClass.add(zoomLnk, "resultsData");
                                    dojo.place(zoomLnk, mainDiv);

                                    // set up the events for this selected item
                                    // --------------------------------------------
                                    var dataClick = On(dataLnk, "click", function() {
                                        //alert("View data ===> AcctNo:: " + feature.attributes.ACCTNO);

                                        var detail = new Details();
                                        detail.showDetails(propID);
                                    });

                                    var zoomClick = On(zoomLnk, "click", function() {
                                        var extent = new esri.geometry.Extent(xmin, ymin, xmax, ymax, new esri.SpatialReference({ wkid: 2270 }));
                                        global.MAP.setExtent(extent);

                                    });
                                }

                                On(mainDiv, Mouse.enter, function() {

                                    try {
                                        if (global.HIGHLIGHTLAYER != null) {
                                            global.HIGHLIGHTLAYER = null;
                                        }

                                        var glayer = new esri.layers.GraphicsLayer();
                                        var poly = new esri.geometry.Polygon(geomString);

                                        var symbol = new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([255, 255, 0, 0.6]));
                                        symbol.setOutline(new esri.symbol.SimpleLineSymbol("solid", new dojo.Color([255, 255, 0]), 2));

                                        var graphic = new esri.Graphic(poly, symbol, null, null);
                                        glayer.add(graphic);

                                        global.MAP.addLayer(glayer);
                                        global.HIGHLIGHTLAYER = glayer;
                                    } catch (ex) {
                                        console.log(ex.message);
                                    }

                                });

                                On(mainDiv, Mouse.leave, function() {
                                    if (global.HIGHLIGHTLAYER) global.HIGHLIGHTLAYER.clear();
                                });

                                dojo.place(mainDiv, dojo.byId(config.ResultsContainer), "first");

                                //console.log('end of load results');

                            }
                        } else {

                            dojo.byId('ResultsContainer').innerHTML = 'Results could not be located.';
                            dojo.style("ResultsLoading", "display", "none");
                        }

                    });


                }); // end foreach

            },

            doCleanUp: function() {
                global.DRAWTOOLBAR.deactivate();
                this.drawend.disconnect();
                global.DRAWTOOLBAR = null;
                global.DRAWTOOLBAR = new esri.toolbars.Draw(global.MAP, { showTooltips: false });

                global.MAP.removeLayer(global.TAXLOTLAYER);

                if (global.CURRENTMAPTOOL == "multiselect") {
                    //console.log("End 2");
                    global.DRAWTOOLBAR.activate(esri.toolbars.Draw.EXTENT);
                    global.CURRENTMAPTOOL = TOOLBARITEM.MULTIPLESELECT;
                } else if (global.CURRENTMAPTOOL == "singleselect") {
                    //console.log("End 3");
                    global.DRAWTOOLBAR.activate(esri.toolbars.Draw.POINT);
                    global.CURRENTMAPTOOL = TOOLBARITEM.SINGLESELECT;
                }
            }
        });
    });