sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History"
], function (Controller, UIComponent, History) {
    "use strict";

    return Controller.extend("com.myorg.myapp.controller.Detail", {
        
        onInit: function () {
            const oComponent = UIComponent.getRouterFor(this).getOwnerComponent();
            const oModel = oComponent.getModel();
            this.getView().setModel(oModel);
            
            const oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("Detail").attachPatternMatched(this._onRouteMatched, this);
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
