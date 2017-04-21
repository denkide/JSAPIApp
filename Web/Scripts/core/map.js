define([
        "dojo/_base/lang",
        "dojo/_base/declare",
        "dojo/aspect",
        "dojo/on",
        "dojo/json",
        "esri/map",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "dojo/dom",
        "Scripts/core/legend",
        "Scripts/core/identify",
        "Scripts/core/selection",
        "Scripts/core/measure",
        "dojo/fx",
        "esri/toolbars/navigation",
        "esri/toolbars/draw"
    ],
    function(
        lang,
        declare,
        aspect,
        On,
        JSON,
        Map,
        Dynamic,
        Tiled,
        Dom,
        Legend,
        ID,
        Selection,
        Measure) {
        return declare(null, {

            endDrawingEvent: null,
            config: {},
            mainToolbar: {},
            //drawToolbar: {},

            constructor: function() {},

            initMap: function(cfg) {
                config = cfg;

                var spatialRef = new esri.SpatialReference({ wkid: 2270 });

                //-- ## bad programmer ... global
                global.MAP = new Map("map", {
                    logo: false,
                    extent: this.setInitExtent(),
                    slider: true,
                    autoResize: true,
                    fadeOnZoom: true,
                    spatialReference: spatialRef
                });

                this.createMapEvts();

                this.loadLayers();
                this.createTaxlotLayer();
            },

            createTaxlotLayer: function() {

                //console.log("Create taxlot layer");

                var fieldsSelectionSymbol = new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([255, 0, 0, 0.8]));
                fieldsSelectionSymbol.setOutline(new esri.symbol.SimpleLineSymbol("dashdot", new dojo.Color([255, 0, 0]), 2));

                var content = "<b>MAPTAXLOT</b>: ${MAPTAXLOT}" +
                    "<br><b>OWNNAME</b>: ${OWNNAME}" +
                    "<br><b>Address</b>: ${ADDR1}";

                var infoTemplate = new esri.InfoTemplate("${FIELD_NAME}", content);
                global.TAXLOTLAYER = new esri.layers.FeatureLayer(config.TaxlotFeatureLayer, {
                    mode: esri.layers.FeatureLayer.MODE_SELECTION,
                    infoTemplate: infoTemplate,
                    outFields: ["*"]
                });

                global.TAXLOTLAYER.setSelectionSymbol(fieldsSelectionSymbol);
                dojo.connect(global.TAXLOTLAYER, "onSelectionComplete", lang.hitch(this, this.loadResults));

                global.MAP.addLayer(global.TAXLOTLAYER);

                //console.log("Create taxlot layer");
            },

            createMapEvts: function() {

                aspect.after(global.MAP, "onLoad", dojo.hitch(this, function() {

                    //-- ## setup toolbars
                    mainToolbar = new esri.toolbars.Navigation(global.MAP);
                    global.DRAWTOOLBAR = new esri.toolbars.Draw(global.MAP, { showTooltips: false });
                    this.addDrawEndEvt();

                    updateLoadMessage('Map loaded');

                    var legend = new Legend();
                    legend.loadLegendDigit();
                    //loadingOverlay.hide();
                    global.CURRENTEXTENT = global.MAP.extent;

                }));

                On(global.MAP, "extent-change", function() {
                    global.PREVIOUSEXTENT = global.CURRENTEXTENT;
                    global.CURRENTEXTENT = global.MAP.extent;
                });

                //-- ## setup the map events
                //-- ## map :: unload event
                // -------------------------------------------
                On(global.MAP, 'unload', function(evt) {
                    if (this.endDrawingEvent) this.endDrawingEvent.remove();
                });

                On(global.MAP, 'click', function(evt) {

                    //console.log("Map click 1");

                    if (global.CURRENTMAPTOOL == TOOLBARITEM.IDENTIFY) {
                        //console.log("map click == ID");

                        global.DRAWTOOLBAR.deactivate();
                        var id = new ID();
                        id.doIdentify(evt);
                    } else if (global.CURRENTMAPTOOL == TOOLBARITEM.MULTISELECT) {
                        global.TAXLOTLAYER.clearSelection();
                        global.MAP.graphics.clear();

                        var sel = new Selection();
                        sel.doSelection();
                    } else if (global.CURRENTMAPTOOL == TOOLBARITEM.SINGLESELECT) {
                        global.TAXLOTLAYER.clearSelection();
                        global.MAP.graphics.clear();

                        var sel = new Selection();
                        sel.doSelection();
                    }
                });
            },

            addDrawEndEvt: function() {
                if (!global.DRAWTOOLBAR) global.DRAWTOOLBAR = new esri.toolbars.Draw(global.MAP, { showTooltips: false });
                if (global.TAXLOTLAYER) global.TAXLOTLAYER.clearSelection();
                dojo.connect(global.DRAWTOOLBAR, "onDrawEnd", dojo.hitch(this, function(geometry) {
                    var sel = new Selection();
                    sel.initSelection(geometry);
                }));
            },

            goToPreviousExtent: function() {
                global.MAP.setExtent(global.PREVIOUSEXTENT);
            },

            zoomToFullExtent: function() {
                global.MAP.setExtent(this.setInitExtent());
            },

            manageToolbarAction: function(action) {

                //-- ## clean up memory
                if (this.endDrawingEvent) this.endDrawingEvent.remove();

                switch (action) {
                    case TOOLBARITEM.PAN:
                        mainToolbar.activate(esri.toolbars.Navigation.PAN);
                        this.manageDrawingToolbar(null);
                        break;
                    case TOOLBARITEM.ZOOMIN:
                        mainToolbar.activate(esri.toolbars.Navigation.ZOOM_IN);
                        this.manageDrawingToolbar(null);
                        break;
                    case TOOLBARITEM.ZOOMOUT:
                        mainToolbar.activate(esri.toolbars.Navigation.ZOOM_OUT);
                        this.manageDrawingToolbar(null);
                        break;
                    case TOOLBARITEM.IDENTIFY:
                        mainToolbar.deactivate();
                        this.manageDrawingToolbar(esri.toolbars.Draw.POINT);
                        break;
                    case TOOLBARITEM.MEASURELINE:
                        mainToolbar.deactivate();

                        var measureTool = new Measure();
                        measureTool.doMeasure("LINE");

                        break;
                    case TOOLBARITEM.SINGLESELECT:
                        mainToolbar.deactivate();
                        this.manageDrawingToolbar(esri.toolbars.Draw.POINT);

                        var sel = new Selection();
                        sel.doSelection();

                        break;
                    case TOOLBARITEM.MULTISELECT:
                        mainToolbar.deactivate();
                        this.manageDrawingToolbar(esri.toolbars.Draw.EXTENT);

                        var sel = new Selection();
                        sel.doSelection();

                        break;
                    default:
                        mainToolbar.activate(esri.toolbars.Navigation.PAN);
                        this.manageDrawingToolbar(null);
                        break;
                }
            },

            manageDrawingToolbar: function(obj) {
                if (obj) {
                    global.DRAWTOOLBAR.activate(obj);
                } else
                    global.DRAWTOOLBAR.deactivate();
            },

            setInitExtent: function() {
                return new esri.geometry.Extent(
                    parseFloat(config.StartXMin),
                    parseFloat(config.StartYMin),
                    parseFloat(config.StartXMax),
                    parseFloat(config.StartYMax),
                    new esri.SpatialReference({ wkid: parseInt(config.WKIDSpatialRef) }));
            },

            getCachedMapServices: function() {
                var cachedlayers = [];

                for (var i = 0; i < config.CachedServices.length; i++) {
                    var lyr = new Tiled(config.CachedServices[i].path, { id: config.CachedServices[i].id });
                    this.manageLayerVisibility(SERVICETYPE.CACHED, config.CachedServices[i].id, lyr);
                    cachedlayers.push(lyr);

                    updateLoadMessage('Add layer : ' + lyr.id);
                }
                return cachedlayers;
            },

            getDynamicMapServices: function() {
                var dynlayers = [];

                // get the dynamic services
                for (var i = 0; i < config.DynamicServices.length; i++) {
                    var lyr = new Dynamic(config.DynamicServices[i].path, { id: config.DynamicServices[i].id });
                    this.manageLayerVisibility(SERVICETYPE.DYNAMIC, config.DynamicServices[i].id, lyr);
                    dynlayers.push(lyr);
                    updateLoadMessage('Add layer : ' + lyr.id);
                }
                return dynlayers;
            },

            manageLayerVisibility: function(layerType, searchID, lyr) {
                if (layerType == SERVICETYPE.DYNAMIC) {
                    if (arrayContains(config.DynamicServiceInitialVisibility, searchID)) lyr.show();
                    else lyr.hide();
                } else {
                    if (arrayContains(config.CachedServiceInitialVisibility, searchID)) lyr.show();
                    else lyr.hide();
                }
            },

            loadLayers: function() {
                // get the cached services
                global.MAP.addLayers(this.getCachedMapServices(config));

                // get the dynamic services
                global.MAP.addLayers(this.getDynamicMapServices(config));
            }

        });
    });