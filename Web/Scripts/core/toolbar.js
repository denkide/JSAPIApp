define([
        "dojo/_base/declare",
        "dojo/dom-style",
        "dojo/dom",
        "dojo/on",
        "dojo/json",
        "dojo/mouse",
        "Scripts/core/uiutil",
        "Scripts/core/print",
        "Scripts/appConfig",
        "Scripts/core/search"
    ],
    function(
        declare,
        DomStyle,
        Dom,
        On,
        JSON,
        Mouse,
        UiUtil,
        Print,
        Cfg,
        Search) {
        return declare(null, {

            constructor: function() {
                global.CURRENTMAPTOOL = TOOLBARITEM.PAN;
            },

            setDefaultTool: function(map, config) {
                var util = new UiUtil();

                global.CURRENTMAPTOOL = TOOLBARITEM.PAN;
                util.toggleImage(config.PanObj, config.PanImage, config.PanImageHover, false);
                map.manageToolbarAction(TOOLBARITEM.PAN);
            },

            registerToolbarEvt: function(config, map) {

                updateLoadMessage('Registering toolbar');

                var util = new UiUtil();

                //-- ## full extent
                this.createClickEvt(config, util, map, config.FullExtentObj, this);
                this.createMouseDownEvt(config, util, map, config.FullExtentObj);
                this.createMouseUpEvt(config, util, map, config.FullExtentObj);
                this.createMouseEnterEvt(config, util, map, config.FullExtentObj);
                this.createMouseLeaveEvt(config, util, map, config.FullExtentObj);

                //-- ## pan
                this.createClickEvt(config, util, map, config.PanObj, this);
                this.createMouseDownEvt(config, util, map, config.PanObj);
                this.createMouseUpEvt(config, util, map, config.PanObj);
                this.createMouseEnterEvt(config, util, map, config.PanObj);
                this.createMouseLeaveEvt(config, util, map, config.PanObj);

                //-- ## zoomin
                this.createClickEvt(config, util, map, config.ZoominObj, this);
                this.createMouseDownEvt(config, util, map, config.ZoominObj);
                this.createMouseUpEvt(config, util, map, config.ZoominObj);
                this.createMouseEnterEvt(config, util, map, config.ZoominObj);
                this.createMouseLeaveEvt(config, util, map, config.ZoominObj);

                //-- ## zoomout
                this.createClickEvt(config, util, map, config.ZoomoutObj, this);
                this.createMouseDownEvt(config, util, map, config.ZoomoutObj);
                this.createMouseUpEvt(config, util, map, config.ZoomoutObj);
                this.createMouseEnterEvt(config, util, map, config.ZoomoutObj);
                this.createMouseLeaveEvt(config, util, map, config.ZoomoutObj);

                //-- ## previous extent
                this.createClickEvt(config, util, map, config.PreviousExtentObj, this);
                this.createMouseDownEvt(config, util, map, config.PreviousExtentObj);
                this.createMouseUpEvt(config, util, map, config.PreviousExtentObj);
                this.createMouseEnterEvt(config, util, map, config.PreviousExtentObj);
                this.createMouseLeaveEvt(config, util, map, config.PreviousExtentObj);

                //-- ## identify
                this.createClickEvt(config, util, map, config.IdentifyObj, this);
                this.createMouseDownEvt(config, util, map, config.IdentifyObj);
                this.createMouseUpEvt(config, util, map, config.IdentifyObj);
                this.createMouseEnterEvt(config, util, map, config.IdentifyObj);
                this.createMouseLeaveEvt(config, util, map, config.IdentifyObj);

                //-- ## measure line
                this.createClickEvt(config, util, map, config.MeasureLineObj, this);
                this.createMouseDownEvt(config, util, map, config.MeasureLineObj);
                this.createMouseUpEvt(config, util, map, config.MeasureLineObj);
                this.createMouseEnterEvt(config, util, map, config.MeasureLineObj);
                this.createMouseLeaveEvt(config, util, map, config.MeasureLineObj);

                //                //-- ## measure area
                //                this.createClickEvt(config, util, map, config.MeasureAreaObj, this);
                //                this.createMouseDownEvt(config, util, map, config.MeasureAreaObj);
                //                this.createMouseUpEvt(config, util, map, config.MeasureAreaObj);
                //                this.createMouseEnterEvt(config, util, map, config.MeasureAreaObj);
                //                this.createMouseLeaveEvt(config, util, map, config.MeasureAreaObj);

                //-- ## single taxlot
                this.createClickEvt(config, util, map, config.SingleTaxlotSelectObj, this);
                this.createMouseDownEvt(config, util, map, config.SingleTaxlotSelectObj);
                this.createMouseUpEvt(config, util, map, config.SingleTaxlotSelectObj);
                this.createMouseEnterEvt(config, util, map, config.SingleTaxlotSelectObj);
                this.createMouseLeaveEvt(config, util, map, config.SingleTaxlotSelectObj);

                //-- ## multi taxlot
                this.createClickEvt(config, util, map, config.MultiTaxlotSelectObj, this);
                this.createMouseDownEvt(config, util, map, config.MultiTaxlotSelectObj);
                this.createMouseUpEvt(config, util, map, config.MultiTaxlotSelectObj);
                this.createMouseEnterEvt(config, util, map, config.MultiTaxlotSelectObj);
                this.createMouseLeaveEvt(config, util, map, config.MultiTaxlotSelectObj);

                //-- ## clear graphics
                this.doClearGraphicsClickEvt(util);

                //-- ## results toggle
                this.createClickEvt(config, util, map, config.ResultsToggleButton, this);

                //-- ## search
                this.createClickEvt(config, util, map, config.ToolbarSearchContainer, this);
                this.createMouseDownEvt(config, util, map, config.ToolbarSearchContainer);
                this.createMouseUpEvt(config, util, map, config.ToolbarSearchContainer);
                this.createMouseEnterEvt(config, util, map, config.ToolbarSearchContainer);
                this.createMouseLeaveEvt(config, util, map, config.ToolbarSearchContainer);

                //-- ## layers
                this.createClickEvt(config, util, map, config.ToolbarLayersContainer, this);
                this.createMouseDownEvt(config, util, map, config.ToolbarLayersContainer);
                this.createMouseUpEvt(config, util, map, config.ToolbarLayersContainer);
                this.createMouseEnterEvt(config, util, map, config.ToolbarLayersContainer);
                this.createMouseLeaveEvt(config, util, map, config.ToolbarLayersContainer);

                //-- ## print
                this.createClickEvt(config, util, map, config.PrintObj, this);

                //-- ## tech support email
                this.doTechSupportEmailEvt(config);
            },

            doClearGraphicsClickEvt: function(util) {
                On(Dom.byId(config.ClearGraphicsObj), "click", dojo.hitch(this, function() {
                    this.clearGraphics(util);
                }));
            },

            doTechSupportEmailEvt: function() {
                On(Dom.byId(config.TechSupportLink), "click", function() {
                    window.location.href = "mailto: " + config.TechSupportEmail;
                });

                On(Dom.byId(config.TechSupportLink), Mouse.enter, function() {
                    dojo.style(config.TechSupportLink, "cursor", "hand");
                });

                On(Dom.byId(config.TechSupportLink), Mouse.leave, function() {
                    dojo.style(config.TechSupportLink, "cursor", "pointer");
                });
            },

            createClickEvt: function(config, util, map, obj, _this) {

                //-- ## do the click event
                On(Dom.byId(obj), "click", function() {
                    switch (obj) {
                        case config.FullExtentObj:
                            _this.cleanUpTools(config, util, _this);
                            map.zoomToFullExtent();
                            break;
                        case config.PanObj:
                            global.CURRENTMAPTOOL = TOOLBARITEM.PAN;
                            _this.cleanUpTools(config, util, _this);
                            util.manageToolUI(config, "CurrentTool");
                            map.manageToolbarAction(TOOLBARITEM.PAN);
                            break;
                        case config.ZoominObj:
                            global.CURRENTMAPTOOL = TOOLBARITEM.ZOOMIN;
                            _this.cleanUpTools(config, util, _this);
                            util.manageToolUI(config, "CurrentTool");
                            map.manageToolbarAction(TOOLBARITEM.ZOOMIN);
                            break;
                        case config.ZoomoutObj:
                            global.CURRENTMAPTOOL = TOOLBARITEM.ZOOMOUT;
                            _this.cleanUpTools(config, util, _this);
                            util.manageToolUI(config, "CurrentTool");
                            map.manageToolbarAction(TOOLBARITEM.ZOOMOUT);
                            break;
                        case config.PreviousExtentObj:
                            _this.cleanUpTools(config, util, _this);
                            map.goToPreviousExtent();
                            break;
                        case config.IdentifyObj:
                            global.CURRENTMAPTOOL = TOOLBARITEM.IDENTIFY;
                            _this.cleanUpTools(config, util, _this);
                            util.manageToolUI(config, "CurrentTool");
                            map.manageToolbarAction(TOOLBARITEM.IDENTIFY);
                            break;
                        case config.MeasureLineObj:
                            global.CURRENTMAPTOOL = TOOLBARITEM.MEASURELINE;
                            _this.cleanUpTools(config, util, _this);
                            util.manageToolUI(config, "CurrentTool");
                            map.manageToolbarAction(TOOLBARITEM.MEASURELINE);

                            _this.toggleMeasure(config, util);

                            break;
                        case config.SingleTaxlotSelectObj:
                            global.CURRENTMAPTOOL = TOOLBARITEM.SINGLESELECT;
                            _this.cleanUpTools(config, util, _this);
                            util.clearResults();
                            util.manageToolUI(config, "CurrentTool");
                            map.manageToolbarAction(TOOLBARITEM.SINGLESELECT);

                            break;
                        case config.MultiTaxlotSelectObj:
                            global.CURRENTMAPTOOL = TOOLBARITEM.MULTISELECT;
                            _this.cleanUpTools(config, util, _this);
                            util.clearResults();
                            util.manageToolUI(config, "CurrentTool");
                            map.manageToolbarAction(TOOLBARITEM.MULTISELECT);

                            break;
                        case config.ResultsToggleButton:
                            _this.cleanUpTools(config, util, _this);
                        
                            if (util.returnResultPanelWidth() > 50) {
                                util.toggleResults(config, 'CLOSE');
                            } else {
                                util.toggleResults(config, 'OPEN');
                                var height = util.returnLayerPanelHeight();
                                if (height > 20)
                                    _this.toggleLayers(config, util);
                            }

                            break;
                        case config.ToolbarSearchContainer:
                            _this.cleanUpTools(config, util, _this);
                            global.APPFUNCTION = FUNCTIONTOOLS.SEARCH;
                            dojo.style(config.ToolbarSearchContainer, "background-color", "#E6EADF");
                            dojo.style(config.ToolbarLayersContainer, "background-color", "#BDC8AD");

                            var search = new Search();
                            search.showSearch();
                                    
                            break;
                        case config.ToolbarLayersContainer:
                            _this.cleanUpTools(config, util, _this);
                            if (util.returnResultPanelWidth() > 50)
                                util.toggleResults(config, 'CLOSE');
                         
                            global.APPFUNCTION = FUNCTIONTOOLS.LAYERS;
                            dojo.style(config.ToolbarSearchContainer, "background-color", "#BDC8AD");
                            dojo.style(config.ToolbarLayersContainer, "background-color", "#E6EADF");

                            _this.toggleLayers(config, util);

                            break;
                        case config.PrintObj:
                   
                            var print = new Print();
                            print.doPrint();

                            break;
                        default:
                            break;
                    }
                });
            },

            createMouseDownEvt: function(config, util, map, obj) {

                //-- ## mouse down
                On(Dom.byId(obj), "mousedown", function() {
                    switch (obj) {
                        case config.FullExtentObj:
                            util.toggleClass(config.FullExtentObj, 'activeTool', 'inactiveTool', false);
                            break;
                        case config.PanObj:
                            break;
                        case config.ZoominObj:
                            break;
                        case config.ZoomoutObj:
                            global.CURRENTMAPTOOL = TOOLBARITEM.ZOOMOUT;
                            map.manageToolbarAction(TOOLBARITEM.ZOOMOUT);
                            break;
                        case config.PreviousExtentObj:
                            util.toggleClass(config.PreviousExtentObj, 'activeTool', 'inactiveTool', false);
                            util.toggleImage(config.PreviousExtentObj, config.PreviousExtentImage, config.PreviousExtentImageHover, false);
                            break;
                        case config.IdentifyObj:
                            util.toggleClass(config.IdentifyObj, 'activeTool', 'inactiveTool', false);
                            util.toggleImage(config.IdentifyObj, config.IdentifyImage, config.IdentifyImageActive, false);
                            break;
                        case config.MeasureLineObj:
                            util.toggleClass(config.MeasureLineObj, 'activeTool', 'inactiveTool', false);
                            util.toggleImage(config.MeasureLineObj, config.MeasureLineImage, config.MeasureLineImageActive, false);
                            break;
                            //                        case config.MeasureAreaObj:                           
                            //                            util.toggleClass(config.MeasureAreaObj, 'activeTool', 'inactiveTool', false);                           
                            //                            util.toggleImage(config.MeasureAreaObj, config.MeasureAreaImage, config.MeasureAreaImageActive, false);                           
                            //                            break;                           
                        case config.SingleTaxlotSelectObj:
                            util.toggleClass(config.SingleTaxlotSelectObj, 'activeTool', 'inactiveTool', false);
                            util.toggleImage(config.SingleTaxlotSelectObj, config.SingleTaxlotSelectImage, config.SingleTaxlotSelectImageActive, false);
                            break;
                        case config.MultiTaxlotSelectObj:
                            util.toggleClass(config.MultiTaxlotSelectObj, 'activeTool', 'inactiveTool', false);
                            util.toggleImage(config.MultiTaxlotSelectObj, config.MultiTaxlotSelectImage, config.MultiTaxlotSelectImageActive, false);
                            break;
                        case config.ToolbarSearchContainer:
                            global.APPFUNCTION = FUNCTIONTOOLS.SEARCH;
                            dojo.style(config.ToolbarSearchContainer, "background-color", "#E6EADF");
                            dojo.style(config.ToolbarLayersContainer, "background-color", "#BDC8AD");
                            break;
                        case config.ToolbarLayersContainer:
                            global.APPFUNCTION = FUNCTIONTOOLS.LAYERS;
                            dojo.style(config.ToolbarSearchContainer, "background-color", "#BDC8AD");
                            dojo.style(config.ToolbarLayersContainer, "background-color", "#E6EADF");
                            break;
                        default:
                            break;
                    }
                });
            },

            createMouseUpEvt: function(config, util, map, obj) {

                //-- ## mouseup
                On(Dom.byId(obj), "mouseup", function() {
                    switch (obj) {
                        case config.FullExtentObj:
                            util.toggleClass(config.FullExtentObj, 'activeTool', 'inactiveTool', true);
                            break;
                        case config.PanObj:
                            break;
                        case config.ZoominObj:
                            break;
                        case config.ZoomoutObj:
                            break;
                        case config.PreviousExtentObj:
                            util.toggleClass(config.PreviousExtentObj, 'activeTool', 'inactiveTool', true);
                            util.toggleImage(config.PreviousExtentObj, config.PreviousExtentImage, config.PreviousExtentImageHover, true);
                            break;
                        case config.IdentifyObj:
                            util.toggleClass(config.IdentifyObj, 'activeTool', 'inactiveTool', true);
                            util.toggleImage(config.IdentifyObj, config.IdentifyImage, config.IdentifyImageActive, true);
                            break;
                        case config.MeasureLineObj:
                            util.toggleClass(config.MeasureLineObj, 'activeTool', 'inactiveTool', true);
                            util.toggleImage(config.MeasureLineObj, config.MeasureLineImage, config.MeasureLineImageActive, true);
                            break;
                            //                        case config.MeasureAreaObj:                           
                            //                            util.toggleClass(config.MeasureAreaObj, 'activeTool', 'inactiveTool', true);                           
                            //                            util.toggleImage(config.MeasureAreaObj, config.MeasureAreaImage, config.MeasureAreaImageActive, true);                           
                            //                            break;                           
                        case config.SingleTaxlotSelectObj:
                            //util.toggleClass(config.SingleTaxlotSelectObj, 'activeTool', 'inactiveTool', true);
                            //util.toggleImage(config.SingleTaxlotSelectObj, config.SingleTaxlotSelectImage, config.SingleTaxlotSelectImageActive, true);
                            break;
                        case config.MultiTaxlotSelectObj:
                            //util.toggleClass(config.MultiTaxlotSelectObj, 'activeTool', 'inactiveTool', true);
                            //util.toggleImage(config.MultiTaxlotSelectObj, config.MultiTaxlotSelectImage, config.MultiTaxlotSelectImageActive, true);
                            break;
                        case config.ToolbarSearchContainer:
                            break;
                        case config.ToolbarLayersContainer:
                            break;
                        default:
                            break;
                    }
                });
            },

            createMouseEnterEvt: function(config, util, map, obj) {
                //-- ## mouse enter
                On(Dom.byId(obj), Mouse.enter, function() {

                    switch (obj) {
                        case config.FullExtentObj:
                            util.toggleImage(config.FullExtentObj, config.FullExtentImage, config.FullExtentImageHover, false);
                            break;
                        case config.PanObj:
                            util.toggleImage(config.PanObj, config.PanImage, config.PanImageHover, false);
                            break;
                        case config.ZoominObj:
                            util.toggleImage(config.ZoominObj, config.ZoominImage, config.ZoominImageHover, false);
                            break;
                        case config.ZoomoutObj:
                            util.toggleImage(config.ZoomoutObj, config.ZoomoutImage, config.ZoomoutImageHover, false);
                            break;
                        case config.PreviousExtentObj:
                            util.toggleImage(config.PreviousExtentObj, config.PreviousExtentImage, config.PreviousExtentImageHover, false);
                            break;
                        case config.IdentifyObj:
                            if (global.CURRENTMAPTOOL != TOOLBARITEM.IDENTIFY) util.toggleImage(config.IdentifyObj, config.IdentifyImage, config.IdentifyImageActive, false);
                            break;
                        case config.MeasureLineObj:
                            if (global.CURRENTMAPTOOL != TOOLBARITEM.MEASURELINE) util.toggleImage(config.MeasureLineObj, config.MeasureLineImage, config.MeasureLineImageActive, false);
                            break;
                            //                        case config.MeasureAreaObj:                           
                            //                            if (global.CURRENTMAPTOOL != TOOLBARITEM.MEASUREAREA) util.toggleImage(config.MeasureAreaObj, config.MeasureAreaImage, config.MeasureAreaImageActive, false);                           
                            //                            break;                           
                        case config.SingleTaxlotSelectObj:
                            if (global.CURRENTMAPTOOL != TOOLBARITEM.SINGLESELECT) util.toggleImage(config.SingleTaxlotSelectObj, config.SingleTaxlotSelectImage, config.SingleTaxlotSelectImageActive, false);
                            break;
                        case config.MultiTaxlotSelectObj:
                            if (global.CURRENTMAPTOOL != TOOLBARITEM.MULTISELECT) util.toggleImage(config.MultiTaxlotSelectObj, config.MultiTaxlotSelectImage, config.MultiTaxlotSelectImageActive, false);
                            break;
                        case config.ToolbarSearchContainer:
                            if (global.APPFUNCTION != FUNCTIONTOOLS.SEARCH) dojo.style(config.ToolbarSearchContainer, "background-color", "#E6EADF");
                            break;
                        case config.ToolbarLayersContainer:
                            if (global.APPFUNCTION != FUNCTIONTOOLS.LAYERS) dojo.style(config.ToolbarLayersContainer, "background-color", "#E6EADF");
                            break;
                        default:
                            break;
                    }
                });
            },

            createMouseLeaveEvt: function(config, util, map, obj) {
                //-- ## mouse leave
                On(Dom.byId(obj), Mouse.leave, function() {
                    switch (obj) {
                        case config.FullExtentObj:
                            util.toggleImage(config.FullExtentObj, config.FullExtentImage, config.FullExtentImageHover, true);
                            break;
                        case config.PanObj:
                            if (global.CURRENTMAPTOOL != TOOLBARITEM.PAN) util.toggleImage(config.PanObj, config.PanImage, config.PanImageHover, true);
                            break;
                        case config.ZoominObj:
                            if (global.CURRENTMAPTOOL != TOOLBARITEM.ZOOMIN) util.toggleImage(config.ZoominObj, config.ZoominImage, config.ZoominImageHover, true);
                            break;
                        case config.ZoomoutObj:
                            if (global.CURRENTMAPTOOL != TOOLBARITEM.ZOOMOUT) util.toggleImage(config.ZoomoutObj, config.ZoomoutImage, config.ZoomoutImageHover, true);
                            break;
                        case config.PreviousExtentObj:
                            util.toggleImage(config.PreviousExtentObj, config.PreviousExtentImage, config.PreviousExtentImageHover, true);
                            break;
                        case config.IdentifyObj:
                            if (global.CURRENTMAPTOOL != TOOLBARITEM.IDENTIFY) util.toggleImage(config.IdentifyObj, config.IdentifyImage, config.IdentifyImageActive, true);
                            break;
                        case config.MeasureLineObj:
                            if (global.CURRENTMAPTOOL != TOOLBARITEM.MEASURELINE) util.toggleImage(config.MeasureLineObj, config.MeasureLineImage, config.MeasureLineImageActive, true);
                            break;
                            //                        case config.MeasureAreaObj:                           
                            //                            if (global.CURRENTMAPTOOL != TOOLBARITEM.MEASUREAREA) util.toggleImage(config.MeasureAreaObj, config.MeasureAreaImage, config.MeasureAreaImageActive, true);                           
                            //                            break;                           
                        case config.SingleTaxlotSelectObj:
                            if (global.CURRENTMAPTOOL != TOOLBARITEM.SINGLESELECT) util.toggleImage(config.SingleTaxlotSelectObj, config.SingleTaxlotSelectImage, config.SingleTaxlotSelectImageActive, true);
                            break;
                        case config.MultiTaxlotSelectObj:
                            if (global.CURRENTMAPTOOL != TOOLBARITEM.MULTISELECT) util.toggleImage(config.MultiTaxlotSelectObj, config.MultiTaxlotSelectImage, config.MultiTaxlotSelectImageActive, true);

                            break;
                        case config.ToolbarSearchContainer:
                            if (global.APPFUNCTION != FUNCTIONTOOLS.SEARCH) dojo.style(config.ToolbarSearchContainer, "background-color", "#BDC8AD");
                            break;
                        case config.ToolbarLayersContainer:
                            if (global.APPFUNCTION != FUNCTIONTOOLS.LAYERS) dojo.style(config.ToolbarLayersContainer, "background-color", "#BDC8AD");
                            break;
                        default:
                            break;
                    }
                });
            },

            //            toggleResults: function (config, util) {
            //                var w = util.returnResultPanelWidth();
            //                var toggleButton = Dom.byId(config.ResultsToggleButton);
            //                var panel = Dom.byId(config.ResultPanel);

            //                if (w <= 30) {
            //                    util.togglePanelWidth(300, PANELTOGGLE.EXPAND, config.ResultPanel, config.ResultsContainer);
            //                    toggleButton.setAttribute("src", "images/" + config.ResultsToggleButtonClose);
            //                }
            //                else {
            //                    util.togglePanelWidth(300, PANELTOGGLE.RETRACT, config.ResultPanel, config.ResultsContainer);
            //                    toggleButton.setAttribute("src", "images/" + config.ResultsToggleButtonOpen);
            //                }
            //            },

            toggleLayers: function(config, util) {

                var height = util.returnLayerPanelHeight(); // dojo.style(panelObj.domNode, "height");

                if (height >= 10) {
                    setTimeout(function() {
                        dojo.style(config.TOCContainer, "display", "none");
                    }, 550);

                    util.togglePanelHeight(config.TOCContainer, 440, 0, 500);
                    dojo.style(config.ToolbarLayersContainer, "background-color", "#BDC8AD");
                    global.APPFUNCTION = null;
                } else {
                    dojo.style(config.TOCContainer, "display", "block");
                    util.togglePanelHeight(config.TOCContainer, 0, 440, 500);
                }
            },

            toggleMeasure: function(config, util) {

                var height = util.returnMeasurePanelHeight(); // dojo.style(panelObj.domNode, "height");
                if (height >= 10) {
                    setTimeout(function() {
                        dojo.style(config.MeasureContainer, "display", "none");
                    }, 550);

                    util.togglePanelHeight(config.MeasureContainer, 160, 0, 500);
                    //dojo.style(config.ToolbarLayersContainer, "background-color", "#BDC8AD");

                    global.APPFUNCTION = null;
                } else {
                    dojo.style(config.MeasureContainer, "display", "block");
                    util.togglePanelHeight(config.MeasureContainer, 0, 160, 500);
                }
            },

            cleanUpTools: function(config, util, _this) {

                if (global.MEASURETOOL) {

                    global.MEASURETOOL.setTool("area", false);
                    global.MEASURETOOL.setTool("distance", false);
                    global.MEASURETOOL.setTool("location", false);

                    global.MEASURETOOL.hide();
                    global.MEASURETOOL.clearResult();
                    //global.MEASURETOOL = null;
                    global.CURRENTMAPTOOL = null;

                    var height = util.returnMeasurePanelHeight();
                    if (height >= 10) _this.toggleMeasure(config, util);
                }

                if (global.CURRENTMAPTOOL != TOOLBARITEM.IDENTIFY) {
                    if (global.MAP.infoWindow && global.MAP.infoWindow.isShowing) global.MAP.infoWindow.hide();
                }

                if (global.CURRENTMAPTOOL == TOOLBARITEM.IDENTIFY) {
                    //console.log("Clean the identify");
                    this.clearGraphics(util);
                }

                if ((global.CURRENTMAPTOOL == TOOLBARITEM.SINGLESELECT) || (global.CURRENTMAPTOOL == TOOLBARITEM.MULTISELECT)) {
                    try {
                        //this.clearGraphics(util);
                    } catch (err) { var x = 0; }
                }
                //if (global.TAXLOTLAYER) global.TAXLOTLAYER.clearSelection();
            },

            clearGraphics: function(util) {

                var resultsWidth = util.returnResultPanelWidth();
                util.clearResults();

                if (global.TAXLOTLAYER) global.TAXLOTLAYER.clear();
                global.MAP.graphics.clear();
                
                if (resultsWidth > 50)
                    util.toggleResults(config, 'CLOSE');

                //On(Dom.byId(config.ClearGraphicsObj), "mousedown", function () {
                util.toggleImage(config.ClearGraphicsObj, config.ClearGraphicsImage, config.ClearGraphicsImageHover, false);
                //});
                    
                //On(Dom.byId(config.ClearGraphicsObj), "mouseup", function () {
                util.toggleImage(config.ClearGraphicsObj, config.ClearGraphicsImage, config.ClearGraphicsImageHover, true);
                //});
                    
                if (global.MAP.infoWindow && global.MAP.infoWindow.isShowing) global.MAP.infoWindow.hide();
            }
        });
    });
