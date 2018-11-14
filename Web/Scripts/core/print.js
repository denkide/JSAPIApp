define([
  "dojo/_base/declare", "dojo/_base/lang", "dojo/dom", "dijit/Dialog", "widgets/print/printWidget"
], function(
  declare, lang, Dom, Dialog, PrintWidget
) {
    return declare(null, {

        doPrint: function() {
            var printPlace = Dom.byId("PrintContainer");
          
            // instantiate the widget
            var print = new PrintWidget({
                title: "Print a map",
            }, "PrintMap").placeAt(printPlace);
          
            if (global.PRINTDIALOG) global.PRINTDIALOG.destroy();

            global.PRINTDIALOG = new Dialog({
                content: print,
                title: "     Print",
                style: "width: 500px; height: 250px; background-color: white;border: solid .1em black; border-radius: 1em;"
            });

            // call the startup function for the widget
            print.doPrint();
            global.PRINTDIALOG.show();

        }

    });
});
