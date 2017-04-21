define([
        "dojo/parser",
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/Color",
        "dojo/dom-style",
        "dojo/dom-class",
        "dojo/dom",
        "dojo/on",
        "dojo/json",
        "dojo/query",
        "dijit/registry",
        "Scripts/appConfig",
        "widgets/details/detailsWidget"
    ],
    function(
        parser,
        declare,
        lang,
        Color,
        DomStyle,
        DomClass,
        Dom,
        On,
        JSON,
        Query,
        registry,
        Cfg,
        DetailsWidget) {
        return declare(null, {

            constructor: function() {},

            showDetails: function(acct) {
                var config = new Cfg();
                try {
                    var details = new DetailsWidget({
                        title: "Selection Details",
                    }, "DetailsView");

                    details.startup();
                } catch (ex) {
                    //console.log("Hey, that widget is already registered ... lets just forget this happened.");
                }

                if (!details) {
                    var details = registry.byId("DetailsView");
                }

                details.accountNum = acct;
                details.updateDetails(acct);
                dojo.style(config.ResultsContainer, "display", "none");
                dojo.style(config.DetailsContainer, "display", "block");
            }
        });
    });