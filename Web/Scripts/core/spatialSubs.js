define([
        "dojo/_base/lang",
        "dojo/_base/declare",
        "dojo/_base/Color",
        "dojo/on",
        "dojo/dom",
        "dojo/json"],
    function (
        lang,
        declare,
        Color,
        On,
        Dom,
        JSON) {
        return declare(null, {

            layerArrayContainsID: function (a, i) {
                for (var p = 0; p < a.length; p++) {
                    if (a[p].id == i) return true;
                }
                return false;
            }
        });
    });
