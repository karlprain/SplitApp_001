sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
    "use strict";

    return Controller.extend("com.myorg.myapp.controller.Master", {
        
        onInit: function () {
            // Get the component's model (set in Component.js)
            const oComponent = UIComponent.getRouterFor(this).getOwnerComponent();
            const oModel = oComponent.getModel();
            
            // Attach the component's model to this view
            this.getView().setModel(oModel);
            
            // Load product data
            this._loadProducts();
        },

        _loadProducts: function () {
            const oModel = this.getView().getModel();
            const aProducts = [
                {
                    productId: "P001",
                    productName: "Laptop Pro X1",
                    category: "Electronics",
                    description: "High-performance business laptop with 15\" display",
                    price: 1299.99,
                    inStock: "Yes"
                },
                {
                    productId: "P002",
                    productName: "Wireless Mouse",
                    category: "Accessories",
                    description: "Ergonomic wireless mouse with 2.4GHz connection",
                    price: 49.99,
                    inStock: "Yes"
                },
                {
                    productId: "P003",
                    productName: "USB-C Hub",
                    category: "Accessories",
                    description: "Multi-port USB-C hub with HDMI and USB 3.0",
                    price: 79.99,
                    inStock: "No"
                },
                {
                    productId: "P004",
                    productName: "4K Monitor",
                    category: "Electronics",
                    description: "27-inch 4K Ultra HD display with USB-C",
                    price: 599.99,
                    inStock: "Yes"
                },
                {
                    productId: "P005",
                    productName: "Mechanical Keyboard",
                    category: "Accessories",
                    description: "RGB backlit mechanical keyboard with Cherry MX switches",
                    price: 159.99,
                    inStock: "Yes"
                }
            ];
            oModel.setProperty("/products", aProducts);
        },

        onNavToDetail: function (oEvent) {
            const oSource = oEvent.getSource();
            const oBindingContext = oSource.getBindingContext();
            const oProduct = oBindingContext.getObject();
            
            const oModel = this.getView().getModel();
            oModel.setProperty("/selectedProduct", oProduct);
            
            const oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("Detail", {
                productId: window.encodeURIComponent(oProduct.productId)
            });
        },

        onSelectionChange: function (oEvent) {
            const oListItem = oEvent.getParameter("listItems")[0];
            if (oListItem) {
                const oProduct = oListItem.getBindingContext().getObject();
                const oModel = this.getView().getModel();
                oModel.setProperty("/selectedProduct", oProduct);
            }
        },

        onRefreshList: function () {
            this._loadProducts();
        }
    });
});
