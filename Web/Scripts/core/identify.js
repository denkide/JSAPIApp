define([
        "dojo/_base/declare",
        "dojo/dom-style",
        "dojo/dom",
        "dojo/on",
        "dojo/json",
        "Scripts/appConfig",
        "esri/tasks/IdentifyTask",
        "esri/tasks/IdentifyParameters",
        "esri/dijit/Popup"
    ],
    function(
        declare,
        DomStyle,
        Dom,
        On,
        JSON,
        Cfg,
        IdentifyTask, IdentifyParameters) {
        return declare(null, {

            //identifyParams: 'undefined',
            //identifyTask: 'undefined',

            constructor: function() {

            },

            doIdentify: function(evt) {

                var config = new Cfg();
                //setup the popup window 
                var popup = new esri.dijit.Popup({
                    fillSymbol: new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]))
                }, dojo.create("div"));

                //create identify tasks and setup parameters 
                //this.identifyTask = new IdentifyTask("http://www.currymap.org/arcgis/rest/services/Boundaries_and_Districts/MapServer");
                this.identifyTask = new IdentifyTask(config.IdentifyService);

                this.identifyParams = new IdentifyParameters();
                this.identifyParams.tolerance = 5;
                this.identifyParams.returnGeometry = true;
                this.identifyParams.layerIds = config.IdentifyLayers; //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
                this.identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
                this.identifyParams.width = global.MAP.width;
                this.identifyParams.height = global.MAP.height;

                this.identifyParams.geometry = evt.mapPoint;
                this.identifyParams.mapExtent = global.MAP.extent;

                var deferred = this.identifyTask.execute(this.identifyParams);

                deferred.addCallback(function(response) {

                    //-- ## response is an array of identify result objects    
                    //-- ## Let's return an array of features.
                    return dojo.map(response, function(result) {

                        var feature = result.feature;
                        feature.attributes.layerName = result.layerName;

                        var sInfo = "<h3><u>" + result.layerName + "</u></h3><br><table>";
                        for (var attr in feature.attributes) {
                            sInfo += "<tr><td>" + attr + "</td><td>" + feature.attributes[attr] + "<td></tr>";
                        }
                        sInfo += "</table>";

                        var template = new esri.InfoTemplate("", sInfo);
                        feature.setInfoTemplate(template);

                        global.MAP.infoWindow.resize(400, 300);
                        return feature;
                    });
                });

                //-- ## InfoWindow expects an array of features from each deferred
                //-- ## object that you pass. If the response from the task execution 
                //-- ## above is not an array of features, then you need to add a callback
                //-- ## like the one above to post-process the response and return an
                //-- ## array of features.
                global.MAP.infoWindow.setFeatures([deferred]);
                global.MAP.infoWindow.show(evt.mapPoint);
            }
        });
    });