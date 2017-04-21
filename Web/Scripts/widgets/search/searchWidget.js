define([
        "dojo/Evented",
        "dojo/_base/declare",
        //"dojo/_base/lang",
        //"dojo/has", // feature detection
        //"esri/kernel", // esri namespace
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dojo/dom-construct",
        "esri/dijit/Geocoder",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/geometry/Point",
        "esri/tasks/QueryTask",
        "esri/tasks/query",
        "esri/graphicsUtils",
        "esri/graphic",
        "esri/config",
        "dojo/_base/Color",
        "dojo/_base/array",
        "dojo/on",
        //"dojo/Deferred",
        "dojo/dom-class",
        "dojo/dom-style",
        "Scripts/core/selection",
        "dojo/text!./SearchWidget.htm"
    ],
    function(
        Evented,
        declare,
        //lang,
        //has,
        //esriNS,
        _WidgetBase,
        _TemplatedMixin,
        domConstruct,
        Geocoder,
        SimpleMarkerSymbol,
        SimpleFillSymbol,
        SimpleLineSymbol,
        Point,
        QueryTask,
        Query,
        graphicsUtils,
        Graphic,
        esriConfig,
        Color,
        arrayUtils,
        on,
        //Deferred,
        domClass,
        domStyle,
        Selection,
        MyTemplate
    ) {
        var Widget = declare("SearchWidget", [_WidgetBase, _TemplatedMixin, Evented], {

            // template HTML
            templateString: MyTemplate,

            /* Define your component custom attributes here ... */
            sayHelloTo: "",
            candidateArray: null,
            selectionSymbol: null,
            geocoder: null,

            constructor: function() {
                // add here anything that will be executed in the widget initialization.

            },

            test: function() { alert("Test"); },

            postCreate: function() {
                //console.log("1");

                this.inherited(arguments);
                //console.log("2");
                this.selectionSymbol = new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([255, 0, 0, 0.8]));
                this.selectionSymbol.setOutline(new esri.symbol.SimpleLineSymbol("dashdot", new dojo.Color([255, 0, 0]), 2));
                //console.log("3");
                this.createGeocoder("ADDRESS");
                dojo.connect(this.chkName, 'click', this, function() { this.createGeocoder("NAME"); });
                dojo.connect(this.chkMaplot, 'click', this, function() { this.createGeocoder("MAPLOT"); });
                dojo.connect(this.chkAddress, 'click', this, function() { this.createGeocoder("ADDRESS"); });
                //console.log("4");

                global.OWNERCANDIDATES = [];
            },


            // -------------------------------------------------------------------------------------
            // showResults ::
            // -------------------------------------------------------------------------------------
            //      This function is the event handler for the select event on the Geocoding dijit.
            //      This function will zoom to the address that is selected and create a simple
            //      infoWindow.
            //      The graphic is then added to the map graphics.
            //
            // -------------------------------------------------------------------------------------   
            //  Input Variables::
            //      evt          --> [obj] the results of the address selection 
            // -------------------------------------------------------------------------------------
            //
            showResults: function(evt) {

                //console.log("Height: " + global.MAP.visible);

                global.MAP.graphics.clear();
                var point = evt.result.feature.geometry;

                window.queryTask = new QueryTask("http://xxxx/arcgis/rest/services/Address_Information/MapServer/1");

                var query = new Query();
                query.returnGeometry = true;
                query.outFields = ["*"];
                query.outSpatialReference = {
                    "wkid": 2270
                };
                query.geometry = point;
                query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;

                window.queryTask.execute(query);

                window.queryTask.on('complete', function(evt) {
                    var firstGraphic = evt.featureSet.features[0];

                    symbol = new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([255, 0, 0, 0.8]));
                    symbol.setOutline(new esri.symbol.SimpleLineSymbol("dashdot", new dojo.Color([255, 0, 0]), 2));

                    firstGraphic.setSymbol(symbol);

                    global.MAP.graphics.add(firstGraphic);
                    global.MAP.setExtent(graphicsUtils.graphicsExtent(evt.featureSet.features).expand(4));


                    //console.log("Before sending to selection  --> " + JSON.stringify(evt));
                    var selection = new Selection();
                    selection.loadResults(evt.featureSet.features); //?? could be just evt or evt.featureSet ... not sure

                    //console.log("After sending to selection");

                });

                global.SEARCHDIALOG.hide();


            },

            showNameResults: function(results) {
                console.log("Name Results = " + JSON.stringify(results.featureSet.features))
            },

            filterResults: function(results, gc) {
                //console.log("Filter Results");
                var length = results.results.length;
                var testArray = [];
                var ownerName = "";
                var newResults = [];
                for (var i = 0; i < length; i++) {

                    global.OWNERCANDIDATES.push(results.results[i].feature.attributes["Match_addr"] + "|" + results.results[i].feature.attributes["User_fld"]);

                    switch (i) {
                        case 0:
                            testArray.push(results.results[i].name.toUpperCase());
                            newResults.push(results.results[i]);
                            //ownerName = results.results[i].feature.attributes["Match_addr"];
                            break;
                        default:
                            var name = results.results[i].name;
                            if (dojo.indexOf(testArray, name.toUpperCase()) === -1) {
                                newResults.push(results.results[i]);
                            }
                    }
                }
                gc.set('results', newResults);
            },

            getNameResults: function(evt) {
                //console.log("Start Name Results");
                //console.log("This was selected: " + evt.result.feature.attributes["Match_addr"]);
                if (!global.OWNERCANDIDATES) console.log("There is no candidate array");


                var selectedAddr = evt.result.feature.attributes["Match_addr"];
                var maplots = "";

                for (var i = 0; i < global.OWNERCANDIDATES.length; i++) {
                    //console.log("Looping through the candidates");
                    var a = global.OWNERCANDIDATES[i].split("|");
                    if (a[0].toUpperCase() == selectedAddr.toUpperCase()) {
                        if (maplots.length == 0)
                            maplots = "'" + a[1] + "'";
                        else
                            maplots += ",'" + a[1] + "'";
                    }
                }

                var sel = new Selection();
                sel.doQueryTask("MapTaxlot IN (" + maplots.toString() + ")");

                global.SEARCHDIALOG.hide();
                //this.candidateArray = null;
            },

            createGeocoder: function(gcType) {

                esriConfig.defaults.geometryService = "http://xxxx/arcgis/rest/services/Utilities/Geometry/GeometryServer";
                //alert("This: " + this.searchWidgetContainer.innerHtml);

                var searchUrl, searchCaption, searchExample;
                switch (gcType) {
                    case "NAME":
                        searchUrl = 'http://xxxx/arcgis/rest/services/Locators/FindOwner/GeocodeServer';
                        searchCaption = 'Locate an owner';
                        this.chkName.checked = true;
                        searchExample = "";
                        break;

                    case "ADDRESS":
                        searchUrl = 'http://xxxx/arcgis/rest/services/Locators/FindStreetAddress/GeocodeServer';
                        searchCaption = 'Locate an address';
                        this.chkAddress.checked = true;
                        searchExample = "29821 Ellensburg Av";
                        break;

                    case "MAPLOT":
                        searchUrl = 'http://xxxx/arcgis/rest/services/Locators/FindMapTaxlot/GeocodeServer';
                        searchCaption = 'Locate a map taxlot';
                        this.chkMaplot.checked = true;
                        searchExample = "361536DA02800";
                        break;
                    default:
                        searchUrl = null;
                        searchCaption = null;
                        break;
                }

                if (this.geocoder != null) this.geocoder.destroy();

                this.searchDiv = domConstruct.toDom("<div style='width: 300px;'></div>");
                dojo.addClass(this.searchDiv, "SearchBox");
                domConstruct.place(this.searchDiv, this.searchWidgetContainer);

                this.searchExampleContainer.innerHTML = "(ex: " + searchExample + ")";

                this.geocoder = new Geocoder({
                    maxLocations: 20,
                    autoComplete: true,
                    geocoderMenu: true,
                    //autoNavigate: false,
                    arcgisGeocoder: false,
                    showResults: true,
                    minChars: 5,
                    searchDelay: 350,
                    outFields: "*",
                    geocoders: [{
                        url: searchUrl,
                        name: "tmp",
                        placeholder: searchCaption,
                        outFields: "*"
                    }],
                    map: global.MAP
                }, this.searchDiv);

                this.geocoder.startup();
                this.geocoder.focus();

                if (gcType == "NAME") {
                    this.geocoder.on('select', this.getNameResults);
                    dojo.connect(this.geocoder, "onAutoComplete", dojo.hitch(this, function(results) {
                        this.filterResults(results, this.geocoder);
                    }));
                } else if ((gcType == "ADDRESS") || (gcType == "MAPLOT")) {
                    this.geocoder.on('select', this.showResults);
                }
            }
        });
        return Widget;
    });