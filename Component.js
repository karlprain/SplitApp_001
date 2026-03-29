sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
    "use strict";

    return UIComponent.extend("com.myorg.myapp.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            // Initialize root data model before calling parent init
            const oModel = new JSONModel({
                products: [],
                selectedProduct: null
            });
            this.setModel(oModel);

            // Call the base component's init function
            // This will load manifest and set up routing
            UIComponent.prototype.init.apply(this, arguments);
        }
    });
});
