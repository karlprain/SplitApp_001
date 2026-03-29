sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/ui/core/mvc/Controller"
], function (UIComponent, History, Controller) {
    "use strict";

    return Controller.extend("com.myorg.myapp.controller.Detail", {
        onInit: function () {
            const router = UIComponent.getRouterFor(this);
            router.getRoute("Detail").attachPatternMatched(this.onRouteMatched, this);
        },

        onRouteMatched: function (event) {
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(event.getParameter("arguments").itemPath)
            });
        },

        onNavBack: function () {
            const sPreviousHash = History.getInstance().getPreviousHash();
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                const oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("Master", {}, true);
            }
        }
    });
});
