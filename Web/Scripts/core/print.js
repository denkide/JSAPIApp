define([
  "dojo/_base/declare", "dojo/_base/lang", "dojo/dom", "dijit/Dialog", "widgets/print/printWidget"
], function(
  declare, lang, Dom, Dialog, PrintWidget
) {
    return declare(null, {

        doPrint: function() {

            //console.log("In the print");
            
            var printPlace = Dom.byId("PrintContainer");

            //console.log("Search 1");

            // instantiate the widget
            var print = new PrintWidget({
                title: "Print a map",
            }, "PrintMap").placeAt(printPlace);

            //console.log("Search 2");


            if (global.PRINTDIALOG) global.PRINTDIALOG.destroy();

            //console.log("Search 3");


            global.PRINTDIALOG = new Dialog({
                content: print,
                title: "     Print",
                style: "width: 500px; height: 250px; background-color: white;border: solid .1em black; border-radius: 1em;"
            });

            // call the startup function for the widget

            //console.log("before startup");
            print.doPrint();            global.PRINTDIALOG.show();
        }

    });
});