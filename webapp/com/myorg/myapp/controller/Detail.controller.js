sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel"
], function (Controller, UIComponent, History, JSONModel) {
    "use strict";

    return Controller.extend("com.myorg.myapp.controller.Detail", {
        
        onInit: function () {
            const oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("Detail").attachPatternMatched(this._onRouteMatched, this);
            
            if (!this.getView().getModel()) {
                this.getView().setModel(new JSONModel(), "view");
            }
        },

        _onRouteMatched: function (oEvent) {
            const sProductId = window.decodeURIComponent(oEvent.getParameter("arguments").productId);
            const oModel = this.getView().getModel();
            const aProducts = oModel.getProperty("/products") || [];
            const oProduct = aProducts.find(p => p.productId === sProductId);
            
            if (oProduct) {
                oModel.setProperty("/selectedProduct", oProduct);
            }
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
