
define([
        "dojo/_base/lang",
        "dojo/_base/declare",
        "dojo/on",
        "dojo/dom",
        "dojo/json",
        "esri/layers/LayerInfo",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "agsjs/dijit/TOC",
        "Scripts/appConfig",
        "Scripts/core/spatialSubs",
        "dojo/_base/sniff",
        "dojo/fx"
    ],
    function (
        lang,
        declare,
        On,
        Dom,
        JSON,
        LayerInfo,
        DynLayer,
        TOC,
        Config,
        SpatSubs) {
        return declare(null, {

            returnVisibleLayers: function (id) {
                var config = new Config();
                var viz = [];
                for (var i = 0; i < config.VisibleDynLayers.length; i++) {

                    if (config.VisibleDynLayers[i].id == id) return config.VisibleDynLayers[i].layers;
                }
                return null;
            },

            loadLegendDigit: function () {

                // https://geonet.esri.com/thread/77999

                var subs = new SpatSubs();
                var config = new Config();
                var layers = [];

                for (var j = 0, jl = global.MAP.layerIds.length; j < jl; j++) {
                    updateLoadMessage('Building TOC');
                    var currentLayer = global.MAP.getLayer(global.MAP.layerIds[j]);
                    
                    if (subs.layerArrayContainsID(config.DynamicServices, currentLayer.id)) {
                        var obj = {
                            layer: currentLayer,
                            title: currentLayer.id
                        };
                        layers.push(obj);
                    }
                }   

                try {
                    if (global.toc) global.toc.destoy();

                    global.toc = new TOC({
                        map: global.MAP,
                        layerInfos: layers
                    }, 'tocDiv');
                    global.toc.startup();

                    On(global.toc, 'load', function (evt) {
                        updateLoadMessage('TOC complete');
                        loadingOverlay.hide();
                    });
                }
                catch (err) {
                    console.log("Errors encountered while loading legend ::: " + err.message);
                }
            }
        });
    });