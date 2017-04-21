define([
    "dojo/parser",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "esri/dijit/Measurement",
    "dojo/dom",
    "Scripts/appConfig",
    "esri/tasks/GeometryService",
    "dojo/on"],
    function (
        parser,
        declare,
        lang,
        Measurement,
        Dom,
        Config,
        GeometryService,
        On) {
        return declare(null, {

            doMeasure: function (action) {

                if (!global.MEASURETOOL) {
                    esriConfig.defaults.geometryService = new GeometryService(config.GeometryService);

                    var measure = new Measurement({
                        map: global.MAP
                    }, Dom.byId("measureDiv"));
                    measure.startup();

                    global.MEASURETOOL = measure;
                }
                else {
                    global.MEASURETOOL.clearResult();
                    global.MEASURETOOL.show();
                }
            }
        });
    });

















