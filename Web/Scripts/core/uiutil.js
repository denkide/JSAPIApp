define([
        "dojo/_base/declare",
        "dojo/dom-style",
        "dojo/dom",
        "dojo/on",
        "dijit/registry",
        "dojo/dom-class",
        "dojo/json",
        "dojo/fx/easing",
        "dojox/fx",
        "dojo/dom-construct",
        "Scripts/appConfig"
    ],
    function(
        declare,
        DomStyle,
        Dom,
        On,
        Registry,
        DomClass,
        JSON,
        Easing,
        Fx,
        domConstruct,
        Cfg) {
        return declare(null, {

            constructor: function() {},

            toggleClass: function(element, activeClass, inActiveClass, off) {
                if (off) {
                    DomClass.remove(element, activeClass);
                    DomClass.add(element, inActiveClass);
                } else {
                    DomClass.remove(element, inActiveClass);
                    DomClass.add(element, activeClass);
                }
            },

            toggleImage: function(element, inactiveImg, activeImg, off) {
                var config = new Cfg();

                if (off) {
                    Dom.byId(element).setAttribute("src", config.ToolbarImagePath + inactiveImg);
                } else {
                    Dom.byId(element).setAttribute("src", config.ToolbarImagePath + activeImg);
                }
            },

            togglePanelHeight: function(obj, startHeight, endHeight, animDuration) {

                console.log("Start animate vertical");
                //                Fx.wipeTo({
                //                    node: obj,
                //                    duration: animDuration,
                //                    height: endHeight
                //                }).play();

                dojo.animateProperty({
                    node: obj,
                    properties: {
                        height: {
                            start: startHeight, //-100,
                            end: endHeight, //190,
                            unit: "px"
                        }
                    },
                    easing: Easing['linear'],
                    duration: animDuration
                }).play();

                //console.log("done with animate vertical");
            },

            togglePanelWidth: function(width, direction, resultsPanel, resultsContainer) {

                if (direction == PANELTOGGLE.EXPAND) {

                    dojo.animateProperty({
                        node: resultsPanel,
                        properties: {
                            width: {
                                start: 39, //-100,
                                end: 400, //190,
                                unit: "px"
                            }
                        },
                        easing: Easing['linear'],
                        duration: 200
                    }).play();

                    dojo.style(resultsContainer, "display", "block");
                } else {
                    var endWidth = 0;
                    var iCnt = 0;
                    try {
                        dojo.query(".resultsTable").forEach(iCnt++);
                    } catch (err) {
                        iCnt = 0;
                    }

                    if (iCnt > 0)
                        endWidth = 23;
                    else
                        endWidth = 30;

                    dojo.animateProperty({
                        node: resultsPanel,
                        properties: {
                            width: {
                                start: 400, //-100,
                                end: endWidth, //190,
                                unit: "px"
                            }
                        },
                        easing: Easing['linear'],
                        duration: 200
                    }).play();
                    dojo.style(resultsContainer, "display", "none");
                }
            },

            clearResults: function() {

                //console.log("UIUtil::: Clear Results 1");

                var config = new Cfg();
                dojo.query(".resultsTable").forEach(dojo.destroy);
                dojo.byId(config.ResultsContainer).innerHTML = "No Results<br />";

                global.MAP.graphics.clear();

                //console.log("Clear Results 2");
            },

            manageToolUI: function(config, labelObj) {

                var PanContainer = Dom.byId(config.PanContainer);
                var ZoominContainer = Dom.byId(config.ZoominContainer);
                var ZoomoutContainer = Dom.byId(config.ZoomoutContainer);

                switch (global.CURRENTMAPTOOL) {
                    case TOOLBARITEM.PAN:
                        //console.log("PAN");

                        Dom.byId(config.PanObj).setAttribute("src", config.ToolbarImagePath + config.PanImageActive);
                        Dom.byId(config.ZoominObj).setAttribute("src", config.ToolbarImagePath + config.ZoominImage);
                        Dom.byId(config.ZoomoutObj).setAttribute("src", config.ToolbarImagePath + config.ZoomoutImage);
                        Dom.byId(config.IdentifyObj).setAttribute("src", config.ToolbarImagePath + config.IdentifyImage);
                        Dom.byId(config.MeasureLineObj).setAttribute("src", config.ToolbarImagePath + config.MeasureLineImage);
                        Dom.byId(config.MultiTaxlotSelectObj).setAttribute("src", config.ToolbarImagePath + config.MultiTaxlotSelectImage);
                        Dom.byId(config.SingleTaxlotSelectObj).setAttribute("src", config.ToolbarImagePath + config.SingleTaxlotSelectImage);
                        global.DRAWTOOLBAR.deactivate();

                        break;
                    case TOOLBARITEM.ZOOMIN:
                        //console.log("ZOOMIN");

                        Dom.byId(config.PanObj).setAttribute("src", config.ToolbarImagePath + config.PanImage);
                        Dom.byId(config.ZoominObj).setAttribute("src", config.ToolbarImagePath + config.ZoominImageActive);
                        Dom.byId(config.ZoomoutObj).setAttribute("src", config.ToolbarImagePath + config.ZoomoutImage);
                        Dom.byId(config.IdentifyObj).setAttribute("src", config.ToolbarImagePath + config.IdentifyImage);
                        Dom.byId(config.MeasureLineObj).setAttribute("src", config.ToolbarImagePath + config.MeasureLineImage);
                        Dom.byId(config.MultiTaxlotSelectObj).setAttribute("src", config.ToolbarImagePath + config.MultiTaxlotSelectImage);
                        Dom.byId(config.SingleTaxlotSelectObj).setAttribute("src", config.ToolbarImagePath + config.SingleTaxlotSelectImage);
                        global.DRAWTOOLBAR.deactivate();

                        break;
                    case TOOLBARITEM.ZOOMOUT:
                        //console.log("ZOOMOUT");

                        Dom.byId(config.PanObj).setAttribute("src", config.ToolbarImagePath + config.PanImage);
                        Dom.byId(config.ZoominObj).setAttribute("src", config.ToolbarImagePath + config.ZoominImage);
                        Dom.byId(config.ZoomoutObj).setAttribute("src", config.ToolbarImagePath + config.ZoomoutImageActive);
                        Dom.byId(config.IdentifyObj).setAttribute("src", config.ToolbarImagePath + config.IdentifyImage);
                        Dom.byId(config.MeasureLineObj).setAttribute("src", config.ToolbarImagePath + config.MeasureLineImage);
                        Dom.byId(config.MultiTaxlotSelectObj).setAttribute("src", config.ToolbarImagePath + config.MultiTaxlotSelectImage);
                        Dom.byId(config.SingleTaxlotSelectObj).setAttribute("src", config.ToolbarImagePath + config.SingleTaxlotSelectImage);
                        global.DRAWTOOLBAR.deactivate();

                        break;
                    case TOOLBARITEM.IDENTIFY:
                        //console.log("IDENTIFY");

                        Dom.byId(config.PanObj).setAttribute("src", config.ToolbarImagePath + config.PanImage);
                        Dom.byId(config.ZoominObj).setAttribute("src", config.ToolbarImagePath + config.ZoominImage);
                        Dom.byId(config.ZoomoutObj).setAttribute("src", config.ToolbarImagePath + config.ZoomoutImage);
                        Dom.byId(config.IdentifyObj).setAttribute("src", config.ToolbarImagePath + config.IdentifyImageActive);
                        Dom.byId(config.MeasureLineObj).setAttribute("src", config.ToolbarImagePath + config.MeasureLineImage);
                        Dom.byId(config.MultiTaxlotSelectObj).setAttribute("src", config.ToolbarImagePath + config.MultiTaxlotSelectImage);
                        Dom.byId(config.SingleTaxlotSelectObj).setAttribute("src", config.ToolbarImagePath + config.SingleTaxlotSelectImage);
                        global.DRAWTOOLBAR.deactivate();

                        //alert("To do");
                        break;
                    case TOOLBARITEM.MEASURELINE:
                        Dom.byId(config.PanObj).setAttribute("src", config.ToolbarImagePath + config.PanImage);
                        Dom.byId(config.ZoominObj).setAttribute("src", config.ToolbarImagePath + config.ZoominImage);
                        Dom.byId(config.ZoomoutObj).setAttribute("src", config.ToolbarImagePath + config.ZoomoutImage);
                        Dom.byId(config.IdentifyObj).setAttribute("src", config.ToolbarImagePath + config.IdentifyImage);
                        Dom.byId(config.MeasureLineObj).setAttribute("src", config.ToolbarImagePath + config.MeasureLineImageActive);
                        Dom.byId(config.MultiTaxlotSelectObj).setAttribute("src", config.ToolbarImagePath + config.MultiTaxlotSelectImage);
                        Dom.byId(config.SingleTaxlotSelectObj).setAttribute("src", config.ToolbarImagePath + config.SingleTaxlotSelectImage);
                        global.DRAWTOOLBAR.deactivate();
                        break;

                    case TOOLBARITEM.SINGLESELECT:
                        Dom.byId(config.PanObj).setAttribute("src", config.ToolbarImagePath + config.PanImage);
                        Dom.byId(config.ZoominObj).setAttribute("src", config.ToolbarImagePath + config.ZoominImage);
                        Dom.byId(config.ZoomoutObj).setAttribute("src", config.ToolbarImagePath + config.ZoomoutImage);
                        Dom.byId(config.IdentifyObj).setAttribute("src", config.ToolbarImagePath + config.IdentifyImage);
                        Dom.byId(config.MeasureLineObj).setAttribute("src", config.ToolbarImagePath + config.MeasureLineImage);
                        Dom.byId(config.MultiTaxlotSelectObj).setAttribute("src", config.ToolbarImagePath + config.MultiTaxlotSelectImage);
                        Dom.byId(config.SingleTaxlotSelectObj).setAttribute("src", config.ToolbarImagePath + config.SingleTaxlotSelectImageActive);

                        break;
                    case TOOLBARITEM.MULTISELECT:
                        Dom.byId(config.PanObj).setAttribute("src", config.ToolbarImagePath + config.PanImage);
                        Dom.byId(config.ZoominObj).setAttribute("src", config.ToolbarImagePath + config.ZoominImage);
                        Dom.byId(config.ZoomoutObj).setAttribute("src", config.ToolbarImagePath + config.ZoomoutImage);
                        Dom.byId(config.IdentifyObj).setAttribute("src", config.ToolbarImagePath + config.IdentifyImage);
                        Dom.byId(config.MeasureLineObj).setAttribute("src", config.ToolbarImagePath + config.MeasureLineImage);
                        Dom.byId(config.MultiTaxlotSelectObj).setAttribute("src", config.ToolbarImagePath + config.MultiTaxlotSelectImageActive);
                        Dom.byId(config.SingleTaxlotSelectObj).setAttribute("src", config.ToolbarImagePath + config.SingleTaxlotSelectImage);

                        //console.log("Doing the multiselect:: manageUI");

                        break;
                    default:
                        this.toggleClass(SingleSelectionContainer, 'activeTool', 'inactiveToolSub', true);
                        this.toggleClass(MultipleSelectionContainer, 'activeTool', 'inactiveToolSub', true);
                        global.DRAWTOOLBAR.deactivate();
                        //this.toggleClass(tdBuffer, 'activeTool', 'inactiveToolSub', true);

                        //obj.setAttribute("src", config.ToolbarImagePath + config.PanImageActive);
                }
            },

            returnLayerPanelHeight: function() {
                var config = new Cfg();
                return document.getElementById(config.TOCContainer).clientHeight;
            },

            returnMeasurePanelHeight: function() {
                var config = new Cfg();
                return document.getElementById(config.MeasureContainer).clientHeight;
            },

            returnResultPanelWidth: function() {
                var config = new Cfg();
                return dojo.style(config.ResultPanel, "width");
            },

            toggleResults: function(config, action) {
                //console.log("Toggle results 1");

                var w = this.returnResultPanelWidth();
                var toggleButton = Dom.byId(config.ResultsToggleButton);
                var panel = Dom.byId(config.ResultPanel);

                //console.log("Toggle results 2");

                if (action == 'OPEN') {
                    //console.log("Toggle results 3");

                    this.togglePanelWidth(300, PANELTOGGLE.EXPAND, config.ResultPanel, config.ResultsContainer);
                    toggleButton.setAttribute("src", "images/" + config.ResultsToggleButtonClose);
                    dojo.style("ResultsContainer", "display", "block");
                    dojo.style("DetailsContainer", "display", "none");

                    //console.log("Toggle results 3 - 2");
                } else {
                    //console.log("Toggle results 4");

                    this.togglePanelWidth(300, PANELTOGGLE.RETRACT, config.ResultPanel, config.ResultsContainer);
                    toggleButton.setAttribute("src", "images/" + config.ResultsToggleButtonOpen);
                    dojo.style("ResultsContainer", "display", "none");
                    dojo.style("DetailsContainer", "display", "none");
                }
            }
        });

    });