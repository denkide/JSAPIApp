//-- ## GLOBAL Stuff is in this file.
// -----------------------------------------------------------

dojo.require("dojo/json");
dojo.require("dijit/Dialog");

var global = this;
// values used are:
// MAP
// LEGENDIMAGES
// CURRENTMAPTOOL
// APPFUNCTION
// DRAWTOOLBAR
// TAXLOTLAYER
// MEASURETOOL
// DETAILS
// SEARCHDIALOG
// PREVIOUSEXTENT
// CURRENTEXTENT

var TOOLBARITEM = {
    PAN: "pan",
    ZOOMIN: "zoomin",
    ZOOMOUT: "zoomout",
    SINGLESELECT: "singleselect",
    MULTISELECT: "multiselect",
    IDENTIFY: "identify",
    MEASURELINE: "measureline",
    MEASUREAREA: "measurearea"
        //BUFFER: "buffer",
};

var PANELTOGGLE = {
    EXPAND: "expand",
    RETRACT: "retract"
};


var FUNCTIONTOOLS = {
    SEARCH: "search",
    LAYERS: "layers"
};

//var toolAction = {
//    ACTIVE: "active",
//    INACTIVE: "inactive"
//};

var SERVICETYPE = {
    DYNAMIC: "dynamic",
    CACHED: "cached"
};

//String.prototype.capitalize = function () {
//    return this.charAt(0).toUpperCase() + this.slice(1);
//};

function arrayContains(a, i) {
    for (var p = 0; p < a.length; p++) {
        if (a[p] == i) return true;
    }
    return false;
}

function convertJSONToObj(data) {

    var results = JSON.stringify(data).replace('{', '').replace('[', '');
    var arrResults = results.split('","');

    var obj = [];

    for (var i = 0; i < arrResults.length; i++) {
        var tmp = arrResults[i].split(":");
        //console.log("tmp: " + tmp[0] + " --- " + tmp[1]);

        obj.push({
            name: tmp[0].replace('"', ''),
            value: tmp[1].replace('"', '')
        });
    }
    return obj;

}

function updateLoadMessage(txt) {
    var messageContainer = dojo.byId("loadingUpdate");
    messageContainer.innerHTML = txt;
}