define([
        "dojo/Evented",
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dojo/_base/lang",
        "dojo/on",
        "esri/map",
        "esri/layers/FeatureLayer",
        //"esri/dijit/Print",
        "esri/tasks/PrintTemplate",
        "esri/tasks/PrintTask",
        "esri/tasks/PrintParameters",
        "esri/request",
        "esri/config",
        "Scripts/appConfig",
        "dojo/_base/array",
        "dojo/dom",
        "dojo/text!./printWidget.htm"
    ],
    function(
        Evented, declare, _WidgetBase, _TemplatedMixin, lang, on, Map, FeatureLayer, PrintTemplate, PrintTask, PrintParameters, esriRequest,
        esriConfig, Config, arrayUtils, dom, MyTemplate
    ) {
        var Widget = declare("PrintWidget", [_WidgetBase, _TemplatedMixin, Evented], {

            // template HTML
            templateString: MyTemplate,
            selectionSymbol: null,
            printUrl: null,

            constructor: function() {
                // add here anything that will be executed in the widget initialization.

            },

            doPrint: function() {
                var config = new Config();
                this.printUrl = config.PrintService;

                // Proxy Definition Begin
                //identify proxy page to use if the toJson payload to the geometry service is greater than 2000 characters.
                //If this null or not available the project and lengths operation will not work.
                // Otherwise it will do a http post to the proxy.
                //esriConfig.defaults.io.proxyUrl = "proxy.ashx";
                esriConfig.defaults.io.alwaysUseProxy = false;


            },

            postCreate: function() {
                dojo.connect(this.btnPrintReady, 'click', this, function() {
                    this.handlePrint();
                });
            },

            handlePrint: function() {

                this.btnPrintReady.innerHTML = "Printing..."
                this.btnPrintReady.disabled = true;
                var printObj = this.createPrintTask("Map Print"); //this.createPrintTask(this.PrintTitle.value);
                var printTask = printObj.printTask;
                printTask.execute(printObj.params, function(evt) {

                    this.btnPrintReady.style.display = 'none';
                    this.printResult.href = evt.url;
                    this.printResult.style.display = 'block';
                    on(this.printResult, "click", dojo.hitch(this, function() {
                        this.btnPrintReady.innerHTML = "Print";
                        this.btnPrintReady.style.display = 'block';
                        this.btnPrintReady.disabled = false;
                        this.printResult.style.display = 'none';
                    }));

                }, function(evt) {
                    this.btnPrintReady.disabled = false;
                    this.btnPrintReady.innerHTML = "Print";
                });
            },

            createPrintTask: function(printTitle) {

                var template = new PrintTemplate();
                template.layout = this.printLayoutId.value; //"A3 Landscape";
                template.label = "Map Title"; //this.PrintTitle.value;         //"Landscape (PDF)";
                template.format = this.printFormatId.value; //"png32";
                template.layoutOptions = {
                    legendLayers: [], // empty array means no legend
                    scalebarUnit: "Miles",
                    titleText: printTitle
                };

                var params = new PrintParameters();
                params.map = global.MAP;
                params.template = template;

                var printTask = new PrintTask(this.printUrl);
                var printObj = {
                    printTask: printTask,
                    params: params
                }
                return printObj;
            },

            handleError: function(err) {
                //console.log("Something broke: ", err);
            }
        });
        return Widget;
    });