define([
    "dojo/parser",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/Color",
    "dojo/dom-style",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/dom",
    "dojo/on",
    "dojo/json",
    "dojo/query",
    "dijit/Dialog",
    "dijit/registry",
    "Scripts/appConfig",
    "widgets/search/searchWidget"],
    function (
        parser,
        declare,
        lang,
        Color,
        DomStyle,
        DomClass,
        domConstruct,
        Dom,
        On,
        JSON,
        Query,
        Dialog,
        registry,
        Cfg,
        SearchWidget) {
        return declare(null, {

            constructor: function () {
            }, 

            showSearch: function () {

                // this is where the widget will be loaded into using the "placeAt" functio
                var searchPlace = Dom.byId("ToolbarSearchContainer");

                // instantiate the widget
                var search = new SearchWidget({
                   title: "Search Widget",
                }, "AddressSearch").placeAt(searchPlace);

                if (global.SEARCHDIALOG) global.SEARCHDIALOG.destroy();

                global.SEARCHDIALOG = new Dialog({
                    content: search,
                    title: "     Search",
                    style: "width: 500px; height: 550px; background-color: white;border: solid .1em black; border-radius: 1em;"
                });

                // call the startup function for the widget
                search.startup();
                global.SEARCHDIALOG.show();
                global.SEARCHDIALOG.connect(global.SEARCHDIALOG, "hide", function (e) {
                    global.APPFUNCTION = null;
                    dojo.style("ToolbarSearchContainer", "background-color", "#BDC8AD");
                });
            }
        });
    });