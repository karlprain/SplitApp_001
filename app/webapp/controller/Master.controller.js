sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/mvc/Controller"
], function (UIComponent, Controller) {
    "use strict";

    return Controller.extend("com.myorg.myapp.controller.Master", {
        onInit: function () {
            // Initialization code
        },

        onNavToDetail: function (event) {
            const listItem = event.getSource();
            const oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("Detail", {
                itemPath: window.encodeURIComponent(listItem.getBindingContext().getPath().substr(1))
            });
        }
    });
});
