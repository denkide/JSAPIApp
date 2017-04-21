require({ async: false, parseOnLoad: true }, [
        "dojo/parser",
        "dojo/on",
        "dojo/dom",
        "dojo/ready",
        "Scripts/core/toolbar",
        "Scripts/appConfig",
        "Scripts/core/map",
        "esri/config",
        "dijit/Dialog"
    ],
    function(
        parser,
        On,
        Dom,
        Ready,
        Toolbar,
        Cfg,
        MapClass,
        ESRIConfig) {
        Ready(function() {

            //-- ## Load the cfg file, all things flow from there
            // --------------------------------------------------
            var config = new Cfg();

            //-- ## set the global stuff
            // ---------------------------------------- 
            global.MAP = null;
            global.LEGENDIMAGES = null;
            global.CURRENTMAPTOOL = TOOLBARITEM.PAN;
            global.APPFUNCTION = null;
            global.TAXLOTLAYER = null;
            global.HIGHLIGHTLAYER = null;
            window.MEASUREPANE = null;

            //-- ## initialize the map, load map into global object
            // ------------------------------------------------------
            var viewerMap = new MapClass();
            try {
                viewerMap.initMap(config);
            } catch (err) {
                console.log("Map Load Err: " + err.message);
            }

            //-- ## make sure that the browser resize event is loaded 
            // ---------------------------------------------------------
            var win = On(window, 'resize', function(e) {
                dojo.publish("browserResized", [{
                    "window": this,
                    "map": global.map
                }]);
            });

            //-- ## listen for the map to resize
            // --------------------------------------------
            var winResize = dojo.subscribe("browserResized", function(message) {
                try {
                    global.MAP.resize();
                } catch (e) {
                    console.log("map resize unsuccessful:: " + e.message);
                }
            });

            //-- ## put the application titles into AppTitles
            // ----------------------------------------
            Dom.byId("AppTitle1").innerHTML = config.AppTitle1;
            Dom.byId("AppTitle2").innerHTML = config.AppTitle2;

            //-- ## Setup the toolbar 
            // ----------------------------------------------------------
            var toolbar = new Toolbar(config);
            toolbar.registerToolbarEvt(config, viewerMap);

            //-- ## set the default tool
            setTimeout(function() {
                toolbar.setDefaultTool(viewerMap, config);
            }, 1000);

        }); // end "Ready(function() {"
    }); // end "require"